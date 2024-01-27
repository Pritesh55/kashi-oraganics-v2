'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { wait } from "./urlFunctions";

export const empty_cart = async (user_id) => {
    console.log(`user_id = `, user_id)

    const supabase = createClientComponentClient();

    // set_adding_to_cart(true);
    // message :: operation started...
    console.log(`Empty Cart started...`)

    // old cart (array of objects) from Direct parent :: home or admin... 
    // console.log(`old cart `, cart)

    // now :: search for :: user_id (came from parent) :: in the "profiles" table
    // then update column :: "cart" :: array 
    const { data: emptyCart_data, error: emptyCart_error } = await supabase
        .from('profiles')
        .update({ cart: [] })
        .eq('user_id', user_id)
        .select()

    console.log(`emptyCart_data =`, emptyCart_data)
    console.log(`emptyCart_error =`, emptyCart_error)

    if (emptyCart_data !== null) {
        console.log(`emptyCart_data =`, emptyCart_data)

        // cart = [];
        // revalidateAll();

        console.log(`Thank you, cart is empty now...`)
        // await wait(1000);
        // set_adding_to_cart(false);
    } else {

        console.log(`emptyCart_error =`, emptyCart_error);

        if (emptyCart_error.message == "TypeError: Failed to fetch") {
            // set_internet_error(true);
            console.log("Please check your inetrnet connection");
        }
        await wait(1000);
        // set_adding_to_cart(false);
    }

}