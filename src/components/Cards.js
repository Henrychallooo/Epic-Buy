// Cards.js
import React, { useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import OpenCard from './OpenCard'; // Import the OpenCard component

const products = [
  {
    src: 'images/img-9.jpg',
    text: 'Balenciaga Backpack in black smooth double calfskin',
    price: 'Tsh 55,000',
    store: 'Jojo & Loy',
  },
  {
    src: 'images/img-2.webp',
    text: 'Marvel Spider-Man 2 Standard Edition - PlayStation 5',
    price: 'Tsh 150,000',
    store: 'Gee-Games',
  },
  {
    src: 'images/img-3.jpg',
    text: 'iPhone 15 Pro Max Gradient-Colour Case',
    price: 'Tsh 12,000',
    store: 'TechZone',
  },
  {
    src: 'images/img-4.jpg',
    text: 'Yezzy Boost Sneakers',
    price: 'Tsh 65,000',
    store: 'Footwear Emporium',
  },
  {
    src: 'images/img-13.webp',
    text: 'Cheetos Flaming Hot Snack',
    price: 'Tsh 3,600',
    store: 'Shoppers Supermarket',
  },
  {
    src: 'images/img-10.webp',
    text: 'VIZIO OLED Smart TV',
    price: 'Tsh 550,000',
    store: 'Electronics Depot',
  },
];

function Cards() {
  const [isOpen, setIsOpen] = useState(false); // State to manage modal open/close
  const [selectedCard, setSelectedCard] = useState(null); // State to store selected card data

  // Function to handle card item click and open modal
  const handleCardItemClick = (cardData) => {
    setSelectedCard(cardData);
    setIsOpen(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {products.map((product, index) => (
              <CardItem
                key={index}
                src={product.src}
                text={product.text}
                price={product.price}
                store={product.store}
                onClick={() => handleCardItemClick(product)}
              />
            ))}
          </ul>
        </div>
      </div>
      {/* Render the OpenCard component conditionally */}
      {isOpen && <OpenCard isOpen={isOpen} cardData={selectedCard} onClose={handleCloseModal} />}
    </div>
  );
}

Cards.products = products; // Expose the products array

export default Cards;
