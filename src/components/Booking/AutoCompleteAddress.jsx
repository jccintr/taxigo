import React,{useState,useContext,useEffect} from 'react';
import { DestinationCoordContext } from '../../context/DestinationCoordContext';
import { SourceCoordContext } from '../../context/SourceCoordContext';

const AutoCompleteAddress = () => {
    const [source,setSource]=useState(null)
    const [sourceChange,setSourceChange]=useState(false)
    const [destinationChange,setDestinationChange]=useState(false)
    const [addressList,setAddressList]=useState([]);
    const [destination,setDestination]=useState(null)

    const {sourceCordinates,setSourceCordinates}=useContext(SourceCoordContext);
    const {destinationCordinates,setDestinationCordinates}=useContext(DestinationCoordContext);

    useEffect(()=>{
      const delayFunction =  setTimeout(()=>{
          getAddressList()
      },1000)
      return () => clearTimeout(delayFunction)   
  },[source,destination]);


  const getAddressList = async () => {
      setAddressList([]);
      const query=sourceChange?source:destination;
      const url = import.meta.env.VITE_MAPBOX_SUGGEST_URL+'q='+query+'&session_token='+import.meta.env.VITE_MAPBOX_SESSION_TOKEN+'&access_token='+import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
      const res = await fetch(url,{
          headers:{
              "Content-Type": "application/json",  
      }
      });
    //  console.log(url);
     const result = await res.json();
     //console.log(result);
      setAddressList(result)
      
  }

  const onSourceAddressClick=async(item)=>{
    setSource(item.name);
    setAddressList([]);
    setSourceChange(false);

    const url = import.meta.env.VITE_MAPBOX_RETRIVE_URL+item.mapbox_id +'?&session_token='+import.meta.env.VITE_MAPBOX_SESSION_TOKEN+'&access_token='+import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
    const res = await fetch(url,{ headers:{"Content-Type": "application/json", }});
    
    const result=await res.json();
    
    setSourceCordinates({
        lng:result.features[0].geometry.coordinates[0],
        lat:result.features[0].geometry.coordinates[1], 
    })
    
    
}

const onDestinationAddressClick=async(item)=>{
  setDestination(item.name);
  setAddressList([]);
  setDestinationChange(false)

   const url = import.meta.env.VITE_MAPBOX_RETRIVE_URL+item.mapbox_id +'?&session_token='+import.meta.env.VITE_MAPBOX_SESSION_TOKEN+'&access_token='+import.meta.env.VITE_MAPBOX_ACCESS_TOKEN
  const res = await fetch(url,{ headers:{"Content-Type": "application/json", }});
  
  const result = await res.json();
  
  setDestinationCordinates({
      lng:result.features[0].geometry.coordinates[0],
      lat:result.features[0].geometry.coordinates[1], 
  })
//  console.log(result);
}




  return (
    <div className=''>
        <div className='relative'>
            <label className=' text-[14px]'>Ponto de Partida</label>
            <input type="text" className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-[14px]'
                   value={source}
                   onChange={(e)=>{setSource(e.target.value);setSourceChange(true)}}
            />
            {addressList?.suggestions&&sourceChange?
            <div className='shadow-md p-1 rounded-md absolute w-full bg-white z-20'>
            {addressList?.suggestions.map((item,index)=>(
                <h2 key={index} className='p-3 hover:bg-gray-100 cursor-pointer' onClick={()=>{onSourceAddressClick(item)}}>{item.name}</h2>
            ))}
           </div>:null}
        </div>
        <div className='relative'>
            <label className='text-[14px]'>Ponto de Chegada</label>
            <input type="text" className='bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300 text-[14px]'
                   value={destination}
                   onChange={(e)=>{setDestination(e.target.value);setDestinationChange(true)}}
            />
            {addressList?.suggestions&&destinationChange?
            <div className='shadow-md p-1 rounded-md absolute w-full bg-white z-20'>
            {addressList?.suggestions.map((item,index)=>(
                <h2 key={index} className='p-3 hover:bg-gray-100 cursor-pointer' onClick={()=>{onDestinationAddressClick(item)}}>{item.name}</h2>
            ))}
           </div>:null}
        </div>
    </div>
  )
}

export default AutoCompleteAddress