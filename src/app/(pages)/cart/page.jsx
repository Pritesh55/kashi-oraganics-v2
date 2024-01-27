import React from 'react'

import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Cart_card from './Cart_card';
import { revalidateAll } from '@/app/actions';
import Link from 'next/link';
import Goto_btn from '@/app/components/server/atoms/Goto_btn';
import Cart_header from './Cart_header';
import Sign_btns from '@/app/components/server/atoms/sign_btns';
import Home_btn from '@/app/components/server/atoms/Home_btn';


const page = async () => {

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
    var cart = [];
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
        cart = user_profile.cart;

    }


    // console.log(`cart inti =`, cart);


    const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*');


    return (
        <>

            <main className="xl:container mx-auto flex flex-col bg-white min-h-screen text-black">

                <div className="px-5 py-3 flex justify-between items-center gap-3 flex-wrap">

                    <Home_btn is_admin={is_admin}></Home_btn>

                    <div className="text-black rounded-lg">
                        {(user) ? <>
                            <Sign_btns profile={true} signout={true}
                                user_profile={user_profile} user_id={user_id}></Sign_btns>
                        </> :
                            <>
                                <Sign_btns signup={true} signin={true}></Sign_btns>
                            </>
                        }
                    </div>
                </div>


                <div className="px-5 py-3 flex flex-col gap-y-5 md:gap-y-10">


                    <Cart_header user_id={user_id} cart={cart} revalidateAll={revalidateAll} ></Cart_header>

                    <Cart_card cart={user_profile.cart} products={products}
                        user_id={user_id} revalidateAll={revalidateAll}></Cart_card>
                    {/* <div className="">a</div> */}

                </div>

            </main>
        </>
    )
}

export default page