// step 01 :: import "createServerComponentClient" and "cookies"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// -----------------------------------------
import { NextResponse } from "next/server";

export async function GET(request) {

    var success = false;
    var message = '';

    // step 02 :: intialize supabse :: 
    const supabase = createServerComponentClient({ cookies });

    // step 03 :: supabase.auth.getSession();
    const { data: sessionData, error: sessionError }
        = await supabase.auth.getSession();

    // We receive "sessionData" and "sessionError"
    console.log(`sessionData=`, sessionData);
    // "sessionData" is a Object ::


    var user = sessionData.session?.user;
    // ------------------------------------------------
    // Step 11.10  :: "sessionData?.session" :: Two Options ::
    // 1) Object 2) null

    // "sessionData?.session" :: 1) Object
    if (sessionData?.session !== null) {
        // If it is not null, Then User is Logged in....

        // ------------------------------------------------
        console.log(`sessionData.session=`, sessionData.session);

        console.log(`
          Now, sessionData.session  is an "Object"... 
          So, sessionData.session is not "null \n 
          So, Yes, "sessionData.session" is there..
          So, by "sessionData.session", We econclude that \n
          Yes, User is Logged in..`);
        console.log(`\n\n`);
        // So, from "session" in "sessionData" ,  
        // We determines that "User is Logged in"
        // ---------------------------------------------------------
    }

    // "sessionData?.session" :: 2) null 
    if (sessionData.session == null) {
        // If it is null, Then User is Logged Out....

        // ----------------------------------------------------
        console.log(`sessionData.session=`, sessionData.session);
        console.log(`sessionError= ${sessionError}`);
        console.log(`\n\n`);

        console.log(`
                Now, sessionData.session is "null"...
                So, No, There is no "sessionData.session"...
                So, by "sessionData.session", We econclude that \n
                No, User is not Logged in...
                `);

        console.log(`\n\n`);
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
        message,
        user: user,
        // findUserProfileData: findUserProfileData
    });

}







