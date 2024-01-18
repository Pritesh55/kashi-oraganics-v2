import Form_Submit_top_btn from '@/app/components/design-inspire/Form_Submit_top_btn'

import React from 'react'
import Form_heading from '../atoms/forms/Form_heading';

const FormLayout = () => {
    return (
        <div className=" bg-white rounded-lg p-8 flex flex-col w-full gap-8 min-h-[384px] border-2 border-solid border-orange-400 relative">


            <div className="flex justify-between gap-x-6 gap-y-3  items-center flex-wrap">
                <Form_heading name={`Edit product`}></Form_heading>

                <Form_Submit_top_btn
                    btn_name='Create Product'
                    onClick={() => {
                        setUserChange(true);
                        setCre_pt_btn(true);
                    }}
                ></Form_Submit_top_btn>


            </div>


            {/* step 15.02 :: Profile Update ::  */}
            <div className="flex gap-y-4 lg:gap-y-12 flex-wrap ">
                <div className="min-w-full flex gap-y-8 gap-x-12 flex-wrap items-start px-5 lg:px-12  justify-start lg:justify-start py-8 border-2 border-solid border-orange-400">

                </div>
            </div>
        </div>
    )
}

export default FormLayout