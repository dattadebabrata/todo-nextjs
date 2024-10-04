import NextAuth, {CredentialsSignin} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProvider from "next-auth/providers/credentials"
import {User} from "@/models/userModel";
import {compare} from 'bcryptjs';

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "Email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            authorize: async (credentials) => {
                const {email, password} = credentials as { email: string | undefined, password: string | undefined };
                console.log({email, password});
                if (!email || !password) {
                    throw new CredentialsSignin("Please provide valid credentials", {
                        cause: "Email is not valid",
                    });
                }
                //Connection with Database here
                const user = await User.findOne({email}).select("+password") as unknown;
                if (!user) throw new CredentialsSignin("Invalid credentials");
                if (!user.password) throw new CredentialsSignin("Invalid credentials");
                const isMatch = await compare(password, user.password);
                if (!isMatch) {
                    throw new CredentialsSignin("Invalid credentials");
                }
                const updatedUser = {...user};
                delete updatedUser.password;
                return updatedUser;
            },
        }),
    ],
})

auth
