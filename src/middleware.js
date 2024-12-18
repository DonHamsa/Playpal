import { NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|images|public).*)",
  ],
};

export function middleware(request) {
  // console.log(process.env.VERCEL_PROJECT_PRODUCTION_URL)
  // console.log(request.url)

  if (
    request.url === `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}/event`
  ) {
    console.log("reerberbftb");
    const url = process.env.VERCEL_PROJECT_PRODUCTION_URL;
    const referer = request.headers.get("referer");
    const allowedReferer = `https://${url}/dashboard`; // Replace with your allowed referer URL

    if (referer && referer.startsWith(allowedReferer)) {
      return NextResponse.next(); // Allow the request
    } else {
      return NextResponse.redirect(new URL("/dashboard", request.url)); // Redirect to the homepage if referer doesn't match
    }
  }

  const { searchParams } = request.nextUrl;
  const message = searchParams.get("message");

  const headers = new Headers(request.headers);
  if (message) {
    headers.set("x-current-path", message);
  }

  return NextResponse.next({ headers });
}
