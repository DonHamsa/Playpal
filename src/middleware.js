import { NextResponse } from "next/server";

export const config = {
  
};

export function middleware(request) {

  // if (request.url === "http://localhost:3000/event") {
  //   const url = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  //   const referer = request.headers.get("referer");
  //   const allowedReferer = `https://${url}/dashboard`; // Replace with your allowed referer URL

  //   if (referer && referer.startsWith(allowedReferer)) {
  //     return NextResponse.next(); // Allow the request
  //   } else {
  //     return NextResponse.redirect(new URL("/dashboard", request.url)); // Redirect to the homepage if referer doesn't match
  //   }
  // }

  // const { searchParams } = request.nextUrl;
  // const message = searchParams.get("message");  

  // const headers = new Headers(request.headers);
  // if  (message){
  //   headers.set("x-current-path",message)
  // }

  // return NextResponse.next({ headers });

  
}
