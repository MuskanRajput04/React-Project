import React, { useEffect, useState } from "react";

const LocationApi = () => {
  const [locationName, setLocationName] = useState("");
  const [latlon, setLatlon] = useState({ lat: null, lon: null });
  const [error, setError] = useState("");

  const API_KEY = "f5e6133864124897967382517e89ed50"; 
  
  useEffect(() => {

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatlon({ lat, lon });

        
          try {
            const res = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${API_KEY}`
            );
            const data = await res.json();
            const place = data.results[0]?.formatted;

            if (place) {
              setLocationName(place);
            } else {
              setError("Unable to find location name.");
            }
          } catch (err) {
            setError("Failed to fetch location name.");
          }
        },
        () => {
          setError("Location access denied.");
        }
      );
    } else {
      setError("Geolocation is not supported.");
    }
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>📍 Your Live Location</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {locationName ? (
        <>
          <p><strong>Location:</strong> {locationName}</p>
          <p>
            <strong>Latitude:</strong> {latlon.lat} <br />
            <strong>Longitude:</strong> {latlon.lon}
          </p>
        </>
      ) : (
        !error && <p>Fetching location...</p>
      )}
    </div>
  );
};

export default LocationApi;
