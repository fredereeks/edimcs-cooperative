import { MAX_AGE, SECRET } from "@/constants";
import { serialize } from "cookie";
import { randomUUID } from "crypto";
import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: NextResponse){
    // console.log("Came here!", {cookie: cookies().get("x-access-token")})
    if(cookies().has("x-access-token")){
        console.log("Modifying cookie")
        const token = "something"
        // cookies().set('x-access-token', token, {httpOnly: true, secure: process.env.NODE_ENV === 'production', maxAge: -1, path: "/", domain: "localhost"})
        cookies().set("x-access-token", token, {maxAge: -1})
    }
    const token = "somethingWentWrong"
    const serialized = serialize("x-access-token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: -1,
        path: '/logout'
    })
    const response = {
        message: `Log out Successful`,
        error: false
    }
    console.log("About to set new Token")
    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {'Set-Cookie': serialized},
        statusText: 'Okiedokie'
    })
}