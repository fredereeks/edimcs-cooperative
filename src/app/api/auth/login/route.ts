import { MAX_AGE, SECRET } from "@/constants";
import { serialize } from "cookie";
import { randomUUID } from "crypto";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse){
    
}

export async function POST(req: Request, res: NextResponse){
    console.log("Came here!")
    const body = await req.json()
    console.log({body})
    const {username, password} = body;
    console.log("Came to LoginRoute", {username, password})
    if(username !== "admin" && password !== "admin" ){
        return NextResponse.json({ message: 'You are not authorized to view this page. Please, login and try again', status: 401})
    }
    
    const userData = {username, token: randomUUID}
    const token = sign(userData, SECRET, {expiresIn: MAX_AGE})
    const serialized = serialize("edimcsJWT", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: MAX_AGE,
        path: '/'
    })
    const response = {
        message: `Welcome back ${username}`,
        error: false
    }
    return new Response(JSON.stringify(response), {
        status: 200,
        headers: {'Set-Cookie': serialized}
    })
}