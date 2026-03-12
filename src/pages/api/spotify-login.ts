import type { APIRoute } from "astro";

const REDIRECT_URI = "https://elijah-hash.vercel.app/api/spotify-callback";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
].join(" ");

export const GET: APIRoute = async () => {
  const clientId = import.meta.env.SPOTIFY_CLIENT_ID;

  if (!clientId) {
    return new Response("Missing SPOTIFY_CLIENT_ID in environment variables.", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("scope", SCOPES);

  return new Response(null, {
    status: 302,
    headers: {
      Location: authUrl.toString(),
      "Cache-Control": "no-store, max-age=0",
    },
  });
};
