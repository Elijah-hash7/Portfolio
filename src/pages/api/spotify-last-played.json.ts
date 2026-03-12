import type { APIRoute } from "astro";

type SpotifyTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type SpotifyRecentTrack = {
  track?: {
    name?: string;
    external_urls?: { spotify?: string };
    album?: {
      images?: Array<{ url?: string }>;
    };
    artists?: Array<{ name?: string }>;
  };
  played_at?: string;
};

type SpotifyNowPlayingResponse = {
  is_playing?: boolean;
  item?: {
    name?: string;
    external_urls?: { spotify?: string };
    album?: {
      images?: Array<{ url?: string }>;
    };
    artists?: Array<{ name?: string }>;
  };
};

async function getAccessToken() {
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = import.meta.env.SPOTIFY_REFRESH_TOKEN;

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error("Missing Spotify environment variables");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  const data = (await response.json()) as SpotifyTokenResponse;
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || "Could not refresh Spotify token");
  }

  return data.access_token;
}

function shapeTrack(track: SpotifyNowPlayingResponse["item"] | SpotifyRecentTrack["track"], playedAt: string | null, isPlaying: boolean) {
  if (!track?.name || !track.external_urls?.spotify) {
    return null;
  }

  return {
    title: track.name,
    artist: (track.artists ?? []).map((artist) => artist.name).filter(Boolean).join(", "),
    albumArt: track.album?.images?.[0]?.url ?? "",
    songUrl: track.external_urls.spotify,
    playedAt,
    isPlaying,
  };
}

async function fetchSpotify(accessToken: string, endpoint: string) {
  return fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export const GET: APIRoute = async () => {
  try {
    const accessToken = await getAccessToken();

    const nowPlayingRes = await fetchSpotify(accessToken, "me/player/currently-playing");
    if (nowPlayingRes.ok && nowPlayingRes.status !== 204) {
      const nowPlaying = (await nowPlayingRes.json()) as SpotifyNowPlayingResponse;
      const current = shapeTrack(nowPlaying.item, null, Boolean(nowPlaying.is_playing));
      if (current) {
        return new Response(JSON.stringify(current), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, max-age=0",
          },
        });
      }
    }

    const recentRes = await fetchSpotify(accessToken, "me/player/recently-played?limit=1");
    if (!recentRes.ok) {
      throw new Error(`Spotify recently played returned ${recentRes.status}`);
    }

    const recentJson = await recentRes.json() as { items?: SpotifyRecentTrack[] };
    const recentTrack = recentJson.items?.[0];
    const payload = shapeTrack(recentTrack?.track, recentTrack?.played_at ?? null, false);

    if (!payload) {
      throw new Error("No recently played track found");
    }

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Spotify fetch failed",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, max-age=0",
        },
      },
    );
  }
};
