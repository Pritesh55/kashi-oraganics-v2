'use client'
import { revalidateAll } from '@/app/actions';
import { empty_cart } from '@/functions/btnFunctions';
import React, { useEffect, useState } from 'react'

const Empty_cart_btn = ({ user_id ,cart}) => {
    const [cart_emptying, set_cart_emptying] = useState(false);

    useEffect(() => {
        set_cart_emptying(false);
    }, [cart])
    // console.log(`user_id = `, user_id)
    return (

        <>
            <button onClick={() => {
                set_cart_emptying(true);
                empty_cart(user_id);
                revalidateAll();
            }} className="hover:bg-gray-50 bg-white px-4 md:px-12 py-2 rounded-lg  text-base md:text-xl border-2 border-gray-200 leading-none">Empty cart</button>


            {
                (cart_emptying) && <div className="bg-yellow-400 text-black fixed bottom-0 z-[9999] left-0 w-full flex justify-center p-0.5">
                    Loading...
                </div>
            }

        </>
    )
}

export default Empty_cart_btn