import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";

export async function middleware(
	req: NextRequest,
) {
	const cookieStore = await cookies();
	const refresh_token = cookieStore.get('refresh_token');
	if(!refresh_token) {
		return NextResponse.redirect(new URL('/login', req.url))
	}
}

export const config = {
	matcher: '/my/:path*',
}
