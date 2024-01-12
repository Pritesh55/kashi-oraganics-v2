'use server'

import { revalidatePath } from "next/cache";
import supabase from "./components/supabase/sbClient";
import { redirect } from "next/navigation";

export async function revalidateAll() {

    revalidatePath('/');
    revalidatePath('/admin');
    console.log('rELVALIDATING.....tHANK YOU...');
}

