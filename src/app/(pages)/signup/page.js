'use client'
// -----------------------------------------------------
// step 11 :: Total 26 Stpes :: Session, SignOut, SignIn
// ---------------------------------------------------------
import React from 'react'

// Step 11.01 :: import :: createClientComponentClient
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
// -----------------------------------------------------

// -----------------------------------------------------
// Step 11.03 :: State Variable import :: useState,useEffect
import { useEffect, useState } from 'react'

// step 11.18 :: import Link component
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import LoginBtn from '@/app/components/client/LoginBtn'
// -----------------------------------------------------

const SignUp = () => {
    console.log('SignUp started');
    const router = useRouter();

    // -----------------------------------------------------
    // Step 11.02 :: Innitiate :: createClientComponentClient
    const supabase = createClientComponentClient();


    // after Sign in ::
    // -----------------------------------------------------
    // Step 11.04 :: State Variable define :: (1) session, (2) user => user_id,email_id
    const [session, setSession] = useState();
    const [user, setUser] = useState();
    // -----------------------------------------------------
    const [user_id, setUser_id] = useState('');
    const [email_id, setEmail_id] = useState('');
    // -----------------------------------------------------

    // ----------------------------------------------------- 
    // Step 11.06 :: define userChange :: 
    const [userChange, setUserChange] = useState(false);
    // :: To determine when useEfeect should reRun :: to reFetch the data :: for Login and LogOut
    // ----------------------------------------------------- 


    // -----------------------------------------
    // step 11.15 :: For sign up ::
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // SignUp and SinIn Error :: state variable...
    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const [isSignInInvalid, setIsSignInInvalid] = useState(false);


    // step 15.01 :: ProfileData :: state variable
    const [userProfile, setUserProfile] = useState({});
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [email_id_Profile_Update, setEmail_id_Profile_Update] = useState('');
    const [whatsapp_number, setWhatsapp_number] = useState('');
    const [mobile_number, setMobile_number] = useState('');
    const [address, setAddress] = useState('');




    // -------------------------------------------------
    // Step 11.05 :: initiate useEffect ::
    useEffect(() => {

        // Step 11.07 :: Define async function :: to fetch data from supabse...
        const getSession = async () => {

            // -------------------------------------------------------------
            // Step 11.09 :: get sessionData :: supabase.auth.getSession();
            const { data: sessionData, error: sessionError }
                = await supabase.auth.getSession();

            // We receive "sessionData" and "sessionError"
            console.log(`sessionData=`, sessionData);

            // "sessionData" is a Object ::
            console.log(`user_id=`, sessionData?.session?.user?.id);

            // It contain only one Object :: "session"
            // "session" Object contains :: "user" Object
            // "user" object :: "id" object :: known as "user_id"
            console.log(`sessionError= ${sessionError}`);
            console.log(`\n\n`);
            // -------------------------------------------------------------


            // ------------------------------------------------
            // Step 11.10  :: "sessionData?.session" :: Two Options ::
            // 1) Object 2) null

            // "sessionData?.session" :: 1) Object
            if (sessionData?.session !== null) {

                // If it is not null, Then User is Logged in....
                // ------------------------------------------------

                // Console.log :: "sessionData.session" ::
                console.log(`sessionData.session=`, sessionData.session);

                console.log(`
            Now, "sessionData.session" is an "Object"... 
            So, "sessionData.session" is not "null \n 
            So, Yes, "sessionData.session" is there...
            So, from "session" in "sessionData", We determines that \n
            "Yes, The User is Logged in".`);
                console.log(`\n\n`);
                // So, from "session" in "sessionData" ,  
                // We determines that "User is Logged in"
                // ---------------------------------------------------------

                // Step 11.11 :: to display Log_in screen  
                // Update "user" :: so, It can dispaly 2nd screen

                // Update State Variable :: "session" , "user" 
                setSession(sessionData.session);
                setUser(sessionData.session?.user);
                // As, "user" will be updated from 'null'....
                // So, Ui will display "2nd scrren :: Log_in screen"
                // --------------------------------------

                // Step 11.12 :: So, retrive "user_id" and "email_id" from "sessionData.session"
                // Update State Variable :: "user_id", "email_id"
                setUser_id(sessionData.session.user.id);
                setEmail_id(sessionData.session.user.email);

                console.log(`user_id =`, user_id);
                // --------------------------------------



                // step 15.03 :: Find by user_id
                // -------------------
                const { data: findUserProfileData, error: findUserProfileError } = await supabase
                    .from('profiles')
                    .select()
                    .eq('user_id', sessionData.session.user.id);


                // if there is dfata, then Set all State variables...
                if (findUserProfileData !== null &&
                    findUserProfileData[0] !== undefined &&
                    findUserProfileError == null) {

                    // findUserProfileData is an array[] of user Objects[]...
                    console.log(`findUserProfileData  =`, findUserProfileData);
                    // But, We will get :: Only 1 user :: from find by userid , 

                    console.log(`findUserProfileData[0]  =`, findUserProfileData[0]);
                    // array has only one Object :: findUserProfileData[0]

                    let findUserProfileDataObject = findUserProfileData[0];

                    setUserProfile(findUserProfileDataObject);

                    if (findUserProfileDataObject?.first_name == "null") {
                        setFirst_name('');
                    } else {
                        setFirst_name(findUserProfileDataObject.first_name);
                    }

                    (findUserProfileDataObject.last_name == "null") ?
                        setLast_name('') :
                        setLast_name(findUserProfileDataObject.last_name);

                    (findUserProfileDataObject.email_id == "null") ?
                        setEmail_id_Profile_Update('') :
                        setEmail_id_Profile_Update(findUserProfileDataObject.email_id);

                    (findUserProfileDataObject.mobile_number == "null") ?
                        setMobile_number('') :
                        setMobile_number(findUserProfileDataObject.mobile_number);

                    (findUserProfileDataObject.whatsapp_number == "null") ?
                        setWhatsapp_number('') :
                        setWhatsapp_number(findUserProfileDataObject.whatsapp_number);

                    (findUserProfileDataObject.address == "null") ?
                        setAddress('') :
                        setAddress(findUserProfileDataObject.address);

                } else {
                    console.log(`findUserProfileData :: Can't find userData`);
                    console.log(`findUserProfileError= `, findUserProfileError);
                }
            }

            // "sessionData?.session" :: 2) null 
            if (sessionData.session == null) {
                // If it is null, Then User is Logged Out....

                // Step 11.13 :: display Logged Out screen...
                setUser(null);
                // As, "user" will be updated to 'null'....
                // So, Ui will display Default ::
                // :: "1st scrren :: Logged Out screen"
                // --------------------------------------

                // ----------------------------------------------------
                console.log(`sessionData.session=`, sessionData.session);

                console.log(`
                                Now, sessionData.session is "null"...
                                So, No, There is no "sessionData.session"...
                                So, by "sessionData.session", We econclude that \n
                                No, User is not Logged in...
                                `);

                console.log(`\n\n`);
                // ----------------------------------------------------

            }
        }

        // Step 11.08 :: call async function ::
        getSession();

    }, [userChange])
    // -----------------------------------------





    // step 12.01 :: create handleSignOut :: async :: Function
    const handleSignOut = async () => {
        // ------------------------------------------------------
        console.log("\n\n");
        console.log("handleSignOut Started...");
        // ------------------------------------------------------
        // step 12.01 :: get SignOut data :: await supabase.auth.signOut()
        const { data, error: signOutError }
            = await supabase.auth.signOut();

        // We receive "signOutError"...
        console.log(`signOutError = ${signOutError}`);

        // step 12.02 :: if signOutError is null ,
        if (signOutError == null) {
            // then, User is Suceesfully Log-out...

            router.replace('/');

            // So, Ui will display 1st default Logged-out screen..

            // step 12.5 :: toggle :: userChange :: (Optional)
            // to reRun useeffect :: to ReCheck user "session"...
            //----------------------------------------------------- 
            // setUserChange(!userChange);


            // step 12.03 :: rest email and passward
            // setEmail('');
            // setPassword('');

            // step 12.04 :: So, reset "user" to 'null...
            setSession(null);
            setUser(null);

            setUser_id('');
            setEmail_id('');

            // So, Another User after sign in can not see this data...
            setUserProfile({});
            setFirst_name('');
            setLast_name('');
            setEmail_id_Profile_Update('');
            setMobile_number('');
            setWhatsapp_number('');
            setAddress('');

        }

        // ------------------------------------------------------
        console.log("handleSignOut Ended...");
        console.log("\n\n");
        // ------------------------------------------------------
    }

    // step 13.01 :: create handleSignIn :: async :: Function
    const handleSignIn = async () => {
        // ----------------------------------------------------
        console.log("\n\n");
        console.log("handleSignIn Started...\n\n");
        // ----------------------------------------------------

        console.log(`User Entered :: Email :: ${email} `);
        console.log(`User Entered :: password :: ${password} \n`);

        // ------------------------------------------------------
        // step 13.01 :: get user's entered signInData :: supabase.auth.signInWithPassword()
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        // signInData is an "object"
        // ------------------------------------------------------
        console.log(' signInData = ', signInData);
        console.log(`signInError =`, signInError, '\n\n');
        // ------------------------------------------------------

        // step 13.02 :: if Theres is no SignIn Error,
        if (!signInError) {

            // signInData contains "two" objects :: 1) user 2) session
            console.log('signInData.session =', signInData.session);
            console.log('signInData.user =', signInData.user);

            // step 13.03 :: So, Update "session" and "user" variable ::
            setSession(signInData.session);
            setUser(signInData.user);

            // As, "user" updates to an Object from 'null', 
            // Ui will display 2nd screen :: Logged in Screen"

            // step 13.04 :: Reset :: user Entered email and passward....
            setEmail('');
            setPassword('');

            setIsAlreadyRegistered(false);
            setPasswordError('');
            setIsSignInInvalid(false);

            // if we want to ReRun useEffect ::
            setUserChange(!userChange);
        }


        // step 13.05 :: if Theres is SignIn Error,
        if (signInError) {

            // if error is 'AuthApiError', 
            if (signInError == `AuthApiError: Invalid login credentials`) {

                // step 13.06 :: Then, ui will display :: Incorrect Password ::
                setIsSignInInvalid(true);

            }
        }

        // ------------------------------------------------------
        console.log("handleSignIn Ended...");
        console.log("\n\n");
        // ----------------------------------------------------
    }

    // Step 14.01 :: create handleSignUp :: async :: Function
    const handleSignUp = async () => {
        // ----------------------------------------------------
        console.log("\n\n");
        console.log("handleSignUp Started...\n\n");
        // ----------------------------------------------------

        console.log(`User Entered :: Email :: ${email} `);
        console.log(`User Entered :: password :: ${password} \n`);

        // Step 14.02 :: get "signUpData" :: supabase.auth.signUp();
        // ------------------------------------------------------
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                emailRedirectTo: `${location.origin}/auth/callback`,
                // ${location.origin} = Root path
            },
        });

        // --------------------------------------------
        // flow goes to :: /auth/callback
        console.log(`flow goes to :: ${location.origin}/auth/callback`);
        console.log(`flow is back to this "Login page"...`);
        // --------------------------------------------

        // step 14.03 :: if User suceessfully Signed up,
        // The, error will be null,
        if (signUpError == null) {

            // signUpData contains "two" objects :: 1) user 2) session
            console.log('signUpData = ', signUpData);

            // step 14.04 :: So, Update "session" and "user" variable ::
            setSession(signUpData.session);
            setUser(signUpData.user);

            setUser_id(signUpData.user.id);
            setEmail_id(signUpData.user.email);
            setEmail_id_Profile_Update(signUpData.user.email);


            // ---------------------------------------------------
            // As, "user" updates to an Object from 'null', 
            // Ui will display 2nd screen :: Logged in Screen"

            // step 13.04 :: Reset :: user Entered email and passward....
            setEmail('');
            setPassword('');

            setIsAlreadyRegistered(false);
            setPasswordError('');
            setIsSignInInvalid(false);

            // if we want to ReRun useEffect ::
            // setUserChange(!userChange);


            // Add New Row to Profies Table ,When user Sign up First time....
            const { data: insertUserProfies, error: insertUserProfilesError } = await supabase
                .from('profiles')
                .insert([
                    {
                        user_id: signUpData.user.id,
                        email_id: signUpData.user.email,
                        first_name: '',
                        last_name: '',
                        mobile_number: '',
                        whatsapp_number: '',
                        address: '',
                    },
                ])
                .select();

            console.log(`insertUserProfies= `, insertUserProfies);
            console.log(`insertUserProfilesError= `, insertUserProfilesError);

            let insertProfileDataObject = insertUserProfies[0];

            console.log(`insertProfileDataObject= `, insertProfileDataObject);

            setUserProfile(insertProfileDataObject);

            (insertProfileDataObject.first_name == "null") ?
                setFirst_name('') :
                setFirst_name(insertProfileDataObject.first_name);

            (insertProfileDataObject.last_name == "null") ?
                setLast_name('') :
                setLast_name(insertProfileDataObject.last_name);

            (insertProfileDataObject.email_id == "null") ?
                setEmail_id_Profile_Update('') :
                setEmail_id_Profile_Update(insertProfileDataObject.email_id);

            (insertProfileDataObject.mobile_number == "null") ?
                setMobile_number('') :
                setMobile_number(insertProfileDataObject.mobile_number);

            (insertProfileDataObject.whatsapp_number == "null") ?
                setWhatsapp_number('') :
                setWhatsapp_number(insertProfileDataObject.whatsapp_number);

            (insertProfileDataObject.address == "null") ?
                setAddress('') :
                setAddress(insertProfileDataObject.address);
        }






        // step 14.04 :: if Theres is "SignUp Error",
        if (signUpError !== null) {
            console.log(`signUpError =`, signUpError);

            // step 14.04 :: User already registered
            if (signUpError == `AuthApiError: User already registered`) {

                // show this error in UI...
                setIsAlreadyRegistered(true);
                // ---------------------------------
                console.log(`Go to "handleSignIn" department...`);
                // ---------------------------------
                handleSignIn();

            }

            // step 14.04 :: Password should be at least 6 characters..
            if (signUpError == `AuthWeakPasswordError: Password should be at least 6 characters.`) {
                // show this error in UI...
                setPasswordError('Password should be at least 6 characters');
            }
        }

        // ------------------------------------------------------
        console.log("handleSignUp Ended...");
        console.log(`\n\n`);
    }

    // Step 15.02 :: Profile Update ::  async :: Function
    const updateProfile = async () => {
        // ------------------------------------------------------
        console.log("\n\n");
        console.log("updateProfile Started...");
        // ------------------------------------------------------

        const { data: updateProfileData, error: updateProfileError } = await supabase
            .from('profiles')
            .update({
                first_name: `${first_name}`, last_name: `${last_name}`,
                email_id: `${email_id_Profile_Update}`,
                mobile_number: `${mobile_number}`, whatsapp_number: `${whatsapp_number}`,
                address: `${address}`
            })
            .eq('user_id', user_id)
            .select();

        console.log(`updateProfileData= `, updateProfileData);
        console.log(`updateProfileError= `, updateProfileError);

        if (updateProfileData !== null &&
            updateProfileData[0] !== undefined &&
            updateProfileError == null) {

            let updateProfileDataObject = updateProfileData[0];

            console.log(`updateProfileDataObject= `, updateProfileDataObject);

            setUserProfile(updateProfileDataObject);

            (updateProfileDataObject.first_name == "null") ?
                setFirst_name('') :
                setFirst_name(updateProfileDataObject.first_name);

            (updateProfileDataObject.last_name == "null") ?
                setLast_name('') :
                setLast_name(updateProfileDataObject.last_name);

            (updateProfileDataObject.email_id == "null") ?
                setEmail_id_Profile_Update('') :
                setEmail_id_Profile_Update(updateProfileDataObject.email_id);

            (updateProfileDataObject.mobile_number == "null") ?
                setMobile_number('') :
                setMobile_number(updateProfileDataObject.mobile_number);

            (updateProfileDataObject.whatsapp_number == "null") ?
                setWhatsapp_number('') :
                setWhatsapp_number(updateProfileDataObject.whatsapp_number);

            (updateProfileDataObject.address == "null") ?
                setAddress('') :
                setAddress(updateProfileDataObject.address);
        }



    }




    // 2nd screen :: Logged In screen...
    // step 11.14.01 :: if "session.user" :: Object exist ::
    if (user) {

        return (
            <>

                <div className="text-black bg-white fixed top-3 md:top-3 right-5  z-[9999]">
                    <LoginBtn isBgDark={false}></LoginBtn>
                </div>

                {/* step 11.17 :: Ui screen after "Sign up" or after "sign in" :: */}
                <section className="text-gray-600 body-font bg-white min-h-screen">
                    <div className="2xl:container mx-auto w-full flex gap-8 justify-between flex-wrap p-5 items-center">
                        <Link href='/' className="btn-tp bg-transparent text-black border-2 border-solid border-red-400 rounded-lg focus:outline-none flex justify-center items-center gap-2 text-sm md:text-lg leading-6 py-2 px-4 md:px-8 font-medium" >

                            <span className="">
                                {` Home `}
                            </span>
                            <span className="hidden lg:inline">
                                {` Page `}
                            </span>
                        </Link>


                        <h1 className="text-2xl lg:text-3xl  font-medium title-font text-gray-900 hidden md:block">
                            <span className="">
                                Hi ,
                            </span>
                            <span className="">
                                {` ${user.email}`}
                            </span>

                        </h1>

                        <button onClick={handleSignOut} className="btn-tp bg-transparent text-black border-2 border-solid border-red-400 rounded-lg focus:outline-none flex justify-center items-center gap-2 text-sm md:text-lg leading-6 py-2 px-4 md:px-8 font-medium" >
                            Log Out
                        </button>
                    </div>

                    <div className="2xl:container flex flex-col px-5 md:px-8 lg:px-16 lg:py-8 mx-auto">

                        {/* <div className="flex flex-wrap w-full  flex-col gap-y-4 items-center text-center">


                            <p className="lg:max-w-lg w-full leading-relaxed text-gray-500  text-2xl text-center mx-auto">

                                {
                                    (isAlreadyRegistered) ?
                                    <>
                                        <span className="pr-3">
                                            Yes..
                                        </span>
                                        <span className="">
                                            You are already registered...
                                        </span>
                                    </> :
                                    <>
                                        You are already logged in...
                                    </>
                                }
                            </p>
                        </div>  */}


                        <div className="flex gap-y-4 lg:gap-y-12 flex-wrap py-4">

                            <div className="flex justify-between gap-x-5 gap-y-5 flex-wrap  w-full items-center">

                                <Link href={'/pt'}
                                    // onClick={() => { goToPayment(); }} 
                                    className="btn-tp bg-transparent text-black border-2 border-solid border-red-400 rounded-lg focus:outline-none justify-center items-center gap-2 text-sm md:text-lg leading-6 py-2 px-4 md:px-8 font-medium  hidden md:inline-flex ">
                                    Product page
                                </Link>

                                <span className="lg:text-3xl sm:text-2xl text-xl font-medium title-font md:tracking-wide text-red-600">
                                    Edit Your Profile
                                </span>

                                <button
                                    onClick={() => { updateProfile(); }}
                                    className="px-8 py-2 bg-yellow-300 text-black font-medium text-sm md:text-lg rounded-lg gap-x-2">
                                    <span className="">{`Save`}</span>
                                    <span className="hidden md:inline"> {`and`} </span>
                                    <span className="hidden md:inline">{`Update`} </span>

                                </button>
                            </div>

                            {/* step 15.02 :: Profile Update ::  */}
                            <div className="flex gap-y-8 gap-x-12 flex-wrap items-center px-5 lg:px-12  justify-start lg:justify-center py-4 border-x-2 border-solid border-orange-400">

                                {/* First_name :: */}
                                <div className="flex flex-col gap-2">
                                    {/* Label :: htmlFor */}
                                    <label htmlFor="first_name" className="label-s1">
                                        first name
                                    </label>

                                    {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                                    <input type="text" id="first_name" name="first_name" placeholder='First name'
                                        // ------------------------------------
                                        value={first_name}

                                        onChange={(e) => setFirst_name(e.target.value)}
                                        // ------------------------------------
                                        className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7  "
                                    />
                                </div>

                                {/* Last_Name */}
                                <div className="flex flex-col gap-2">
                                    {/* Label :: htmlFor */}
                                    <label htmlFor="last_name" className="label-s1">
                                        Last name
                                    </label>

                                    {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                                    <input type="text" id="last_name" name="last_name" placeholder='Last name'
                                        // ------------------------------------
                                        value={last_name}

                                        onChange={(e) => {
                                            setLast_name(e.target.value);
                                        }}

                                        // ------------------------------------
                                        className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7  "
                                    />
                                </div>

                                {/* email_id */}
                                <div className="flex flex-col gap-2">
                                    {/* Label :: htmlFor */}
                                    <label htmlFor="email_id" className="label-s1">
                                        Email id
                                    </label>

                                    {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                                    <input type="email" id="email_id" name="email_id"
                                        // ------------------------------------
                                        value={email_id_Profile_Update}

                                        onChange={(e) => setEmail_id_Profile_Update(e.target.value)}
                                        // ------------------------------------
                                        className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7  "
                                    />
                                </div>

                                {/* whatsapp_number */}
                                <div className="flex flex-col gap-2">
                                    {/* Label :: htmlFor */}
                                    <label htmlFor="whatsapp_number" className="label-s1">
                                        whatsapp_number
                                    </label>

                                    {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                                    <input type="text" id="last_name" name="whatsapp_number"
                                        placeholder='10 digit Whatsapp Number'
                                        // ------------------------------------
                                        value={whatsapp_number}

                                        onChange={(e) => setWhatsapp_number(e.target.value)}
                                        // ------------------------------------
                                        className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7"
                                    />
                                </div>

                                {/*  mobile_number */}
                                <div className="flex flex-col gap-2">
                                    {/* Label :: htmlFor */}
                                    <label htmlFor="mobile_number" className="label-s1">
                                        mobile_number
                                    </label>

                                    {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                                    <input type="text" id="last_name" name="mobile_number" placeholder='10 Digit Mobile Number'
                                        // ------------------------------------
                                        value={mobile_number}

                                        onChange={(e) => setMobile_number(e.target.value)}
                                        // ------------------------------------
                                        className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7  "
                                    />
                                </div>

                                {/*  address */}
                                <div className="flex flex-col gap-2 w-full">
                                    {/* Label :: htmlFor */}
                                    <label htmlFor="address" className="label-s1">
                                        address
                                    </label>

                                    {/* input :: 1-type, 2-id, 3-name,  4-function Name, 5-value */}
                                    <textarea id="address" name="address"
                                        placeholder="Type Your House Number, Appartment name, Area Name..."
                                        rows={1}
                                        // ------------------------------------
                                        value={address}

                                        onChange={(e) => setAddress(e.target.value)}
                                        // ------------------------------------
                                        className="w-full bg-white rounded-md border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7    shadow-sm  min-w-full min-h-[124px]"
                                    />

                                </div>

                            </div>

                            <button
                                onClick={() => { updateProfile(); }}
                                className="w-full text-lg leading-6 py-3 bg-yellow-300 text-black font-medium rounded-lg">
                                Save and Update
                            </button>

                        </div>

                        <hr className='border-b-2 border-solid border-orange-400 mt-12 mb-6' />

                        <div className="py-6 flex flex-col gap-y-8">
                            {/* Print state variable :: 11.04 :: userProfile */}
                            <div className="">
                                <pre className=''>
                                    <span className="pr-2 font-bold">
                                        userProfile =
                                    </span>
                                    {JSON.stringify(userProfile, null, 1)}
                                </pre>
                            </div>


                            {/* Print state variable :: 11.04 :: session */}
                            <div className="">
                                <pre className=''>
                                    <span className="pr-2 font-bold">
                                        sessionData : session
                                    </span>
                                    {JSON.stringify(session, null, 1)}
                                </pre>
                            </div>

                            <hr className='border-2 border-solid border-orange-400' />

                            {/* Print state variable :: 11.04 :: user */}
                            <div className="">
                                <pre className=''>
                                    <span className="pr-2 font-bold">
                                        sessionData : session : user
                                    </span>
                                    {JSON.stringify(user, null, 1)}
                                </pre>
                            </div>

                            <hr className='border-2 border-solid border-orange-400' />

                            {/* Print state variable :: 11.04 :: user_id , email_id */}
                            <div className="flex flex-col gap-1">
                                <pre className=''>
                                    <span className="pr-2 font-bold">
                                        sessionData : session : user :: user_id =
                                    </span>
                                    {JSON.stringify(user_id, null, 1)}
                                </pre>
                                <pre className=''>
                                    <span className="pr-2 font-bold">
                                        sessionData : session : user :: email_id =
                                    </span>
                                    {JSON.stringify(email_id, null, 1)}
                                </pre>
                            </div>
                        </div>

                    </div>
                </section >
            </>
        )
    }

    // 2nd screen :: Logged out screen...
    // step 11.14.02 :: if "session.user" :: Object exist ::
    return (
        <>

            {/* step 11.16 :: Ui screen for Sign up Screen :: */}
            <section className="text-gray-600 body-font bg-white">
                <div className="xl:max-w-[1336px] min-h-screen px-5 py-12 lg:py-0 mx-auto flex flex-col lg:flex-row flex-wrap justify-between items-center gap-y-12">
                    {/* Heading Box */}
                    <div className="lg:w-1/2 lg:pr-0 pr-0 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <h1 className="title-font font-medium xl:text-5xl lg:text-[32px] md:text-4xl text-3xl text-gray-900 !leading-snug">
                            Welcome To Kashi Organics  {user?.email_id}
                        </h1>

                        <div className="text-center lg:text-left">
                            <p className="leading-relaxed mt-4 xl:text-xl md:text-xl text-lg max-w-[560px]">
                                Organic food for a golden life.
                                If you want to feel better, eat better.
                                Use Eco-friendly products and Enjoy Nature...
                            </p>
                        </div>

                    </div>

                    {/* Sign-up or Sign-in Box */}
                    <div className="md:w-1/2 bg-white rounded-lg p-8 flex flex-col w-full gap-8 max-w-md min-h-[384px] border-2 border-solid border-orange-400">

                        <h2 className="text-gray-900 xl:text-3xl text-2xl font-medium title-font">
                            Sign up
                        </h2>

                        <div className="flex flex-col gap-6">

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="xl:text-xl leading-5 text-sm text-gray-600">Email</label>
                                <input type="email" id="email" name="email"
                                    // ------------------------------------
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setIsAlreadyRegistered(false);
                                        setIsSignInInvalid(false);
                                    }} value={email}
                                    // ------------------------------------
                                    className="w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-[16px] outline-none text-gray-700 py-1 px-3 leading-[28px]  "
                                />

                            </div>

                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="leading-5 xl:text-xl text-sm text-gray-600 capitalize">
                                    password
                                </label>
                                <input type="password" name="password"
                                    // ------------------------------------
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setIsSignInInvalid(false);
                                    }}
                                    value={password}
                                    // ------------------------------------
                                    className='w-full bg-white rounded border border-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-7'
                                />

                            </div>
                        </div>

                        <div className="text-lg">
                            {(isAlreadyRegistered == false && isSignInInvalid) &&
                                <>
                                    <span className="text-xl text-red-500">
                                        Your passward is incorrect
                                    </span>
                                </>
                            }
                            {(isAlreadyRegistered && isSignInInvalid) &&
                                <>
                                    <span className=" text-green-500">
                                        Your Email id is already registered...
                                        <br></br>
                                    </span>
                                    <span className=" text-red-500">
                                        But, Your passward is incorrect.
                                    </span>
                                </>
                            }

                            {(passwordError) && <>
                                <span className="text-xl text-red-500">
                                    Password should be at least 6 characters.
                                </span>
                            </>}
                        </div>


                        <div className="flex gap-3 justify-between">

                            <button onClick={() => {
                                setIsAlreadyRegistered(false);
                                setIsSignInInvalid(false);
                                handleSignUp();
                            }} className='w-1/2 rounded-lg text-black
                            py-3 min-w-max text-xl font-medium border-0 border-solid border-orange-400 bg-yellow-300'>
                                Sign Up
                            </button>


                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default SignUp