import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ loggedIn, updateLogin}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authtoken');
    updateLogin(false);
    navigate('/login');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-transparent text-xl flex py-3 justify-between sticky bg-gradient-to-r from-slate-800 to-[#696BFF]'>
      <ul className='flex gap-x-4 font-medium font-mono justify-center items-center pl-8'>
        <li className='hover:text-white text-zinc-400  hover:cursor-pointer'>
          <Link to='/'> Home</Link>
        </li>
        <li className='hover:text-white text-zinc-400  hover:cursor-pointer'>
          <Link to='/tournaments'> Tournaments</Link>
        </li>
        <li className='hover:text-white text-zinc-400  hover:cursor-pointer'>
          <Link to='/community'> Community</Link>
        </li>
        <li className='hover:text-white text-zinc-400  hover:cursor-pointer'>
          <Link to='/events'> Events</Link>
        </li>
        <li className='hover:text-white text-zinc-400  hover:cursor-pointer'>
          <Link to='/about'> About</Link>
        </li>
      </ul>
      <ul className='flex gap-2 items-center pr-10'>
        <div className='relative'>
          <button
            onClick={toggleDropdown}
            className='px-2 py-1 text-white font-mono hover:bg-indigo-800 focus:outline-none focus:bg-indigo-800 text-lg'
          >
            Organize &gt;
          </button>
          {isOpen && (
            <div className='absolute right-0 mt-2 w-48 rounded-md shadow-lg z-10'>
              <Link
                href='#'
                className='block px-4 py-2 bg-zinc-700 font-mono text-zinc-200 hover:bg-zinc-600 text-base'
                to='/createtournament'
              >
                Create Tournament
              </Link>
              <Link
                href='#'
                className='block px-4 py-2 bg-zinc-700 font-mono text-zinc-200 hover:bg-zinc-600 text-base'
                to='/communities'
              >
                Manage Community
              </Link>
              <Link
                href='#'
                className='block px-4 py-2 bg-zinc-700 font-mono text-zinc-200 hover:bg-zinc-600 text-base'
                to='/events'
              >
                Manage Events
              </Link>
            </div>
          )}
        </div>
        {loggedIn ? (
          <button
            className='text-white mx-2 font-mono font-semibold text-lg px-2 py-1 rounded-sm bg-zinc-800 hover:bg-zinc-700'
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <>
            <button className='text-white mx-2 font-mono font-semibold text-lg px-2 py-1 rounded-sm bg-zinc-800 hover:bg-zinc-700'>
              <Link to='/login'> Login </Link>
            </button>
            <button className='text-white mx-2 font-mono font-semibold text-lg px-2 py-1  rounded-sm bg-indigo-900 hover:bg-indigo-800'>
              <Link to='/signup'> Sign Up</Link>
            </button>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
