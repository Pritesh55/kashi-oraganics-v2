
import React from 'react'
import Link from 'next/link';
import { revalidateAll } from '@/app/actions';

const Goto_btn = ({ name = ``, goto, formAction, btn_bg = 'bg-white btn-tp' }) => {

    return (
        <>

            {(goto) && <>
                <Link href={`${goto}`} className={` ${btn_bg} text-black   border-2 border-solid border-orange-400 rounded-lg focus:outline-none justify-center items-center gap-2 text-base leading-5 py-2 px-4 font-medium tracking-wider capitalize`} >
                    {name}
                </Link>
            </>


            }

            {

                (!goto && !formAction) &&
                <>
                    <button className={`  ${btn_bg} text-black   border-2 border-solid border-orange-400 rounded-lg focus:outline-none justify-center items-center gap-2 text-base leading-5 py-2 px-4 font-medium tracking-wider capitalize`} >
                        {name}
                    </button>


                </>
            }

            {

                (!goto && formAction) &&
                <>
                    <button href={`${goto}`} formAction="/auth/signout" className={`  ${btn_bg} text-black   border-2 border-solid border-orange-400 rounded-lg focus:outline-none justify-center items-center gap-2 text-base leading-5 py-2 px-4 font-medium tracking-wider capitalize`} >
                        {name}
                    </button>


                </>
            }
        </>
    )
}

export default Goto_btn


// 