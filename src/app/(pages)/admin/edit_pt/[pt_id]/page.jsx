import { revalidateAll } from '@/app/actions'
import Edit_form from '@/app/components/client/product/moles/forms/Edit_form'
import React from 'react'

const Edit_pt = () => {
  return (
    <>

      <div className='bg-white min-h-screen'>
        <Edit_form revalidateAll={revalidateAll}></Edit_form>
      </div>


    </>
  )
}

export default Edit_pt