'use server'

import { revalidatePath } from "next/cache";

export async function revalidateAll() {
    revalidatePath('/pt');
    console.log('rELVALIDATING.....tHANK YOU...');
}