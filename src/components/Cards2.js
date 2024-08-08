// Cards.js
import React, { useState } from 'react';
import './Cards.css';
import CardItem from './CardItem';
import OpenCard from './OpenCard'; // Import the OpenCard component

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
            <CardItem
              src='images/img-15.webp'
              text='Apple Watch Aluminum Series 7 (GPS + Cellular)'
              price='Tsh 650,000'
              store='Apple Store Tz'
              onClick={() => handleCardItemClick({
                src: 'images/img-15.webp',
                text: 'Apple Watch Aluminum Series 7 (GPS + Cellular)',
                price: 'Tsh 650,000',
                store: 'Apple Store Tz'
              })}
            />
            <CardItem
              src='images/img-14.jpg'
              text='Angus Beef Steak Strips - 14oz - Good & Gather'
              price='Tsh 11,000'
              store='Shoppers Supermarket'
              onClick={() => handleCardItemClick({
                src: 'images/img-14.jpg',
                text: 'Angus Beef Steak Strips - 14oz - Good & Gather',
                price: 'Tsh 11,000',
                store: 'Shoppers Supermarket'
              })}
            />
            <CardItem
              src='images/img-11.jpg'
              text='BackPack by Bathing Ape'
              price='Tsh 62,000'
              store='Bags by Loy'
              onClick={() => handleCardItemClick({
                src: 'images/img-11.jpg',
                text: 'BackPack by Bathing Ape',
                price: 'Tsh 62,000',
              store:'Bags by Loy'
              })}
            />
            <CardItem
              src='images/img-13.webp'
              text='Cheetos Flaming Hot Snack'
              price='Tsh 3,600'
              store='Shoppers Supermarket'
              onClick={() => handleCardItemClick({
                src: 'images/img-13.webp',
                text: 'Cheetos Flaming Hot Snack',
                price: 'Tsh 3,600',
                store: 'Shoppers Supermarket'
              })}
            />
            <CardItem
              src='images/img-12.jpg'
              text='Baby boy Suspenders shirt and shorts'
              price='Tsh 16,000'
              store='Kids World'
              onClick={() => handleCardItemClick({
                src: 'images/img-12.jpg',
                text: 'Baby boy Suspenders shirt and shorts',
                price: 'Tsh 16,000',
                store: 'Kids World'
              })}
            />
            <CardItem
              src='images/img-10.webp'
              text='VIZIO OLED Smart TV'
              price='Tsh 550,000'
              store='Electronics Depot'
              onClick={() => handleCardItemClick({
                src: 'images/img-10.webp',
                text: 'VIZIO OLED Smart TV',
                price: 'Tsh 550,000',
                store: 'Electronics Depot'
              })}
            />
          </ul>
        </div>
      </div>
      {/* Render the OpenCard component conditionally */}
      {isOpen && <OpenCard isOpen={isOpen} cardData={selectedCard} onClose={handleCloseModal} />}
    </div>
  );
}

export default Cards;
