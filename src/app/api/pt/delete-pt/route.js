import supabase from "@/app/components/supabase/sbClient";
// -----------------------------------------
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'
import { convertNullToEmptyString, deleteIfEmpty, delete_Id_Of_Product } from "@/functions/objectMethods";
import { revalidateAll } from "@/app/actions";


export async function PUT(request) {

    // console.log('POST request started')
    // recieve pt_data
    const pt_data = await request.json();
    console.log(`pt_data = `, pt_data)

    const { pt_id } = pt_data;


    const { error: deletePtError } = await supabase
        .from('products')
        .delete()
        .eq('id', pt_id);

    if (deletePtError == null) {
        revalidateAll();
        revalidatePath('/');
    }

    console.log(`deletePtError = `, deletePtError)
    revalidateAll();

    var message = (deletePtError == null) ?
        `Yes, Product successfuly Deleted to "products" table..` :
        `No, Product is not Deleted to "products" table..`

    var success = (deletePtError == null) ? true : false;

    return NextResponse.json({
        success,
        message,
        request_name: 'PUT',
        // ---------------
        deletePtError,
        // ------------------
        // --------------
        pt_id
        // ------------------

    });

}

