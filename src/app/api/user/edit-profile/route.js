import supabase from "@/app/components/supabase/sbClient";
// -----------------------------------------
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'
import { convertNullToEmptyString, deleteIfEmpty, delete_Id_Of_Product } from "@/functions/objectMethods";
import { revalidateAll } from "@/app/actions";


export async function PUT(request) {

    // console.log('POST request started')
    // recieve pt_data
    const profile_data = await request.json();

    const { update_userProfile, user_profile } = profile_data;

    var user_id = user_profile.user_id;
    // console.log(user_id);

    // console.log(`user_profile = `, user_profile);
    const { data: updateProfileData, error: updateProfileError } = await supabase
        .from('profiles')
        .update(update_userProfile)
        .eq('user_id', user_id)
        .select();

    // console.log(`updateProfileData = `, updateProfileData)
    // console.log(`updateProfileError = `, updateProfileError)

    var message = (updateProfileData?.length > 0) ?
        `Yes, user profile successfuly Updated to "profiles" table..` :
        `No, user profile is not Updated to "profiles" table..`

    var success = (updateProfileData?.length > 0) ? true : false;


    // const { error } = await supabase
    //     .from('profiles')
    //     .delete()


    revalidateAll();

    return NextResponse.json({
        success,
        message,
        request_name: 'PUT',
        // --------------
        update_userProfile,
        user_profile,
        // ------------------
        updateProfileData,
        updateProfileError,
        // ------------------

    });

}

