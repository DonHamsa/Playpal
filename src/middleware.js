import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    // '/event', // Path to protect
  ],
};

export function middleware(request) {
  const url= process.env.VERCEL_PROJECT_PRODUCTION_URL
  console.log(url)
  const referer = request.headers.get('referer');
  console.log(referer)
  const allowedReferer = `https://${url}/dashboard`; // Replace with your allowed referer URL

  if (referer && referer.startsWith(allowedReferer)) {
    return NextResponse.next(); // Allow the request
  } else {
    return NextResponse.redirect(new URL('/dashboard', request.url)); // Redirect to the homepage if referer doesn't match
  }
}
