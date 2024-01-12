// src\app\components\client\product\show_all_products.jsx
// step 0 :: 'use client'
'use client'

import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
// -------------------------------
// step 01.01 :: supabase in client component :: import axios ::
import axios from 'axios';
// -------------------------------
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

const Show_all_products = ({ revalidateAll, productsFS, is_admin = false }) => {

    const router = useRouter();

    const pathname = usePathname();
    // console.log(`pathname  =`, pathname)

    const supabase = createClientComponentClient();

    // step 01.02 :: supabase in client component ::
    // :: Define useState Variable... ::
    const [isProducts, setIsProducts] = useState(true);
    const [products, setProducts] = useState(productsFS);
    const [newproducts, setNewProducts] = useState([]);


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


    function wait(s) {
        var start = new Date().getTime();
        var end = start;
        while (end < start + (s * 1000)) {
            end = new Date().getTime();
        }
    }


    // step 01.03 :: supabase in client component :: 
    // :: initiate useEffect :: get data by axios.get
 


    // step 13.01 :: create handleSignIn :: async :: Function
    const updateProduct = async (id) => {
        // ----------------------------------------------------
        // console.log("\n\n");
        // console.log("updateProduct Started...\n\n");
        // ----------------------------------------------------
        // -------------------------
        // Revelidate data
        const data = await revalidateAll();
        // setIsProducts(true);
        // setProducts(data);
        // setPtUpdated(true);
        // -------------------------
        // ------------------------------------------------------
        // console.log("updateProduct Ended...");
        // console.log("\n\n");
        // ----------------------------------------------------
    }

    // Delete product :: step 01.02 :: create onclick async function 
    // :: take "id of currunt product" as arguments...
  

    // step 01.05 :: supabase in client component ::
    // Console.log :: useState variables ::
    // console.log(`isProducts= `, isProducts);
    // console.log(`products= `, products);
    // console.log(`is_admin=`, is_admin)

    return (

        <>

            <div className="flex flex-wrap gap-x-4 gap-y-6 justify-evenly items-start">
                {

                    (isProducts && products?.length > 0) &&
                    <>


                        {products?.map((curpt) => {
                            return (
                                // Do not use this <> </> Fragments inside return of .map method...
                                // Otherwise :: "Each child in a list should have a unique "key" prop" ::warning will appear on console.log() of browser...

                                <div key={curpt.id}
                                    className="w-full md:w-[48%] lg:w-auto lg:min-w-[360px] lg:max-w-[60%] border-2 border-solid border-orange-400 rounded-lg gap-y-4 relative">

                                    {
                                        (is_admin == true) && <>
                                            <Link href={`/admin/edit_pt/${curpt.id}/`}
                                                // className="btn-tp absolute top-0 left-0 px-6 py-2 border-r-2 border-b-2 border-r-orange-400 border-b-orange-400 rounded-br-lg rounded-tl-lg text-base font-medium text-purple-800 z-50 bg-white"
                                                className=" absolute top-0 left-0 px-6 py-2 rounded-br-lg rounded-tl-lg text-base font-medium text-black z-50 bg-white hover:bg-yellow-300 
                                                 border-r-2 border-b-2 border-r-orange-400 border-b-orange-400"
                                            >
                                                {/* <Image src='/trash.svg' alt='' width={20} height={20} className=''></Image> */}

                                                {`Edit`}
                                            </Link>
                                            <Link href={`/admin/delete_pt/${curpt.id}/`}
                                                // className="btn-tp absolute top-0 left-0 px-6 py-2 border-r-2 border-b-2 border-r-orange-400 border-b-orange-400 rounded-br-lg rounded-tl-lg text-base font-medium text-purple-800 z-50 bg-white"
                                                className="absolute top-0 right-0 z-50 px-3 py-2 border-l-2 border-b-2 border-l-orange-400 border-b-orange-400 rounded-bl-lg rounded-tr-lg bg-white hover:bg-yellow-300"
                                            >
                                                {/* <Image src='/trash.svg' alt='' width={20} height={20} className=''></Image> */}

                                               <Image src='/trash-icon.svg' alt='' width={20} height={20} className=''></Image>
                                            </Link>

                                 

                                        </>

                                    }


                                    <a className="flex justify-center items-center relative h-56 rounded-lg overflow-hidden">

                                        {/* Image  */}
                                        <Image
                                            // -----------------------
                                            src={(curpt.pt_photo_thumbnail) ? `${curpt.pt_photo_thumbnail}` : `https://www.sose.in/assets/store%20locator%20main%20banner-h9yO4WZa.jpg`}

                                            // -----------------------
                                            alt="ecommerce"
                                            width={400}
                                            height={650}
                                            priority={false}
                                            className="object-cover object-center w-full h-full block sm:max-w-[360px]"
                                        />

                                    </a>

                                    {/* <hr className="border-b-2 border-solid border-orange-400 my-6" /> */}

                                    <div className="flex flex-col gap-y-4 items-start leading-normal text-black capitalize px-6 py-6">


                                        {(curpt.pt_category || curpt.pt_brand) &&
                                            <>
                                                <div className="flex justify-between items-center w-full flex-wrap gap-x-6 gap-y-5">

                                                    {(curpt.pt_category) &&
                                                        <>
                                                            <h3 className="text-base px-2 py-1 border-2 border-solid border-orange-400 rounded-md btn-tp break-all"
                                                            >
                                                                {curpt.pt_category}
                                                            </h3>
                                                        </>
                                                    }
                                                    {(curpt.pt_brand) &&
                                                        <>
                                                            <h3 className="text-base px-2 py-1 border-2 border-solid border-orange-400 rounded-md btn-tp break-all">
                                                                {curpt.pt_brand}
                                                            </h3>
                                                        </>
                                                    }
                                                </div>
                                            </>
                                        }

                                        {(curpt.pt_title) &&
                                            <>
                                                <h2 className="text-xl break-all">
                                                    {curpt.pt_title}
                                                </h2>
                                            </>
                                        }

                                        {(curpt.pt_description) &&
                                            <>
                                                <p className="max-h-20 sm:w-[340px] overflow-hidden break-all">
                                                    {curpt.pt_description}
                                                </p>
                                            </>
                                        }

                                        <div className="w-full flex justify-between items-center gap-x-8 gap-y-8 flex-wrap">

                                            <div className="text-lg font-medium px-4 py-2 border-2 border-solid border-orange-400 rounded-md btn-tp break-all">
                                                <span className="" >
                                                    {`₹ ${curpt.pt_price}`}
                                                </span>

                                            </div>


                                            <div className="border-2 border-solid border-orange-300 px-3 py-3 rounded-full relative bg-yellow-300 cursor-pointer">
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
        </>

    )
}

export default Show_all_products