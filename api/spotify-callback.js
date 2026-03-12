const REDIRECT_URI = "https://elijah-hash.vercel.app/api/spotify-callback";

export default async function handler(request, response) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    return response
      .status(500)
      .send("Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in environment variables.");
  }

  const url = new URL(request.url, "https://elijah-hash.vercel.app");
  const code = url.searchParams.get("code");
  const error = url.searchParams.get("error");

  if (error) {
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    return response.status(400).send(`Spotify returned an error: ${error}`);
  }

  if (!code) {
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    return response.status(400).send("Missing authorization code in callback URL.");
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

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || !tokenData.refresh_token) {
    response.setHeader("Content-Type", "text/plain; charset=utf-8");
    return response.status(500).send(
      [
        "Spotify token exchange failed.",
        `error: ${tokenData.error ?? "unknown"}`,
        `description: ${tokenData.error_description ?? "unknown"}`,
      ].join("\n"),
    );
  }

  response.setHeader("Cache-Control", "no-store, max-age=0");
  response.setHeader("Content-Type", "text/plain; charset=utf-8");
  return response.status(200).send(
    [
      "Copy this refresh token into your .env or Vercel environment variables:",
      "",
      tokenData.refresh_token,
    ].join("\n"),
  );
}
