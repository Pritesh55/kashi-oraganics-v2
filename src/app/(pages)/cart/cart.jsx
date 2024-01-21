'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { ReactDOM } from 'react'

const Cart_card = ({ cart }) => {
    const router = useRouter();
    // router.back();

    var is_admin = true
    var curpt = {
        "id": 216,
        "created_at": "2024-01-15T07:00:24.994963+00:00",
        "pt_title": "Chandansya Ubtan",
        "pt_description": "",
        "pt_price": "200",
        "pt_category": "Snan",
        "pt_brand": "Bansi",
        "pt_images": "",
        "pt_discount_percent": "",
        "pt_stock": "",
        "pt_rating": "",
        "pt_photo_thumbnail": "https://api.sose.org.in/media/Stores/gaushala_store.jpg",
        "list_number": 176
    }


    const update_qty_from_cart = async () => {

        console.log(`old cart `, cart);

        // if product is already exist ?? true or false ::
        var pt_exist = true;

        // JS some method :: check (all objects) of (cart) array::
        pt_exist = cart.some((pt) => {
            // message :: print this object :: pt
            console.log(`checking pt = `, pt)

            // if this object's (from old cart) product's id 
            // = input product's id (taken as parameter onclick), 
            return pt.pt_id == 216
            // then  return and breaK this loop :: Ans is true....
            // true:: product exist in old cart...
        });

        // console.log(`output = `, output);
        console.log(`pt_exist = `, pt_exist);

        if (pt_exist == true) {

            // make new product object
            var removed_pt = {}

            var new_cart = [...cart];
            // push new product object in the old cart...

            console.log(`intial new_cart = `, new_cart);

            const modifyProperty = (target_pt_id, arr, qty, newProperty) => {
                const target_pt_Obj = arr.find(obj => obj.pt_id === target_pt_id);

                console.log('target_pt_Obj = ', target_pt_Obj)

                if (target_pt_Obj) {
                    target_pt_Obj.qty = newProperty;
                }
            };

            modifyProperty(216, cart, 'qty', 3);
            // [ { id: 1, name: 'John' }, { id: 3, name: 'Peter' } ]
            console.log(`Final new_cart = `, new_cart);
        }


    }




    return (

        <div className="px-12 py-10">

            <div className="w-full shadow-kashi border border-orange-400 p-6 flex flex-col gap-y-3">

                <div className="flex items-start gap-x-6 gap-y-3 flex-wrap">
                    
                    <div className="flex justify-center items-center relative w-[160px] h-24 rounded-lg overflow-hidden">
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
                    </div>

                    <div className="flex flex-col gap-y-3">

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

                        {(curpt?.pt_category || curpt?.pt_brand) &&
                            <>
                                <div className="flex justify-between items-center w-full flex-wrap gap-x-6 gap-y-5">

                                    {(curpt?.pt_category) &&
                                        <>
                                            <h3 className="text-base px-2 py-1 border-2 border-solid border-orange-400 rounded-md btn-tp break-all"
                                            >
                                                {curpt?.pt_category}
                                            </h3>
                                        </>
                                    }
                                    {(curpt?.pt_brand) &&
                                        <>
                                            <h3 className="text-base px-2 py-1 border-2 border-solid border-orange-400 rounded-md btn-tp break-all">
                                                {curpt?.pt_brand}
                                            </h3>
                                        </>
                                    }
                                </div>
                            </>
                        }

                    </div>


                </div>

                <hr className='my-2 border-b-orange-400 border-b-2' />

                <div className="w-full flex justify-between items-center gap-x-8 gap-y-8 flex-wrap">

                    <div className="text-lg font-medium px-4 py-2 border border-solid border-orange-400 rounded-md btn-tp break-all">
                        <span className="select-none" >
                            {`₹ `}
                        </span>
                        <span className="" >
                            {`${curpt?.pt_price}`}
                        </span>

                    </div>

                </div>

                <div className="w-full flex justify-between items-center gap-x-8 gap-y-8 flex-wrap">

                    <div className="text-lg font-medium px-4 py-2 border border-solid border-orange-400 rounded-md btn-tp break-all">
                        <span className="select-none" >
                            {`₹ `}
                        </span>
                        <span className="" >
                            {`${curpt?.pt_price}`}
                        </span>

                    </div>

                </div>

                <button onClick={update_qty_from_cart}>Update qty </button>
            </div>
        </div>
    )
}

export default Cart_card