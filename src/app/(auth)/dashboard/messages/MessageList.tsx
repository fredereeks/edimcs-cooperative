"use client"
import { FaCalendarAlt, FaEnvelope, FaEnvelopeOpen, FaEnvelopeOpenText } from 'react-icons/fa'
import { edimcs_phonecalculator } from '@/assets/images'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import { MessageProps } from '@/types'
import Modal from '../../ui/Modal'
import TextArea from '@/components/TextArea'
import { TextInput } from '@/components'
import toast from 'react-hot-toast'

export default function MessageList({ messageData }: { messageData: MessageProps[] }) {
    const modalRef = useRef<HTMLDialogElement | null>(null)
    const replyRef = useRef<HTMLDialogElement | null>(null)
    const formRef = useRef<HTMLFormElement | null>(null)
    const subjectRef = useRef<HTMLInputElement | null>(null)
    const messageRef = useRef<HTMLTextAreaElement | null>(null)
    const [selectedMessage, setSelectedMessage] = useState<MessageProps>()
    const [loading, setLoading] = useState<boolean>(false)


    const handleClick = (id: number | string) => {
        try {
            // make request to get user details
            const targetMessage = messageData?.find(message => message.id.toString() === id.toString())
            if (targetMessage) {
                setSelectedMessage(prev => ({ ...targetMessage }))
            }
            modalRef.current?.showModal()
        }
        catch (err) {
            console.log({ err })
        }
    }

    const handleReply = (id: number | string) => {
        try {
            // make request to get user details
            const targetMessage = messageData?.find(message => message.id.toString() === id.toString())
            if (targetMessage) {
                setSelectedMessage(prev => ({ ...targetMessage }))
            }
            replyRef.current?.showModal()
        }
        catch (err) {
            console.log({ err })
        }
    }

    const handleSubmit =  async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true)
        try{
            // const res = await sendMessage({subject: subjectRef.current.value, message: messageRef.current.value}: {subject: string, message: string})
            toast.success(`Message Sent!`)
            formRef.current?.reset()
            replyRef.current?.close()
        }
        catch(err){
            toast.error(`Sorry, we could not send your message. Please, check your network and try again`)
        }
        setLoading(false)
    }

    return (
        <>
            <div className="w-full overflow-x-scroll pb-6 x-scrollbar">
                <table className="w-full text-slate-600 dark:text-slate-50 text-xs sm:text-sm min-w-[20rem]">
                    <thead>
                        <tr>
                            <th colSpan={6}>
                                <h4 className="uppercase font-semibold text-inherit text-left pb-2 mb-2 border-b border-b-slate-200">INBOX</h4>
                            </th>
                        </tr>
                        <tr className='text-inherit'>
                            <th colSpan={2} className='whitespace-nowrap px-4 font-light text-xs text-inherit text-left'>Message Sender</th>
                            <th className='whitespace-nowrap px-4 font-light text-xs text-inherit text-center'>Receiver Details</th>
                            {/* <th className='whitespace-nowrap px-4 font-light text-xs text-inherit text-center'>Date</th> */}
                            <th className='whitespace-nowrap px-2 font-light text-xs text-inherit text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {
                            messageData.map(message => (
                                <tr key={message.id} className='hover:bg-slate-50 dark:hover:bg-slate-900/30'>
                                    <td colSpan={2} onClick={() => handleClick(message?.id)} key={message?.id} className={`${message.status === 'Read' ? 'opacity-70' : 'opacity-100'}`}>
                                        <div className="w-full flex-1 flex items-center gap-2 cursor-pointer overflow-x-hidden">
                                            <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative ${message.status === 'Read' ? 'bg-slate-500 dark:bg-slate-500 text-white' : 'bg-success dark:bg-slate-100 text-slate-100 dark:text-slate-600'}`}>
                                                {
                                                    message.status === "Read" ? <FaEnvelopeOpen className='text-sm sm:text-base' /> : <FaEnvelope className='text-sm sm:text-base' />
                                                }
                                            </div>
                                            <div className='flex-1 flex flex-col justify-center max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl'>
                                                <div className="flex justify-between items-center gap-4 max-w-md">
                                                    <h5 className="text-xs font-semibold leading-tight whitespace-nowrap flex items-center text-slate-600 dark:text-slate-50">{message.sender} <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 p-[.2rem] px-[.3rem] rounded-xs text-slate-600 uppercase ml-2">{message.senderStatus}</span></h5>
                                                    <div className="flex justify-center items-center gap-[.2rem] align-middle text-slate-600 dark:text-slate-100 text-[.6rem]">
                                                        <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{message.date}</p>
                                                    </div>
                                                </div>
                                                <p className="text-[.6rem] sm:text-[.7rem] text-slate-500 dark:text-slate-50 font-extralight opacity-70 leading-tight truncate ellipsis line-clamp-1 whitespace-nowrap max-w-full">{message.text}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="align-middle">
                                        <div className='flex justify-start'>
                                            <h5 className="text-xs font-medium leading-tight whitespace-nowrap flex items-center">{message.receiver} <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 p-[.2rem] px-[.3rem] rounded-xs text-slate-600 uppercase ml-2">{message.receiverStatus}</span></h5>
                                        </div>
                                    </td>
                                    <td className="align-middle">
                                        <h4 onClick={() => handleReply(message.id)} className="flex justify-center items-center gap-[.2rem] align-middle text-slate-400 text-[.6rem] py-[.1rem] sm:py-1"><button className="bg-primary text-white text-inherit px-3 rounded-sm cursor-pointer">Reply</button></h4>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Modal modalRef={modalRef}>
                <div className="relative">
                    <div className="flex flex-col gap-4 p-4 items-center">
                        <div className="w-full flex-1 flex items-center gap-2 cursor-pointer overflow-x-hidden">
                            <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-success dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                                <FaEnvelope className='text-sm sm:text-base' />
                            </div>
                            <div className='flex-1 flex flex-col justify-center w-full'>
                                <div className="flex justify-between items-center gap-4 text-slate-600">
                                    <h5 className="text-xs font-semibold leading-tight whitespace-nowrap flex items-center dark:text-slate-50">{selectedMessage?.sender} <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 p-[.2rem] px-[.3rem] rounded-xs uppercase ml-2">{selectedMessage?.senderStatus}</span></h5>
                                    <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                        <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{selectedMessage?.date}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-50 font-extralight leading-relaxed text-justify border-t border-t-slate-300 pt-2">{selectedMessage?.text}</p>
                    </div>
                </div>
            </Modal>
            <Modal modalRef={replyRef}>
                <div className='p-5 flex flex-col gap-4'>
                    <div className="w-full flex items-center gap-2">
                        <h4 className="text-sm bg-slate-200/50 dark:bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-md uppercase mr-2">REPLY</h4>
                        <div className={`h-7 sm:h-8 w-7 sm:w-8 flex-shrink-0 flex justify-center items-center rounded-full overflow-hidden relative bg-success dark:bg-slate-100 text-slate-100 dark:text-slate-600`}>
                            <FaEnvelope className='text-sm sm:text-base' />
                        </div>
                        <div className='flex-1 flex flex-col justify-center w-full'>
                            <div className="flex justify-between items-center gap-4 text-slate-600">
                                <h5 className="text-sm font-semibold leading-tight whitespace-nowrap flex items-center dark:text-slate-50">{selectedMessage?.sender} <span className="text-[.4rem] bg-slate-200/50 dark:bg-slate-200 p-[.2rem] px-[.3rem] rounded-xs uppercase ml-2">{selectedMessage?.senderStatus}</span></h5>
                                <div className="flex justify-center items-center gap-[.2rem] align-middle dark:text-slate-100 text-[.6rem]">
                                    <FaCalendarAlt className="text-inherit opacity-60" /> <p className="">{selectedMessage?.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <form ref={formRef} action={'dialog'} onSubmit={handleSubmit} className="relative flex flex-col gap-2">
                        <input type="text" ref={subjectRef} name='subject' placeholder='Message Title (Subject)' className="relative outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm placeholder-opacity-70 bg-transparent focus-within:bg-transparent focus:bg-transparent" />
                        <textarea ref={messageRef} cols={30} rows={10} name='message' placeholder='Message Content (Body)' className="relative outline-none py-2 px-4 border border-gray-300 rounded-md text-gray-600 text-sm placeholder-opacity-70 bg-transparent focus-within:bg-transparent focus:bg-transparent" ></textarea>
                        <button type="submit" className="py-2 px-4 sm:px-8 bg-primary text-white text-[.6rem] text-xs rounded-md hover:bg-blue-600 cursor-pointer">Send Message</button>
                    </form>
                </div>
            </Modal>

        </>
    )
}
