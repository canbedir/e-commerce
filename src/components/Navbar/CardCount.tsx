import React from 'react'
import { FaBasketShopping } from 'react-icons/fa6'

const CardCount = () => {
  return (
    <div className='hidden md:flex'>
      <FaBasketShopping size={25} className='cursor-pointer'/>
    </div>
  )
}

export default CardCount