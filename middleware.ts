import {NextRequest, NextResponse} from "next/server";
import {commonControllerLogVisitor} from "@/entities/api/common/common";

export async function middleware(
	req: NextRequest,
) {
	const pathname = req.nextUrl.pathname

  countVisitor()

	if(pathname.startsWith('/api')) {
		return NextResponse.next()
	}
}

export const config = {
	matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}

function countVisitor() {
  commonControllerLogVisitor()
}
