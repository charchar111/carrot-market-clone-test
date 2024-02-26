import { NextResponse, userAgent } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";
import useUser from "./libs/client/useUser";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, event: NextFetchEvent) {
  if (!request.nextUrl.pathname.startsWith("/api")) {
    // console.log("not api");

    // console.log("middleware:", request.nextUrl.pathname, request.nextUrl.search);
    const requestUserAgent = userAgent(request);
    // console.log(requestUserAgent);
    if (requestUserAgent.isBot) {
      return new Response("A bot's access has been detected.", { status: 403 });
    }
    // if (request.nextUrl.pathname.startsWith("/lives"))
    //   console.log("hello lives! ");

    // console.log(request.url, request.cookies.has("carrotsession"));
    //
    // console.log(request.url, request.nextUrl);

    const PagesExceptionUserAuth = ["/enter"];
    // console.log(request.geo);
    if (
      !PagesExceptionUserAuth.includes(request.nextUrl.pathname) &&
      !request.cookies.has("carrotsession")
    ) {
      return NextResponse.redirect(new URL("/enter", request.url));
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
