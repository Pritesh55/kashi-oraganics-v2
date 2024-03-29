'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import useSWR from 'swr';

const LoginBtn = ({ isBgDark = true, signup = false, signin = false, revalidateAll }) => {
    const router = useRouter();

    const [user_id, setUser_id] = useState();
    const [email_id, setEmail_id] = useState();

    const fetcher = (...args) => fetch(...args).then(res => res.json())

    const { data: sessionData, error: sessionError, isLoading: sessionIsLoading } = useSWR('/api/session', fetcher);

    // -----------------------------------------------------
    // Step 11.02 :: Innitiate :: createClientComponentClient
    const supabase = createClientComponentClient();

    useEffect(() => {

        // Step 11.07 :: Define async function :: to fetch data from supabse...
        const getSession = async () => {

            // -------------------------------------------------------------
            // Step 11.09 :: get sessionData :: supabase.auth.getSession();
            const { data: sessionData, error: sessionError }
                = await supabase.auth.getSession();

            // ------------------------------------------------
            // Step 11.10  :: "sessionData?.session" :: Two Options ::
            // 1) Object 2) null

            // "sessionData?.session" :: 1) Object
            if (sessionData?.session !== null) {

                setUser_id(sessionData.session?.user?.id);
                setEmail_id(sessionData.session.user.email);

                // console.log(`user_id =`, user_id);
                // --------------------------------------

            }

            // "sessionData?.session" :: 2) null 
            if (sessionData.session == null) {
                setUser_id(null);
            }
        }


        // Step 11.08 :: call async function ::
        getSession();

    }, [user_id])


    // step 12.01 :: create handleSignOut :: async :: Function
    const handleSignOut = async () => {
        // ------------------------------------------------------
        // console.log("\n\n");
        // console.log("handleSignOut Started...");
        // ------------------------------------------------------
        // step 12.01 :: get SignOut data :: await supabase.auth.signOut()
        const { data: signOutData, error: signOutError }
            = await supabase.auth.signOut();


        setUser_id(null);
        // We receive "signOutError"...
        // console.log(`signOutError = ${signOutError}`);

        // step 12.02 :: if signOutError is null ,
        if (signOutError == null) {
            // then, User is Suceesfully Log-out...
            setUser_id(null);

            // console.log(`${user_id}`);
            revalidateAll();
            router.refresh();

        }
        // ------------------------------------------------------
        // console.log("handleSignOut Ended...");
        // console.log("\n\n");
        // ------------------------------------------------------
    }

    const handleSession = () => {
        if (user_id == null) {
            router.replace(`sign-in`);
        } else {
            handleSignOut();
        }
    }


    if (sessionIsLoading) return <div>loading...</div>

    return (
        <>

            <div className="flex gap-6 flex-wrap ">

                {(user_id !== null) && <>

                    <Link href={`/profile`} scroll={false}
                        className={` ${(isBgDark) ? `bg-black text-white hover:border-[#ffd700] hover:text-[#ffd700]` : `btn-tp bg-white text-black `}  border-2 border-solid border-orange-400 rounded-lg focus:outline-none justify-center items-center gap-2 text-base leading-5 py-2 px-4 font-medium tracking-wider`}>
                        Profile 4
                    </Link>
                </>
                }


                {(user_id == null && signup == false) &&
                    <>
                        <Link href={`/sign-up`} scroll={false}
                            className={` ${(isBgDark) ? `bg-black text-white hover:border-[#ffd700] hover:text-[#ffd700]` : `btn-tp bg-white text-black `}  border-2 border-solid border-orange-400 rounded-lg focus:outline-none justify-center items-center gap-2 text-base leading-5 py-2 px-4 font-medium tracking-wider`}>
                            Sign up 4 
                        </Link>

                    </>
                
                }


                {(signin == false) &&

                    <button onClick={() => {
                        handleSession();
                    }}
                        className={` ${(isBgDark) ? `bg-black text-white hover:border-[#ffd700] hover:text-[#ffd700]` : `btn-tp bg-white text-black`} border-2 border-solid border-orange-400 rounded-lg focus:outline-none justify-center items-center gap-2 text-base leading-5 py-2 px-4 font-medium tracking-wider`}>
                        {(user_id == null) ? `Sign in 4` : `Sign out 4`}
                    </button>

                }

            </div>
        </>
    )
}

export default LoginBtn