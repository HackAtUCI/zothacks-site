import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { hasApplicationsOpened } from "@/lib/utils/applicationWindow";

const APPLICATION_ROUTES = ["/apply", "/portal"];
const DISABLED_HOME_OVERLAYS = ["resources", "schedule"];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const overlay = request.nextUrl.searchParams.get("overlay");

	if (pathname === "/" && overlay && DISABLED_HOME_OVERLAYS.includes(overlay)) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	if (
		!hasApplicationsOpened() &&
		APPLICATION_ROUTES.some(
			(route) => pathname === route || pathname.startsWith(`${route}/`),
		)
	) {
		return NextResponse.redirect(new URL("/", request.url));
	}

	const requestHeaders = new Headers(request.headers);
	requestHeaders.set("X-Hackathon-Name", "zothacks");

	return NextResponse.next({
		request: {
			headers: requestHeaders,
		},
	});
}

export const config = {
	matcher: [
		"/",
		"/api/:path*",
		"/apply",
		"/apply/:path*",
		"/portal",
		"/portal/:path*",
	],
};
