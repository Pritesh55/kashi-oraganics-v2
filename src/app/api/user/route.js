// step 01 :: import "createServerComponentClient" and "cookies"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// -----------------------------------------
import { NextResponse } from "next/server";

export async function GET(request) {

    var successSession = false;
    var successUserProfile = false;
    var message = '';
    var user_id;
    var userProfile;
    var userProfileError;

    // step 02 :: intialize supabse :: 
    const supabase = createServerComponentClient({ cookies });

    // step 03 :: supabase.auth.getSession();
    const { data: sessionData, error: sessionError }
        = await supabase.auth.getSession();

    // We receive "sessionData" and "sessionError"
    // console.log(`sessionData=`, sessionData);
    // "sessionData" is a Object ::

    // ------------------------------------------------
    // Step 11.10  :: "sessionData?.session" :: Two Options ::
    // 1) Object 2) null

    // "sessionData?.session" :: 1) Object
    if (sessionData?.session !== null) {
        // If it is not null, Then User is Logged in....

        // ------------------------------------------------
        // console.log(`sessionData.session=`, sessionData.session);

        // console.log(`
        //   Now, sessionData.session  is an "Object"... 
        //   So, sessionData.session is not "null \n 
        //   So, Yes, "sessionData.session" is there..
        //   So, by "sessionData.session", We econclude that \n
        //   Yes, User is Logged in..`);
        // console.log(`\n\n`);
        // So, from "session" in "sessionData" ,  
        // We determines that "User is Logged in"
        // ---------------------------------------------------------

        successSession = true;
        user_id = sessionData.session?.user.id;
        message = `${user_id} is Logged in...`

        // Find by user_id
        // -------------------
        const { data: findUserProfileData, error: findUserProfileError } = await supabase
            .from('profiles')
            .select()
            .eq('user_id', user_id);


        // if there is dfata, then Set all State variables...
        if (findUserProfileData !== null &&
            findUserProfileData[0] !== undefined &&
            findUserProfileError == null) {

            userProfile = findUserProfileData[0];

            successUserProfile = true;
            message = `User is Logged in...And, UserProfile is received...`;

        } else {
            successUserProfile = false;
            userProfileError = findUserProfileError;
            message = `User is Logged in...But, UserProfile is not received...`;
        }

    }

    // "sessionData?.session" :: 2) null 
    if (sessionData.session == null) {
        // If it is null, Then User is Logged Out....

        message = `User is not Logged in...Please Log in to see User Data...`

        // ----------------------------------------------------
        // console.log(`sessionData.session=`, sessionData.session);
        // console.log(`sessionError= ${sessionError}`);
        // console.log(`\n\n`);

        // console.log(`
        //         Now, sessionData.session is "null"...
        //         So, No, There is no "sessionData.session"...
        //         So, by "sessionData.session", We econclude that \n
        //         No, User is not Logged in...
        //         `);

        // console.log(`\n\n`);
        // ----------------------------------------------------
    }

    return NextResponse.json({
        successSession,
        successUserProfile,
        message,
        user_id,
        userProfile,
        userProfileError
        // findUserProfileData: findUserProfileData
    });

}







