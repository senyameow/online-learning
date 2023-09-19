import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
    return (
        <Link href={'/'} className='flex w-full justify-center items-center'>
            <Image src={'/ameameame.jpg'} width={120} height={120} alt='logo' className='object-cover rounded-xl ' />
        </Link>
    )
}

export default Logo