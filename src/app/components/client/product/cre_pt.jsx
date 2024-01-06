'use client'
import axios from 'axios';
import React, { useState } from 'react'
import Cre_pt_form from './cre_pt_form';


const Cre_pt = ({ revalidateAll }) => {

    const [formDisplay, setFormDisplay] = useState(false)

    return (
        <>
            <div className="flex flex-col gap-y-12 items-start">
                <button onClick={() => { setFormDisplay(!formDisplay) }} className="btn-tp bg-transparent text-black border-2 border-solid border-red-400 rounded-lg focus:outline-none flex justify-center items-center gap-2 text-base md:text-lg leading-6 py-2 px-4 md:px-8 font-medium" >
                    Create New Product
                </button>

                <div className={`${(formDisplay) ? 'block' : 'hidden'}`}>
                    <Cre_pt_form revalidateAll={revalidateAll}></Cre_pt_form>
                </div>

            </div>

        </>
    )
}

export default Cre_pt