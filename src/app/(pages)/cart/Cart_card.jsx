'use client'

import Form_field_qty from '@/app/components/client/product/atoms/forms/Form_field_qty'
import Goto_btn from '@/app/components/server/atoms/Goto_btn'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Cart_price_row from './Cart_price_row'
import Cart_pt_info from './Cart_pt_info'
import { wait } from '@/functions/urlFunctions'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const Cart_card = ({ cart, products, user_id, revalidateAll }) => {

    const supabase = createClientComponentClient();

    const [cart_state, setCart_state] = useState(cart);
    const [qty_updating, set_qty_updating] = useState(false);
    const [cart_pt_removing, set_cart_pt_removing] = useState(false);
    const [cart_emptying, set_cart_emptying] = useState(false);

    // console.log(`cart =`, cart)

    var is_admin = true;

    const router = useRouter();
    // router.back();



    const remove_from_Cart = async (input_pt_id) => {
        // set_adding_to_cart(true);

        // const { addToCart_data, error: addToCart_error } = await supabase
        //     .from('profiles')
        //     .update({ 'cart': [] })
        //     .eq('user_id', user_id)
        //     .select()
        // console.log(`addToCart_data =`, addToCart_data)
        // console.log(`addToCart_error =`, addToCart_error)

        // message :: operation started...
        console.log(`\n\n Remove product ${input_pt_id} from Cart started...`)

        // old cart (array of objects) from Direct parent :: home or admin... 
        console.log(`old cart `, cart)

        // if product is already exist ?? true or false ::
        var pt_exist = true;

        // JS some method :: check (all objects) of (cart) array::
        pt_exist = cart.some((obj_in_cart) => {
            // message :: print this object :: pt
            console.log(`checking pt = `, obj_in_cart)

            // if this object's (from old cart) product's id 
            // = input product's id (taken as parameter onclick), 
            return obj_in_cart.pt_id == input_pt_id
            // then  return and breaK this loop :: Ans is true....
            // true:: product exist in old cart...
        });

        // console.log(`output = `, output);
        console.log(`pt_exist = `, pt_exist);

        // if product don't already exist in old cart, Then will add....
        if (pt_exist == true) {

            // make new product object
            var removed_pt = {}

            var new_cart = [...cart];
            // push new product object in the old cart...

            console.log(`intial new_cart = `, new_cart);

            function removeObjectWithId(arr, id) {

                const objWithIdIndex = arr.findIndex((obj) => obj.pt_id === input_pt_id);
                // The Array findIndex() method returns the index of the first element in an array that passes a test specified by a callback function.

                console.log(`objWithIdIndex after findIndex method =`, arr[objWithIdIndex])
                // Then call the splice() method on the array, passing this index and 1 as arguments to remove the object from the array. 

                arr.splice(objWithIdIndex, 1);
                console.log(`after splice method = `, arr);
                return arr;
            }

            removeObjectWithId(new_cart, 2);
            // [ { id: 1, name: 'John' }, { id: 3, name: 'Peter' } ]
            console.log(`Final new_cart = `, new_cart);

            // new_cart.push(new_pt);

            // print "new product object" and "new cart array"...
            // console.log(`removed product object = `, new_pt)
            // console.log(`new cart `, new_cart_update)

            // now :: search for :: user_id (came from parent) :: in the "profiles" table
            // then update column :: "cart" :: array 
            const { data: updateCart_data, error: updateCart_error } = await supabase
                .from('profiles')
                .update({ cart: new_cart })
                .eq('user_id', user_id)
                .select();

            if (updateCart_data !== null) {
                console.log(`updateCart_data =`, updateCart_data)

                // cart.push(new_pt);
                revalidateAll();

                console.log(`Thank you, Product ${input_pt_id} is sucessfully removed from cart...`)
                await wait(1000);

            } else {

                console.log(`updateCart_error =`, updateCart_error);

                if (updateCart_error.message == "TypeError: Failed to fetch") {
                    // set_internet_error(true);
                    console.log("Please check your inetrnet connection");
                }
                await wait(1000);
                set_cart_pt_removing(false);
            }
        }

        else {
            console.log(`Product ${input_pt_id} is not exist in array...`);
            console.log(`Thus, Product ${input_pt_id} is already removed to cart...`);
            set_cart_pt_removing(false);
        }


    }

    useEffect(() => {
        // set_pt_total_price(`${curpt.pt_price * pt_qty}`);
        setCart_state(cart);
        set_cart_pt_removing(false);
    }, [cart])

    // console.log(`products =`, products)

    return (

        <div className="">

            {

                (cart?.length > 0) &&
                <>

                    {cart?.map((cart_short_obj) => {

                        var objWithIdIndex;
                        var cart_pt_obj;

                        objWithIdIndex = products.findIndex((obj) => obj.id === cart_short_obj.pt_id);


                        cart_pt_obj = products[objWithIdIndex];
                        // console.log(`cart_pt_obj[${objWithIdIndex}]`, products[objWithIdIndex])


                        // console.log(`rerender map ${curpt.id}`)
                        return (
                            // Do not use this <> </> Fragments inside return of .map method...
                            // Otherwise :: "Each child in a list should have a unique "key" prop" ::warning will appear on console.log() of browser...

                            <div key={cart_short_obj.pt_id} className="p-6 flex flex-col gap-y-6 shadow-kashi relative">

                                <div className="flex justify-between items-stretch gap-x-6 gap-y-3 flex-wrap h-full">

                                    <Cart_pt_info pt_id={cart_short_obj.pt_id} curpt={cart_pt_obj}></Cart_pt_info>

                                    <div className="flex flex-col justify-center gap-y-3 h-full">
                                        <button onClick={() => {
                                            set_cart_pt_removing(true);
                                            remove_from_Cart(cart_short_obj.pt_id);
                                        }} className="absolute top-0 right-0 z-50 px-6 py-3 hover:px-12 transition-all bg-gray-50 hover:bg-gray-100 rounded-lg  text-base md:text-xl border-2 border-gray-100 leading-none"
                                        >
                                            <Image src='/trash-icon.svg' alt='' width={18} height={18} className=''></Image>
                                        </button>

                                    </div>
                                </div>

                                <Cart_price_row pt_id={cart_short_obj.pt_id}
                                    cart_short_obj={cart_short_obj}
                                    pt_price={cart_pt_obj?.pt_price}
                                    cart={cart}
                                    user_id={user_id}
                                    revalidateAll={revalidateAll}
                                ></Cart_price_row>

                            </div>

                        )
                    }
                    )}

                </>

            }

            {(qty_updating || cart_pt_removing || cart_emptying) && <>
                <div className="bg-yellow-400 text-black fixed bottom-0 z-[9999] left-0 w-full flex justify-center p-0.5">
                    Loading...
                </div>

            </>
            }

        </div>

    )
}

export default Cart_card