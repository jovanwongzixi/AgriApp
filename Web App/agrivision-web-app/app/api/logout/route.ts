import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'


export async function GET(request: NextRequest) {
  //Remove the value and expire the cookie
  const options = {
    name: "session",
    value: "",
    maxAge: -1,
  };

  cookies().set(options);
  cookies().set({
    name:'currentuser',
    value: '',
    maxAge: -1,
  })
  return NextResponse.json({}, { status: 200 });
}