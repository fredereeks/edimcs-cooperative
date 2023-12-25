
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prisma';
import { MemberProps } from '@/types';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'
// import { fetchUser } from '../../actions';
import ProfileForm from './ProfileForm';
import { Metadata } from 'next';

const fetchUser = async (email: string) => {
  "use server"
  const user = await prisma.member.findFirst({
    where: { email },
    include: { accountDetails: true }
  })
  if (!user) {
    signOut()
    redirect("/auth/login");
  }
  // console.log({user})
  return user as MemberProps
}

const handleUpload = async(data: FormData) => {
  "use server"
  try {
    const file = data.get("file") as string
    const id = data.get("id") as string
    // console.log({file, id})
    await prisma.member.update({ where: { id },  data: { image: file } })
    return {error: false, message: `Image Uploaded successfully`}
  } catch (error) {
    return {error: true, message: `Something went wrong. We are unable to process handle your upload, please try again.`}
  }
}


export const metadata: Metadata = {
  title: 'EDIMCS :: Profile',
  description: "EDIMCS stands for Enlightenment Drive Initiative Co-operative Society. We are the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal",
}

export default async function Profile() {
  const session = await getServerSession(authOptions)
  const user = await fetchUser(session?.user?.email!)

  // const accountDetails: AccountDetailsProps[] = member?.loanRating ? member.loanRating : [{

  return (
    <main className="flex flex-col px-2">
      <ProfileForm handleUpload={handleUpload} user={user} />
    </main>
  )
}
