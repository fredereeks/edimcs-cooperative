
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
    include: { accountDetails: true, MemberInfo: true }
  })
  if (!user) {
    signOut()
    redirect("/auth/login");
  }
  // console.log({user})
  return user as MemberProps
}


export const metadata: Metadata = {
  title: 'EDIMCS :: Profile',
  description: "EDIMCS stands for Enlightenment Drive Initiative Co-operative Society. We are the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal",
}

export default async function Profile() {
  const session = await getServerSession(authOptions)
  const user = await fetchUser(session?.user?.email!)

  return (
    <main className="flex flex-col px-2">
      <ProfileForm user={user} />
    </main>
  )
}
