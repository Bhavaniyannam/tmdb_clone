import React from 'react'
import logo from '../movielogo.webp'
import { Link } from 'react-router-dom'
export const Navbar = () => {
  return (
    <div className='flex border space-x-8 items-center py-2'>
        <img className='w-[50px]' src={logo} alt='logo'/>
        
        <Link to='/' className='text-blue-900 text-2xl font-bold'>Movies</Link>
        <Link to='/watchlist' className='text-blue-900 text-2xl font-bold'>Watchlist</Link>

    </div>
  )
}
export default Navbar