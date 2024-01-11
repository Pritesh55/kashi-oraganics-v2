// step 01 :: import "createServerComponentClient" and "cookies"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// -----------------------------------------
import { NextResponse } from "next/server";

export async function GET(request) {

    var success = false;
    var message = '';
    var session = null;
    var user_id = null;
    var email_id = null;


    // step 02 :: intialize supabse :: 
    const supabase = createServerComponentClient({ cookies });

    // step 03 :: supabase.auth.getSession();
    const { data: sessionData, error: sessionError }
        = await supabase.auth.getSession();

    // We receive "sessionData" and "sessionError"
    // console.log(`sessionData=`, sessionData);
    // "sessionData" is a Object ::


    var user = sessionData.session?.user;
    // ------------------------------------------------
    // Step 11.10  :: "sessionData?.session" :: Two Options ::
    // 1) Object 2) null

    if (sessionData?.session !== null) {
        // If it is not null, Then User is Logged in....

        // ------------------------------------------------
        // "sessionData?.session" :: 1) Object
        success = true;
        session = sessionData.session;
        message = 'Yes, The user is sucessfully Logged in...';
        user_id = sessionData.session.user.id;
        email_id = sessionData.session.user.email;
        // ----------------------------------------------

        // console.log(`sessionData.session=`, session);

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
    }

    // "sessionData?.session" :: 2) null 
    if (sessionData.session == null) {
        // If it is null, Then User is Logged Out....

        // ------------------------------------------------
        // "sessionData?.session" :: 2) null
        session = sessionData.session;
        success = false;
        message = 'No, User is Logged out...'
        // ----------------------------------------------

        // ----------------------------------------------------
        // console.log(`sessionData.session=`, session);
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


    // Find by user_id
    // -------------------
    // const { data: findUserProfileData, error: findUserProfileError } = await supabase
    //     .from('profiles')
    //     .select()
    //     .eq('email_id', 'iampritesh13@gmail.com');



    return NextResponse.json({
        success,
        // 1) true or 2) false

        message,
        // 1) 'Yes, The user is sucessfully Logged in...'   or
        // 2) 'No, User is Logged out...'

        session,
        // 1) Object {} or 
        // 2) null 

        sessionError,
        // Always null... 

        user_id,
        // 1) uuid {} or 
        // 2) null 

        email_id
        // 1) 'name@email.com' or 
        // 2) null
});
}







