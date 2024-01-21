// src\app\components\client\product\show_all_products.jsx
// step 0 :: 'use client'
'use client'

import React, { Children, useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// -------------------------------
// step 01.01 :: supabase in client component :: import axios ::
import axios from 'axios';
// -------------------------------
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Add_to_cart from '../../operational/delete_pt/Add_to_cart';
import { wait } from '@/functions/urlFunctions';
import useScrollPosition from './useScrollPosition';
import Product_without_atc_card from '../moles/cards/Product_without_atc_card';
import Goto_btn from '@/app/components/server/atoms/Goto_btn';

const Show_all_products = ({ revalidateAll, productsFS, is_admin = false, user_id, cart = [] }) => {

    useScrollPosition("Show_all_products")

    const router = useRouter();

    const pathname = usePathname();
    // console.log(`pathname  =`, pathname)

    const supabase = createClientComponentClient();

    // step 01.02 :: supabase in client component ::
    // :: Define useState Variable... ::
    const [isProducts, setIsProducts] = useState(true);
    const [products, setProducts] = useState(productsFS);

    const [add_to_cart_btn, set_add_to_cart_btn] = useState(false);

    const add_to_cart_btn_Handler = (add_to_cart_btn) => {
        set_add_to_cart_btn(add_to_cart_btn);
    }


    const [adding_to_cart, set_adding_to_cart] = useState(false);
    const [internet_error, set_internet_error] = useState(false);
    const [change, set_change] = useState(false);


    // step 01.03 :: supabase in client component :: 
    // :: initiate useEffect :: get data by axios.get


    useEffect(() => {
        if (internet_error == true) {
            wait(3000)
            set_internet_error(false)
        }

        const EditCart = async () => {
            // ------------------------------------------------------
            // console.log("\n\n");
            // console.log("EditProduct Started...");
            // -----------------------------------------------------




            // ------------------------------------------------------


            // console.log("EditProduct Ended...");
            // console.log("\n\n");
            // ------------------------------------------------------


        }

        if (true) {
            EditCart();
        }

    }, [internet_error])



    {/* atc 02 :: addtocart function... ::  */ }
    // take "input product id" as arguments......
    const addToCart = async (input_pt_id, input_pt_price) => {
        set_adding_to_cart(true);
        // const { addToCart_data, error: addToCart_error } = await supabase
        //     .from('profiles')
        //     .update({ 'cart': [] })
        //     .eq('user_id', user_id)
        //     .select()
        // console.log(`addToCart_data =`, addToCart_data)
        // console.log(`addToCart_error =`, addToCart_error)

        // message :: operation started...
        console.log(`add product ${input_pt_id} To Cart started...`)

        // old cart (array of objects) from Direct parent :: home or admin... 
        console.log(`old cart `, cart)

        // if product is already exist ?? true or false ::
        var pt_exist = true;

        // JS some method :: check (all objects) of (cart) array::
        pt_exist = cart.some((pt) => {
            // message :: print this object :: pt
            console.log(`checking pt = `, pt)

            // if this object's (from old cart) product's id 
            // = input product's id (taken as parameter onclick), 
            return pt.pt_id == input_pt_id
            // then  return and breaK this loop :: Ans is true....
            // true:: product exist in old cart...
        });

        // console.log(`output = `, output);
        console.log(`pt_exist = `, pt_exist);

        // if product don't already exist in old cart, Then will add....
        if (pt_exist == false) {

            // make new product object
            var new_pt = {
                pt_id: input_pt_id,
                qty: 1,
                unit_price: input_pt_price
            }

            var new_cart = [...cart];
            // push new product object in the old cart...
            new_cart.push(new_pt);

            // print "new product object" and "new cart array"...
            console.log(`new product object = `, new_pt)
            console.log(`new cart `, new_cart)

            // now :: search for :: user_id (came from parent) :: in the "profiles" table
            // then update column :: "cart" :: array 
            const { data: addToCart_data, error: addToCart_error } = await supabase
                .from('profiles')
                .update({ cart: new_cart })
                .eq('user_id', user_id)
                .select()

            if (addToCart_data !== null) {
                console.log(`addToCart_data =`, addToCart_data)

                cart.push(new_pt);
                revalidateAll();

                console.log(`Thank you, Product ${input_pt_id} is sucessfully added to cart...`)
                await wait(1000);
                set_adding_to_cart(false);
            } else {

                console.log(`addToCart_error =`, addToCart_error);

                if (addToCart_error.message == "TypeError: Failed to fetch") {
                    set_internet_error(true);
                    console.log("Please check your inetrnet connection");
                }
                await wait(1000);
                set_adding_to_cart(false);
            }
        }

        else {
            console.log(`Product ${input_pt_id} is alrady exist in array...`);
            console.log(`Thus, Product ${input_pt_id} is not added to cart...`);
            set_adding_to_cart(false);
        }

    }

    const empty_cart = async () => {
        set_adding_to_cart(true);
        // message :: operation started...
        console.log(`Empty Cart started...`)

        // old cart (array of objects) from Direct parent :: home or admin... 
        console.log(`old cart `, cart)

        // now :: search for :: user_id (came from parent) :: in the "profiles" table
        // then update column :: "cart" :: array 
        const { data: emptyCart_data, error: emptyCart_error } = await supabase
            .from('profiles')
            .update({ cart: [] })
            .eq('user_id', user_id)
            .select()

        console.log(`emptyCart_data =`, emptyCart_data)
        console.log(`emptyCart_error =`, emptyCart_error)

        if (emptyCart_data !== null) {
            console.log(`emptyCart_data =`, emptyCart_data)

            cart = [];
            revalidateAll();

            console.log(`Thank you, cart is empty now...`)
            await wait(1000);
            set_adding_to_cart(false);
        } else {

            console.log(`emptyCart_error =`, emptyCart_error);

            if (emptyCart_error.message == "TypeError: Failed to fetch") {
                set_internet_error(true);
                console.log("Please check your inetrnet connection");
            }
            await wait(1000);
            set_adding_to_cart(false);
        }


    }

    const remove_from_Cart = async (input_pt_id) => {
        set_adding_to_cart(true);
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
        pt_exist = cart.some((obj) => {
            // message :: print this object :: pt
            console.log(`checking pt = `, obj)

            // if this object's (from old cart) product's id 
            // = input product's id (taken as parameter onclick), 
            return obj.pt_id == input_pt_id
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
            console.log(`new cart `, new_cart)

            // now :: search for :: user_id (came from parent) :: in the "profiles" table
            // then update column :: "cart" :: array 
            const { data: addToCart_data, error: addToCart_error } = await supabase
                .from('profiles')
                .update({ cart: new_cart })
                .eq('user_id', user_id)
                .select()

            if (addToCart_data !== null) {
                console.log(`addToCart_data =`, addToCart_data)

                cart = [...new_cart]
                revalidateAll();

                console.log(`Thank you, Product ${input_pt_id} is sucessfully removed from cart...`)
                await wait(1000);
                set_adding_to_cart(false);
            } else {

                console.log(`addToCart_error =`, addToCart_error);

                if (addToCart_error.message == "TypeError: Failed to fetch") {
                    set_internet_error(true);
                    console.log("Please check your inetrnet connection");
                }
                await wait(1000);
                set_adding_to_cart(false);
            }
        }

        else {
            console.log(`Product ${input_pt_id} is not exist in array...`);
            console.log(`Thus, Product ${input_pt_id} is already removed to cart...`);
            set_adding_to_cart(false);
        }

    }


    // Delete product :: step 01.02 :: create onclick async function 
    // :: take "id of currunt product" as arguments...


    // step 01.05 :: supabase in client component ::
    // Console.log :: useState variables ::
    // console.log(`isProducts= `, isProducts);
    // console.log(`products= `, products);
    // console.log(`is_admin=`, is_admin)

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

            {(internet_error == true) && <>
                <div className="bg-red-700 text-white fixed z-[9999] bottom-0 left-0 w-full flex justify-center p-0.5">
                    Please Check your internet connection
                </div>
            </>}



            <div className="flex flex-col gap-y-3">
                <div className="flex justify-between flex-wrap gap-3">

                    <button onClick={() => { empty_cart(); }} className="bg-gray-50 px-4 md:px-12 py-2 rounded-lg  text-lg md:text-xl border-2 border-gray-300">Empty cart</button>

                    <div className="text-black rounded-lg lg:flex justify-center flex-wrap gap-x-6 hidden">

                        {/* <div className=""> */}
                        <Link href={'/'} scroll={false} className='bg-yellow-300 px-12 py-2 rounded-lg text-lg md:text-xl '> {`${total_item} items`} </Link>
                        <Link href={'/'} scroll={false} className='bg-yellow-300 px-12 py-2 rounded-lg text-lg md:text-xl'> {`${total_amount} ₹`} </Link>

                        {/* </div> */}

                    </div>

                    <Link href={'/'} scroll={false} className='bg-yellow-300 px-4 md:px-12 py-2 rounded-lg  text-lg md:text-xl'> Go to cart </Link>
                </div>

                <div className="flex justify-between flex-wrap gap-x-3 md:gap-x-6 gap-y-3 rounded-lg items-start lg:hidden">
                    {/* <div className=""> */}
                    <Link href={'/'} scroll={false} className='bg-yellow-300  px-6 md:px-12 py-2 rounded-lg  text-lg md:text-xl break-all'> {`${total_item} items`} </Link>
                    <Link href={'/'} scroll={false} className='bg-yellow-300  px-6 md:px-12 py-2 rounded-lg  text-lg md:text-xl break-all'> {`${total_amount} ₹`} </Link>

                    {/* </div> */}
                </div>
            </div>


            <div className="flex flex-wrap gap-x-4 gap-y-6 justify-evenly items-start">

                <div className="absolute top-0 -z-50">
                    <div className="text-transparent w-full max-w-full break-all -z-50"> {`------------------- `}</div>
                </div>

                {

                    (isProducts && products?.length > 0) &&
                    <>

                        {products?.map((curpt) => {
                            // console.log(`rerender map ${curpt.id}`)
                            return (
                                // Do not use this <> </> Fragments inside return of .map method...
                                // Otherwise :: "Each child in a list should have a unique "key" prop" ::warning will appear on console.log() of browser...

                                <div className="w-full md:w-[48%] lg:w-auto lg:min-w-[360px] lg:max-w-[60%] rounded-lg 
                                gap-y-4 relative shadow-kashi flex flex-col" key={curpt.id}>


                                    <Product_without_atc_card is_admin={is_admin} curpt={curpt}></Product_without_atc_card>

                                    <Add_to_cart
                                        curpt={curpt} cart={cart}
                                        is_admin={is_admin}
                                        addToCart={addToCart}
                                        empty_cart={empty_cart}
                                        remove_from_Cart={remove_from_Cart}
                                    // add_to_cart_btn_Handler={add_to_cart_btn_Handler}
                                    >
                                    </Add_to_cart>
                                    <div className="absolute bottom-0 -z-50">
                                        <div className="text-transparent w-full max-w-full break-all -z-50"> {`------------------- `}</div>
                                    </div>

                                </div>

                            )
                        }
                        )}

                    </>

                }



                <div className="absolute bottom-0 -z-50">
                    <div className="text-transparent w-full max-w-full break-all -z-50"> {`------------------- `}</div>
                </div>

                <Link href="/cart" scroll={false} className="bg-yellow-300 rounded-full px-5 py-5  flex justify-center items-center fixed bottom-3 right-1 z-[9999]">
                    <Image src='/cart-icon.svg' alt='Go to cart' width={24} height={24} className=''></Image>
                </Link>

                <div className="absolute bottom-0 -z-50">
                    <div className="text-transparent w-full max-w-full break-all -z-50"> {`------------------- `}</div>
                </div>



            </div >

            {(adding_to_cart == true) && <>
                <div className="bg-yellow-400 text-black fixed bottom-0 z-[9999] left-0 w-full flex justify-center p-0.5">
                    Loading...
                </div>

            </>
            }


        </>

    )



}

export default Show_all_products