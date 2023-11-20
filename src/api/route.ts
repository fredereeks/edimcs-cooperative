import { Account, AuthOptions, Profile, Session, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/next'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

import prisma from "@/lib/prisma"
import { JWT } from 'next-auth/jwt'

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "Email", type: "email", placeholder: "Enter your Email" },
            password: { label: "Password", type: "password", placeholder: "*******" }
          },
          async authorize(credentials) {
              
            //   console.log({user, email, password, userPass: user.password, passwordMatched})
              console.log({credentials})
              if(!credentials) return null;
              
              // Add logic here to look up the user from the credentials supplied
            const {email, password} = credentials;

            const user = await prisma.member.findUnique({
                where: {
                    email : email.toLowerCase()
                }
            })
            if(!user){
                return null;
            }
            const passwordMatched = bcryptjs.compare(password, user.password)
            if(!passwordMatched){
                return null;
            }
            else return user;
          }
        })
      ],
      pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout"
      },
      secret: process.env.JWT,
      jwt: {
        async encode({secret, token}) {
            console.log({secret, token})
            if(!token){
                throw new Error("No token to encode")
            }
            return jwt.sign(token, secret)
        },
        async decode({secret, token}){
            if(!token){
                throw new Error("No token to decode")
            }
            const data = jwt.verify(token, secret);
            if(typeof data === 'string'){
                return JSON.parse(data)
            }
            else {
                return data;
            }
        }
      },
      session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60
      },
      callbacks: {
        async session(params: {session: Session, token: JWT, user: User}) {
            console.log({params})
            if(params.session.user){
                params.session.user.email = params.token.email
            }
            return params.session
        },
        async jwt(params: {
            token: JWT,
            user?: User | undefined,
            account?: Account | null | undefined,
            profile?: Profile | undefined,
            isNewUser?: boolean | undefined
        }) {
            if(params.user){
                params.token.email = params.user.email
            }
            return params.token;
        },
      }
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}
