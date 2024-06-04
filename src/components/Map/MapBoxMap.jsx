import React, { useContext, useEffect, useRef, useState } from "react";
import { UserLocationContext } from "../../context/UserLocationContext";
import { SourceCoordContext } from "../../context/SourceCoordContext";
import { DestinationCoordContext } from "../../context/DestinationCoordContext";
import { DirectionDataContext } from "../../context/DirectionDataContext";
import DistanceTime from "../Booking/DistanceTime";
import Markers from "./Markers";
import { Map,Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapBoxRoute from "./MapBoxRoute";

const MapBoxMap = () => {
  const mapRef = useRef();
  const { userLocation, setUserLocation } = useContext(UserLocationContext);
  const { sourceCordinates, setSourceCordinates } = useContext(SourceCoordContext);
  const { destinationCordinates, setDestinationCordinates } = useContext(DestinationCoordContext);
  const {directionData, setDirectionData} = useContext(DirectionDataContext);

  //console.log(directionData);

  useEffect(() => {
    if (sourceCordinates) {
      mapRef.current?.flyTo({
        center: [sourceCordinates.lng, sourceCordinates.lat],
        duration: 2500,
      });
    }
    if (sourceCordinates && destinationCordinates) {
      getDirectionRoute();
    }
  }, [sourceCordinates]);
  //Use to Fly to Destination Markers Location
  useEffect(() => {
    if (destinationCordinates) {
      mapRef.current?.flyTo({
        center: [destinationCordinates.lng, destinationCordinates.lat],
        duration: 2500,
      });
    }

    if (sourceCordinates && destinationCordinates) {
      getDirectionRoute();
    }
  }, [destinationCordinates]);

  const getDirectionRoute = async () => {

    const url = import.meta.env.VITE_MAPBOX_DRIVING_ENDPOINT+
    sourceCordinates.lng+','+
    sourceCordinates.lat+';'+
    destinationCordinates.lng +','+
    destinationCordinates.lat +
    "?overview=full&geometries=geojson" +
    "&access_token=" +
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
     console.log(url);
    const res = await fetch(url,{
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await res.json();
    //console.log(result);
    //console.log(result.routes);
    setDirectionData(result);
  };


  return (
    <div className="p-5">
      <h2 className="text-[20px] font-semibold">Mapa</h2>
      <div className="rounded-lg overflow-hidden">
        {userLocation ? (
          <Map
            ref={mapRef}
            mapboxAccessToken={import.meta.env.VITE_MAPBOX_ACCESS_TOKEN}
            initialViewState={{
              longitude: userLocation?.lng,
              latitude: userLocation?.lat,
              zoom: 14,
            }}
            style={{ width: "100%", height: 500, borderRadius: 10 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
          >
           { /* <Marker 
                longitude={userLocation?.lng} 
                latitude={userLocation?.lat} 
                anchor="bottom" >
                 <img src="./pin.png" 
                 className='w-10 h-10'
                 />
                </Marker>*/}

            <Markers />

            {directionData?.routes ? (
              <MapBoxRoute coordinates={directionData?.routes[0]?.geometry?.coordinates} />
            ) : null}
          
          </Map>
        ) : null}
      </div>
      <div className="absolute bottom-[40px] z-20 right-[20px]">
         <DistanceTime />
     </div>
    </div>
  );

 
}

export default MapBoxMap