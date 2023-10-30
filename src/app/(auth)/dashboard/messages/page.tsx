import React from 'react'
import Image from 'next/image'
import { FaCalendarAlt, FaEnvelope, FaEnvelopeOpen, FaEnvelopeOpenText } from 'react-icons/fa'
import { edimcs_phonecalculator } from '@/assets/images'


type MessageProps = {
  id: number
  text: string
  sender: string
  senderStatus: string
  receiver: string
  receiverStatus: string
  date: string
  status: string
  type: string
}

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
      <section className="relative flex flex-col gap-2 p-4 bg-white shadow-slate-200 shadow-md rounded-lg">
        <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
          <table className="w-full text-slate-500 dark:text-slate-400 text-xs sm:text-sm min-w-[20rem]">
            <thead>
              <tr>
                <th colSpan={6}>
                  <h4 className="uppercase font-semibold text-slate-400 text-left pb-2 mb-2 border-b border-b-slate-200">INBOX</h4>
                </th>
              </tr>
              <tr className='text-slate-400'>
                <th colSpan={2} className='whitespace-nowrap px-4 font-thin text-xs text-slate-400 text-left'>Message Sender</th>
                <th className='whitespace-nowrap px-4 font-thin text-xs text-slate-400 text-center'>Receiver Details</th>
                {/* <th className='whitespace-nowrap px-4 font-thin text-xs text-slate-400 text-center'>Date</th> */}
                <th className='whitespace-nowrap px-2 font-thin text-xs text-slate-400 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody className='w-full'>
              {
                messageData.map(message => (
                  <tr key={message.id}>
                    <td colSpan={2} className={`${message.status === 'Read' ? 'opacity-50' : 'opacity-100'}`}>
                      <div className="w-full flex-1 flex items-center gap-2 cursor-pointer overflow-x-hidden">
                        <div className="h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden text-white dark:text-slate-100 relative bg-success dark:bg-slate-600">
                          {
                            message.status === "Read" ? <FaEnvelopeOpen className='text-sm sm:text-base' /> : <FaEnvelope className='text-sm sm:text-base' />
                          }
                        </div>
                        <div className='flex-1 flex flex-col justify-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl'>
                          <div className="flex justify-between items-center gap-4 max-w-md">
                            <h5 className="text-xs font-medium leading-tight whitespace-nowrap flex items-center">{message.sender} <span className="text-[.4rem] bg-slate-200/50 p-[.2rem] px-[.3rem] rounded-xs text-slate-600 uppercase ml-2">{message.senderStatus}</span></h5>
                            <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-500 text-[.6rem]">
                              <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{message.date}</p>
                            </div>
                          </div>
                          <p className="text-[.6rem] sm:text-[.65rem] font-thin opacity-70 leading-tight truncate ellipsis line-clamp-1 whitespace-nowrap max-w-full">{message.text}</p>
                        </div>
                      </div>
                    </td>
                    <td className="align-middle">
                      <div className='flex justify-center'>
                        <h5 className="text-xs font-medium leading-tight whitespace-nowrap flex items-center">{message.receiver} <span className="text-[.4rem] bg-slate-200/50 p-[.2rem] px-[.3rem] rounded-xs text-slate-600 uppercase ml-2">{message.receiverStatus}</span></h5>
                      </div>
                    </td>
                    <td className="align-middle">
                      <h4 className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1"><button className="bg-primary text-white text-inherit px-3 rounded-sm cursor-pointer">Reply</button></h4>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}
