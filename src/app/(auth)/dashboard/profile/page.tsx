
import { authOptions } from '@/lib/authOptions';
import prisma from '@/lib/prisma';
import { AccountDetailsProps, MemberProps } from '@/types';
import { getServerSession } from 'next-auth';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react'
// import { fetchUser } from '../../actions';
import ProfileForm from './ProfileForm';

const fetchUser = async (email: string) => {
  "use server"
  const user = await prisma.member.findUnique({
    where: { email },
    include: { accountDetails: true}
  })
  if (!user) {
    signOut()
    redirect("/auth/login");
  }
  // console.log({user})
  return user as MemberProps
}

export default async function Profile() {
  const session = await getServerSession(authOptions)
  const user = await fetchUser(session?.user?.email!)

  // const accountDetails: AccountDetailsProps[] = member?.loanRating ? member.loanRating : [{

  return (
    <main className="flex flex-col px-2">
      <ProfileForm user={user} />
    </main>
  )
}
