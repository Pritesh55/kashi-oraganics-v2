// step 0 :: 'use client'
'use client'

import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// -------------------------------
// step 01.01 :: supabase in client component :: import axios ::
import axios from 'axios';
// -------------------------------
import Cre_pt from '@/app/components/client/product/cre_pt';
import Image from 'next/image';
import Vertical_Card from './atoms/Vertical_Card';



const Show_all_products = () => {

    const supabase = createClientComponentClient();

    // step 01.02 :: supabase in client component ::
    // :: Define useState Variable... ::
    const [isProducts, setIsProducts] = useState(false);
    const [products, setProducts] = useState([]);


    // -------------------------------------------------
    const [id, setId] = useState();
    const [pt_title, setPt_title] = useState();
    const [pt_description, setPt_description] = useState();
    const [pt_price, setPt_price] = useState();
    const [pt_category, setPt_category] = useState();
    const [pt_brand, setPt_brand] = useState();
    const [pt_images, setPt_images] = useState();

    // ------------------------------------
    const [ptUpdated, setPtUpdated] = useState(false);

    // step 01.03 :: supabase in client component :: 
    // :: initiate useEffect :: get data by axios.get
    useEffect(() => {

        // Define async function :: to fetch data ::
        const getProducts = async () => {

            // Axios GET Default
            await axios
                .get(`/api/pt`)
                .then((response) => {
                    // step 01.04 :: supabase in client component ::
                    // set :: useState variables ::
                    setIsProducts(true);
                    setProducts(response.data.products);
                    setPtUpdated(false);
                });
            // -------------------------------
        }

        // Step 11.08 :: call async function ::
        getProducts();

    }, [ptUpdated]);



    // step 13.01 :: create handleSignIn :: async :: Function
    const updateProduct = async (id) => {
        // ----------------------------------------------------
        console.log("\n\n");
        console.log("updateProduct Started...\n\n");
        // ----------------------------------------------------

        // ------------------------------------------------------
        console.log("updateProduct Ended...");
        console.log("\n\n");
        // ----------------------------------------------------
    }

    // step 13.01 :: create handleSignIn :: async :: Function
    const deleteProduct = async (id) => {
        // ----------------------------------------------------
        console.log("\n\n");
        console.log("deleteProduct Started...\n\n");
        // ----------------------------------------------------
        console.log(`id = `, id);


        const { error: deletePtError } = await supabase
            .from('products')
            .delete()
            .eq('id', id);


        console.log(`deletePtError = `, deletePtError);

        if (deletePtError == null) {
            setPtUpdated(true);
        }

        // ------------------------------------------------------
        console.log("deleteProduct Ended...");
        console.log("\n\n");
        // ----------------------------------------------------
    }

    // step 01.05 :: supabase in client component ::
    // Console.log :: useState variables ::
    console.log(`isProducts= `, isProducts);
    console.log(`products= `, products);

    return (
        <div className="flex flex-wrap gap-x-4 gap-y-10 justify-evenly items-start">
            {

                (isProducts && products[0]) &&
                <>


                    {products?.map((curpt) => {
                        return (
                            // Do not use this <> </> Fragments inside return of .map method...
                            // Otherwise :: "Each child in a list should have a unique "key" prop" ::warning will appear on console.log() of browser...

                            <div key={curpt.id}
                                className="w-full sm:w-[360px]  border-2 border-solid border-orange-400 rounded-lg gap-y-4 relative">

                                <button onClick={() => {
                                    updateProduct(curpt.id);
                                }} className="btn-tp absolute top-0 left-0 px-6 py-2 border-r-2 border-b-2 border-r-orange-400 border-b-orange-400 rounded-br-lg rounded-tl-lg text-base font-medium text-purple-800 z-50 bg-white">
                                    {/* <Image src='/trash.svg' alt='' width={20} height={20} className=''></Image> */}

                                    {`Edit`}
                                </button>

                                <button onClick={() => {
                                    deleteProduct(curpt.id);
                                }} className="btn-tp absolute top-0 right-0 z-50 px-3 py-2 border-l-2 border-b-2 border-l-orange-400 border-b-orange-400 rounded-bl-lg rounded-tr-lg bg-white">
                                    <Image src='/trash-icon.svg' alt='' width={20} height={20} className=''></Image>
                                </button>

                                <a className="flex justify-center items-center relative h-56 rounded-lg overflow-hidden">

                                    {/* Image  */}
                                    <Image
                                        // -----------------------
                                        src={(curpt.pt_photo_thumbnail) ? `${curpt.pt_photo_thumbnail}` : `https://scontent.famd1-2.fna.fbcdn.net/v/t39.30808-6/416842063_679619837687731_2693038348619092119_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=L56bV-0G58AAX-QdVLB&_nc_ht=scontent.famd1-2.fna&oh=00_AfCq4-8D4bwWTgasZYan-urc8-v0JIC1OKitMzzwlEpxtw&oe=659B81CD`}

                                        // -----------------------
                                        alt="ecommerce"
                                        width={400}
                                        height={650}
                                        priority={false}
                                        className="object-cover object-center w-full h-full block max-w-[360px]"
                                    />

                                </a>

                                {/* <hr className="border-b-2 border-solid border-orange-400 my-6" /> */}

                                <div className="flex flex-col gap-y-4 items-start leading-normal text-black capitalize px-6 py-6">


                                    {(curpt.pt_category && curpt.pt_brand) &&
                                        <>
                                            <div className="flex justify-between items-center w-full flex-wrap gap-x-6 gap-y-10">

                                                {(curpt.pt_category) &&
                                                    <>
                                                        <h3 className="text-base px-2 py-1 border-2 border-solid border-orange-400 rounded-md btn-tp"
                                                        >
                                                            {curpt.pt_category}
                                                        </h3>
                                                    </>
                                                }
                                                {(curpt.pt_brand) &&
                                                    <>
                                                        <h3 className="text-base px-2 py-1 border-2 border-solid border-orange-400 rounded-md btn-tp">
                                                            {curpt.pt_brand}
                                                        </h3>
                                                    </>
                                                }
                                            </div>
                                        </>
                                    }

                                    {(curpt.pt_title) &&
                                        <>
                                            <h2 className="text-xl ">
                                                {curpt.pt_title}
                                            </h2>
                                        </>
                                    }

                                    {(curpt.pt_description) &&
                                        <>
                                            <p className="h-20 overflow-hidden">
                                                {curpt.pt_description}
                                            </p>
                                        </>
                                    }

                                    <div className="w-full flex justify-between items-center gap-x-8  ">

                                        <div className="">
                                            <span className="text-lg font-medium px-4 py-2 border-2 border-solid border-orange-400 rounded-md btn-tp" >
                                                ₹ {curpt.pt_price}
                                            </span>
                                        </div>


                                        <div className="border-2 border-solid border-orange-300 p-4 rounded-full relative bg-yellow-300 cursor-pointer">
                                            <Image src='/plus-icon.svg' alt='add-to-cart'
                                                width={24} height={24} sizes=''></Image>
                                        </div>

                                    </div>



                                </div>
                            </div>

                        )
                    }
                    )}



                </>

            }

        </div>
    )
}

export default Show_all_products