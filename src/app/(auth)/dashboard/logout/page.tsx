import React from 'react'
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const clearCookies = async() => {
  "use server"
  console.log({hasCookiesInLogoutCookies: cookies().has("x-access-token")})
  // cookies().has("x-access-token") ? cookies().set("x-access-token", 'undefined') : ""
}

export default async function page() {
  // redirect("/login")
  // await clearCookies()
  return (
    <div>Logout</div>
  )
}
