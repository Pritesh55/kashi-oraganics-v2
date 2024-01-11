'use client'

import axios from 'axios';
import { usePathname, useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react'
import Form_heading from '../../atoms/Form_heading';
import Form_field_text from '../../Form_field_text';
import Form_field_text_area from '../../Form_field_text_area';
import { getLastWord } from '@/functions/urlFunctions';
import { SupabaseClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const Edit_form = ({ revalidateAll }) => {

    const pathname = usePathname();

    const supabase = createClientComponentClient()

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

    const [fillInitialValues, set_fillInitialValues] = useState(false)

    const [edit_pt_btn, setEdit_pt_btn] = useState(false);
    const [userChange, setUserChange] = useState(false);


    const [isNewProductEdited, setIsNewProductEdited] = useState(false);
    const [isptEditedMessage, setIsptEditedMessage] = useState('');

    useEffect(() => {

        const EditProduct = async () => {
            // ------------------------------------------------------
            // console.log("\n\n");
            // console.log("EditProduct Started...");
            // ------------------------------------------------------

            var pt_id = getLastWord(`${pathname}`);
            // console.log(`Your Product's id =`, pt_id);

            const { data: productsData, error: productsError } = await supabase
                .from('products')
                .select("*")
                .eq('id', pt_id);

            // console.log(`productsData = `, productsData)

            if (productsData?.length > 0) {
                const pt_object = productsData[0];

                // console.log(`pt_object =`, pt_object);

                if (fillInitialValues == false) {

                    set_pt_title(pt_object.pt_title);
                    set_pt_description(pt_object.pt_description);
                    set_pt_brand(pt_object.pt_brand);
                    set_pt_category(pt_object.pt_category);
                    set_pt_photo_thumbnail(pt_object.pt_photo_thumbnail);

                    set_pt_price(pt_object.pt_price);
                    set_pt_stock(pt_object.pt_stock);
                    set_pt_rating(pt_object.pt_rating);
                    set_pt_discount_percent(pt_object.pt_discount_percent);

                    set_fillInitialValues(true);

                    // console.log(`pt_title =`, pt_title)

                }



                if (edit_pt_btn) {

                    var update_pt_object = {
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

                    await axios.put('/api/pt/edit-pt', {
                        pt_object, update_pt_object
                    },
                    ).then((response) => {
                        // -------------------------
                        // console.log(`Edit Product Response`, response.data);

                        if (response.data.success == true) {
                            revalidateAll();

                            // setIsNewProductEdited(true);
                            // setIsptEditedMessage('Thank you, You Edited a New Product...');

                            // function wait(s) {
                            //     var start = new Date().getTime();
                            //     var end = start;
                            //     while (end < start + (s * 1000)) {
                            //         end = new Date().getTime();
                            //     }
                            // }

                            // wait(2);
                            // setIsNewProductEdited(false);
                            // // -----------------------

                            router.back();
                            // -----------------------

                        } else {
                            setIsNewProductEdited(true);

                            setIsptEditedMessage('Oh, There is an Error..., Product is not Edited..');

                            function wait(s) {
                                var start = new Date().getTime();
                                var end = start;
                                while (end < start + (s * 1000)) {
                                    end = new Date().getTime();
                                }
                            }

                            wait(3);

                            setIsNewProductEdited(false);
                        }
                        // -------------------------
                    }).catch(function (error) {
                        // console.log(`Edit Product response Error`, error);
                    });
                }

            }




            // ------------------------------------------------------


            // console.log("EditProduct Ended...");
            // console.log("\n\n");
            // ------------------------------------------------------
            setEdit_pt_btn(false);
            setUserChange(false);

        }

        if (fillInitialValues == false || edit_pt_btn) {
            EditProduct();
        }



    }, [userChange, edit_pt_btn, fillInitialValues])


    return (
        <>
            {
                (isNewProductEdited) && <>
                    <h2 className="px-4 py-2 border-2 border-solid border-orange-400 fixed z-50 bg-white text-black top-5 right-8 rounded-lg text-lg shadow-xl">
                        {isptEditedMessage}
                    </h2>
                </>

            }

            {/* Sign-up or Sign-in Box */}
            <div className=" bg-white rounded-lg p-8 flex flex-col w-full gap-8 min-h-[384px] border-2 border-solid border-orange-400 relative">


                <div className="flex justify-between gap-x-6 gap-y-3 items-center flex-wrap">
                    <Form_heading name={`Edit product`}></Form_heading>

                    <button
                        onClick={() => {
                            setEdit_pt_btn(true);
                            // console.log("   Save and Update");
                            // console.log("Edit_pt_btn", edit_pt_btn);
                            // console.log("userChange", userChange);
                        }}
                        className="w-auto px-6 text-lg leading-6 py-3 bg-yellow-300 text-black font-medium rounded-lg">
                        Edit Product
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
                            state_var={pt_brand}
                            handler_name={pt_brand_Handler}
                            label_name={`Brand Name`}
                            placeholder_name={`Brand Name`}
                        />

                        <Form_field_text
                            state_var={pt_category}
                            handler_name={pt_category_Handler}
                            label_name={`Category Name`}
                            placeholder_name={`Category Name`}
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
                            setEdit_pt_btn(true);
                            // console.log("   Save and Update");
                            // console.log("Edit_pt_btn", edit_pt_btn);
                            // console.log("userChange", userChange);
                        }}
                        className="w-full text-lg leading-6 py-3 bg-yellow-300 text-black font-medium rounded-lg">
                        Edit Product
                    </button>
                </div>

            </div>
        </>
    )
}

export default Edit_form