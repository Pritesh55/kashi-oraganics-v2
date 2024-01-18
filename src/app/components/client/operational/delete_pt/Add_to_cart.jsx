import { wait } from '@/functions/urlFunctions';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Add_to_cart = ({ curpt, cart, addToCart, empty_cart, remove_from_Cart
    // add_to_cart_btn_Handler
}) => {

    // console.log(`rerender ${curpt.id} :: Add_to_cart`)

    const router = useRouter();
    var is_in_cart = false;

    is_in_cart = cart.some((pt) => {
        // message :: print this object :: pt
        // console.log(`checking pt = `, pt)
        // console.log(`curpt= `, curpt)


        // if this object's (from old cart) product's id 
        // = input product's id (taken as parameter onclick), 
        return pt.pt_id == curpt.id
        // then  return and breaK this loop :: Ans is true....
        // true:: product exist in old cart...
    });

    const [change, set_change] = useState(false);


    useEffect(() => {
        // JS some method :: check (all objects) of (cart) array::
        is_in_cart = cart.some((pt) => {
            // message :: print this object :: pt
            // console.log(`checking pt = `, pt)
            // console.log(`curpt= `, curpt)


            // if this object's (from old cart) product's id 
            // = input product's id (taken as parameter onclick), 
            return pt.pt_id == curpt.id
            // then  return and breaK this loop :: Ans is true....
            // true:: product exist in old cart...
        });

    }, [change])

    // console.log(`${curpt.id} is_in_cart= `, is_in_cart)


    const add_to_cart_btn_Handler_2 = (value) => {
        // add_to_cart_btn_Handler(value);
    }

    return (

        <>

            <div className="absolute bottom-0 -z-50">
                <div className="text-transparent w-full max-w-full break-all -z-50"> {`------------------- `}</div>
            </div>

            {/* atc 01 :: click add to cart button :: */}
            <div onClick={() => {
                // add_to_cart_btn_Handler_2(true);
                (is_in_cart) ? remove_from_Cart(curpt.id) : addToCart(curpt.id, curpt.pt_price);
                // set_change(true)
            }} className={`border-2 border-solid px-3 py-3 rounded-full cursor-pointer inline-flex absolute bottom-6 right-6 ${(is_in_cart) ? `border-transparent bg-yellow-300` : `border-color-chocklet bg-transparent`}`}>

                {(is_in_cart) ?
                    <Image src='/check-icon.svg' alt='Remove_from_cart'
                        width={24} height={24} sizes='' className='text-red stroke-white'></Image>
                    :
                    <Image src='/plus-icon.svg' alt='add_to_cart'
                        width={24} height={24} sizes='' className='text-red'></Image>
                }
            </div>




     
        </>

    )
}

export default Add_to_cart