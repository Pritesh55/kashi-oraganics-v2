'use server'

import { revalidatePath } from "next/cache";
import supabase from "./components/supabase/sbClient";

export async function revalidateAll() {

    revalidatePath('/');
    // console.log('rELVALIDATING.....tHANK YOU...');
}