import {NextRequest, NextResponse} from "next/server";
import {commonControllerLogVisitor} from "@/entities/api/common/common";
import {customInstance} from "@/shared/axios/lib/customInstance";
import {AxiosError} from "axios";

export async function middleware(
	req: NextRequest,
) {
	const pathname = req.nextUrl.pathname

  countVisitor()

  if(pathname.endsWith("/to/site")) {
    return toSiteRedirection(req)
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

async function toSiteRedirection(req: NextRequest) {
  try {
    await customInstance<void>(
      {url: '/to/site'}
    )
    return NextResponse.redirect(new URL('/', req.nextUrl))
  } catch(e) {
    if(e instanceof AxiosError) {
      if(e.status && e.status < 400) {
        return NextResponse.redirect(new URL('/'))
      }
      return NextResponse.next()
    }
  }
}
