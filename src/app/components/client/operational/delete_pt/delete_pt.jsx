'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Delete_pt = ({ pt_id, revalidateAll, prev_url }) => {

    const router = useRouter();
    const supabase = createClientComponentClient();

    const [first_time, set_first_time] = useState(false)

    useEffect(() => {

        const delete_prot = async () => {

            await axios.put('/api/pt/delete-pt', { pt_id }).then(function (response) {
                // -------------------------
                console.log(`delete Product Response`, response.data);

                set_first_time(true);

                revalidateAll();

                router.push('/admin');
                router.refresh();

                // -----------------------


                // -------------------------
            }).catch(function (error) {
                console.log(`delete Product response Error`, error);
            });

        }

        delete_prot()

    }, [pt_id])

    return (
        <>
            <div className="bg-white min-h-screen flex justify-center items-center w-full">
                <span className="text-2xl break-word text-black">
                    Your Product is deleting Now...
                </span>
            </div>
        </>

    )









}

export default Delete_pt