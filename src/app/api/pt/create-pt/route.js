import supabase from "@/app/components/supabase/sbClient";
// -----------------------------------------
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'


export async function POST(request) {


    // recive product details :: from "post request" :: request.JSON
    const { create_pt_object }
        = await request.json();

    // console.log(`create_pt_object =`, create_pt_object)

    // // converts to String ::
    // var pt_title_string = `${pt_title}`;
    // var pt_description_string = `${pt_description}`;
    // var pt_brand_string = `${pt_brand}`;
    // var pt_category_string = `${pt_category}`;
    // var pt_images_string = `${pt_images}`;
    // var pt_photo_thumbnail_string = `${pt_photo_thumbnail}`;

    // var price_Num;
    // var discount_percent_Num;
    // var pt_rating_Num;
    // var pt_stock_Num;

    // // converts to Integer ::
    // if (pt_price.length !== 0) {
    //     price_Num = Number(pt_price);
    // }
    // if (pt_discount_percent.length !== 0) {
    //     discount_percent_Num = Number(pt_discount_percent);
    // }
    // if (pt_rating.length !== 0) {
    //     pt_rating_Num = Number(pt_rating);
    // }
    // if (pt_stock.length !== 0) {
    //     pt_stock_Num = Number(pt_stock);
    // }


    // define create product data Object ::
    // var insertOnePtData = {
    //     pt_title: pt_title_string,
    //     pt_description: pt_description_string,
    //     // ---------------------------
    //     pt_price: price_Num,
    //     pt_discount_percent: discount_percent_Num,
    //     pt_rating: pt_rating_Num,
    //     pt_stock: pt_stock_Num,
    //     // ---------------------------
    //     pt_brand: pt_brand_string,
    //     pt_category: pt_category_string,
    //     pt_images: pt_images_string,
    //     pt_photo_thumbnail: pt_photo_thumbnail_string,
    // }

    // pass data Object to :: insert() :: Supabase
    const { data: insertProductData, error: insertProductError } = await supabase
        .from('products')
        .insert(
            create_pt_object
        )
        .select();

    // console.log(`insertProductData =`, insertProductData)
    // console.log(`insertProductError =`, insertProductError)

    // List all products :: to check our inserted products..
    let { data: all_products, error: all_products_error } = await supabase
        .from('products')
        .select('*');

    var message = (insertProductData?.length > 0) ?
        `Yes, Product successfuly inserted to "products" table..` :
        `No, Product is not inserted to "products" table..`

    var success = (insertProductData?.length > 0) ? true : false;



    return NextResponse.json({
        success,
        message,
        request_name: 'POST',
        // 
        create_pt_object,
        // ------------------
        insertProductData,
        insertProductError,
        // ------------------
        all_products,
        all_products_error,
    });

}

