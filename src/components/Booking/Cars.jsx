import React, { useContext, useState } from 'react';
import CarsList from '../../data/CarsList';
import { DirectionDataContext } from '../../context/DirectionDataContext';

const Cars = () => {
  const [selectedCar,setSelectedCar] = useState();
  const {directionData, setDirectionData} = useContext(DirectionDataContext);

  const getCost = (charges) => {
    return (charges*(directionData.routes[0].distance/1000)*5).toFixed(2)
  }

  return (
    <div className='mt-3'>
        <h2 className='font-semibold text-[14px]'>Escolha o carro</h2>
        <div className='grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3'>
            {CarsList.map((item,index)=>(
                <div key={index} className={`m-2 p-2 border-[1px] rounded-md hover:border-yellow-400 cursor-pointer
                    ${index==selectedCar ?'border-yellow-400 border-[2px]':null}`}
                    onClick={()=>setSelectedCar(index)}>
                    <img src={item.image} alt={item.name} className='w-full'/>
                    <h2 className='text-[10px] text-gray-500'>{item.name}
                      {directionData.routes?
                        <span className='float-right font-bold text-yellow-400'>R$ {getCost(item.charges)}</span>:null}
                    </h2>
                </div>
            ))}
        </div>
    </div>
  )


}

export default Cars