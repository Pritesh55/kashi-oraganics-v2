import Link from 'next/link';
import React from 'react'

const Sign_btns = ({
    signup = false, signin = false, signout = false,
    profile = false, user_id, user_profile,
    isBgDark = false,
}) => {

    // console.log(`signup in sign_btns = `, signup);
    // console.log(`user_id in sign_btns = `, user_id);

    return (
        <>
            <div className="flex gap-x-3 md:gap-x-6 gap-y-3 flex-wrap ">

                {(user_id !== undefined) && <>

                    <Link href={`/profile`}
                        className={` ${(isBgDark) ? `bg-black text-white hover:border-[#ffd700] hover:text-[#ffd700]` : `btn-tp bg-white text-black `}  border-2 border-solid border-orange-400 rounded-lg focus:outline-none justify-center items-center gap-2 text-base leading-5 py-2 px-4 font-medium tracking-wider`}>
                        Profile 
                    </Link>
                </>
                }

                {(signup == true) &&
                    <>
                        <Link href={`/sign-up`}
                            className={` ${(isBgDark) ? `bg-black text-white hover:border-[#ffd700] hover:text-[#ffd700]` : `btn-tp bg-white text-black `}  border-2 border-solid border-orange-400 rounded-lg focus:outline-none justify-center items-center gap-2 text-base leading-5 py-2 px-4 font-medium tracking-wider`}>
                            Sign up 
                        </Link>

                    </>

                }

                {(signin == true) &&

                    <Link href={`/sign-in`}
                        className={` ${(isBgDark) ? `bg-black text-white hover:border-[#ffd700] hover:text-[#ffd700]` : `btn-tp bg-white text-black`} border-2 border-solid border-orange-400 rounded-lg focus:outline-none justify-center items-center gap-2 text-base leading-5 py-2 px-4 font-medium tracking-wider`}>
                        {`Sign in`}
                    </Link>

                }

                {(signout == true) &&

                    <form action="/auth/signout" method="post" className='text-black'>
                        <button formAction="/auth/signout"
                            className={` ${(isBgDark) ? `bg-black text-white hover:border-[#ffd700] hover:text-[#ffd700]` : `btn-tp bg-white text-black`} border-2 border-solid border-orange-400 rounded-lg focus:outline-none justify-center items-center gap-2 text-base leading-5 py-2 px-4 font-medium tracking-wider`}>
                            {`Sign out`}
                        </button>
                    </form>


                }

            </div>
        </>
    )
}

export default Sign_btns