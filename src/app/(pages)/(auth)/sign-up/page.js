import React from 'react'
import SignUp from './signup'
import { revalidateAll } from '@/app/actions'

const signup_page = () => {

    return (
        <SignUp revalidateAll={revalidateAll}></SignUp>
    )
}

export default signup_page