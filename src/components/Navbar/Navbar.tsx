import React from 'react';
import Logo from './Logo';
import Search from './Search';
import CardCount from './CardCount';
import UserComponent from './User';
import NavbarMenu from './NavbarMenu';
import { getCurrentUser } from '@/app/actions/getCurrentUser';

const Navbar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className='container mx-auto px-4 md:px-10 flex items-center justify-between h-16 border-b border-black/50'>
      <div className='flex items-center gap-3 md:gap-10 w-full'>
        <Logo />
        <Search />
      </div>
      <div className='flex items-center gap-10 text-white'>
        <CardCount />
        <UserComponent currentUser={currentUser} />
        <NavbarMenu />
      </div>
    </div>
  );
}

export default Navbar;
