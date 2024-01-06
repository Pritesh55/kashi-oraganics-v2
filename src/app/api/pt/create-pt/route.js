import supabase from "@/app/components/supabase/sbClient";
// -----------------------------------------
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'


export async function POST(request) {


    // recive product details :: from "post request" :: request.JSON
    const { pt_images, pt_title, pt_description, pt_category, pt_brand, pt_price, pt_photo_thumbnail, pt_discount_percent, pt_rating, pt_stock }
        = await request.json();

    // converts to String ::
    var pt_title_string = `${pt_title}`;
    var pt_description_string = `${pt_description}`;
    var pt_brand_string = `${pt_brand}`;
    var pt_category_string = `${pt_category}`;
    var pt_images_string = `${pt_images}`;
    var pt_photo_thumbnail_string = `${pt_photo_thumbnail}`;

    var price_Num;
    var discount_percent_Num;
    var pt_rating_Num;
    var pt_stock_Num;

    // converts to Integer ::
    if (pt_price.length !== 0) {
        price_Num = Number(pt_price);
    }
    if (pt_discount_percent.length !== 0) {
        discount_percent_Num = Number(pt_discount_percent);
    }
    if (pt_rating.length !== 0) {
        pt_rating_Num = Number(pt_rating);
    }
    if (pt_stock.length !== 0) {
        pt_stock_Num = Number(pt_stock);
    }


    // define create product data Object ::
    var insertOnePtData = {
        pt_title: pt_title_string,
        pt_description: pt_description_string,
        // ---------------------------
        pt_price: price_Num,
        pt_discount_percent: discount_percent_Num,
        pt_rating: pt_rating_Num,
        pt_stock: pt_stock_Num,
        // ---------------------------
        pt_brand: pt_brand_string,
        pt_category: pt_category_string,
        pt_images: pt_images_string,
        pt_photo_thumbnail: pt_photo_thumbnail_string,
    }

    // pass data Object to :: insert() :: Supabase
    const { data: insertProductData, error: insertProductError } = await supabase
        .from('products')
        .insert(
            insertOnePtData
        )
        .select();

    // List all products :: to check our inserted products..
    let { data: all_products, error: all_products_error } = await supabase
        .from('products')
        .select('*');

    var message = (insertProductData !== null) ?
        `Yes, Product successfuly inserted to "products" table..` :
        `No, Product is not inserted to "products" table..`

    var success = (insertProductData !== null) ? true : false;

  

    return NextResponse.json({
        success,
        message,
        request_name: 'POST',
        // 
        insertOnePtData,
        // ------------------
        insertProductData,
        insertProductError,
        // ------------------
        all_products,
        all_products_error,
    });

}

