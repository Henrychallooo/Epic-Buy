// Discoverpage.js
import React, { useState } from 'react';
import './discoverpage.css';
import { Link } from 'react-router-dom';
import Cards from './Cards2'; // Assuming Cards component is in the same directory
import ChatbotModal from './ChatbotModal';
import OpenCard from './OpenCard'; // Import the OpenCard component

function Discoverpage() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to store selected product

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };


  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    // Assuming products is an array of product objects
    const products = [
      {
        src: 'images/img-9.jpg',
        text: 'Balenciaga Backpack in black smooth double calfskin',
        price: 'Tsh 55,000',
        store: 'Fashion World'
      },
      {
        src: 'images/img-2.webp',
        text: 'Marvel Spider-Man 2 Standard Edition - PlayStation 5',
        price: 'Tsh 150,000',
        store: 'Gee-Games'
      },
      {
        src: 'images/img-3.jpg',
        text: 'iPhone 15 Pro Max Gradient-Colour Case',
        price: 'Tsh 12,000',
        store: 'TechZone'
      },
      {
        src: 'images/img-4.jpg',
        text: 'Yezzy Boost Sneakers',
        price: 'Tsh 65,000',
        store: 'Footwear Emporium'
      },
      {
        src: 'images/img-13.webp',
        text: 'Cheetos Flaming Hot Snack',
        price: 'Tsh 3,600',
        store: 'Shoppers Supermarket'
      },
      {
        src: 'images/img-10.webp',
        text: 'VIZIO OLED Smart TV',
        price: 'Tsh 550,000',
        store: 'Electronics Depot'
      },
      {
        src: 'images/img-15.webp',
        text: 'Apple Watch Aluminum Series 7 (GPS + Cellular)',
        price: 'Tsh 650,000',
        store: 'Apple Store Tz'
      },
      {
        src: 'images/img-14.jpg',
        text: 'Angus Beef Steak Strips - 14oz - Good & Gather',
        price: 'Tsh 11,000',
        store: 'Shoppers Supermarket'
      },
      {
        src: 'images/img-11.jpg',
        text: 'BackPack by Bathing Ape',
        price: 'Tsh 62,000',
        store: 'Bags by Loy'
      },
      {
        src: 'images/img-13.webp',
        text: 'Cheetos Flaming Hot Snack',
        price: 'Tsh 3,600',
        store: 'Shoppers Supermarket'
      },
      {
        src: 'images/img-12.jpg',
        text: 'Baby boy Suspenders shirt and shorts',
        price: 'Tsh 16,000',
        store: 'Kids World'
      },
      {
        src: 'images/img-18.png',
        text: 'BODE Floret wool polo jumper',
        price: 'Tsh 26,000',
        store: 'Jojo & Loy'
      },
      {
        src: 'images/img-16.jpg',
        text: 'Women Jeans by Zara',
        price: 'Tsh 28,000',
        store: 'Jojo & Loy'
      }
    ];
    
    // Check if products is defined before filtering
  const filtered = products && products.filter(product =>
    product.text.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredProducts(filtered || []);
};

  const handleProductClick = (product) => {
    setSelectedProduct(product); // Set the selected product
  };

  const handleCloseCard = () => {
    setSelectedProduct(null); // Reset selected product when closing the card
  };

  return (
    <div className="discover-container">
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="What are you looking for?" 
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <span className="search-icon"><i className="fas fa-search"></i></span>
      </div>
      {searchQuery && (
        <div className="search-results-container">
          <ul>
            {filteredProducts.map((product, index) => (
              <li key={index}>
                <Link to="#" className="search-result-item" onClick={() => handleProductClick(product)}>
                  <div className="result-img-wrap">
                    <img src={product.src} alt={product.text} className="result-img" />
                  </div>
                  <div className="result-info">
                    <h5>{product.text}</h5>
                    <p>{product.price}</p>
                    <p>{product.store}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

{selectedProduct && (
        <OpenCard isOpen={true} cardData={selectedProduct} onClose={handleCloseCard} />
      )}
      
      <div className="categories">
        <ul>
          <li><Link to="/category/electronics">Electronics</Link></li>
          <li><Link to="/category/fashion">Fashion</Link></li>
          <li><Link to="/category/videogames">Video Games</Link></li>
          <li><Link to="/category/beauty">Beauty</Link></li>
          <li><Link to="/category/toys">Toys</Link></li>
          <li><Link to="/category/home">Home</Link></li>
          <li><Link to="/category/sports">Sports</Link></li>
          <li><Link to="/category/groceries">Groceries</Link></li>
          <li><Link to="/category/automotive">Automotive</Link></li>
          <li><Link to="/category/furniture">Furniture</Link></li>
        </ul>
      </div>
      <div className="products">
        <Cards searchQuery={searchQuery} />
      </div>
      <div className="chatbot-icon" onClick={toggleChatbot}>
        <i className="fas fa-bolt"></i> 
      </div>
      <ChatbotModal isOpen={showChatbot} onClose={toggleChatbot} />
    </div>
  );
}

export default Discoverpage;
