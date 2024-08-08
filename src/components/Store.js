import React, { useState } from 'react';
import './Store.css'; // Import the CSS file
import { Button } from './Button'; // Import the Button component
import Cards from './Cards3'; // Import the Cards component
import RequestDelivery from './RequestDelivery';

const MyStore = () => {
  // Example profile data
  const profileData = {
    username: 'Jojo & Loy',
    profilePic: 'images/img-1.jpg',
    bio: 'T-shirts, jeans, shoes and bags🛍️😎',
    posts: 6, // Array of post objects
    followers: 1600, // Number of followers
    following: 0, // Number of people followed
  };

  const { username, profilePic, bio, posts, followers } = profileData;

  // State to manage active section
  const [activeSection, setActiveSection] = useState('posts');

  // State to manage profile editing
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddPostModalOpen, setAddPostModalOpen] = useState(false);
  const [newProfilePic, setNewProfilePic] = useState(profilePic);
  const [newBio, setNewBio] = useState(bio);
  const [newPost, setNewPost] = useState({
    image: null,
    title: '',
    price: '',
    store: '',
    quantities: [],
    colors: [],
    sizes: [],
  });
  const [tempOption, setTempOption] = useState('');

  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const sampleItems = [
    {
      src: 'images/img-12.jpg',
      text: 'Baby boy Suspenders shirt and shorts',
      price: 'Tsh 16,000',
    
    },
    {
      src: 'images/img-18.png',
      text: 'BODE Floret wool polo jumper',
      price: 'Tsh 26,000',
      
    },
    {
      src: 'images/img-16.jpg',
      text: 'Women Jeans by Zara',
      price: 'Tsh 28,000',
      
    }
  ];

  const orders = [
    { id: '001089547', name: 'Collin Nyange', date: '2024-05-29 14:30', location: 'CoICT', type: 'delivery' },
    { id: '002878999', name: 'Jane Lucas', date: '2024-05-28 10:00', location: 'Jojo & Loy', type: 'pickup' },
  ];

  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);
  const openAddPostModal = () => setAddPostModalOpen(true);
  const closeAddPostModal = () => setAddPostModalOpen(false);

  const handleProfilePicChange = (e) => setNewProfilePic(URL.createObjectURL(e.target.files[0]));
  const handleBioChange = (e) => setNewBio(e.target.value);

  const handleSaveChanges = () => {
    // Save the changes (you can integrate with your backend here)
    closeEditModal();
  };

  const handleAddPostChange = (e) => {
    const { name, value, files } = e.target;
    setNewPost((prevPost) => ({
      ...prevPost,
      [name]: files ? files[0] : value,
    }));
  };

  const handleAddOption = (type) => {
    setNewPost((prevPost) => ({
      ...prevPost,
      [type]: [...prevPost[type], tempOption],
    }));
    setTempOption('');
  };

  const handleAddPost = () => {
    // Add new post logic (you can integrate with your backend here)
    closeAddPostModal();
  };

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedOrder(null);
  };

  const [newRequests, setNewRequests] = useState([]); // New delivery requests
  const [previousRequests, setPreviousRequests] = useState([]); // Previous delivery requests

  return (
    <div className="mystore-container">
      <div className="profile-header">
        <img src={newProfilePic} alt={`${username}'s profile picture`} className="profile-pic" />
        <div className="profile-info">
          <h3>{username}</h3>
          <p>{newBio}</p>
          <div className="profile-stats">
            <span>
              <strong>{posts}</strong> Posts
            </span>
            <span>
              <strong>{followers}</strong> Followers
            </span>
          </div>
          <div className="profile-buttons">
            <Button buttonStyle="btn--outline" buttonSize="btn--medium" onClick={openEditModal}>
              Edit Profile
            </Button>
            <Button buttonStyle="btn--outline" buttonSize="btn--medium" onClick={openAddPostModal}>
              Add New Post
            </Button>
          </div>
        </div>
      </div>
      <div className="section-tabs">
        <span onClick={() => setActiveSection('posts')} className={activeSection === 'posts' ? 'active' : ''}>
          Posts
        </span>
        <span onClick={() => setActiveSection('orders')} className={activeSection === 'orders' ? 'active' : ''}>
          Orders
        </span>
        <span onClick={() => setActiveSection('activity')} className={activeSection === 'delivery' ? 'active' : ''}>
          Delivery
        </span>
      </div>
      <div className="cards-section">
        {activeSection === 'posts' && <Cards posts={posts} />}
        {activeSection === 'orders' && (
          <>
            <div className="new-orders-section">
              <h2>New Orders</h2>
              {orders.map((order) => (
                <div key={order.id} className="order-container" onClick={() => handleOrderClick(order)}>
                  <p>
                    <strong>Order ID:</strong> {order.id}<br />
                    <strong>Name:</strong> {order.name}<br />
                    <strong>Date & Time:</strong> {order.date}<br />
                    {order.type === 'delivery' && (
                      <span>
                        <strong>Delivery Location:</strong> {order.location}<br />
                        
                      </span>
                    )}
                    {order.type === 'pickup' && (
                      <span>
                        <strong>Pick-up Location:</strong> {order.location}<br />
                        
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
            <div className="previous-orders-section">
              <h2>Previous Orders</h2>
              {/* Placeholder for Previous Orders content */}
              <p>No previous orders</p>
            </div>
          </>
        )}

      {activeSection === 'activity' && (
      <>
      <RequestDelivery />
      </>
        )}
  
      </div>
      {isEditModalOpen && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <span className="close-modal" onClick={closeEditModal}>
              &times;
            </span>
            <h2>Edit Profile</h2>
            <div className="edit-modal-body">
              <div className="edit-field">
                <label>Profile Picture:</label>
                <input type="file" onChange={handleProfilePicChange} />
              </div>
              <div className="edit-field">
                <label>Bio:</label>
                <textarea value={newBio} onChange={handleBioChange} />
              </div>
              <button className="btn btn--medium btn--primary" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {isAddPostModalOpen && (
        <div className="addpost-modal">
          <div className="addpost-modal-content">
            <span className="close-modal" onClick={closeAddPostModal}>
              &times;
            </span>
            <h2>Add New Post</h2>
            <div className="addpost-modal-body">
              <div className="addpost-field">
                <label>Product Image:</label>
                <input type="file" name="image" onChange={handleAddPostChange} />
              </div>
              <div className="addpost-field">
                <label>Title:</label>
                <input type="text" name="title" value={newPost.title} onChange={handleAddPostChange} />
              </div>
              <div className="addpost-field">
                <label>Price:</label>
                <input type="text" name="price" value={newPost.price} onChange={handleAddPostChange} />
              </div>
              <div className="addpost-field">
                <label>Store:</label>
                <input type="text" name="store" value={newPost.store} onChange={handleAddPostChange} />
              </div>
              <div className="addpost-field">
                <label>Colors:</label>
                <input type="text" value={tempOption} onChange={(e) => setTempOption(e.target.value)} />
                <button type="button" onClick={() => handleAddOption('colors')}>
                  Add
                </button>
                <div className="options-list">
                  {newPost.colors.map((color, index) => (
                    <span key={index}>{color}</span>
                  ))}
                </div>
              </div>
              <div className="addpost-field">
                <label>Sizes:</label>
                <input type="text" value={tempOption} onChange={(e) => setTempOption(e.target.value)} />
                <button type="button" onClick={() => handleAddOption('sizes')}>
                  Add
                </button>
                <div className="options-list">
                  {newPost.sizes.map((size, index) => (
                    <span key={index}>{size}</span>
                  ))}
                </div>
              </div>
              <button className="btn btn--medium btn--primary" onClick={handleAddPost}>
                Add Post
              </button>
            </div>
          </div>
        </div>
      )}
      {isPopupOpen && (
        <div className="order-popup">
          <div className="order-popup-content">
            <span className="close-order-popup" onClick={handleClosePopup}>
              &times;
            </span>
            <h2>Order Details</h2>
            <ul className="sample-items">
              {sampleItems.map((item, index) => (
                <li key={index} className="sample-item">
                  <img src={item.src} alt={item.text} />
                  <div>
                    <p><strong>{item.text}</strong></p>
                    <p>{item.price}</p>
                    <p>{item.store}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button buttonStyle="btn--primary" buttonSize="btn--medium" onClick={() => alert('Order Confirmed 👍')}>Confirm Order</Button>
            <i className="fas fa-phone-alt"></i> {/* Icon for calling */}
            <i className="fas fa-comment"></i> {/* Icon for chatting */}
            <p>Delivery Location: CoICT (Click to copy)</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyStore;
