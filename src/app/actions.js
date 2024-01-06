'use server'

import { revalidatePath } from "next/cache";
import supabase from "./components/supabase/sbClient";

export async function revalidateAll() {

    revalidatePath('/pt');
    console.log('rELVALIDATING.....tHANK YOU...');

    const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*');

        if(products) {
            return products;
        }
}