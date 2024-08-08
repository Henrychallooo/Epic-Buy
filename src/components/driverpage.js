import React, { useState } from 'react';
import './driverpage.css';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

const deliveryRequests = [
  { id: 129005674, name: "Jojo & Loy", date: "2024-05-29", time: "12:30", startLocation: { lat: -6.778118360859245, lng: 39.2468988819358 }, endLocation: { lat: -6.768785499434134, lng: 39.22964691318916 }, price: 2500, orderId: "129005674" },
  // Add more requests here
];

const initialDriverInfo = {
  email: 'driver@example.com',
  phone: '0624456789',
  firstName: 'John',
  lastName: 'Martin',
  dateOfBirth: '1995-01-21',
  licenseNumber: 'ABC1234558945',
  vehicleRegistration: 'XYZ6789',
  photo: 'images/driverpic.jpg',
  vehicleType: 'Pickup',
  vehicleColor: 'White'
};

const Driverpage = () => {
  const [requests, setRequests] = useState(deliveryRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [directions, setDirections] = useState(null);
  const [driver, setDriver] = useState(initialDriverInfo);
  const [isEditing, setIsEditing] = useState(false);
  const [editInfo, setEditInfo] = useState(initialDriverInfo);

  const handleAccept = (request) => {
    setSelectedRequest(request);
  };

  const handleReject = (id) => {
    setRequests(requests.filter(request => request.id !== id));
  };

  const handleCancel = () => {
    setSelectedRequest(null);
    setDirections(null);
  };

  const fetchDirections = (start, end) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: start,
        destination: end,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  };

  const handleEditInfo = () => {
    setIsEditing(true);
    setEditInfo(driver);
  };

  const handleSaveInfo = () => {
    setDriver(editInfo);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo' && files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditInfo({ ...editInfo, photo: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setEditInfo({ ...editInfo, [name]: value });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="requests">
          <h2>Delivery Requests</h2>
          {requests.map((request) => (
            <div className="request" key={request.id}>
              <div className="request-info">
                <p>ID: <span style={{ fontWeight: 'bold' }}>{request.id}</span></p>
                <p>Name: <span style={{ fontWeight: 'bold' }}>{request.name}</span></p>
                <p>Date: <span style={{ fontWeight: 'bold' }}>{request.date}</span></p>
                <p>Time: <span style={{ fontWeight: 'bold' }}>{request.time}</span></p>
              </div>
              <div className="request-accept">
                <button onClick={() => handleAccept(request)}>Accept</button>
              </div>
              <div className="request-reject">
                <button onClick={() => handleReject(request.id)}>Reject</button>
              </div>
            </div>
          ))}
        </div>
        <div className="info">
          
          <div className="driver-info">
            <img src={driver.photo} alt="Driver's photo" className="driver-photo" />
            <p>Email: <span style={{ fontWeight: 'bold' }}>{driver.email}</span></p>
            <p>Phone: <span style={{ fontWeight: 'bold' }}>{driver.phone}</span></p>
            <p>First Name: <span style={{ fontWeight: 'bold' }}>{driver.firstName}</span></p>
            <p>Last Name: <span style={{ fontWeight: 'bold' }}>{driver.lastName}</span></p>
            <p>Date of Birth: <span style={{ fontWeight: 'bold' }}>{driver.dateOfBirth}</span></p>
            <p>License Number: <span style={{ fontWeight: 'bold' }}>{driver.licenseNumber}</span></p>
            <p>Vehicle Registration: <span style={{ fontWeight: 'bold' }}>{driver.vehicleRegistration}</span></p>
            <p>Vehicle Type: <span style={{ fontWeight: 'bold' }}>{driver.vehicleType}</span></p>
            <p>Vehicle Color: <span style={{ fontWeight: 'bold' }}>{driver.vehicleColor}</span></p>
            <button onClick={handleEditInfo}>Edit Profile</button>
          </div>
        </div>
      </div>
      {selectedRequest && (
        <div className="track-delivery">
          <div className="track-delivery-content">
            <div className="close" onClick={handleCancel}>✖</div>
            <h3>Delivery Details</h3>
            <p>Name: <span style={{ fontWeight: 'bold' }}>{selectedRequest.name}</span></p>
            <p>Price: <span style={{ fontWeight: 'bold' }}>Tsh{selectedRequest.price}</span></p>
            <p>Delivery ID: <span style={{ fontWeight: 'bold' }}>{selectedRequest.orderId}</span></p>
            <button onClick={() => window.open(`tel:${selectedRequest.name}`)}>Call</button>
            <LoadScript
              googleMapsApiKey="AIzaSyBauO5huvqTTo1tio-W6eMNUWiqlw_Kh84"
              onLoad={() => fetchDirections(selectedRequest.startLocation, selectedRequest.endLocation)}
            >
              <GoogleMap
                id="direction-example"
                mapContainerStyle={{
                  height: "400px",
                  width: "100%",
                }}
                zoom={10}
                center={selectedRequest.startLocation}
              >
                {directions && (
                  <DirectionsRenderer
                    directions={directions}
                  />
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      )}
      {isEditing && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h3>Edit Info</h3>
            <label>
              Photo:
              <input type="file" name="photo" accept="image/*" onChange={handleChange} />
            </label>
            <label>
              Email:
              <input type="email" name="email" value={editInfo.email} onChange={handleChange} />
            </label>
            <label>
              Phone:
              <input type="tel" name="phone" value={editInfo.phone} onChange={handleChange} />
            </label>
            <label>
              First Name:
              <input type="text" name="firstName" value={editInfo.firstName} onChange={handleChange} />
            </label>
            <label>
              Last Name:
              <input type="text" name="lastName" value={editInfo.lastName} onChange={handleChange} />
            </label>
            <label>
              Date of Birth:
              <input type="date" name="dateOfBirth" value={editInfo.dateOfBirth} onChange={handleChange} />
            </label>
            <label>
              Driving License Number:
              <input type="text" name="licenseNumber" value={editInfo.licenseNumber} onChange={handleChange} />
            </label>
            <label>
              Vehicle Registration:
              <input type="text" name="vehicleRegistration" value={editInfo.vehicleRegistration} onChange={handleChange} />
            </label>
            <label>
              Vehicle Type:
              <input type="text" name="vehicleType" value={editInfo.vehicleType} onChange={handleChange} />
            </label>
            <label>
              Vehicle Color:
              <input type="text" name="vehicleColor" value={editInfo.vehicleColor} onChange={handleChange} />
            </label>
            <button onClick={handleSaveInfo}>Save</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Driverpage;
