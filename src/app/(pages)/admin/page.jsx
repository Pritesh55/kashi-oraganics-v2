// src\app\(pages)\admin\page.jsx
// ------------------------------
import React from 'react'

// ------------------------------------------
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
// ------------------------------------------
const Admin = async () => {

    // -------------------------------------
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data } = await supabase.auth.getUser();
    // -------------------------------------

    return (
        <>
            <div className="">
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>

        </>
    )
}

export default Admin