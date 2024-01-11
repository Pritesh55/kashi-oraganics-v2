// src\app\auth\signup\route.js
// -----------------------------
import { revalidateAll } from '@/app/actions'

// ------------------------------------------------
import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
// -----------------------------------------------

import { NextResponse } from 'next/server'

export async function POST(request) {
    const requestUrl = new URL(request.url)

    // ------------------------------
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    // ------------------------------

    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')

    // ---------------------------

    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${requestUrl.origin}/auth/callback`,
        },
    })

    // console.log(`signUpError =`, signUpError);

    if (signUpError == 'AuthApiError: User already registered') {

        // console.log("Email is already registered...");

        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        // console.log(`signInData =`, signInData);
        // console.log(`signInError =`, signInError);

        if (signInError == 'AuthApiError: Invalid login credentials') {

            return NextResponse.redirect(`${requestUrl.origin}/sign-in`, {
                status: 301,
            })
        }
    }

    if (signUpError == null) {


        // Add New Row to Profies Table , When user Sign up First time....
        const { data: insertUserProfies, error: insertUserProfilesError } = await supabase
            .from('profiles')
            .insert([
                {
                    user_id: signUpData.user.id,
                    email_id: signUpData.user.email,
                    first_name: '',
                    last_name: '',
                    mobile_number: '',
                    whatsapp_number: '',
                    address: '',
                    password: password,
                    is_admin: false
                },
            ])
            .select();

        revalidateAll();

        // console.log(`insertUserProfies= `, insertUserProfies);
        // console.log(`insertUserProfilesError= `, insertUserProfilesError);

    }

    return NextResponse.redirect(`${requestUrl.origin}`, {
        status: 301,
    })


}