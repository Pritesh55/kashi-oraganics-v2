// step 0 :: 'use client'
'use client'

import React, { useEffect, useState } from 'react'
// -------------------------------
// step 01.01 :: supabase in client component :: import axios ::
import axios from 'axios';
// -------------------------------
import Cre_pt from '@/app/components/client/product/cre_pt';
import Show_all_products from '@/app/components/client/product/show_all_products';
import Show_All_products_Admin from '@/app/components/client/product/Show_All_products_Admin';



const Product = () => {


    return (
        <section className="bg-white min-h-screen px-2 pb-20">

            <div className="xl:container px-5 py-10 mx-auto flex flex-col gap-y-10">

                <div className="relative h-[50px]">
                    <div className="absolute bg-white top-0 left-0 z-[9999]">
                        <Cre_pt></Cre_pt>
                    </div>

                </div>

                <Show_all_products></Show_all_products>
                {/* <Show_All_products_Admin></Show_All_products_Admin> */}
                
            </div>
        </section>
    )
}

export default Product