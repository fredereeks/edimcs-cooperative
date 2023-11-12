import React from 'react'
import { MessageProps } from '@/types'
import MessageList from './MessageList'




export default function Messages() {
  const messageData: MessageProps[] | [] = [
    {
      id: 8282942,
      text: 'Welcome to EDIMCS. EDIMCS stands for Enlightenment Drive Initiative Co-operative Society. We are the largest cooperative organization among cooperatives in Nigeria and in the world; with the goal of achieving a first-world Nigeria with empowerment and housing for low-income and small and medium enterprises as our primary goal',
      date: "12th June, 2021",
      sender: 'Andrew Tete',
      senderStatus: 'Admin',
      receiver: 'Abubakar Mutari',
      receiverStatus: 'Member',
      status: 'Read',
      type: 'received'
    },
    {
      id: 8282943,
      text: "We are here to a loading state, as it'll already have the session available. In this way, you can provide a more seamless user experience",
      date: "1st August, 2021",
      sender: 'Abubakar Mutari',
      senderStatus: 'Member',
      receiver: 'Umar Farouq',
      receiverStatus: 'Admin',
      status: 'Unread',
      type: 'sent'
    },
    {
      id: 8282944,
      text: "Don't worry, it's not as serious as the write up appeared.😁 It just requires that you🫵🏽have to be serious and more attentive in class than anyone else. You also got a point to prove to me and dare I say, impress me, so, disciple and motivation, that's what you need.",
      date: "22nd October, 2021",
      sender: 'Umar Farouq',
      senderStatus: 'Admin',
      receiver: 'Abubakar Mutari',
      receiverStatus: 'Member',
      status: 'Read',
      type: 'received'
    },
  ]
  return (
    <main className="flex flex-col gap-4 px-2 sm:px-0 pt-5 pb-10">
      <section className="relative flex flex-col gap-2 p-4 bg-white  dark:bg-[#dbf0f724] dark:shadow-black shadow-slate-200 shadow-md rounded-lg">
        <MessageList key={'92720'} messageData={messageData} />
      </section>
    </main>
  )
}
