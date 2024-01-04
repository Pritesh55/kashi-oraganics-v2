import Image from 'next/image'
import React from 'react'

const Show_All_products_Admin = () => {
    return (
        <div className="flex flex-col items-start border-orange-400 border-2 rounded-lg px-10 pt-5 pb-5 w-full h-max max-w-[100%] md:max-w-[45%]">

            {/* <div className=''>{`${`userEmailFull`}`} </div> */}

            {/* id */}
            <div className="relative w-full ">
                {/* ---------------------------------------------------------- */}
                {/* {
                    (isEdit == false && isAdmin) &&
                    <>
                        <button onClick={() => {
                            updateProduct(id);
                        }} className="absolute -top-5 -left-10 px-3 py-1 border-r-2 border-b-2 border-r-orange-400 border-b-orange-400 rounded-br-lg text-base z-50">
                            {`Edit`}
                        </button>
                    </>
                } */}
                

                <button onClick={() => {
                    // updateProduct(id);
                }} className="absolute -top-5 -left-10 px-3 py-1 border-r-2 border-b-2 border-r-orange-400 border-b-orange-400 rounded-br-lg text-base z-50">
                    {/* <Image src='/trash.svg' alt='' width={20} height={20} className=''></Image> */}

                    {`Edit`}
                </button>
                {/* ---------------------------------------------------------- */}

                {/* ---------------------------------------------------------- */}
                {/* {
                    (isEdit && isAdmin) &&
                    <>
                        <button onClick={() => { editdone(); }} className="absolute -top-5 -left-10 px-3 py-1 border-r-2 border-b-2 border-r-orange-400 border-b-orange-400 rounded-br-lg text-base z-50">
                            {`Edit done`}
                        </button>
                    </>
                } */}

                {/* ---------------------------------------------------------- */}

                <div className="relative">
                    {/* ------------------------------------------------------------- */}
                    {/* {
                        (isEdit == false) &&
                        <>
                            <h6 className="mb-2 text-2xl font-semibold text-orange-500 text-center min-h-[40px] flex justify-center">
                                <span className="">
                                    {`${id}`}
                                </span>

                            </h6>
                        </>
                    } */}

                    <h6 className="mb-2 text-2xl font-semibold text-orange-500 text-center min-h-[40px] flex justify-center">
                        <span className="">
                            {/* {`${id}`} */}
                            {`01`}
                        </span>

                    </h6>

                    {/* ------------------------------------------------------------- */}
                    {/* ------------------------------------------------------------- */}
                    {/* {
                        (isEdit) &&
                        <>
                            <div className="mb-2 text-2xl font-semibold text-orange-500 text-center min-h-[40px] flex justify-center ">

                                <div className="absolute z-10">

                                    <input type='number' className="mb-2 text-2xl font-semibold text-orange-500 text-center " value={idInput}
                                        onChange={(event) => {
                                            setIdInput(event.target.value);
                                            console.log(idInput);
                                        }}>
                                    </input>
                                </div>

                            </div>
                        </>
                    } */}

                    {/* ------------------------------------------------------------- */}

                </div>

                {/* ------------------------------------------------------------- */}
                {/* {
                    (isAdmin) &&
                    <>
                        <button onClick={() => { deleteProduct(id); }} className="absolute -top-5 -right-10 z-50 px-3 py-2 border-l-2 border-b-2 border-l-orange-400 border-b-orange-400 rounded-bl-lg">
                            <Image src='/trash.svg' alt='' width={20} height={20} className=''></Image>
                        </button>
                    </>
                } */}

                <button onClick={() => {
                    // deleteProduct(id);
                }} className="absolute -top-5 -right-10 z-50 px-3 py-2 border-l-2 border-b-2 border-l-orange-400 border-b-orange-400 rounded-bl-lg">
                    <Image src='/trash-icon.svg' alt='' width={20} height={20} className=''></Image>
                </button>
                {/* ------------------------------------------------------------- */}


            </div>

            <hr className='border-t-2 border-orange-400 w-full' />

            <div className="w-full h-full pt-4 flex flex-col gap-y-5 md:flex-row gap-x-8 items-center">

                {/* Image */}
                <Image

                    // src={(img) ? img : 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}
                    src={'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}


                    alt="team" width={64} height={64} className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full" />

                <div className="flex flex-col gap-y-4 w-full">

                    {/* Title and description */}
                    <div className="flex flex-col items-center md:items-start">

                        {/* ------------------------------------------------------------- */}
                        {/* {
                            (isEdit == false) &&
                            <>
                                <h2 className="text-xl text-gray-900 font-medium">
                                    {`title`}
                                </h2>

                            </>
                        } */}


                        <h2 className="text-xl text-gray-900 font-medium">
                            {`title`}
                        </h2>

                        {/* ------------------------------------------------------------- */}


                        {/* ------------------------------------------------------------- */}

                        {/* {
                            (isEdit == true) &&
                            <>

                                <div className="w-full min-h-[35px] relative">

                                    <div className="absolute z-10 flex items-center">

                                        <input type='text' className="text-xl text-gray-900 font-medium w-full" value={titleInput}
                                            onChange={(event) => {
                                                settTitleInput(event.target.value);
                                                console.log(titleInput);
                                            }}>
                                        </input>
                                    </div>

                                </div>

                            </>
                        } */}

                        {/* ------------------------------------------------------------- */}

                        {/* ------------------------------------------------------------- */}
                        {/* {
                            (isEdit == false) &&
                            <>
                                <p className="text-sm text-gray-500">
                                    {description}
                                </p>
                            </>
                        } */}

                        <p className="text-sm text-gray-500">
                            {`description`}
                        </p>

                        {/* ------------------------------------------------------------- */}

                        {/* {
                            (isEdit == true) &&
                            <>
                                <div className="w-full min-h-[25px] relative">

                                    <div className="absolute z-10 flex items-center">

                                        <input type='text' className="text-sm text-gray-500 w-full" value={descriptionInput}
                                            onChange={(event) => {
                                                setDescriptionInput(event.target.value);
                                                console.log(descriptionInput);
                                            }}>
                                        </input>

                                    </div>
                                </div>
                            </>
                        } */}

                    </div>

                    {/* Price */}
                    <div className="flex justify-center md:justify-start gap-x-2 text-2xl text-black font-semibold ">
                        {/* ------------------------------------------------------------- */}
                        {/* {
                            (isEdit == false) &&
                            <>

                                <p className="text-2xl text-black font-semibold">
                                    {`${price} ₹`}
                                </p>
                            </>
                        } */}

                        <p className="text-2xl text-black font-semibold">
                            {/* {`${price} ₹`} */}
                            {`500 ₹`}
                        </p>
                        {/* ------------------------------------------------------------- */}

                        {/* ------------------------------------------------------------- */}
                        {/* {
                            (isEdit == true) &&
                            <>
                                <div className="w-full min-h-[40px] relative">

                                    <div className="absolute z-10 flex gap-x-2 items-center max-w-full">

                                        <input id='productPrice' type='number' className="text-2xl text-black font-semibold max-w-full" value={priceInput}
                                            onChange={(event) => {
                                                setPriceInput(event.target.value);
                                                console.log(priceInput);
                                            }}>
                                        </input>


                                    </div>


                                </div>
                            </>
                        } */}

                        {/* ------------------------------------------------------------- */}

                    </div>

                    {/* Quantity */}
                    <div className="flex flex-col gap-y-1 items-center font-semibold  w-full sm:w-1/2 lg:w-1/4 prevent-select mx-auto md:mx-0">

                        {/* Quantity */}
                        <div className="flex justify-center ">

                            {/* Minus Icon */}
                            <svg
                                // (decProductQuantity) 01 :: Call incProductQuantity function on Click on Plus Icon....
                                onClick={() => {
                                    // decProductQuantity();
                                }} className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512" ><path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                            </svg>

                            {/* Product Quantity */}
                            <input className="mx-2 prevent-select text-lg border text-center w-8" type="text"
                                // value={quantity}
                                value={1}
                                readOnly />

                            {/* Plus Icon */}
                            <svg className="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512"
                                // (incProductQuantity) 01 :: Call incProductQuantity function on Click on Plus Icon....
                                onClick={() => {
                                    // incProductQuantity(id); 
                                }}>

                                <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                            </svg>
                        </div>

                        <span className="lg:hidden text-sm text-orange-400">
                            Product Quantity
                        </span>
                    </div>

                    {/* Total */}
                    <div className="">
                        {`Total : ${`price * quantity`}`}
                    </div>

                    {/* Add to cart , Remove from cart */}
                    <div className="flex flex-col gap-y-4 items-center md:items-start">


                        {/* ------------------------------------------------------------------- */}

                        <div className="flex flex-col md:flex-row items-center flex-wrap gap-x-2 gap-y-4">

                            <button onClick={() => {

                                // ucartAdd();

                            }} className="flex px-4 py-2 bg-orange-200 text-black text-sm font-medium rounded-md text-center">
                                Add to uCart
                            </button>

                            <button onClick={() => {

                                // ucartRemove();

                            }} className="flex px-4 py-2 bg-orange-200 text-black text-sm font-medium rounded-md text-center">
                                Remove from ucart
                            </button>
                        </div>

                        <h1 className="text-orange-600 font-medium text-xl capitalize">
                            {/* {`Now : ${isAddedToCart4}`} */}
                        </h1>

                        {/* ------------------------------------------------------------------- */}

                    </div>

                </div>

            </div>

        </div >
    )
}

export default Show_All_products_Admin