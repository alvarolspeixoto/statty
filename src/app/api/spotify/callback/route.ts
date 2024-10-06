import { NextRequest, NextResponse } from 'next/server';
import cookie from 'cookie';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Authorization code is missing' }, { status: 400 });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID!;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET!;
  const redirectUri = process.env.SPOTIFY_REDIRECT_URI!;

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }).toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Spotify API Error:', errorText);
      return NextResponse.json({ error: 'Failed to fetch access token' }, { status: 500 });
    }

    const data = await response.json();
    const { access_token, refresh_token, expires_in } = data;

    const expirationTime = Date.now() + expires_in * 1000;

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV! === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 dias
      path: '/',
    };

    const accessTokenCookie = cookie.serialize('access_token', access_token, cookieOptions);
    const refreshTokenCookie = cookie.serialize('refresh_token', refresh_token, cookieOptions);
    const expirationCookie = cookie.serialize('token_expiration', expirationTime.toString(), cookieOptions);

    const responseWithCookies = NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + '/');
    responseWithCookies.headers.append('Set-Cookie', accessTokenCookie);
    responseWithCookies.headers.append('Set-Cookie', refreshTokenCookie);
    responseWithCookies.headers.append('Set-Cookie', expirationCookie);

    return responseWithCookies;

  } catch (error) {
    console.error('Error during token exchange:', error);
    return NextResponse.json({ error: 'Failed to fetch access token' }, { status: 500 });
  }
}
