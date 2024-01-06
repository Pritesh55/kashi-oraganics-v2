import React from 'react'

import Cre_pt from '@/app/components/client/product/cre_pt';
import Show_all_products from '@/app/components/client/product/show_all_products';
import { revalidateAll } from '@/app/actions';
import axios from 'axios';
import supabase from '@/app/components/supabase/sbClient';


const Product = async () => {

    var isProductsFS = false;

    const { data: products, error: productsError } = await supabase
        .from('products')
        .select('*');

    if (productsError == null) {
        isProductsFS = true;
    }


    return (
        <section className="bg-white min-h-screen px-2 pb-20">

            <div className="xl:container px-5 py-10 mx-auto flex flex-col gap-y-10">

                <div className="relative h-[50px]">
                    <div className="absolute bg-white top-0 left-0 z-[9999]">
                        <Cre_pt></Cre_pt>
                    </div>

                </div>

                {
                    (isProductsFS) &&
                    <Show_all_products revalidateAll={revalidateAll}
                    productsFS={products}></Show_all_products>

                }

            </div>
        </section>
    )
}

export default Product