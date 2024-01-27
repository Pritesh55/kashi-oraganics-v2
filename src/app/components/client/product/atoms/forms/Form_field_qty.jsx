import Image from 'next/image';
import React from 'react'

const Form_field_qty = (props) => {

    // Step 04 :: pass :: the value you got from the input :: to the parent's method
    const change_handler = (e) => {
        props.handler_name(e.target.value);
    }
    // Step 04 :: pass :: the value you got from the input :: to the parent's method
    const inc_qty = (e) => {
        props.handler_name(Number(props.state_var) + 1);
    }

    const dec_qty = (e) => {
        props.handler_name(Number(props.state_var) - 1);
    }

    return (
        <>
            {/* 01 :: */}
            <div className="flex items-center justify-center gap-x-4">
                <button id="decrement-btn" onClick={dec_qty}
                    className="flex justify-center items-center w-10 h-10 text-white focus:outline-none bg-yellow-300 hover:bg-yellow-400 rounded-full">
                    <Image src='/minus-icon.svg' width={24} height={24} alt='plus'></Image>
                </button>


                <input type="number" className="outline-none focus:outline-none text-center  hover:text-black focus:text-black flex items-center text-2xl font-medium h-10 w-[100px]
                 bg-gray-50 cursor-text" name="custom-input-number"

                    // ------------------------------------
                    value={
                        (props.state_var == 'undefined')
                            ? props.any
                            : props.state_var
                    }
                    onChange={change_handler}
                // ------------------------------------
                ></input>

                <button id="increment-btn" onClick={inc_qty}
                    className="flex justify-center items-center w-10 h-10  text-white focus:outline-none bg-yellow-300 hover:bg-yellow-400 rounded-full">
                    <Image src='/plus-icon.svg' width={24} height={24} alt='plus'></Image>
                </button>
            </div>
        </>
    )
}

export default Form_field_qty