"use server"

import prisma from "@/lib/prisma"
import bcryptjs from 'bcryptjs'

export const signUp = async (firstname: string, middlename: string, lastname: string, email: string, memberId: string, password: string, confirmPassword: string) => {
    try {

        if (password !== confirmPassword) {
            return {
                error: true,
                message: "Passwords do NOT Match"
            }
        }
        else {
            const user = await prisma.member.findUnique({
                where: {
                    email: email.toLowerCase(),
                    memberId: memberId.toUpperCase()
                }
            })
            if (user) {
                return {
                    error: true,
                    message: "Sorry, we have a user with this email address"
                }
            }
            else {
                const salt = bcryptjs.genSaltSync(10)
                const hashPassword = bcryptjs.hashSync(password, salt)
                // const user = await prisma.member.create({
                //     data: {
                //         firstname
                //     }
                // })
            }
        }

    }
    catch (err) {
        return {
            error: true,
            message: "Something went wrong. Please, check your internet connection and try again"
        }
    }
}