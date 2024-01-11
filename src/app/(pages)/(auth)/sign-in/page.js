// -----------------------------------------------------
// step 11 :: Total 26 Stpes :: Session, SignOut, SignIn
// ---------------------------------------------------------
import Goto_btn from '@/app/components/server/atoms/Goto_btn'
import Sign_btns from '@/app/components/server/atoms/sign_btns'
import React from 'react'

// -----------------------------------------------------

const Login = ({ revalidateAll }) => {
    // console.log('login started');

    // 2nd screen :: Logged out screen...
    // step 11.14.02 :: if "session.user" :: Object exist ::
    return (
        <>
            <div className="bg-white text-black min-h-screen">

                {/* step 11.16 :: Ui screen for Sign up Screen :: */}
                <div className="px-5 py-3 flex justify-between items-center gap-3">
                    <div className="text-black bg-white rounded-lg">
                        <Goto_btn goto='/' name='Home'></Goto_btn>
                    </div>

                    <div className="text-black bg-white rounded-lg">
                        <Sign_btns signup={true}></Sign_btns>
                    </div>
                </div>

                <div className="xl:max-w-[1336px] px-5 py-3 lg:py-6 mx-auto flex flex-col lg:flex-row flex-wrap justify-between items-center gap-y-12">
                    {/* Heading Box */}
                    <div className="lg:w-1/2 lg:pr-0 pr-0 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h1 className="title-font font-medium xl:text-5xl lg:text-[32px] md:text-4xl text-3xl text-gray-900 !leading-snug">
                            Welcome To Kashi Organics
                        </h1>

                        <div className="text-center lg:text-left">
                            <p className="leading-relaxed mt-4 xl:text-xl md:text-xl text-lg max-w-[560px] text-gray-600">
                                Organic food for a golden life.
                                If you want to feel better, eat better.
                                Use Eco-friendly products and Enjoy Nature...
                            </p>
                        </div>

                    </div>

                    {/* Sign-up or Sign-in Box */}
                    <form action="/auth/signin" method="post" className="md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full gap-8 max-w-md min-h-[384px] border-2 border-solid border-orange-400">

                        <h2 className="text-gray-900 xl:text-3xl text-2xl font-medium title-font">
                            Sign in
                        </h2>

                        <div className="flex flex-col gap-6">

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="xl:text-xl leading-5 text-sm text-gray-600">Email</label>
                                <input type="email" id="email" name="email"
                                    // ------------------------------------
                                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-[16px] leading-[28px] outline-none text-gray-700 py-1 px-3   "
                                />

                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="password" className="leading-5 xl:text-xl text-sm text-gray-600 capitalize">
                                    password
                                </label>
                                <input type="password" name="password"
                                    // ------------------------------------
                                    className='w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-[16px] leading-[28px]  outline-none text-gray-700 py-1 px-3 '
                                />

                            </div>
                        </div>

                        <div className="flex gap-3 justify-between  ">
                            <button formAction="/auth/signin" className="w-1/2 text-black  focus:outline-none py-3 text-lg font-medium border-0 border-solid border-orange-400 rounded-lg  bg-yellow-300 ">
                                Sign in
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login