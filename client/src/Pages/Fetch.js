import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Fetch = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [error, setError] = useState(null);
  const [address,setAddress] = useState(null);
  

  const reverseCode = (latitude, longitude) => {
    axios.post('http://localhost:5000/api/reverse-geocode', {
      latitude, // Updated to match the expected parameter names
      longitude
    })
    .then((response) => {
      setAddress(response.data.address);
      setError(null);
    })
    .catch((error) => {
      setError(error.message);
    });
  };
  

  
  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setError(null);
          reverseCode(location.latitude,location.longitude);



        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  

  return (
    <div>
      <h2>Fetch Current Location</h2>
      <button onClick={fetchLocation}>Get Location</button>
      {location.latitude && location.longitude ? (
        <div>
          <p>Latitude: {location.latitude}</p>
          <p>Longitude: {location.longitude}</p>
          <p>Address: {address}</p>
        </div>
      ) : (
        <p>{error ? error : "Location data not available."}</p>
      )}
    </div>
  );
};

export default Fetch;
