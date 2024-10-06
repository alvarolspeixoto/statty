import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateSpotifyToken } from "./lib/spotify";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const refreshToken = request.cookies.get('refresh_token')?.value;
  const tokenExpiration = request.cookies.get('token_expiration')?.value;

  if (!accessToken || !refreshToken || !tokenExpiration) {
    return NextResponse.redirect(new URL("/api/spotify/login", request.url));
  }

  if (Date.now() > Number(tokenExpiration)) {
    try {
      const { accessToken: newAccessToken, expirationTime } = await validateSpotifyToken(accessToken, refreshToken);

      if (newAccessToken && expirationTime) {
        const response = NextResponse.next();
        response.cookies.set('access_token', newAccessToken, { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 30 });
        response.cookies.set('token_expiration', expirationTime.toString(), { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 30 });
        return response;
      }
    } catch (error) {
      console.error('Failed to refresh token', error);

      return NextResponse.redirect(new URL("/api/spotify/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/top-tracks", "/profile"],
};
