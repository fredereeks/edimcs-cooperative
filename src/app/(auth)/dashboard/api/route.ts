'use server'
 
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
 
async function create() {
  cookies().set('x-access-token', '')
}

function GET(req: NextRequest, res: NextResponse){
  console.log({request: req})
}