const REDIRECT_URI = "https://elijah-hash.vercel.app/api/spotify-callback";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-recently-played",
].join(" ");

export default async function handler(_request, response) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;

  if (!clientId) {
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    return response.status(500).send("Missing SPOTIFY_CLIENT_ID in environment variables.");
  }

  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("scope", SCOPES);

  response.setHeader("Cache-Control", "no-store, max-age=0");
  return response.redirect(302, authUrl.toString());
}
