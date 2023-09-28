import Image from 'next/image';
import React from 'react'
import { Button } from './ui/button';
import { MessageCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Form } from './ui/form';
import ChatInput from './ChatInput';

interface StudentCardProps {
    name: string;
    image_url: string;
    id: string;
    date: string;
}

const StudentCard = ({ name, id, image_url, date }: StudentCardProps) => {
    return (
        <div className='w-full rounded-lg border border-black p-4 hover:cursor-pointer group'>
            <div className='flex items-center gap-2 justify-between'>
                <div className='flex items-center gap-4'>
                    <Image src={image_url} alt='avatar' width={50} height={50} className='rounded-full ' />
                    <div className='flex flex-col justify-between items-start'>
                        <span className='text-lg font-bold'>{name}</span>
                        <span className='text-sm text-neutral-500'>student since {date}</span>
                    </div>
                </div>
                <div>
                    <Popover>
                        <PopoverTrigger asChild >
                            <Button className='invisible  group-hover:visible' variant={'ghost'}>
                                <MessageCircle className='w-6 h-6 ' />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none"><span className='text-lg font-semibold'>{name}</span></h4>
                                    <p className="text-xs text-muted-foreground">
                                        'DID YOUR DOG EAT YOUR HOMEWORK AGAIN?'
                                    </p>
                                </div>
                                <ChatInput apiUrl={`/api/direct-messages`} query={{ studentId: id }} type='conversation' name={name} />
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>

            </div>
        </div>
    )
}

export default StudentCard