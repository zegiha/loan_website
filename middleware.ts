import {NextRequest, NextResponse} from "next/server";

export async function middleware(
	req: NextRequest,
) {
	if(req.nextUrl.pathname.startsWith('/api')){
		return NextResponse.next();
	}

	if(req.nextUrl.pathname.startsWith('/my')) {
		if(req.nextUrl.pathname === '/my/leave/done') {
			return my_leave_domain_validate(req)
		} else {
			return my_domain_validate(req)
		}
	}

	const res = NextResponse.next()
	res.headers.set('X-Has_Token', 'true')
	return res;
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}

function my_leave_domain_validate(req: NextRequest) {
	const leave_token = req.cookies.get('leave_token')
	console.log(req.nextUrl.pathname, leave_token)
	if(leave_token)
		return NextResponse.next()
	else
		return new NextResponse(null, {status: 404})
}

function my_domain_validate(req: NextRequest) {
	const refresh_token = req.cookies.get('refresh_token')
	if(refresh_token)
		return NextResponse.next()
	else
		return NextResponse.redirect(new URL('/login', req.url))
}
