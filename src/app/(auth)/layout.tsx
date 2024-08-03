import React from 'react'

const AuthLayout = ({children}: {children:React.ReactNode}) => {
  return (
    <div className='min-h-fit h-full w-full mt-auto p-20 flex items-center justify-center text-black'>
        {children}
    </div>
  )
}

export default AuthLayout