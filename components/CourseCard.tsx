import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import IconCourse from './IconCourse';
import { Book } from 'lucide-react';
import { formatter } from '@/lib/utils';
// import Currency from './Currency';


interface CourseCardProps {
    id: string;
    image_url: string;
    title: string;
    category: string;
    chapters: number;
    progress: number | null;
    price: number
}

const CourseCard = ({ id, image_url, title, category, chapters, progress, price }: CourseCardProps) => {
    return (
        <Link href={`/courses/${id}`} className='bg-white p-2 border border-neutral-300 rounded-xl gap-2 group relative cursor-pointer'>
            <div className='h-full overflow-hidden'>
                <div className=' relative aspect-square bg-gray-100 rounded-xl mb-3 object-cover overflow-hidden w-full'>
                    <Image src={image_url} alt='product image' fill className='rounded-xl object-cover' />
                </div>
                {/* <div className='opacity-0 group-hover:opacity-100 absolute flex items-center justify-around w-[80%] ml-4 transition top-[50%]'>
                    <button onClick={onModalOpen} className='w-[40px] h-[40px]  rounded-full bg-white flex items-center justify-center border  hover:bg-gray-100 transition'>
                        <Expand className='w-4 h-4' />
                    </button>
                    <button onClick={addToCart} className='w-[40px] h-[40px]  rounded-full bg-white flex items-center justify-center border  hover:bg-gray-100 transition'>
                        <ShoppingCart className='w-4 h-4' />
                    </button>
                </div> */}

                <p className='font-semibold text-xl group-hover:text-sky-600 transition'>{title}</p>
                <p className='text-neutral-500 text-sm font-semibold mb-3'>{category}</p>

                <div className='flex flex-row items-center w-full gap-2'>
                    <IconCourse size={'sm'} variant={`${progress === 100 ? 'success' : 'default'}`} icon={Book} />
                    <span className='text-neutral-500 font-semibold text-sm'>{chapters} Chapters</span>
                </div>

                {!progress && <div className='text-black font-bold text-xl pt-2'>{formatter.format(price)}</div>}
            </div>

        </Link>
    )
}

export default CourseCard