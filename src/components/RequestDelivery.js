import React, { useState, useEffect } from 'react';
import './RequestDelivery.css';

const loadScript = (url, callback) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.onload = callback;
  script.onerror = () => {
    console.error('Script loading error');
  };
  document.head.appendChild(script);
};

const RequestDelivery = () => {
  const [startLocation, setStartLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [allDrivers, setAllDrivers] = useState([]);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [price, setPrice] = useState('');
  const [deliveryRequests, setDeliveryRequests] = useState([]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  

  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyBauO5huvqTTo1tio-W6eMNUWiqlw_Kh84&libraries=places`,
      () => {
        if (startLocation && destination) {
          const directionsService = new window.google.maps.DirectionsService();
          const directionsRenderer = new window.google.maps.DirectionsRenderer();

          const map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: { lat: -6.369028, lng: 34.888822 },
          });
          directionsRenderer.setMap(map);

          const request = {
            origin: startLocation,
            destination: destination,
            travelMode: 'DRIVING',
          };

          directionsService.route(request, (result, status) => {
            if (status === 'OK') {
              directionsRenderer.setDirections(result);
              setDuration(result.routes[0].legs[0].duration.text);
            } else {
                console.error('Directions request failed due to ' + status);
            }
          });
        }
      }
    );

    // Mock drivers for demo purposes
    const drivers = [
        { name: 'Said Anwar', vehicle: 'Motorcycle', plate: 'T123ABC' },
        { name: 'Kwame lizali', vehicle: 'Motorcycle', plate: 'T324DDC' },
        { name: 'Jane Smith', vehicle: 'Bajaj', plate: 'T956DAA' },
        { name: 'Anold Siya', vehicle: 'Bajaj', plate: 'T796CDA' },
        { name: 'Fred Masanja', vehicle: 'Toyo', plate: 'T456DEF' },
        { name: 'Juma Salim', vehicle: 'Toyo', plate: 'T856DZF' },
        { name: 'Jamila Said', vehicle: 'Pickup Truck', plate: 'T844CZF' },
        { name: 'James Erick', vehicle: 'Pickup Truck', plate: 'T774EZF' },
      ];
      setAllDrivers(drivers);
  }, [startLocation, destination]);

  const calculateDistance = () => {
    if (startLocation && destination) {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [startLocation],
          destinations: [destination],
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            const distanceInMeters = response.rows[0].elements[0].distance.value;
            const distanceInKm = distanceInMeters / 1000;
            setDistance(distanceInKm);

             // Calculate the price and round to the nearest hundred
            const rawPrice = distanceInKm * 550;
            const roundedPrice = Math.round(rawPrice / 100) * 100;
            setPrice(`Tsh ${roundedPrice}`);
        } else {
            console.error('Distance Matrix request failed due to ' + status);
          }
        }
      );
    }
  };

  const handleRequestDelivery = () => {
    const newDeliveryRequest = {
      id: Date.now(),
      driver: selectedDriver,
      price: price,
      startLocation: startLocation,
      destination: destination,
    };
    setDeliveryRequests([...deliveryRequests, newDeliveryRequest]);
  };

  const handleVehicleTypeChange = (e) => {
    const selectedType = e.target.value;
    setVehicleType(selectedType);
    if (selectedType) {
      setAvailableDrivers(allDrivers.filter(driver => driver.vehicle === selectedType));
    } else {
      setAvailableDrivers([]);
    }
  };
  

  return (
    <div className="request-delivery-container">
      <h2>Request Delivery</h2>
      <div className="input-fields">
        <label>Your Location:</label>
        <input
          type="text"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
        />
        <label>Buyer's Location:</label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
      </div>
      <div id="map" className="map"></div>
      <div className="vehicle-selection">
        <label>Vehicle Type:</label>
        <select value={vehicleType} onChange={handleVehicleTypeChange}>
          <option value="">Select Vehicle</option>
          <option value="Motorcycle">Motorcycle</option>
          <option value="Toyo">Toyo</option>
          <option value="Bajaj">Bajaj</option>
          <option value="Pickup Truck">Pickup Truck</option>
        </select>
      </div>
      <div className="drivers-list">
        <h3>Available Drivers:</h3>
        {availableDrivers.map((driver, index) => (
          <div key={index} className="driver">
            <p>
              <strong>Name:</strong> {driver.name}
              <br />
              <strong>Vehicle:</strong> {driver.vehicle}
              <br />
              <strong>Plate:</strong> {driver.plate}
            </p>
            <button onClick={() => setSelectedDriver(driver)}>Select</button>
          </div>
        ))}
      </div>
      <div className="price-section">
        <button onClick={calculateDistance}>See Price</button>
        {price && <p> {price}</p>}
      </div>
      {duration && (
        <div className="duration-section">
          <p>Estimated Delivery Time: {duration}</p>
        </div>
      )}
      <div className="requestdelivery">
      <button onClick={handleRequestDelivery} >Request Delivery</button>
      </div>
      <div className="delivery-requests">
        <h2>Your Requests:</h2>
        {deliveryRequests.map((request) => (
          <div key={request.id} className="delivery-request">
            <p>
              <strong>Delivery ID:</strong> {request.id}
              <br />
              <strong>Driver:</strong> {request.driver.name}
              <br />
              <strong>Vehicle:</strong> {request.driver.vehicle}
              <br />
              <strong>Plate:</strong> {request.driver.plate}
              <br />
              <strong>Price:</strong> {request.price}
              <br />
              <strong>From:</strong> {request.startLocation}
              <br />
              <strong>To:</strong> {request.destination}
            </p>
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default RequestDelivery;
