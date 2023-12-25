import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import prisma from "@/lib/prisma"
import { Member } from '@prisma/client';
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                memberId: {
                    label: 'Member ID/Email',
                    type: 'text',
                    placeholder: 'youremail@email.com'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: '*******'
                },
            },
            async authorize(credentials) {
                if (!credentials) return null;
                const { memberId, password }: {memberId: string, password: string} = credentials;
                const phone = typeof memberId === "string" && memberId[0] === "0" ? memberId.replace("0", "+234") : memberId;

                let member = await prisma.member.findFirst({ where: { memberId: memberId.toUpperCase() } }) || await prisma.member.findFirst({ where: { phone } })
                if (!member) return null
                const matchPassword = await bcryptjs.compare(password, member.password)
                // console.log({ member, password, memberPass: member.password, matchPassword, phone })
                if (!matchPassword) return null

                if (member.status === "Pending") {
                    throw new Error("Your account is NOT yet activated. Please, contact the admin for account activation. If not, your account will be automatically deleted after 3days")
                }
                else if (member.status === "Disabled") {
                    throw new Error("Oh No! Your account has been suspended. If you believe this is an error, contact the admin")
                }
                else {
                    // member = {...member, password: ""}
                    return member
                }
                // return {
                //     id: user.id.toString(),
                //     email: user.email!,
                //     image: user.image
                // };
            },
        })
    ],
    pages: {
        signIn: "/auth/login",
    },
    secret: process.env.JWT,
    useSecureCookies: process.env.NODE_ENV === "production",
    jwt: {
        async encode({ secret, token }) {
            if (!token) throw new Error("No token to encode")
            return jwt.sign(token, secret)
        },
        async decode({ secret, token }) {
            if (!token) throw new Error("No token to decode")
            const decodedToken = jwt.verify(token, secret)
            if (typeof decodedToken === "string") {
                return JSON.parse(decodedToken)
            }
            else return decodedToken;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
    },
    callbacks: {
        session({ session, token, user }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    type: token.type,
                    fullname: token.fullname
                }
            };
        },
        jwt({ token, user }) {
            if (user) {
                const currentUser = user as unknown as Member
                return {
                    ...token,
                    id: currentUser.id,
                    email: currentUser.email,
                    image: currentUser.image,
                    fullname: `${currentUser.firstname} ${currentUser.middlename} ${currentUser.lastname}`,
                    type: currentUser.type,
                    balance: currentUser.balance
                } as {id: string, email: string, image: string, fullname: string, type: string}
            }

            return token;
        },
    }
}