import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/index";

// Environment variable checks ko shuru mein hi rakhna behtar hai
if(!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET){
    throw new Error("Please define the GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET environment variables inside .env.local");
}

export const {handlers:{POST,GET},auth,signIn,signOut }=NextAuth({
    adapter:PrismaAdapter(prisma),
    providers:[
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
        })
    ],
    secret: process.env.AUTH_SECRET,
    callbacks:{
        async session({ session,user}){
            if(session && user){
                session.user.id = user.id;
            }
            return session;
        }
    },
    
});