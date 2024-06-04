import React from 'react'

const Navbar = () => {
  return (
    <div className='flex justify-between
     p-3 px-10 border-b-[1px] shadow-sm'>
        <div className='flex gap-10 items-center'>
            <img src='/logo.png' alt='logo' className='w-[120px] h-[40px]'/>
            <div className='hidden md:flex gap-6'>
                <h2 className='hover:bg-gray-100 p-2
                rounded-md cursor-pointer transition-all'>Home</h2>
                <h2 className='hover:bg-gray-100 p-2
                rounded-md cursor-pointer transition-all'>History</h2>
                <h2 className='hover:bg-gray-100 p-2
                rounded-md cursor-pointer transition-all'>Help</h2>
            </div>
        </div>
       
    </div>
  )
}

export default Navbar