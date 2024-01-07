import React from 'react'

// product :: step 01.01 :: isProductsFS :: (is products from server ??) => false

// product :: step 01.02.01 :: supabase :: used to get (products) from supabse...
// product :: step 01.02.02 :: supabase :: import supabase..

// product :: step 01.03 :: if (products) then => isProductsFS :: true
// product :: step 01.04 :: if (products) then => show_All_products compomemt

// product :: step 01.05.01 :: {revalidateAll} used as props
// product :: step 01.05.02 :: {revalidateAll} import

// product :: step 01.02.02 :: import "supabase" 
import supabase from '@/app/components/supabase/sbClient';
// :: for the use in "server components"
// --------------------------

// -------------------------------------------
// product :: step 01.05.02 :: import  "revalidateAll" 
import { revalidateAll } from '@/app/actions';
// :: to pass as props to revalidate cache..
// -------------------------------------------

import Cre_pt_btn from '@/app/components/client/product/atoms/cre_pt_btn';
import Show_all_products from '@/app/components/client/product/show_all_products';




const Product = async () => {

    // product :: step 01.01 :: v1 (Variable 01) - isProductsFS is set to false..
    // isProductsFS == is products "from server" (FS) is there ?? No..
    var isProductsFS = false;

    // product :: step 01.02.01 :: 
    // --------------------------
    // v2 (Variable 02) - products 
    // Array of objects :: (01 object == 01 product detail row )
    // --------------------------
    // Get products from database server...
    // -------------------------------------------
    const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*');

    // .from('products') :: from products table 
    // .select(*)        :: select all products (*); 

    // It will be fresh fetch Only first time, at "Build time"....
    // then,it will give fetched products...No update
    // WE have to revelidate to update it....
    // --------------------------------------

    // product :: step 01.03 :: v3 (Variable 03) - productsError
    // -------------------------------------
    //  if there will be "no" products error,
    // -------------------------------------
    if (productsError == null) {
        // It means :: "There are products from server..."
        isProductsFS = true;
        // then Variable 01 - isProductsFS (is products "from server") becomes true....
        // -------------------------------------
    }

    console.log(`are there products from server ??  = `, isProductsFS);
    console.log(`isProductsFS = `, isProductsFS);

    console.log(`Yes, Here is the array of products..\n `);
    console.log(`products = `, products);


    return (
        <section className="bg-white min-h-screen px-2 pb-20">

            <div className="xl:container px-5 py-10 mx-auto flex flex-col gap-y-10">

                <div className="relative h-[50px]">
                    <div className="absolute bg-white top-0 left-0 z-[9999]">
                        <Cre_pt_btn revalidateAll={revalidateAll}></Cre_pt_btn>
                    </div>

                </div>

                {/* // product :: step 01.04 :: 
                :: If there are products from server :: (isProductsFS), 
                   then :: Show_all_products
                */}
                {
                    (isProductsFS) &&
                    <Show_all_products
                        productsFS={products}
                        revalidateAll={revalidateAll}
                    ></Show_all_products>

                    // product :: step 01.05.01 :: props :: {revalidateAll}
                    //  ::productsFS :: products from server (FS) = {products}
                    // :: revalidateAll :: props for "client component" to do "server action"...
                }

            </div>
        </section>
    )
}

export default Product