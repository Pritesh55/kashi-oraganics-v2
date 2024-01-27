import React from 'react'
import Goto_btn from './Goto_btn'

const Home_btn = ({ is_admin, isHome = false }) => {
    return (

        <div className="text-black rounded-lg flex flex-wrap gap-x-6 ">

            {
                (isHome == false) && <Goto_btn goto='/' name='Home'></Goto_btn>
            }


            {(is_admin == true) && <>
                <Goto_btn goto='/admin' name='admin'></Goto_btn>
            </>
            }
        </div>
    )
}

export default Home_btn