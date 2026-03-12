async function getAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

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

  const data = await response.json();
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || "Could not refresh Spotify token");
  }

  return data.access_token;
}

function shapeTrack(track, playedAt, isPlaying) {
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

async function fetchSpotify(accessToken, endpoint) {
  return fetch(`https://api.spotify.com/v1/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export default async function handler(_request, response) {
  try {
    const accessToken = await getAccessToken();

    const nowPlayingRes = await fetchSpotify(accessToken, "me/player/currently-playing");
    if (nowPlayingRes.ok && nowPlayingRes.status !== 204) {
      const nowPlaying = await nowPlayingRes.json();
      const current = shapeTrack(nowPlaying.item, null, Boolean(nowPlaying.is_playing));
      if (current) {
        response.setHeader("Cache-Control", "no-store, max-age=0");
        return response.status(200).json(current);
      }
    }

    const recentRes = await fetchSpotify(accessToken, "me/player/recently-played?limit=1");
    if (!recentRes.ok) {
      throw new Error(`Spotify recently played returned ${recentRes.status}`);
    }

    const recentJson = await recentRes.json();
    const recentTrack = recentJson.items?.[0];
    const payload = shapeTrack(recentTrack?.track, recentTrack?.played_at ?? null, false);

    if (!payload) {
      throw new Error("No recently played track found");
    }

    response.setHeader("Cache-Control", "no-store, max-age=0");
    return response.status(200).json(payload);
  } catch (error) {
    response.setHeader("Cache-Control", "no-store, max-age=0");
    return response.status(200).json({
      error: error instanceof Error ? error.message : "Spotify fetch failed",
    });
  }
}
