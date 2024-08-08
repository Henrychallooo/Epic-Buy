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
              src='images/img-9.jpg'
              text='Balenciaga Backpack in black smooth double calfskin'
              price='Tsh 55,000'
              store='Jojo & Loy'
              onClick={() => handleCardItemClick({
                src: 'images/img-9.jpg',
                text: 'Balenciaga Backpack in black smooth double calfskin',
                price: 'Tsh 55,000',
                store: 'Jojo & Loy'
              })}
            />

             <CardItem
              src='images/img-12.jpg'
              text='Baby boy Suspenders shirt and shorts'
              price='Tsh 16,000'
              store='Jojo & Loy'
              onClick={() => handleCardItemClick({
                src: 'images/img-12.jpg',
                text: 'Baby boy Suspenders shirt and shorts',
                price: 'Tsh 16,000',
                store: 'Jojo & Loy'
              })}
            />
        
            <CardItem
              src='images/img-18.png'
              text='BODE Floret wool polo jumper'
              price='Tsh 26,000'
              store='Jojo & Loy'
              onClick={() => handleCardItemClick({
                src: 'images/img-18.png',
              text:'BODE Floret wool polo jumper',
                price: 'Tsh 26,000',
                store: 'Jojo & Loy'
              })}
            />
            <CardItem
              src='images/img-4.jpg'
              text='Yezzy Boost Sneakers'
              price='Tsh 65,000'
              store='Jojo & Loy'
              onClick={() => handleCardItemClick({
                src: 'images/img-4.jpg',
                text: 'Yezzy Boost Sneakers',
                price: 'Tsh 65,000',
                store: 'Jojo & Loy'
              })}
            />
             
             <CardItem
              src='images/img-16.jpg'
              text='Women Jeans by Zara'
              price='Tsh 28,000'
              store='Jojo & Loy'
              onClick={() => handleCardItemClick({
                src: 'images/img-16.jpg',
                text: 'Women Jeans by Zara',
                price: 'Tsh 28,000',
                store: 'Jojo & Loy'
              })}
            />
            <CardItem
              src='images/img-11.jpg'
              text='BackPack by Bathing Ape'
              price='Tsh 55,000'
              store='Jojo & Loy'
              onClick={() => handleCardItemClick({
                src: 'images/img-11.jpg',
                text: 'BackPack by Bathing Ape',
                price: 'Tsh 55,000',
                store: 'Jojo & Loy'
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
