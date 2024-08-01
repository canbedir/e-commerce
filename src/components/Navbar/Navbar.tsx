import React from 'react'
import Logo from './Logo'
import Search from './Search'
import CardCount from './CardCount'
import User from './User'
import NavbarMenu from './NavbarMenu'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between gap-3 md:gap-10  h-16 '>
        <Logo/>
        <Search/>
        <CardCount/>
        <User/>
        <NavbarMenu/>
    </div>
  )
}

export default Navbar