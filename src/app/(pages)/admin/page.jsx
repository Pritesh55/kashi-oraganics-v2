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
import Sign_btns from '@/app/components/server/atoms/sign_btns'

// ------------------------------------------
const Admin = async () => {

    // -------------------------------------------------------------------
    const cookieStore = cookies();
    const supabase = createServerComponentClient({ cookies: () => cookieStore });


    const { data: { user } } = await supabase.auth.getUser();
    // user = null (:: if user has not signed in ::)
    // user = a Object {id: "" , email: "" } (:: if user has signed in ::)

    // if user has not signed in...
    // -----------------------------
    // user= null
    // profilesData= undefined
    // user_profile= undefined
    // is_admin =  false

    // if user has signed in...
    // -----------------------------
    // user= {
    //   id: 'c750623f-9027-48ae-b79e-5f45bd9b4c78',
    //   aud: 'authenticated',
    //   role: 'authenticated',
    //   email: 'iampritesh55@gmail.com',
    //   email_confirmed_at: '2024-01-10T15:42:11.48376Z',
    //   phone: '',
    //   confirmed_at: '2024-01-10T15:42:11.48376Z',
    //   last_sign_in_at: '2024-01-10T15:42:11.486577Z',
    //   app_metadata: { provider: 'email', providers: [ 'email' ] },
    //   user_metadata: {},
    //   identities: [
    //     {
    //       identity_id: '5c0769fb-5d3c-4e78-8f69-f2d651029f9e',
    //       id: 'c750623f-9027-48ae-b79e-5f45bd9b4c78',
    //       user_id: 'c750623f-9027-48ae-b79e-5f45bd9b4c78',
    //       identity_data: [Object],
    //       provider: 'email',
    //       last_sign_in_at: '2024-01-10T15:42:11.481564Z',
    //       created_at: '2024-01-10T15:42:11.481619Z',
    //       updated_at: '2024-01-10T15:42:11.481619Z',
    //       email: 'iampritesh55@gmail.com'
    //     }
    //   ],
    //   created_at: '2024-01-10T15:42:11.477622Z',
    //   updated_at: '2024-01-10T15:42:11.488385Z'
    // }

    var user_id;
    var user_profile;

    if (user) {

        user_id = user.id;

        // check profiles table:: find user?.id :: then return rows Which matches user.id ::
        var { data: profilesData, error: profilesError } = await supabase
            .from('profiles')
            .select("*")
            .eq('user_id', user_id);
    }

    // profilesData= [
    //   {
    //     first_name: '',
    //     last_name: '',
    //     email_id: 'iampritesh55@gmail.com',
    //     user_id: 'c750623f-9027-48ae-b79e-5f45bd9b4c78',
    //     whatsapp_number: '',
    //     mobile_number: '',
    //     address: '',
    //     is_admin: false,
    //     list_number: 29
    //   }
    // ]

    var is_admin = false;

    // Check if user is admin ??
    if (profilesData?.length > 0) {

        user_profile = profilesData[0];

        // ----------------
        // user_profile= {
        //   first_name: '',
        //   last_name: '',
        //   email_id: 'iampritesh55@gmail.com',
        //   user_id: 'c750623f-9027-48ae-b79e-5f45bd9b4c78',
        //   whatsapp_number: '',
        //   mobile_number: '',
        //   address: '',
        //   is_admin: false,
        //   list_number: 29
        // }


        is_admin = user_profile.is_admin;

    }


    // console.log(`user=`, user);
    // console.log(`profilesData=`, profilesData);
    // console.log(`user_profile=`, user_profile);
    // console.log(`is_admin = `, is_admin);
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
            <main className="bg-white">

                <div className="w-full text-black bg-white py-3 px-5 z-[9999]">
                    <div className="w-full flex flex-wrap justify-between gap-3">

                        <div className="flex gap-x-3 md:gap-x-6 gap-y-3 flex-wrap ">

                            <Goto_btn name={`Home`} goto={`/`}></Goto_btn>
                            <Goto_btn name={`Admin`} goto={`/admin`}></Goto_btn>

                        </div>

                        <div className="flex gap-x-3 md:gap-x-6 gap-y-3 flex-wrap ">
                            <Goto_btn revalidateAll={revalidateAll}
                                name={`Profile`}
                                goto={`/profile`}></Goto_btn>

                            <Sign_btns signout={true} ></Sign_btns>
                        </div>

                    </div>
                </div>

                <div className="w-full text-black bg-white py-3 px-5 z-[9999] rounded-lg">
                    <div className="w-full flex flex-wrap justify-between sm:justify-center gap-3">
                        <Goto_btn revalidateAll={revalidateAll}
                            name={`Create New Product`}
                            goto={`/admin/cre_pt`}></Goto_btn>

                    </div>
                </div>


                <Product is_admin={true} ></Product>

                <hr className='border-b-2 border-solid border-orange-400 mt-12 mb-6 mx-10' />


                <div className="py-6 flex flex-col gap-y-8 text-black px-10 bg-white">
                    {/* Print state variable :: 11.04 :: userProfile */}
                    {(user_profile) &&
                        <>
                            <div className="">
                                <pre className=''>
                                    <span className="pr-2 font-bold">
                                        User profile =
                                    </span>
                                    {JSON.stringify(user_profile, null, 2)}

                                    {/* {JSON.stringify(profilesError, null, 2)} */}

                                </pre>
                            </div>

                            {/* <div className="">
                                <pre className=''>
                                    <span className="pr-2 font-bold">
                                        authUser =
                                    </span>
                                    {JSON.stringify(user, null, 2)}

                                </pre>
                            </div> */}
                        </>
                    }
                </div>

            </main>

        </>
    )
}

export default Admin