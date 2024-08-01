import React from 'react'
import { Input } from '../ui/input'

const Search = () => {
  return (
    <div className='flex-1 items-center justify-center hidden md:flex text-black '>
      <Input placeholder='Search...' className='w-5/12'/>
    </div>
  )
}

export default Search