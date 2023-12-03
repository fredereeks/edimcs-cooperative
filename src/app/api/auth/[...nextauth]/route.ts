import { authOptions } from '@/lib/authOptions'
import NextAuth from 'next-auth'
// import jwt from 'jsonwebtoken'



const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}

