import React from 'react';
import AutoCompleteAddress from './AutoCompleteAddress';
import Cars from './Cars';
import Cards from './Cards';

const Booking = () => {
  return (
    <div className='p-5 '>
        <h2 className='text-[20px] font-semibold'>Detalhes da Viagem</h2>
        <div className='border-[1px] p-5 rounded-md'>
          
          <AutoCompleteAddress/>
          <Cars/>
          <Cards/>
          <button className='w-full bg-yellow-400 p-1 rounded-md mt-4'>Solicitar Veículo</button>
        
        </div> 
    </div>
  )
}

export default Booking