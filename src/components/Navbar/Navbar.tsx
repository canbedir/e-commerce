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
    <div className='container w-4/5 lg:w-1/2 px-4 md:px-10 flex items-center justify-between h-16 border rounded-full border-white/50 mt-5'>
      <div className='flex items-center w-full'>
        <Logo />
        <Search />
      </div>
      <div className='flex items-center gap-7 text-white'>
        <CardCount />
        <UserComponent currentUser={currentUser} />
        <NavbarMenu />
      </div>
    </div>
  );
}

export default Navbar;
