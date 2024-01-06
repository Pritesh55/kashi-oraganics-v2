// src\app\api\pt\route.js
// ---------------------------
import { NextResponse } from "next/server";
// -----------------------------------------
// Supabase :: Step 02.01 :: in Server components ::  
import supabase from "@/app/components/supabase/sbClient";
// just import "supabase client file :: ...
// -----------------------------------------


// Delete product :: step 01.04.02 :: 
// export const revalidate = 1;



export async function GET(request) {

    var success = false;
    var message = '';


    // step 02 :: Use supabse.from :: 
    const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*')

    success = (products) ? true : false;
    message = (products) ?
        `Thank you...All Products are received succesfully...` :
        `Sorry, Products are not received...`;


    return NextResponse.json({
        success,
        message,
        products,
        productsError


        // findUserProfileData: findUserProfileData
    });

}