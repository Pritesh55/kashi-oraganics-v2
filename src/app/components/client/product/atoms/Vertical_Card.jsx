'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Vertical_Card = ({ curpt }) => {

    const router = useRouter();

    const supabase = createClientComponentClient();

    // -----------------------------------------
    // step 11.15 :: For sign up ::
    const [id, setId] = useState(curpt.id);
    const [pt_title, setPt_title] = useState(curpt.pt_title);
    const [pt_description, setPt_description] = useState(curpt.pt_description);
    const [pt_price, setPt_price] = useState(curpt.pt_price);
    const [pt_category, setPt_category] = useState(curpt.pt_category);
    const [pt_brand, setPt_brand] = useState(curpt.pt_brand);
    const [pt_images, setPt_images] = useState(curpt.pt_images);
    const [pt_photo_thumbnail, setPt_photo_thumbnail] = useState(curpt.pt_photo_thumbnail);


    // step 13.01 :: create handleSignIn :: async :: Function
    const updateProduct = async (id) => {
        // ----------------------------------------------------
        // console.log("\n\n");
        // console.log("updateProduct Started...\n\n");
        // ----------------------------------------------------

        // ------------------------------------------------------
        // console.log("updateProduct Ended...");
        // console.log("\n\n");
        // ----------------------------------------------------
    }

    // step 13.01 :: create handleSignIn :: async :: Function
    const deleteProduct = async (id) => {
        // ----------------------------------------------------
        // console.log("\n\n");
        // console.log("deleteProduct Started...\n\n");
        // ----------------------------------------------------
        // console.log(`id = `, id);


        const { error: deletePtError } = await supabase
            .from('products')
            .delete()
            .eq('id', id);


        // console.log(`deletePtError = `, deletePtError);

        if (deletePtError == null) {
            router.refresh();
        }

        // ------------------------------------------------------
        // console.log("deleteProduct Ended...");
        // console.log("\n\n");
        // ----------------------------------------------------
    }

    return (
        <div key={curpt.id} className="w-full sm:w-auto sm:min-w-[360px] sm:max-w-[60%] border-2 border-solid border-orange-400 rounded-lg gap-y-4 relative">

            <button onClick={() => {
                updateProduct(id);
            }} className="btn-tp absolute top-0 left-0 px-6 py-2 border-r-2 border-b-2 border-r-orange-400 border-b-orange-400 rounded-br-lg rounded-tl-lg text-base font-medium text-purple-800 z-50 bg-white">
                {/* <Image src='/trash.svg' alt='' width={20} height={20} className=''></Image> */}

                {`Edit`}
            </button>

            <button onClick={() => {
                deleteProduct(id);
            }} className="btn-tp absolute top-0 right-0 z-50 px-3 py-2 border-l-2 border-b-2 border-l-orange-400 border-b-orange-400 rounded-bl-lg rounded-tr-lg bg-white">
                <Image src='/trash-icon.svg' alt='' width={20} height={20} className=''></Image>
            </button>

            <a className="flex justify-center items-center relative h-56 rounded-lg overflow-hidden">

                {/* Image  */}
                <Image
                    // -----------------------
                    src={(curpt.pt_photo_thumbnail) ? `${pt_photo_thumbnail}` : `https://scontent.famd1-2.fna.fbcdn.net/v/t39.30808-6/416842063_679619837687731_2693038348619092119_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=L56bV-0G58AAX-QdVLB&_nc_ht=scontent.famd1-2.fna&oh=00_AfCq4-8D4bwWTgasZYan-urc8-v0JIC1OKitMzzwlEpxtw&oe=659B81CD`}

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
                        <div className="flex justify-between items-center w-full flex-wrap gap-x-6 gap-y-5">

                            {(curpt.pt_category) &&
                                <>
                                    <h3 className="text-base px-2 py-1 border-2 border-solid border-orange-400 rounded-md btn-tp"
                                    >
                                        {pt_category}
                                    </h3>
                                </>
                            }
                            {(curpt.pt_brand) &&
                                <>
                                    <h3 className="text-base px-2 py-1 border-2 border-solid border-orange-400 rounded-md btn-tp">
                                        {pt_brand}
                                    </h3>
                                </>
                            }
                        </div>
                    </>
                }

                {(curpt.pt_title) &&
                    <>
                        <h2 className="text-xl ">
                            {pt_title}
                        </h2>
                    </>
                }

                {(curpt.pt_description) &&
                    <>
                        <p className="max-h-20 w-[340px] overflow-hidden">
                            {pt_description}
                        </p>
                    </>
                }

                <div className="w-full flex justify-between items-center gap-x-8  ">

                    <div className="">
                        <span className="text-lg font-medium px-4 py-2 border-2 border-solid border-orange-400 rounded-md btn-tp" >
                            ₹ {pt_price}
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

export default Vertical_Card