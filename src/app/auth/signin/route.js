// src\app\auth\login\route.js
// -----------------------------
import { revalidateAll } from '@/app/actions'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request) {
    const requestUrl = new URL(request.url)

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (signInError == 'AuthApiError: Invalid login credentials') {
        return NextResponse.redirect(`${requestUrl.origin}/sign-in`, {
            status: 301,
        })
    }

    return NextResponse.redirect(requestUrl.origin, {
        status: 301,
    })
}