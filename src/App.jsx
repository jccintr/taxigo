import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { DestinationCoordContext } from './context/DestinationCoordContext';
import { SourceCoordContext } from './context/SourceCoordContext';
import {UserLocationContext} from './context/UserLocationContext';
import {DirectionDataContext} from './context/DirectionDataContext';
import Booking from './components/Booking/Booking';
import MapBoxMap from './components/Map/MapBoxMap';


function App() {
  const [userLocation,setUserLocation]=useState(null);
  const [sourceCordinates,setSourceCordinates]=useState([]);
  const [destinationCordinates,setDestinationCordinates]=useState([]);
  const [directionData,setDirectionData]=useState([]);

  useEffect(()=>{
    getUserLocation();
  },[]);

  const getUserLocation=()=>{
    navigator.geolocation.getCurrentPosition(function(pos){
      setUserLocation({
        lat:pos.coords.latitude,
        lng:pos.coords.longitude
      })
    })
  }


  return (
    <UserLocationContext.Provider value={{userLocation,setUserLocation}}>
      <SourceCoordContext.Provider value={{sourceCordinates,setSourceCordinates}}>
        <DestinationCoordContext.Provider value={{destinationCordinates,setDestinationCordinates}}>
          <DirectionDataContext.Provider value={{directionData,setDirectionData}}>
                <div>
                    <Navbar/>
                    <div className='grid grid-cols-1 md:grid-cols-3'>
                        <div className=''>
                          <Booking/>
                        </div>
                        <div className='col-span-2'>
                          <MapBoxMap/>
                        </div>
                    </div>
                </div>
          </DirectionDataContext.Provider>
        </DestinationCoordContext.Provider>
      </SourceCoordContext.Provider>
     </UserLocationContext.Provider>
    
    
  )
}

export default App
