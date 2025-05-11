import {NextRequest, NextResponse} from "next/server";

export async function middleware(
	req: NextRequest,
) {
	const pathname = req.nextUrl.pathname

	if(pathname.startsWith('/api')) {
		return NextResponse.next()
	}
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}
