import {NextRequest, NextResponse} from "next/server";

export async function middleware(
	req: NextRequest,
) {
	const refresh_token = req.cookies.get('refresh_token')
	const leave_token = req.cookies.get('leave_token')
	console.log(req.nextUrl.pathname, leave_token)
	if(req.nextUrl.pathname === '/my/leave/done') {
		if(leave_token) return NextResponse.next()
		else return new NextResponse(null, {status: 404})
	} else if(!refresh_token) {
		return NextResponse.redirect(new URL('/login', req.url))
	}
}

export const config = {
	matcher: [
		'/my/:path*',
	],
}
