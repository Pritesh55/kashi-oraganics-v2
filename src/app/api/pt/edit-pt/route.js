import supabase from "@/app/components/supabase/sbClient";
// -----------------------------------------
import { NextResponse } from "next/server";
import { revalidatePath } from 'next/cache'
import { convertNullToEmptyString, deleteIfEmpty, delete_Id_Of_Product } from "@/functions/objectMethods";


export async function PUT(request) {

    // console.log('POST request started')
    // recieve pt_data
    const pt_data = await request.json();
    
    const { pt_object, update_pt_object } = pt_data;

    const pt_id = pt_object.id;


    // convert any 'null' value to '' value...
    // const pt_data_renew = convertNullToEmptyString(pt_data);
    // const pt_data_renew1 = deleteIfEmpty(pt_data_renew);
    // const pt_data_renew2 = delete_Id_Of_Product(pt_data_renew1, 'pt_id');


    const { data: updatePtData, error: updatePtError } = await supabase
        .from('products')
        .update(update_pt_object)
        .eq('id', pt_id)
        .select();

    // console.log(`updatePtData = `, updatePtData)
    // console.log(`updatePtError = `, updatePtError)

    var message = (updatePtData?.length > 0) ?
        `Yes, Product successfuly Updated to "products" table..` :
        `No, Product is not Updated to "products" table..`

    var success = (updatePtData !== null) ? true : false;




    return NextResponse.json({
        success,
        message,
        request_name: 'PUT',
        // ---------------
        updatePtData,
        updatePtError,
        // ------------------
        // --------------
        update_pt_object,
        pt_object
        // ------------------

    });

}

