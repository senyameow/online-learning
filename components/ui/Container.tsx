import React, { PropsWithChildren } from 'react'

const Container = ({ children }: PropsWithChildren) => {
    return (
        <div className='w-full bg-black/90 p-1 py-2 rounded-lg px-3'>
            <div className='flex flex-col items-start space-y-2'>
                {children}
            </div>
        </div>
    )
}

export default Container