// step 0 :: 'use client'
'use client'

import React, { useEffect, useState } from 'react'
// -------------------------------
// step 01.01 :: supabase in client component :: import axios ::
import axios from 'axios';
// -------------------------------
import Cre_pt from '@/app/components/client/product/cre_pt';
import Image from 'next/image';
import Vertical_Card from './atoms/Vertical_Card';


const Show_all_products = () => {

    // step 01.02 :: supabase in client component ::
    // :: Define useState Variable... ::
    const [isProducts, setIsProducts] = useState(false);
    const [products, setProducts] = useState([]);

    // step 01.03 :: supabase in client component :: 
    // :: initiate useEffect :: get data by axios.get
    useEffect(() => {

        // Define async function :: to fetch data ::
        const getProducts = async () => {

            // Axios GET Default
            await axios
                .get(`/api/pt`)
                .then((response) => {
                    // step 01.04 :: supabase in client component ::
                    // set :: useState variables ::
                    setIsProducts(true);
                    setProducts(response.data.products);
                });
            // -------------------------------
        }

        // Step 11.08 :: call async function ::
        getProducts();

    }, [])

    // step 01.05 :: supabase in client component ::
    // Console.log :: useState variables ::
    console.log(`isProducts= `, isProducts);
    console.log(`products= `, products);

    return (
        <div className="flex flex-wrap gap-x-4 gap-y-10 justify-evenly ">
            {

                (isProducts && products[0]) &&
                <>


                    {products?.map((curpt) => {
                        return (
                            // Do not use this <> </> Fragments inside return of .map method...
                            // Otherwise :: "Each child in a list should have a unique "key" prop" ::warning will appear on console.log() of browser...

                            <Vertical_Card
                                curpt={curpt} key={curpt.id}>
                            </Vertical_Card>

                        )
                    }
                    )}



                </>

            }

        </div>
    )
}

export default Show_all_products