import React, { useState, useEffect } from 'react';
import './PayPage.css';
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';


const sampleItems = [
  {
    src: 'images/img-9.jpg',
    text: 'Balenciaga Backpack in black smooth double calfskin',
    price: 'Tsh 25,000',
    store: 'Jojo & Loy',
    progress: 25 // Progress in percentage
  },
  {
    src: 'images/img-2.webp',
    text: 'Marvel Spider-Man 2 Standard Edition - PlayStation 5',
    price: 'Tsh 250,000',
    store: 'Luxury Perfumes',
    progress: 50 // Progress in percentage
  },
  {
    src: 'images/img-3.jpg',
    text: 'iPhone 15 Pro Max Case',
    price: 'Tsh 12,000',
    store: 'TechZone',
    progress: 75 // Progress in percentage
  },
  {
    src: 'images/img-4.jpg',
    text: 'Yeezy Boost Sneakers',
    price: 'Tsh 65,000',
    store: 'Footwear Emporium',
    progress: 45 // Progress in percentage
  },
  {
    src: 'images/img-10.webp',
    text: 'VIZIO OLED Smart TV',
    price: 'Tsh 550,000',
    store: 'Electronics Depot',
    progress: 5 // Progress in percentage
  }
];

const PayPage = () => {
  const [activeNavItem, setActiveNavItem] = useState('Paylist');
  const [itemsToPay, setItemsToPay] = useState(sampleItems); // Initialize paylist items with sampleItems
  const [itemsToTrack, setItemsToTrack] = useState(sampleItems); // Initialize tracking items with sampleItems
  const [paymentMethod, setPaymentMethod] = useState('Visa'); // Initial payment method
  const [savePaymentInfo, setSavePaymentInfo] = useState(false); // State to track saving payment information
  const [locationAddress, setLocationAddress] = useState(''); // State to store location address
  const [getCurrentLocation, setGetCurrentLocation] = useState(false); // State to track getting current location

  const navigationItems = ['Paylist', 'Track Delivery', 'Pay History', 'Help'];

  const handleNavigationClick = (item) => {
    setActiveNavItem(item);
  };

  const handleRemoveFromPay = (index) => {
    const newItemsToPay = [...itemsToPay];
    newItemsToPay.splice(index, 1);
    setItemsToPay(newItemsToPay);
  };

  const handleSavePaymentInfo = () => {
    setSavePaymentInfo(!savePaymentInfo);
  };

  // Function to handle getting current location
  const handleGetLocation = () => {
    // Simulate getting current location
    const currentLocation = "College of Information and Communication Technologies (CoICT) - University of Dar es salaam, 66HQ+CXG, Dar es Salaam"; // Placeholder for current location
    setLocationAddress(currentLocation);
  };

  return (
    <div className="pay-page-container">
      <div className="side-panel">
        <ul className="navigation-list">
          {navigationItems.map((item, index) => (
            <li
              key={index}
              className={activeNavItem === item ? 'active' : ''}
              onClick={() => handleNavigationClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
        {activeNavItem === 'Paylist' && (
          <PayList itemsToPay={itemsToPay} handleRemoveFromPay={handleRemoveFromPay} />
        )}
        {activeNavItem === 'Track Delivery' && (
          <TrackDelivery itemsToTrack={itemsToTrack} />
        )}
      </div>
      <div className="content-panel">
        {/* Render different content based on activeNavItem */}
      </div>
      {activeNavItem === 'Paylist' && (
        <div className="paylist-sidebar">
          <h2 style={{ fontWeight: 'bold', fontSize: '14px' }}>Order Total</h2>
          <p style={{ fontWeight: 'bold', fontSize: '28px' }}>{calculateOrderTotal(itemsToPay)}</p>
          <h3>Select Delivery Method</h3>
          <select>
            <option>Pickup</option>
            <option>Delivery</option>
          </select>
          <div>
            <h3>Location Address for Delivery</h3>
            <input 
              type="text" 
              value={getCurrentLocation ? locationAddress : ''} 
              placeholder="Enter your location" 
            />
            <label>
              <input 
                type="checkbox" 
                checked={getCurrentLocation} 
                onChange={() => {
                  setGetCurrentLocation(!getCurrentLocation);
                  if (!getCurrentLocation) {
                    handleGetLocation();
                  } else {
                    setLocationAddress('');
                  }
                }} 
              />
              Get my current location
            </label>
          </div>
          <div>
            <h3>Phone Number</h3>
            <input type="text" placeholder="Enter phone number" />
          </div>
          <div>
            <h3>Payment Information</h3>
            <select onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="PayPal">PayPal</option>
            </select>
            <input type="text" placeholder="Card holder name" />
            <input type="text" placeholder="Card number" />
            <input type="text" placeholder="Expiry date (DD/MM/YYYY)" />
            <label>
              <input type="checkbox" checked={savePaymentInfo} onChange={handleSavePaymentInfo} />
              Save my payment information
            </label>
            <button onClick={() => alert('Order Request is Sent')}>Pay & Request Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

const PayList = ({ itemsToPay, handleRemoveFromPay }) => {
  return (
    <div className="paylist-container">
      <h2>Paylist</h2>
      {itemsToPay.map((item, index) => (
        <div key={index} className="paylist-item">
          <img src={item.src} alt="Product Image" className="paylist-item-image" />
          <div className="paylist-item-details">
            <h3>{item.text}</h3>
            <p>{item.price}</p>
            <p>{item.store}</p>
            <button onClick={() => handleRemoveFromPay(index)}>Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const TrackDelivery = ({ itemsToTrack }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [directions, setDirections] = useState(null);
  
  const driverLocation = { lat: -6.771427678681686, lng: 39.239940648360054 }; // Example driver location
  const destinationLocation = { lat: -6.769478, lng: 39.233197 }; // Example destination location (your location)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBauO5huvqTTo1tio-W6eMNUWiqlw_Kh84', // Replace with your API key
    libraries: ['places'],
  });

  useEffect(() => {
    if (isLoaded && selectedItem) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: driverLocation,
          destination: destinationLocation,
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
    }
  }, [isLoaded, selectedItem]);

  const openPopup = (item) => {
    setSelectedItem(item);
  };

  const closePopup = () => {
    setSelectedItem(null);
    setDirections(null);
  };

  return (
    <div className="track-delivery-container">
      <h2>Track Delivery</h2>
      {itemsToTrack.map((item, index) => (
        <div key={index} className="track-delivery-item" onClick={() => openPopup(item)}>
          <img src={item.src} alt="Product Image" className="track-delivery-item-image" />
          <div className="track-delivery-item-details">
            <h3>{item.text}</h3>
            <p>{item.price}</p>
            <p>{item.store}</p>
            <div className="status-bar">
              <div className="status" style={{ width: `${item.progress}%` }}>{item.progress}%</div>
            </div>
          </div>
        </div>
      ))}
      {selectedItem && (
        <div className="popup">
          <div className="popup-content">
            <span className="close-map" onClick={closePopup}>&times;</span>
            <h3 style={{ marginBottom: '10px' }}>{selectedItem.text}</h3>
            <p style={{ marginBottom: '5px' }}>Price: <span style={{ fontWeight: 'bold' }}>Tsh 3,000</span></p>
            <p style={{ marginBottom: '5px' }}>Driver: <span style={{ fontWeight: 'bold' }}>John Martin</span></p>
            <p style={{ marginBottom: '5px' }}>Vehicle Plate Number: <span style={{ fontWeight: 'bold' }}>ABC123</span></p>
            <p style={{ marginBottom: '5px' }}>Vehicle Type & Color: <span style={{ fontWeight: 'bold' }}>Motorcyle, Red</span></p>
           
            <div class="button-container">
            <div className="call-driver">
            <button  onClick={() => alert('Calling the driver...')}>Call Driver</button>
            </div>
            <div className="confirm-delivery">
            <button  onClick={() => alert('Delivery is Confirmed')}>Confirm Delivery</button>
            </div>
            </div>

            <div style={{ height: '350px', width: '900px' }}>
              {isLoaded && (
                <GoogleMap
                  mapContainerStyle={{ height: '100%', width: '100%' }}
                  center={driverLocation}
                  zoom={20}
                >
                  
                  {directions && <DirectionsRenderer directions={directions} />}
              
                </GoogleMap>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


const PayHistory = () => {
  return <div>Pay History</div>;
};

const Help = () => {
  return <div>Help</div>;
};

// Function to calculate total price of items in paylist
const calculateOrderTotal = (itemsToPay) => {
  let total = 0;
  itemsToPay.forEach((item) => {
    total += parseFloat(item.price.replace(/[^\d.]/g, ''));
  });
  return `Tsh ${total.toFixed(2)}`;
};

export default PayPage;
