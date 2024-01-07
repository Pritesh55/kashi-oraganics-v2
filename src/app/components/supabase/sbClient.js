// src\app\components\supabase\sbClient.js
// ------------------------------------
// This file location on internet ::
// -----------------------
// => https://github.com/Pritesh55/Supabase-Tutorial-for-Beginners/blob/starter-project/src/supabase/sbClient.js
// ------------------------------------

// -----------------------------------
// Supabase :: Step 01.01 :: intall "supabase-js" librabry ::  
// from powershell :: npm install @supabase/supabase-js;
// -----------------------------------

// ------------------------------------------------------------
// Supabase :: Step 01.02 :: import supabase-js
import { createClient } from '@supabase/supabase-js'
// ------------------------------------------------------------

// --------------------------------
// Supabase :: Step 01.03 :: Define variabel in ".env" file ::
// 01 - NEXT_PUBLIC_SUPABASE_URL, 02 - NEXT_PUBLIC_SUPABASE_ANON_KEY
// --------------------------------

// Supabase :: Step 01.04 :: save in Local Variable ::
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Supabase :: Step 01.05 :: createClient() 
const supabase = createClient(supabaseUrl, supabaseKey);

// Supabase :: Step 01.06 :: Export "supabse" it...
export default supabase;


// Supabase :: Step 02.01 :: in Server components ::
// -----------------------------------
// import supabase from "@/app/components/supabase/sbClient";
// -----------------------------------


// just type "import supabase" and select path...
// => thus way import "supabase client file :: ...
// -----------------------------------------


// used in :: src\app\(pages)\pt\page.js ::: for products data :: Array of objects...