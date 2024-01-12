
import React from 'react'

import { headers } from 'next/headers';
import { get_id_from_url } from '@/functions/urlFunctions';
import Delete_pt from '@/app/components/client/operational/delete_pt/delete_pt';
import { revalidateAll } from '@/app/actions';


const delete_pt = async () => {

    const headersList = headers();

    const domain = headersList.get('host') || "";
    const prev_url = headersList.get('referer') || "";
    const cur_url = headersList.get('next-url');

    var pt_id;
    if (cur_url?.length > 0) {
        pt_id = get_id_from_url(cur_url);
    }


    // console.log(`previous url = `, prev_url);
    // console.log(`cur_url =`, cur_url);
    // console.log(pt_id);

    return (
        <>

            {(pt_id) &&
                <Delete_pt pt_id={pt_id} revalidateAll={revalidateAll} prev_url={prev_url}></Delete_pt>
            }
        </>
    )
}

export default delete_pt