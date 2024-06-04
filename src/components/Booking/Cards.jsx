import React,{useState} from 'react';
import CardsList from '../../data/CardsList';

const Cards = () => {
  const [activeIndex,setActiveIndex]=useState(null);

  return (
    <div>
        <h2 className='text-[14px] font-semibold'>Forma de Pagamento</h2>
        <div className='grid grid-cols-5 md:grid-cols-4  lg:grid-cols-5 mt-2 pl-2'>
            {CardsList.map((item,index)=>(
                <div key={index} className={`w-[50px] mb-1 p-2 border-[1px] flex items-center justify-center rounded-md cursor-pointer hover:border-yellow-400 hover:scale-110 transition-all
                 ${activeIndex==index
                    ?'border-yellow-400 border-[2px]':null}`}
                 onClick={()=>setActiveIndex(index)}>
                    <img src={item.image}
                    alt={item.name}
                   
                    />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Cards