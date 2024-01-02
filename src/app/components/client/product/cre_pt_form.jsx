'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Cre_pt_form = () => {

    const router = useRouter();


    const [pt_title, setPt_title] = useState('');
    const [pt_description, setPt_description] = useState('');
    const [pt_category, setPt_category] = useState('');
    const [pt_photo_thumbnail, setPt_photo_thumbnail] = useState('');

    const [pt_images, setPt_images] = useState('');
    const [pt_brand, setPt_brand] = useState('');

    const [pt_price, setPt_price] = useState('');
    const [pt_discount_percent, setPt_discount_percent] = useState('');
    const [pt_rating, setPt_rating] = useState('');
    const [pt_stock, setPt_stock] = useState('');

    const [cre_pt_btn, setCre_pt_btn] = useState(false);
    const [userChange, setUserChange] = useState(false);


    const [isNewProductCreated, setIsNewProductCreated] = useState(false);
    const [isptCreatedMessage, setIsptCreatedMessage] = useState('');

    useEffect(() => {

        const createProduct = async () => {
            // ------------------------------------------------------
            console.log("\n\n");
            console.log("CreateProduct Started...");
            // ------------------------------------------------------

            await axios.post('/api/create-pt', {

                pt_title,
                pt_description,
                pt_category,
                pt_brand,
                pt_images,
                pt_photo_thumbnail,

                pt_price,
                pt_discount_percent,
                pt_rating,
                pt_stock
            }, { headers: { "Content-Type": "application/json" } }
            ).then(function (response) {
                // -------------------------
                console.log(`create Product Response`, response.data);

                if (response.data.success == true) {
                    setIsNewProductCreated(true);
                    setIsptCreatedMessage(' Thank you, You created a New Product...');

                    function wait(ms) {
                        var start = new Date().getTime();
                        var end = start;
                        while (end < start + ms) {
                            end = new Date().getTime();
                        }
                    }

                    wait(5000);
                    setIsNewProductCreated(false);
              

                } else {
                    setIsNewProductCreated(true);
                    setIsptCreatedMessage('Oh, There is an Error..., Product is not created..');

                    function wait(ms) {
                        var start = new Date().getTime();
                        var end = start;
                        while (end < start + ms) {
                            end = new Date().getTime();
                        }
                    }

                    wait(5000);
                    setIsNewProductCreated(false);
                  

                }
                // -------------------------
            }).catch(function (error) {
                console.log(`create Product response Error`, error);
            });

            // ------------------------------------------------------
            console.log("CreateProduct Ended...");
            console.log("\n\n");
            // ------------------------------------------------------
            setCre_pt_btn(false);
            setUserChange(false);
        }

        if (cre_pt_btn) {
            createProduct();
        }

    }, [userChange])

    return (
        <>


            {
                (isNewProductCreated) && <>
                    <h2 className="px-4 py-2 border-2 border-solid border-orange-400 fixed z-50 bg-white text-black top-5 right-8 rounded-lg text-lg shadow-xl">
                        {isptCreatedMessage}
                    </h2>
                </>

            }



            {/* Sign-up or Sign-in Box */}
            <div className=" bg-white rounded-lg p-8 flex flex-col w-full gap-8 min-h-[384px] border-2 border-solid border-orange-400 relative">

                <h2 className="text-gray-900 xl:text-3xl text-2xl font-medium titCreate">
                    Create product
                </h2>

                {/* step 15.02 :: Profile Update ::  */}
                <div className="flex gap-y-4 lg:gap-y-12 flex-wrap">
                    <div className="flex gap-y-8 gap-x-12 flex-wrap items-start px-5 lg:px-12  justify-start lg:justify-start py-8 border-2 border-solid border-orange-400">

                        {/* 1 pt_title :: */}
                        <div className="flex flex-col gap-2">
                            {/* Label :: htmlFor */}
                            <label htmlFor="pt_title" className="label-s1 text-black">
                                Product name
                            </label>

                            {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                            <input type="text" id="pt_title" name="pt_title" placeholder='Product name'
                                // ------------------------------------
                                value={pt_title}

                                onChange={(e) => setPt_title(e.target.value)}
                                // ------------------------------------
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7  " />
                        </div>

                        {/* 2 Category Name */}
                        <div className="flex flex-col gap-2">
                            {/* Label :: htmlFor */}
                            <label htmlFor="pt_category" className="label-s1">
                                Category Name
                            </label>

                            {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                            <input type="email" id="pt_category" name="pt_category" placeholder='Category Name'
                                // ------------------------------------
                                value={pt_category}

                                onChange={(e) => setPt_category(e.target.value)}
                                // ------------------------------------
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7  " />
                        </div>

                        {/* 3 Brand Name */}
                        <div className="flex flex-col gap-2">
                            {/* Label :: htmlFor */}
                            <label htmlFor="pt_brand" className="label-s1">
                                Brand Name
                            </label>

                            {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                            <input type="text" id="pt_brand" name="pt_brand"
                                placeholder='Brand Name'
                                // ------------------------------------
                                value={pt_brand}

                                onChange={(e) => setPt_brand(e.target.value)}
                                // ------------------------------------
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7  "
                            />
                        </div>

                        {/* 4 Product Image */}
                        <div className="flex flex-col gap-2">
                            {/* Label :: htmlFor */}
                            <label htmlFor="pt_photo_thumbnail" className="label-s1">
                                Product Image
                            </label>

                            {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                            <input type="text" id="pt_photo_thumbnail" name="pt_photo_thumbnail" placeholder='img_url'
                                // ------------------------------------
                                value={pt_photo_thumbnail}

                                onChange={(e) => setPt_photo_thumbnail(e.target.value)}
                                // ------------------------------------
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7  "
                            />
                        </div>

                        {/* 6 Product Price */}
                        <div className="flex flex-col gap-2">
                            {/* Label :: htmlFor */}
                            <label htmlFor="pt_price" className="label-s1">
                                Product Price
                            </label>

                            {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                            <input type="text" id="pt_price" name="pt_price" placeholder='Product Price'
                                // ------------------------------------
                                value={pt_price}

                                onChange={(e) => {
                                    setPt_price(e.target.value);
                                }}

                                // ------------------------------------
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7  " />
                        </div>

                        {/* 7 Discount Percent */}
                        <div className="flex flex-col gap-2">
                            {/* Label :: htmlFor */}
                            <label htmlFor="pt_discount_percent" className="label-s1">
                                Discount Percent
                            </label>

                            {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                            <input type="text" id="pt_discount_percent" name="pt_discount_percent" placeholder='Discount Percent'
                                // ------------------------------------
                                value={pt_discount_percent}

                                onChange={(e) => {
                                    setPt_discount_percent(e.target.value);
                                }}

                                // ------------------------------------
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7  " />
                        </div>

                        {/* 9 :: Stock Quntity */}
                        <div className="flex flex-col gap-2">
                            {/* Label :: htmlFor */}
                            <label htmlFor="pt_stock" className="label-s1">
                                Stock Quntity
                            </label>

                            {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                            <input type="text" id="pt_stock" name="pt_stock" placeholder='Stock Quntity '
                                // ------------------------------------
                                value={pt_stock}

                                onChange={(e) => {
                                    setPt_stock(e.target.value);
                                }}

                                // ------------------------------------
                                className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7  " />
                        </div>

                        {/*  5 Product Description */}
                        <div className="flex flex-col gap-2 w-full">
                            {/* Label :: htmlFor */}
                            <label htmlFor="pt_description" className="label-s1">
                                Product Description
                            </label>

                            {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                            <textarea id="pt_description" name="pt_description"
                                placeholder="Type Product Description"
                                rows={1}
                                // ------------------------------------
                                value={pt_description}

                                onChange={(e) => setPt_description(e.target.value)}
                                // ------------------------------------
                                className="w-full bg-white rounded-md border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7    shadow-sm  min-w-full min-h-[124px]"
                            />

                        </div>



                    </div>

                    <button
                        onClick={() => {
                            setUserChange(true);
                            setCre_pt_btn(true);
                            setIsNewProductCreated(true);
                            // console.log("   Save and Update");
                            // console.log("Cre_pt_btn", cre_pt_btn);
                            // console.log("userChange", userChange);
                        }}
                        className="w-full text-lg leading-6 py-3 bg-yellow-300 text-black font-medium rounded-lg">
                        Save and Update
                    </button>
                </div>



            </div>
        </>
    )
}

export default Cre_pt_form