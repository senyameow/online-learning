// import { DirectMessage, Member } from '@prisma/client';
// import React, { useEffect, useState } from 'react'
// import toast from 'react-hot-toast';

// interface ChatMessagesProps {
//   name: string;
//   chatId: string;
//   member: Member;
//   apiUrl: string;
// }

// const ChatMessages = ({ name, chatId, member, apiUrl }: ChatMessagesProps) => {

//   const [isLoading, setIsLoading] = useState(false)

//   const [messages, setMessages] = useState<DirectMessage[]>([])

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         setIsLoading(true)
//         const messages = await db
//       } catch (error) {
//         toast.error(`something went wrong`)
//       } finally {
//         setIsLoading(false)
//       }
//     }
//   }, [])

//   return (
//     <div className='flex-1 flex flex-col overflow-y-auto'>

//     </div>
//   )
// }

// export default ChatMessages