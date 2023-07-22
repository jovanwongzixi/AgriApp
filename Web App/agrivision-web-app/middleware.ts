import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest, response: NextResponse) {
  const session = request.cookies.get("session")
  const currentuser = request.cookies.get("currentuser")?.value
  // const urlUser = request.nextUrl.pathname.split('/')[1]

  //Return to /login if don't have a session
  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  //Call the authentication endpoint
  const responseAPI = await fetch(`${process.env.BASE_URL}/api/login`, {
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  //Return to /login if token is not authorized
  if (responseAPI.status !== 200) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // user check working, commented out for now to save on reads on redis
  // const userSessionCheck = await fetch(`${process.env.BASE_URL}/api/check-user?userid=${urlUser}&session=${session.value}`)
  // if (userSessionCheck.status !== 200){
  //   return NextResponse.redirect(new URL(`/`, request.url))
  // }

  //check of agricloud permission
  // if (request.nextUrl.pathname.includes('/agricloud')){
  //   const res = await fetch(`${process.env.BASE_URL}/api/agricloud/check-permission?userid=${urlUser}`)
  //   if(res.status !== 200){
  //     NextResponse.next()
  //     throw new Error('Argicloud access denied')
  //   } 
  // }
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - home page
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|admin|_next/static|_next/image|favicon.ico).{1,})',
  ],
}