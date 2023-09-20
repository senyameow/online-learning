import { FileWarning } from 'lucide-react'
import React from 'react'

const Warning = () => {
    return (
        <div className='w-full p-4 bg-yellow-300/70 text-center  text-md font-semibold'>
            <div className='w-fit flex items-center'>
                <FileWarning className='w-4 h-4 mr-2' />
                This course is unpublished. Users are not able to see it
            </div>
        </div>
    )
}

export default Warning