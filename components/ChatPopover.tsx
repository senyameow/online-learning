// import React from 'react'
// import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
// import { Button } from './ui/button'
// import { MessageCircle } from 'lucide-react'
// import ChatInput from './ChatInput'

// interface ChatPopoverProps {
//     name: string;
//     id: string;
// }

// const ChatPopover = ({ name, id }: ChatPopoverProps) => {
//     return (
//         <Popover>
//             <PopoverTrigger asChild >
//                 <Button className='invisible  group-hover:visible' variant={'ghost'}>
//                     <MessageCircle className='w-6 h-6 ' />
//                 </Button>
//             </PopoverTrigger>
//             <PopoverContent className="w-80">
//                 <div className="grid gap-4">
//                     <div className="space-y-2">
//                         <h4 className="font-medium leading-none"><span className='text-lg font-semibold'>{name}</span></h4>
//                         <p className="text-xs text-muted-foreground">
//                             'DID YOUR DOG EAT YOUR HOMEWORK AGAIN?'
//                         </p>
//                     </div>
//                     <ChatMessages
//                         member={currentMember}
//                         name={otherMember.profile.name}
//                         chatId={conversation.id}
//                         type="conversation"
//                         apiUrl="/api/direct-messages"
//                         paramKey="conversationId"
//                         paramValue={conversation.id}
//                         socketUrl="/api/socket/direct-messages"
//                         socketQuery={{
//                             conversationId: conversation.id,
//                         }}
//                     />
//                     <ChatInput apiUrl={`/api/direct-messages`} query={{ studentId: id }} type='conversation' name={name} />
//                 </div>
//             </PopoverContent>
//         </Popover>
//     )
// }

// export default ChatPopover