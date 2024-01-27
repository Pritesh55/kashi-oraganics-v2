import React from 'react'
import Link from 'next/link';
import { revalidateAll } from '@/app/actions';

const Goto_btn = ({ name = ``, goto, formAction, btn_bg = 'bg-white btn-tp' }) => {

    return (
        <>

            {(goto) && <>
                <Link href={`${goto}`} scroll={false} className={` ${btn_bg} text-black flex justify-center items-center gap-2 text-base leading-5 md:leading-normal font-medium tracking-wider capitalize px-4  py-2 border-2 border-solid border-orange-400 rounded-lg focus:outline-none `} >
                    {name}
                </Link>
            </>
            }

            {
                (!goto && !formAction) &&
                <>
                    <button className={`  ${btn_bg} text-black flex justify-center items-center gap-2 text-base leading-5 font-medium tracking-wider capitalize px-4  py-2 border-2 border-solid border-orange-400 rounded-lg focus:outline-none `} >
                        {name}
                    </button>
                </>
            }

            {
                (!goto && formAction) &&
                <>
                    <button href={`${goto}`} formAction="/auth/signout" className={`  ${btn_bg} text-black flex justify-center items-center gap-2 text-base leading-5 font-medium tracking-wider capitalize px-4  py-2 border-2 border-solid border-orange-400 rounded-lg focus:outline-none`} >
                        {name}
                    </button>
                </>
            }
        </>
    )
}

export default Goto_btn


// 