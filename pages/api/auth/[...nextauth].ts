import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            //@ts-ignore
            clientId: process.env.GOOGLE_CLIENT_ID,
            //@ts-ignore
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    theme: {
        colorScheme: "light",
    },
    pages: {
        signIn: "/login",
    },
    // session: {
    //     maxAge: 1 * 60 * 60, // Time in seconds, similar to have you have configured it in the userFlow in Azure AD B2C   
    // },
    // jwt: {
    //     maxAge: 1 * 60 * 60, // Time in seconds, similar to have you have configured it in the userFlow in Azure AD B2C   
    // },
    callbacks: {
        async signIn({ account, profile }) {
            {/* @ts-ignore */ }
            if (account.provider === "google") {
                {/* @ts-ignore */ }
                return profile.email_verified
            }
            return true // Do different verification for other providers that don't have `email_verified`
        },
    }
}

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options)