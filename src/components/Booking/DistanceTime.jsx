import React, { useContext } from 'react';
import { DirectionDataContext } from '../../context/DirectionDataContext';


function toHoursAndMinutes(totalMinutes) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return { hours, minutes };
  } 

const DistanceTime = () => {
    const {directionData, setDirectionData}  = useContext(DirectionDataContext);


    const distancia = (d) => {

        if(d<1000) {
            return d.toFixed(0) + ' m';
        } 
        return (d/1000).toFixed(2) + ' km';
    }

    const duracao = (seconds) => {
        let minutos = Math.ceil(seconds/60)

        if(minutos<60){
            return minutos + ' min';
        }

        const {hours,minutes} = toHoursAndMinutes(minutos);
        return hours + 'h'+ minutes + 'min';
    }
  
    return directionData?.routes&&(
        <div className='bg-yellow-500 p-3'>
           
           <h2 className='text-yellow-100 opacity-80 text-[15px]'>
                Distância: <span className='font-bold mr-3 text-black'>{distancia(directionData.routes[0].distance)}
                </span>
                Duração: <span className='font-bold text-black'>{duracao(directionData.routes[0].duration)}</span>
            </h2>
            
        </div>
      )
 
}

export default DistanceTime