// src\app\(pages)\admin\page.jsx
// ------------------------------
import React from 'react'

// ------------------------------------------
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

import { revalidateAll } from '@/app/actions'
import Product from '../pt/page'

import Goto_btn from '@/app/components/server/atoms/Goto_btn'
import Link from 'next/link'

// ------------------------------------------
const Admin = async () => {

    // -------------------------------------------------------------------
    const cookieStore = cookies()
    const supabase = createServerComponentClient({ cookies: () => cookieStore })
    const { data: { user } } = await supabase.auth.getUser();

    let { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select("*")
        .eq('user_id', `${user?.id}`);


    // --------------------------
    var is_admin = false;

    if (profiles !== null) {

        if (profiles[0]?.is_admin == true) {
            is_admin = true;
        }
    }
    // -------------------------------------------------------------------



    // -------------------------------------
    if (is_admin == false) {

        return (
            <>
                <div className="bg-white min-h-screen">
                    <section className=" pt-10">

                        <div className="xl:container px-10 mx-auto flex flex-col gap-y-10">
                            <div className="text-black text-2xl flex flex-col gap-y-10">
                                Sorry, You are not an Admin.....

                                <Goto_btn goto='/profile' name='Sign in as Admin'></Goto_btn>
                            </div>

                        </div>
                    </section>
                </div>
            </>
        )
    }

    // --------------------------------------
    return (
        <>
            <main className="bg-white py-10">

                <div className="w-full text-black bg-white fixed top-3 md:top-0 left-0 py-3 px-5 
                    z-[9999] rounded-lg">
                    <div className="w-full flex flex-wrap justify-between">
                        <Goto_btn revalidateAll={revalidateAll}
                            name={`Create New Product`}
                            goto={`/admin/cre_pt`}></Goto_btn>

                        <Goto_btn revalidateAll={revalidateAll}
                            name={`profile`}
                            goto={`/profile`}></Goto_btn>
                    </div>
                </div>


                <Product is_admin={true}></Product>

                <hr className='border-b-2 border-solid border-orange-400 mt-12 mb-6 mx-10' />


                <div className="py-6 flex flex-col gap-y-8 text-black px-10 bg-white">
                    {/* Print state variable :: 11.04 :: userProfile */}
                    <div className="">
                        <pre className=''>
                            <span className="pr-2 font-bold">
                                profiles =
                            </span>
                            {JSON.stringify(profiles, null, 2)}
                            {JSON.stringify(profilesError, null, 2)}

                        </pre>
                    </div>
                    <div className="">
                        <pre className=''>
                            <span className="pr-2 font-bold">
                                authUser =
                            </span>
                            {JSON.stringify(user, null, 2)}

                        </pre>
                    </div>

                </div>

            </main>

        </>
    )
}

export default Admin