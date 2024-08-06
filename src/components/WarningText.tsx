import React from 'react'

const WarningText = ({text}: {text:string}) => {
  return (
    <div className='text-white font-bold text-5xl h-[800px] w-full flex items-center justify-center'>
        {text}
    </div>
  )
}

export default WarningText