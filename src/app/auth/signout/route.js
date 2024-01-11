// src\app\auth\logout\route.js
// -----------------------------
import { revalidateAll } from '@/app/actions'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
  const requestUrl = new URL(request.url);

  // console.log(`requestUrl`, requestUrl);

  const cookieStore = cookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

  await supabase.auth.signOut();

  revalidateAll();

  return NextResponse.redirect(`${requestUrl.origin}`, {
    status: 301,
  })
}