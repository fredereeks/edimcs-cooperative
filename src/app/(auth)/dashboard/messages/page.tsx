export const revalidate = "60"
import React from 'react'
import MessageList from './MessageList'
import prisma from '@/lib/prisma';
import { Metadata } from 'next'
import { MessageProps } from '@/types';

export const metadata: Metadata = {
  title: "EDIMCS :: Contact", 
  description: "EDIMCS is one of the largest cooperative organizations in Nigeria and in the world, with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal."
}

const fetchMessages = async() => {
  const messages = await prisma.contact.findMany()
  return messages as MessageProps[]
}


export default async function Messages() {
const messageData = await fetchMessages();
return (
  <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
    <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
      <MessageList key={'92720'} messageData={messageData} />
    </section>
  </main>
)
}
