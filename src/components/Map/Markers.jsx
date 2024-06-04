import React, { useContext } from 'react';
import { DestinationCoordContext } from '../../context/DestinationCoordContext';
import { SourceCoordContext } from '../../context/SourceCoordContext';
//import { UserLocationContext } from '../../context/UserLocationContext';
import { Marker } from 'react-map-gl';




const Markers = () => {
  //const {userLocation,setUserLocation} = useContext(UserLocationContext);
  const {sourceCordinates,setSourceCordinates} = useContext(SourceCoordContext);
  const {destinationCordinates,setDestinationCordinates} = useContext(DestinationCoordContext);
 
  return (
    <div>
        {/* User Marker  */}
             {/* <Marker 
                longitude={userLocation?.lng} 
                latitude={userLocation?.lat} 
                anchor="bottom" >
                 <img src="./pin.png" 
                 className='w-10 h-10'
                 />
                </Marker> */}

                {/* Source marker  */}
              
               {sourceCordinates.length!=0? 
               <Marker longitude={sourceCordinates?.lng} latitude={sourceCordinates?.lat} anchor="bottom" >
                 <img src="./green_flag.png" className='w-11 h-11'/>
               </Marker>:null}
               
                {/* Destination Marker  */}
                {destinationCordinates.length!=0?
                 <Marker longitude={destinationCordinates?.lng} latitude={destinationCordinates?.lat} anchor="bottom" >
                  <img src="./finish_flag.png" className='w-10 h-10' />
                </Marker>:null}

    </div>
  )
}

export default Markers