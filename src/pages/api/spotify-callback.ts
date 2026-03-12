import type { APIRoute } from "astro";

const REDIRECT_URI = "https://elijah-hash.vercel.app/api/spotify-callback";

type SpotifyTokenResponse = {
  access_token?: string;
  refresh_token?: string;
  error?: string;
  error_description?: string;
};

export const GET: APIRoute = async ({ request }) => {
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return new Response("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in environment variables.", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    return new Response(`Spotify returned an error: ${error}`, {
      status: 400,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  if (!code) {
    return new Response("Missing authorization code in callback URL.", {
      status: 400,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const tokenResponse = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const tokenData = (await tokenResponse.json()) as SpotifyTokenResponse;

  if (!tokenResponse.ok || !tokenData.refresh_token) {
    return new Response(
      [
        "Spotify token exchange failed.",
        `error: ${tokenData.error ?? "unknown"}`,
        `description: ${tokenData.error_description ?? "unknown"}`,
      ].join("\n"),
      {
        status: 500,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
        },
      },
    );
  }

  return new Response(
    [
      "Copy this refresh token into your .env or Vercel environment variables:",
      "",
      tokenData.refresh_token,
    ].join("\n"),
    {
      status: 200,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store, max-age=0",
      },
    },
  );
};
