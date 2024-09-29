import { NextResponse } from 'next/server';

export async function GET() {
  const response = NextResponse.redirect(process.env.NEXT_PUBLIC_BASE_URL + '/');
  
  response.cookies.set('access_token', '', { expires: new Date(0) });
  response.cookies.set('refresh_token', '', { expires: new Date(0) });

  return response;
}
