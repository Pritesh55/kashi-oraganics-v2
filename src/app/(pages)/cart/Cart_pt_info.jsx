import Image from 'next/image'
import React from 'react'

const Cart_pt_info = ({ pt_id, curpt }) => {

    // console.log(`curpt = `,curpt)
    return (
        <>
            <div className="">

                <div className="flex items-start gap-x-6 gap-y-3 flex-wrap h-full">
                    {/* img  */}
                    <div className="flex justify-center items-center relative w-[160px] h-24 rounded-lg overflow-hidden">
                        {/* Image  */}
                        <Image
                            // -----------------------
                            src={(curpt?.pt_photo_thumbnail) ? `${curpt?.pt_photo_thumbnail}` : `https://www.sose.in/assets/store%20locator%20main%20banner-h9yO4WZa.jpg`}

                            // -----------------------
                            alt={`Product ${pt_id}`}
                            width={400}
                            height={650}
                            priority={false}
                            className="object-cover object-center w-full h-full block sm:max-w-[360px]"
                        />
                    </div>

                    {/* Product detail */}
                    <div className="flex flex-col gap-y-6">

                        {(curpt?.pt_title) &&
                            <>
                                <h2 className="text-xl break-all">
                                    {`${curpt?.pt_title}`}
                                </h2>
                            </>
                        }
                    </div>

                </div>
            </div>

        </>
    )
}

export default Cart_pt_info