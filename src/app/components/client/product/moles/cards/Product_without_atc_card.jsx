import Image from 'next/image'
import Link from 'next/link'
import React, { Children } from 'react'
import { memo } from 'react'

const Product_without_atc_card = ({ is_admin, curpt }) => {

    return (
        <div className="">

            {
                (is_admin == true) && <>
                    <Link href={`/admin/edit_pt/${curpt?.id}/`} scroll={false}
                        // className="btn-tp absolute top-0 left-0 px-6 py-2 border-r-2 border-b-2 border-r-orange-400 border-b-orange-400 rounded-br-lg rounded-tl-lg text-base font-medium text-purple-800 z-50 bg-white"
                        className=" absolute top-0 left-0 px-6 py-2 rounded-br-lg rounded-tl-lg text-base font-medium text-black z-50 bg-white hover:bg-yellow-300 
                     border-r-2 border-b-2 border-r-orange-400 border-b-orange-400"
                    >
                        {/* <Image src='/trash.svg' alt='' width={20} height={20} className=''></Image> */}

                        {`Edit`}
                    </Link>
                    <Link href={`/admin/delete_pt/${curpt?.id}/`} scroll={false}
                        // className="btn-tp absolute top-0 left-0 px-6 py-2 border-r-2 border-b-2 border-r-orange-400 border-b-orange-400 rounded-br-lg rounded-tl-lg text-base font-medium text-purple-800 z-50 bg-white"
                        className="absolute top-0 right-0 z-50 px-3 py-2 border-l-2 border-b-2 border-l-orange-400 border-b-orange-400 rounded-bl-lg rounded-tr-lg bg-white hover:bg-yellow-300"
                    >
                        {/* <Image src='/trash.svg' alt='' width={20} height={20} className=''></Image> */}

                        <Image src='/trash-icon.svg' alt='' width={20} height={20} className=''></Image>
                    </Link>

                </>

            }



            <a className="flex justify-center items-center relative h-56 rounded-lg overflow-hidden">


                {/* Image  */}
                <Image
                    // -----------------------
                    src={(curpt?.pt_photo_thumbnail) ? `${curpt?.pt_photo_thumbnail}` : `https://www.sose.in/assets/store%20locator%20main%20banner-h9yO4WZa.jpg`}

                    // -----------------------
                    alt={`Product ${curpt.id}`}
                    width={400}
                    height={650}
                    priority={false}
                    className="object-cover object-center w-full h-full block sm:max-w-[360px]"
                />


            </a>

            <span className="text-transparent absolute top-0 left-0 w-full max-w-full break-all -z-50">{(curpt?.pt_photo_thumbnail) ? `${curpt?.pt_photo_thumbnail}` : `https://www.sose.in/assets/store%20locator%20main%20banner-h9yO4WZa.jpg`}</span>

            {/* <hr className="border-b-2 border-solid border-orange-400 my-6" /> */}

            <div className="flex flex-col gap-y-4 items-start leading-normal text-black capitalize px-3 md:px-6 py-3 md:py-6 bg-white rounded-lg">

                {(curpt?.pt_category || curpt?.pt_brand) &&
                    <>
                        <div className="flex justify-between items-center w-full flex-wrap gap-x-6 gap-y-3">

                            {(curpt?.pt_category) &&
                                <>
                                    <h3 className="text-sm md:text-base px-2 py-1 border-2 border-solid border-orange-400 rounded-md btn-tp break-all"
                                    >
                                        {curpt?.pt_category}
                                    </h3>
                                </>
                            }
                            {(curpt?.pt_brand) &&
                                <>
                                    <h3 className="text-sm md:text-base px-2 py-1 border-2 border-solid border-orange-400 rounded-md btn-tp break-all">
                                        {curpt?.pt_brand}
                                    </h3>
                                </>
                            }
                        </div>
                    </>
                }

                {(curpt?.pt_title) &&
                    <>
                        <h2 className="text-xl break-all">
                            {`${curpt?.pt_title}`}
                        </h2>
                    </>
                }

                {(curpt?.pt_description) &&
                    <>
                        <p className="max-h-20 sm:w-[340px] overflow-hidden break-all">
                            {curpt?.pt_description}
                        </p>
                    </>
                }

                <div className="w-full flex justify-between items-center gap-x-8 gap-y-8 flex-wrap">

                    <div className="text-lg font-medium px-4 py-2 border-2 border-solid border-orange-400 rounded-md btn-tp break-all">
                        <span className="select-none" >
                            {`₹ `}
                        </span>
                        <span className="" >
                            {`${curpt?.pt_price}`}
                        </span>

                    </div>

                </div>

            </div>



        </div>
    )
}

export default Product_without_atc_card