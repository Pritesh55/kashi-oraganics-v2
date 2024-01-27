'use server'

import { revalidatePath } from "next/cache";

export async function revalidateAll() {

    revalidatePath('/');
    revalidatePath('/admin');
    revalidatePath('/pt');
    revalidatePath('/cart');
    // console.log('rELVALIDATING.....tHANK YOU...');
}




