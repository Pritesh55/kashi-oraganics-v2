'use client'
import React, { useEffect, useState } from 'react'
import Form_heading from '../../atoms/Form_heading';
import Form_field_text from '../../Form_field_text';
import Form_field_text_area from '../../Form_field_text_area';
import Form_field_number from '../../Form_field_number';
import axios from 'axios';
import { useRouter } from 'next/navigation';


const Profile_form = ({ user_profile, revalidateAll }) => {

    const router = useRouter();


    // console.log(`user_profile=`, user_profile)
    // Define State varibale :: step 01 ::
    // define State_varibale_Handler :: step 02 ::
    // -------------------------
    const [first_name, set_first_name] = useState('');

    const first_name_Handler = (first_name) => {
        set_first_name(first_name);
    }
    // --------------------------------------
    // -------------------------
    const [last_name, set_last_name] = useState('');

    const last_name_Handler = (last_name) => {
        set_last_name(last_name);
    }
    // --------------------------------------
    // -------------------------
    const [email_id, set_email_id] = useState('');

    const email_id_Handler = (email_id) => {
        set_email_id(email_id);
    }
    // --------------------------------------
    // -------------------------
    const [mobile_number, set_mobile_number] = useState('');

    const mobile_number_Handler = (mobile_number) => {
        set_mobile_number(mobile_number);
    }
    // --------------------------------------
    // -------------------------
    const [whatsapp_number, set_whatsapp_number] = useState('');

    const whatsapp_number_Handler = (whatsapp_number) => {
        set_whatsapp_number(whatsapp_number);
    }
    // --------------------------------------
    // -------------------------
    const [address, set_address] = useState('');

    const address_Handler = (address) => {
        set_address(address);
    }
    // --------------------------------------

    // step 03.01.03 :: Define that variable used to submit data....
    const [update_profile_btn, set_update_profile_btn] = useState(false);

    // step 06 :: fill Initial Values :: define state variable
    const [fillInitialValues, set_fillInitialValues] = useState(false)

    const [isNewProductCreated, setIsNewProductCreated] = useState(false);
    const [isptCreatedMessage, setIsptCreatedMessage] = useState('');

    const [profile_updating, set_profile_updating] = useState(false);
    // step 04
    useEffect(() => {
        // console.log(user_profile)
   

        const UpdateProfile = async () => {
            // ------------------------------------------------------
            // console.log("\n\n");
            // console.log("UpdateProfile Started...");
            // ------------------------------------------------------


            if (user_profile !== null) {

                //  step 07 :: if it isnot filled , then fill that values...
                if (fillInitialValues == false) {

                    set_first_name(user_profile.first_name);
                    set_last_name(user_profile.last_name);
                    set_email_id(user_profile.email_id);
                    set_mobile_number(user_profile.mobile_number);
                    set_whatsapp_number(user_profile.whatsapp_number);
                    set_address(user_profile.address);

                    set_fillInitialValues(true);
                }
            }

            if (update_profile_btn == true) {
                // object 01:: userProfile , 02:: We have to make...
                set_profile_updating(true);


                var update_userProfile = {
                    // ...user_profile,
                    first_name: `${first_name}`,
                    last_name: `${last_name}`,
                    mobile_number: `${mobile_number}`,
                    whatsapp_number: `${whatsapp_number}`,
                    address: `${address}`
                }
               

                await axios.put('/api/user/edit-profile', { update_userProfile, user_profile })
                    .then((response) => {

                        // console.log(`Update profile Response`, response.data);

                        if (response.data.success == true) {
         
                            revalidateAll();
                       
                            // -----------------------

                            // router.back();
                            // -----------------------
                            // console.log('Thank you.., your Profile is updated..');

                        } else {
                            // console.log('Oh, There is an Error..., Profile is not Edited..');
                        }
                        // -------------------------
                    }).catch((error) => {
                        // console.log(`Edit Product response Error`, error);
                    });

            }
            // ------------------------------------------------------

            // console.log("UpdateProfile Ended...");
            // console.log("\n\n");
            // ------------------------------------------------------
            set_update_profile_btn(false);
            set_profile_updating(false);
            // setUserChange(false);

        }

        if (fillInitialValues == false || update_profile_btn == true) {
            UpdateProfile();
        }


        // step 05 :: dependency variable...
    }, [update_profile_btn, fillInitialValues])


    

    if (profile_updating == true) {
        return (
            <>
                <div className="bg-white min-h-screen flex justify-center items-center w-full">
                    <span className="text-2xl break-word text-black">
                        Your Profile is Updating Now...
                    </span>
                </div>
            </>

        )
    }

    return (
        <>

            {
                (isNewProductCreated) && <>
                    <h2 className="px-4 py-2 border-2 border-solid border-orange-400 fixed z-[99999] bg-white text-black top-5 right-8 rounded-lg text-lg shadow-xl">
                        {isptCreatedMessage}
                    </h2>
                </>

            }

            <div className=" bg-white text-black rounded-lg px-5 py-8 flex flex-col w-full gap-8 relative">

                <div className="flex justify-between gap-x-6 gap-y-3 items-center flex-wrap">
                    <Form_heading name={`Edit Your Profile`}></Form_heading>

                    <button
                        onClick={() => {
                            // step 03.01.01 :: submit button (At top)...
                            set_update_profile_btn(true);
                            // So, useEffect will Rerun 
                            // to submit present State variable data...

                            // console.log("   Save and Update");
                            // console.log("Edit_pt_btn", edit_pt_btn);
                            // console.log("userChange", userChange);
                        }}
                        className="w-auto px-6 text-lg leading-6 py-3 bg-yellow-300 text-black font-medium rounded-lg">
                        Update Profile
                    </button>
                </div>


                {/* step 15.02 :: Profile Update ::  */}
                <div className="flex gap-y-4 lg:gap-y-12 flex-wrap">
                    <div className="w-full flex gap-y-8 gap-x-12 flex-wrap items-start px-5 lg:px-12  justify-start lg:justify-start py-8 border-2 border-solid border-orange-400">
                        {/* // Step 03 :: props*/}

                        {/* Define "Form_field_text" :: step 02.01 ::
                        //  Replace "state_var" and "handler_name" :: step 02.02 ::
                        //  Type your "label_name" and "placeholder_name" :: step 02.03 ::
                        // ------------------------- */}
                        <Form_field_text
                            state_var={first_name}
                            handler_name={first_name_Handler}
                            label_name={`First Name`}
                            placeholder_name={`First Name`}
                        />

                        <Form_field_text
                            state_var={last_name}
                            handler_name={last_name_Handler}
                            label_name={`Last Name`}
                            placeholder_name={`Last Name`}
                        />

                        <Form_field_text
                            type='email'
                            state_var={email_id}
                            handler_name={email_id_Handler}
                            label_name={`Email id`}
                            placeholder_name={`abc@email.com`}
                        />

                        <Form_field_number
                            type='number'
                            state_var={mobile_number}
                            handler_name={mobile_number_Handler}
                            label_name={`Mobile Number`}
                            placeholder_name={`10 digit Number`}
                            max_digits={10}
                        />

                        <Form_field_number
                            type='number'
                            state_var={whatsapp_number}
                            handler_name={whatsapp_number_Handler}
                            label_name={`Whatsapp Number`}
                            placeholder_name={`10 digit Number`}
                            max_digits={10}
                        />

                        <Form_field_text_area
                            state_var={address}
                            handler_name={address_Handler}
                            label_name={`Your address`}
                            placeholder_name={`Type your House number, Appartment Name, Area Name , City name, State Name, 6 digit pincode...`}
                        />

                    </div>

                    <button
                        onClick={() => {
                            // step 03.01.02:: submit button (At Bottom)...
                            set_update_profile_btn(true);
                            // So, useEffect will Rerun 
                            // to submit present State variable data...

                            // console.log("   Save and Update");
                            // console.log("Edit_pt_btn", edit_pt_btn);
                            // console.log("userChange", userChange);
                        }}
                        className="w-full py-3 text-lg leading-6 font-medium text-black
                         bg-yellow-300  rounded-lg">
                        Update Profile
                    </button>
                </div>



            </div>

        </>
    )
}

export default Profile_form