'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'
import Form_heading from './atoms/Form_heading';
import Form_field_text from './Form_field_text';
import Form_field_text_area from './Form_field_text_area';
import Goto_btn from '../../server/atoms/Goto_btn';
import Sign_btns from '../../server/atoms/sign_btns';

const Cre_pt_form = ({ revalidateAll }) => {

    const router = useRouter();


    // Define State varibale :: step 01 ::
    // define State_varibale_Handler :: step 02 ::
    // -------------------------
    const [pt_title, set_pt_title] = useState('');

    const pt_title_Handler = (pt_title) => {
        set_pt_title(pt_title);
    }
    // --------------------------------------
    const [pt_description, set_pt_description]
        = useState('');

    const pt_description_Handler = (pt_description) => {
        set_pt_description(pt_description);
    }
    // ------------------------------------
    const [pt_category, set_pt_category] = useState('');

    const pt_category_Handler = (pt_category) => {
        set_pt_category(pt_category);
    }
    // ----------------------------------------
    const [pt_photo_thumbnail, set_pt_photo_thumbnail] = useState('');


    const pt_photo_thumbnail_Handler = (pt_photo_thumbnail) => {
        set_pt_photo_thumbnail(pt_photo_thumbnail);
    }
    // ----------------------------------------

    const [pt_images, set_pt_images] = useState('');

    const pt_images_Handler = (pt_images) => {
        set_pt_images(pt_images);
    }
    // ----------------------------------------

    const [pt_brand, set_pt_brand] = useState('');

    const pt_brand_Handler = (pt_brand) => {
        set_pt_brand(pt_brand);
    }
    // ----------------------------------------

    const [pt_price, set_pt_price] = useState('');

    const pt_price_Handler = (pt_price) => {
        set_pt_price(pt_price);
    }
    // ----------------------------------------

    const [pt_discount_percent, set_pt_discount_percent] = useState('');
    const pt_discount_percent_Handler = (pt_discount_percent) => {
        set_pt_discount_percent(pt_discount_percent);
    }
    // ----------------------------------------

    const [pt_rating, set_pt_rating] = useState('');

    const pt_rating_Handler = (pt_rating) => {
        set_pt_rating(pt_rating);
    }
    // ----------------------------------------

    const [pt_stock, set_pt_stock] = useState('');


    const pt_stock_Handler = (pt_stock) => {
        set_pt_stock(pt_stock);
    }
    // ----------------------------------------

    const [cre_pt_btn, setCre_pt_btn] = useState(false);
    const [userChange, setUserChange] = useState(false);


    const [isNewProductCreated, setIsNewProductCreated] = useState(false);
    const [isptCreatedMessage, setIsptCreatedMessage] = useState('');


    const [new_pt_creating, set_new_pt_creating] = useState(false);



    useEffect(() => {

        const createProduct = async () => {
            // ------------------------------------------------------
            // console.log("\n\n");
            // console.log("CreateProduct Started...");
            // ------------------------------------------------------

            var create_pt_object = {
                // ...user_profile,
                pt_title: `${pt_title}`,
                pt_description: `${pt_description}`,
                pt_category: `${pt_category}`,
                pt_brand: `${pt_brand}`,
                pt_images: `${pt_images}`,
                pt_photo_thumbnail: `${pt_photo_thumbnail}`,

                pt_price: `${pt_price}`,
                pt_discount_percent: `${pt_discount_percent}`,
                pt_rating: `${pt_rating}`,
                pt_stock: `${pt_stock}`
            }

            set_new_pt_creating(true);


            await axios.post('/api/pt/create-pt', { create_pt_object }).then(function (response) {
                // -------------------------
                // console.log(`create Product Response`, response.data);

                if (response.data.success == true) {
                    // setIsptCreatedMessage('Thank you, You created a New Product...');
                    // setIsNewProductCreated(true);

                    // function wait(s) {
                    //     var start = new Date().getTime();
                    //     var end = start;
                    //     while (end < start + (s * 1000)) {
                    //         end = new Date().getTime();
                    //     }
                    // }

                    // wait(3);
                    // // -----------------------
                    revalidateAll();
                    router.push('/admin');
                    router.refresh();

                 
                    // -----------------------

                } else {
                    setIsptCreatedMessage('Oh, There is an Error..., Product is not created..');
                    setIsNewProductCreated(true);

                    function wait(s) {
                        var start = new Date().getTime();
                        var end = start;
                        while (end < start + (s * 1000)) {
                            end = new Date().getTime();
                        }
                    }

                    wait(3);


                    setIsNewProductCreated(false);
                }
                // -------------------------
            }).catch(function (error) {
                console.log(`create Product response Error`, error);
            });

            // ------------------------------------------------------
            // console.log("CreateProduct Ended...");
            // console.log("\n\n");
            // ------------------------------------------------------
            setCre_pt_btn(false);
            setUserChange(false);

        }

        if (cre_pt_btn) {
            createProduct();
        }

    }, [userChange])

    if (new_pt_creating == true) {
        return (
            <>
                <div className="bg-white min-h-screen flex justify-center items-center w-full">
                    <span className="text-2xl break-word text-black">
                        Your Product is Creating Now...
                    </span>
                </div>
            </>

        )
    }


    return (
        <>
            {
                (isNewProductCreated) && <>
                    <h2 className="px-4 py-2 border-2 border-solid border-orange-400 fixed z-50 bg-white text-black top-5 right-8 rounded-lg text-lg shadow-xl">
                        {isptCreatedMessage}
                    </h2>
                </>

            }

            <div className="w-full text-black bg-white py-3 px-5 z-[9999]">
                <div className="w-full flex flex-wrap justify-between gap-3">

                    <div className="flex gap-x-3 md:gap-x-6 gap-y-3 flex-wrap ">

                        <Goto_btn name={`Home`} goto={`/`}></Goto_btn>
                        <Goto_btn name={`Admin`} goto={`/admin`}></Goto_btn>

                    </div>


                    <div className="flex gap-x-3 md:gap-x-6 gap-y-3 flex-wrap ">
                        <Goto_btn revalidateAll={revalidateAll}
                            name={`Profile`}
                            goto={`/profile`}></Goto_btn>

                        <Sign_btns signout={true} ></Sign_btns>
                    </div>

                </div>
            </div>

            {/* Sign-up or Sign-in Box */}
            <div className=" bg-white text-black px-5 py-8 flex flex-col w-full gap-8 relative">


                <div className="flex justify-between gap-x-6 gap-y-3  items-center flex-wrap">
                    <Form_heading name={`Create product`}></Form_heading>

                    <button
                        onClick={() => {
                            setUserChange(true);
                            setCre_pt_btn(true);
                            // console.log("   Save and Update");
                            // console.log("Cre_pt_btn", cre_pt_btn);
                            // console.log("userChange", userChange);
                        }}
                        className="w-auto px-6 text-lg leading-6 py-3 bg-yellow-300 text-black font-medium rounded-lg">
                        Create Product
                    </button>
                </div>


                {/* step 15.02 :: Profile Update ::  */}
                <div className="flex gap-y-4 lg:gap-y-12 flex-wrap">
                    <div className="flex gap-y-8 gap-x-12 flex-wrap items-start px-5 lg:px-12  justify-start lg:justify-start py-8 border-2 border-solid border-orange-400">
                        {/* // Step 03 :: props*/}

                        <Form_field_text
                            state_var={pt_title}
                            handler_name={pt_title_Handler}
                            label_name={`Product Name`}
                            placeholder_name={`Product Name`}
                        />

                        <Form_field_text
                            state_var={pt_category}
                            handler_name={pt_category_Handler}
                            label_name={`Category Name`}
                            placeholder_name={`Category Name`}
                        />


                        <Form_field_text
                            state_var={pt_brand}
                            handler_name={pt_brand_Handler}
                            label_name={`Brand Name`}
                            placeholder_name={`Brand Name`}
                        />

                        <Form_field_text
                            state_var={pt_photo_thumbnail}
                            handler_name={pt_photo_thumbnail_Handler}
                            label_name={`Product Image`}
                            placeholder_name={`img_url`}
                        />

                        <Form_field_text
                            type='number'
                            state_var={pt_price}
                            handler_name={pt_price_Handler}
                            label_name={`Product Price`}
                            placeholder_name={`Product Price`}
                        />

                        <Form_field_text
                            type='number'
                            state_var={pt_discount_percent}
                            handler_name={pt_discount_percent_Handler}
                            label_name={`Discount Percent`}
                            placeholder_name={`Discount Percent`}
                        />

                        <Form_field_text
                            type='number'
                            state_var={pt_stock}
                            handler_name={pt_stock_Handler}
                            label_name={`Stock Quntity`}
                            placeholder_name={`Stock Quntity`}
                        />


                        {/*  5 Product Description */}
                        <Form_field_text_area
                            state_var={pt_description}
                            handler_name={pt_description_Handler}
                            label_name={`Product description`}
                            placeholder_name={`Type  your Product description`}
                        ></Form_field_text_area>

                    </div>

                    <button
                        onClick={() => {
                            setUserChange(true);
                            setCre_pt_btn(true);
                            // console.log("   Save and Update");
                            // console.log("Cre_pt_btn", cre_pt_btn);
                            // console.log("userChange", userChange);
                        }}
                        className="w-full text-lg leading-6 py-3 bg-yellow-300 text-black font-medium rounded-lg">
                        Create Product
                    </button>
                </div>

            </div>
        </>
    )
}

export default Cre_pt_form