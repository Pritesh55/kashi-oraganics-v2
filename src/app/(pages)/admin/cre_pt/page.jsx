import React from 'react'

import Cre_pt_form from '@/app/components/client/product/cre_pt_form'
import { revalidateAll } from '@/app/actions'

const Cre_pt_page = () => {
    return (
        <>
            <div className=''>
                <Cre_pt_form revalidateAll={revalidateAll}>
                </Cre_pt_form>
            </div>

        </>
    )
}

export default Cre_pt_page