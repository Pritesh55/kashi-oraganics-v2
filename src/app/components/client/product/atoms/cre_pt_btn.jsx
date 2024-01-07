
import React from 'react'
import Link from 'next/link';

const Cre_pt_btn = ({ revalidateAll }) => {

    return (
        <>
            <div className="flex flex-col gap-y-12 items-start">
                <Link href='/admin/cre_pt' className="btn-tp bg-transparent text-black border-2 border-solid border-red-400 rounded-lg focus:outline-none flex justify-center items-center gap-2 text-base md:text-lg leading-6 py-2 px-4 md:px-8 font-medium" >
                    Create New Product
                </Link>

            </div>

        </>
    )
}

export default Cre_pt_btn