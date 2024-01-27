import Empty_cart_btn from '@/app/components/client/operational/btns/Empty_cart_btn';
import Goto_btn from '@/app/components/server/atoms/Goto_btn';
import Link from 'next/link';
import React from 'react'

const Cart_header = ({ user_id, cart, revalidateAll }) => {

    var total_item = cart?.length;
    var total_amount = 0;

    const calculateTotalPrice = (cartItems) => {
        var totalPrice = 0;
        if (cartItems.length > 0) {
            totalPrice = cartItems.reduce((accumulator, item) => {
                const itemTotalPrice = item.unit_price * item.qty;
                return accumulator + itemTotalPrice;
            }, 0);
        }

        return totalPrice;
    };

    if (cart.length > 0) {
        total_amount = calculateTotalPrice(cart);
    }


    return (
        <>
            <div className="flex flex-col gap-y-3">
                <div className="flex justify-between items-center flex-wrap gap-3">

                    <Empty_cart_btn user_id={user_id} cart={cart} revalidateAll={revalidateAll}></Empty_cart_btn>

                    <div className="text-black rounded-lg lg:flex justify-center items-center flex-wrap gap-x-6 hidden">

                        {/* <div className=""> */}
                        <Link href={'/'} scroll={false} className='bg-yellow-300 px-12 py-2 rounded-lg text-lg md:text-xl '> {`${total_item} items`} </Link>
                        <Link href={'/'} scroll={false} className='bg-yellow-300 px-12 py-2 rounded-lg text-lg md:text-xl'> {`${total_amount} ₹`} </Link>

                        {/* </div> */}

                    </div>

                    <Goto_btn name='Go to cart' goto='/cart'></Goto_btn>
                </div>

                <div className="flex justify-between flex-wrap gap-x-3 md:gap-x-6 gap-y-3 rounded-lg items-start lg:hidden">
                    {/* <div className=""> */}
                    <Link href={'/'} scroll={false} className='bg-yellow-300 px-3 md:px-12 py-2 rounded-lg  text-base md:text-xl break-all'> {`${total_item} items`} </Link>
                    <Link href={'/'} scroll={false} className='bg-yellow-300  px-3 md:px-12 py-2 rounded-lg  text-base md:text-xl break-all'> {`${total_amount} ₹`} </Link>

                    {/* </div> */}
                </div>
            </div>

        </>
    )
}

export default Cart_header