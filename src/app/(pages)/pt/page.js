// step 0 :: 'use client'
'use client'

import Cre_pt from '@/app/components/client/product/cre_pt';
import Image from 'next/image';
import React from 'react'

// step 02 :: swr :: import useSWR hook....
import useSWR from 'swr'


const Product = () => {

    // ----------------------------------------------------------
    // step 01 :: swr :: create a fetcher function
    const fetcher = (...args) => fetch(...args).then(res => res.json());

    // step 03 :: swr :: get data by useSwr function.... 
    const { data: ptData, error: ptDataError, isLoading: ptDataIsLoading } = useSWR('/api/pt', fetcher);

    // ---------------------------------------------------------
    console.log(`ptDataIsLoading =`, ptDataIsLoading);
    // ptDataIsLoading is an Boolean :: True or False...
    // Intially , It is 'true'..
    // When data comes, It becomes 'false' ::
    // ---------------------------------------------------------
    console.log(`ptData =`, ptData);
    // ptData is an simple Object :: 1) undefined , then 2) {...} 
    console.log(`ptDataError =`, ptDataError);
    // ptData is an simple Object :: 1) undefined , then 2) undefined...

    // --------------------------------------------------------------------

    return (
        <section className="bg-white min-h-screen px-2 pb-20">
            {
                ((ptDataIsLoading !== true) & (ptData !== undefined)) &&
                <>
                    <div className="xl:container px-5 py-10 mx-auto flex flex-col gap-y-10">

                        <div className="">
                            <Cre_pt></Cre_pt>
                        </div>
                    </div>
                </>
            }

            <div className="flex flex-wrap gap-x-4 gap-y-10 justify-evenly ">
                {
                    ptData?.products.map((curpt, index) => {
                        return (<>

                            <div key={curpt.id} className="w-full sm:w-[360px]  border-2 border-solid border-orange-400 rounded-lg gap-y-4 p-8 ">
                                <a className="flex justify-center items-center relative h-56 rounded overflow-hidden">

                                    {/* Image  */}
                                    < Image
                                        // -----------------------
                                        src={(curpt.pt_images) ? `${curpt.pt_images}` : `https://dummyimage.com/400x301`}

                                        // -----------------------
                                        alt="ecommerce"
                                        width={400}
                                        height={650}
                                        priority={false}
                                        className="object-cover object-center w-full h-full block max-w-[360px]"
                                        key={index}
                                    />

                                </a>

                                <hr className="border-b-2 border-solid border-orange-400 my-6" />

                                <div className="flex flex-col gap-y-4 items-start leading-normal text-black capitalize ">


                                    {(curpt.pt_category && curpt.pt_brand) &&
                                        <>
                                            <div className="flex justify-between items-center w-full flex-wrap gap-x-6 gap-y-10">

                                                {(curpt.pt_category) &&
                                                    <>
                                                        <h3 className="text-base px-2 py-1 border-2 border-solid border-orange-400 rounded-md"
                                                        >
                                                            {curpt.pt_category}
                                                        </h3>
                                                    </>
                                                }
                                                {(curpt.pt_brand) &&
                                                    <>
                                                        <h3 className="text-base px-2 py-1 border-2 border-solid border-orange-400 rounded-md">
                                                            {curpt.pt_brand}
                                                        </h3>
                                                    </>
                                                }
                                            </div>
                                        </>
                                    }

                                    {(curpt.pt_title) &&
                                        <>
                                            <h2 className="text-xl">
                                                {curpt.pt_title}
                                            </h2>
                                        </>
                                    }

                                    {(curpt.pt_description) &&
                                        <>
                                            <p className="h-20 overflow-hidden">
                                                {curpt.pt_description}
                                            </p>
                                        </>
                                    }

                                    <div className="w-full flex justify-between items-center gap-x-8  ">

                                        <div className="">
                                            <span className="text-lg font-medium px-4 py-2 border-2 border-solid border-orange-400 rounded-md" >
                                                ₹ {curpt.pt_price}
                                            </span>
                                        </div>


                                        <div className="border-2 border-solid border-orange-300 p-4 rounded-full relative bg-yellow-300 cursor-pointer">
                                            <Image src='/plus-icon.svg' alt='add-to-cart'
                                                width={24} height={24} sizes=''></Image>
                                        </div>

                                    </div>



                                </div>
                            </div >

                        </>
                        )
                    }
                    )
                }

            </div>


        </section >
    )
}

export default Product