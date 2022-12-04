import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname === "/cart") {
        const randomNumber = Math.floor(Math.random() * 1000) % 2;
        console.log("hello middleware", randomNumber);
        if (randomNumber === 0) {
            return NextResponse.rewrite(new URL("/cart", request.url));
        }
        return NextResponse.rewrite(new URL("/", request.url));
    }

    return NextResponse.next();
}

//https://next-auth.js.org/configuration/nextjs

// See "Matching Paths" below to learn more
// export const config = {
//     matcher: "/about/:path*",
// };
