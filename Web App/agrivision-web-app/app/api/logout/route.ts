import { kv } from '@vercel/kv'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest) {
  //Remove the value and expire the cookie
  const options = {
    name: "session",
    value: "",
    maxAge: -1,
  };
  const currentuser = request.cookies.get('currentuser')?.value

  cookies().set(options);
  cookies().set({
    name:'currentuser',
    value: '',
    maxAge: -1,
  })
  if (currentuser) await kv.del(currentuser) // add error checking
  return NextResponse.json({}, { status: 200 });
}