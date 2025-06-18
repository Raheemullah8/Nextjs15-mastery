"use server";

import * as auth  from "@/auth";

export const signout = async ()=>{
     return auth.signOut();
} 