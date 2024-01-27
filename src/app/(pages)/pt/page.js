import React from 'react'

// product :: step 01.02.02 :: import "supabase" 
import supabase from '@/app/components/supabase/sbClient';
// :: for the use in "server components"
// --------------------------

// -------------------------------------------
// product :: step 01.05.02 :: import  "revalidateAll" 
import { revalidateAll } from '@/app/actions';
// :: to pass as props to revalidate cache..
// -------------------------------------------
import Show_all_products from '@/app/components/client/product/org/show_all_products';

const Product = async ({ is_admin = false, user_id, cart = [] }) => {

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

    // console.log(`are there products from server ??  = `, isProductsFS);
    // console.log(`isProductsFS = `, isProductsFS);

    // console.log(`Yes, Here is the array of products..\n `);
    // console.log(`products = `, products);
    // console.log(`is_admin=`, is_admin)

    return (
        <section className="px-5">

            <div className="xl:container py-3 mx-auto flex flex-col gap-y-5 md:gap-y-10">

                {/* // product :: step 01.04 :: 
                :: If there are products from server :: (isProductsFS), 
                   then :: Show_all_products
                */}
                {
                    (isProductsFS) &&
                    <Show_all_products
                        productsFS={products}
                        revalidateAll={revalidateAll}
                        is_admin={is_admin}
                        user_id={user_id}
                        cart={cart}
                    ></Show_all_products>
                }
                {/* // product :: step 01.05.01 :: props :: {revalidateAll}
                    //  ::productsFS :: products from server (FS) = {products}
                    // :: revalidateAll :: props for "client component" to do "server action"... */}

            </div>
        </section>
    )
}

export default Product



// product :: step 01.01 :: isProductsFS :: (is products from server ??) => false

// product :: step 01.02.01 :: supabase :: used to get (products) from supabse...
// product :: step 01.02.02 :: supabase :: import supabase..

// product :: step 01.03 :: if (products) then => isProductsFS :: true
// product :: step 01.04 :: if (products) then => show_All_products compomemt

// product :: step 01.05.01 :: {revalidateAll} used as props
// product :: step 01.05.02 :: {revalidateAll} import

