// step 01 :: import "createServerComponentClient" and "cookies"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// -----------------------------------------
import { NextResponse } from "next/server";

export async function GET(request) {

    var success = false;
    var message = '';


    // step 02 :: intialize supabse :: 
    const supabase = createServerComponentClient({ cookies });


    const { data: products, error } = await supabase
        .from('products')
        .select()

    success = (products) ? true : false;
    message = (products) ?
        `Thank you...All Products are received succesfully...` :
        `Sorry, Products are not received...`;


    return NextResponse.json({
        success,
        message,
        products,
        error


        // findUserProfileData: findUserProfileData
    });

}







