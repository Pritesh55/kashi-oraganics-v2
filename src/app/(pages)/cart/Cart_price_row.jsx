'use client'
import Form_field_qty from '@/app/components/client/product/atoms/forms/Form_field_qty'
import { wait } from '@/functions/urlFunctions';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react'

const Cart_price_row = ({ pt_price, cart, pt_id, cart_short_obj, user_id, revalidateAll }) => {
    const [qty_updating, set_qty_updating] = useState(false);
    const [cart_pt_removing, set_cart_pt_removing] = useState(false);
    const [cart_emptying, set_cart_emptying] = useState(false);

    const supabase = createClientComponentClient();

    const [pt_qty, set_pt_qty] = useState(cart_short_obj?.qty);
    const pt_qty_Handler = (pt_qty) => {
        set_pt_qty(pt_qty);
    }

    const [pt_total_price, set_pt_total_price] = useState(pt_qty * pt_price);

    useEffect(() => {
        set_pt_total_price(pt_qty * pt_price);

    }, [pt_qty])

    const update_qty_from_cart = async () => {

        console.log(`old cart `, cart);

        // if product is already exist ?? true or false ::
        var pt_exist = true;

        // JS some method :: check (all objects) of (cart) array::
        pt_exist = cart.some((obj_in_cart) => {
            // message :: print this object :: pt
            console.log(`checking pt = `, obj_in_cart)

            // if this object's (from old cart) product's id 
            // = input product's id (taken from proprs), 
            return obj_in_cart.pt_id == pt_id
            // then  return and breaK this loop :: Ans is true....
            // true:: product exist in old cart...
        });

        // console.log(`output = `, output);
        console.log(`pt_exist = `, pt_exist);

        if (pt_exist == true) {

            var removed_pt = {}

            // make new cart...
            var new_cart = [...cart];

            console.log(`intial new_cart = `, new_cart);

            const modifyProperty = async (target_pt_id, arr, qty, newProperty) => {
                const target_pt_Obj = arr.find(obj => obj.pt_id === target_pt_id);

                console.log('target_pt_Obj = ', target_pt_Obj)

                if (target_pt_Obj.qty !== newProperty) {
                    target_pt_Obj.qty = newProperty;

                    return true;
                    // Sucess :: true :: property is changed;
                }

                return false;
                // Sucess :: false :: property is not changed;
            };

            // cart array :: find object by pt_id, change object propery 'qty' to 'pt_qty'....
            var is_pt_qty_updated = await modifyProperty(pt_id, cart, 'qty', pt_qty);
            // [ { id: 1, name: 'John' }, { id: 3, name: 'Peter' } ]


            console.log(`Final new_cart = `, new_cart);

            // now :: search for :: user_id (came from parent) :: in the "profiles" table
            // then update column :: "cart" :: array 

            if (is_pt_qty_updated == true) {

                console.log("sucess :: true :: pt_qty is updated...");

                const { data: updateCart_data, error: updateCart_error } = await supabase
                    .from('profiles')
                    .update({ cart: new_cart })
                    .eq('user_id', user_id)
                    .select();

                if (updateCart_data !== null) {
                    console.log(`updateCart_data =`, updateCart_data)

                    // cart.push(new_pt);
                    revalidateAll();

                    console.log(`Thank you, Product ${pt_id} quantity ${pt_qty} is sucessfully updated to cart...`)
                    // await wait(1000);
                    // set_adding_to_cart(false);
                } else {

                    console.log(`updateCart_error =`, updateCart_error);

                    if (updateCart_error.message == "TypeError: Failed to fetch") {
                        // set_internet_error(true);
                        console.log("Please check your inetrnet connection");
                    }
                    await wait(1000);
                    // set_adding_to_cart(false);
                }


            } else {
                set_qty_updating(false);
                console.log("sucess :: false ::  pt_qty is not updated...")
            }

        }


    }

    useEffect(() => {
        set_qty_updating(false);
        console.log("useeffect run cart_price_row");
    }, [cart])

    return (
        <div>

            <div className="w-full flex justify-between flex-wrap">
                {/* price , qty, total price */}
                <div className="flex justify-between md:justify-start items-center gap-x-6 md:gap-x-16 gap-y-8 flex-wrap">
                    <div className="text-lg font-medium px-4 py-2 border-2 border-solid border-orange-400 rounded-md btn-tp break-all">
                        <span className="select-none" >
                            {`₹ `}
                        </span>
                        <span className="" >
                            {`${pt_price}`}
                        </span>

                    </div>

                    <Form_field_qty
                        state_var={pt_qty}
                        handler_name={pt_qty_Handler}
                        label_name={`Product stock`}
                        placeholder_name={`1`}
                    />

                    <div className="text-lg font-medium px-4 py-2 border-2 border-solid border-orange-400 rounded-md btn-tp break-all">
                        <span className="select-none" >
                            {`₹ `}
                        </span>
                        <span className="" >
                            {`${pt_total_price}`}
                        </span>

                    </div>

                    <button
                        onClick={() => {
                            set_qty_updating(true);
                            update_qty_from_cart();
                        }}
                        className=" bg-yellow-300 text-black  rounded-lg focus:outline-none justify-center items-center gap-2 text-base leading-5 py-2 px-4 font-medium tracking-wider md:hidden">
                        Update
                    </button>


                </div>

                <button
                    onClick={() => {
                        set_qty_updating(true);
                        update_qty_from_cart();

                        // step 03.01.01 :: submit button (At top)...
                        // set_update_profile_btn(true);
                        // So, useEffect will Rerun 
                        // to submit present State variable data...

                        // console.log("   Save and Update");
                        // console.log("Edit_pt_btn", edit_pt_btn);
                        // console.log("userChange", userChange);
                    }}
                    className=" bg-yellow-300 text-black  rounded-lg focus:outline-none justify-center items-center gap-2 text-base leading-5 py-2 px-4 font-medium tracking-wider hidden md:flex">
                    Update
                </button>

                {(qty_updating == true) && <>
                    <div className="bg-yellow-400 text-black fixed bottom-0 z-[9999] left-0 w-full flex justify-center p-0.5">
                        Loading...
                    </div>

                </>
                }
            </div>



        </div>
    )
}

export default Cart_price_row