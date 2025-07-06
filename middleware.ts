import {NextRequest, NextResponse} from "next/server";
import {commonControllerLogVisitor} from "@/entities/api/common/common";
import {customInstance} from "@/shared/axios/lib/customInstance";

export async function middleware(
	req: NextRequest,
) {
	const pathname = req.nextUrl.pathname

  countVisitor()

  if(pathname.endsWith("/to/site")) {
    return toSiteRedirection(pathname)
  }

	if(pathname.startsWith('/api')) {
		return NextResponse.next()
	}
}

export const config = {
	matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/to/site',
  ]
}

function countVisitor() {
  commonControllerLogVisitor()
}

async function toSiteRedirection(pathname: string) {
  try {
    await customInstance<void>(
      {url: '/to/site'}
    )
    return NextResponse.redirect(pathname.slice(0, pathname.length-8))
  } catch(e) {
    return NextResponse.next()
  }
}
