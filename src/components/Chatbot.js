import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css';
import './ChatCards.css';
import CardItem from './ChatCardItem';
import OpenCard from './OpenCard';

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
        src: 'images/img-23.png',
        text: 'Baked Cheetos Cheese Flavored Snack',
        price: 'Tsh 2,800',
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

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [showGreeting, setShowGreeting] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCardOpen, setIsCardOpen] = useState(false);

    const sendMessage = async () => {
        if (input.trim() === '') return;
        const userMessage = { sender: 'user', text: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);

        const botResponse = getBotResponse(input);
        setMessages(prevMessages => [...prevMessages, botResponse.message]);
        setRecommendedProducts(botResponse.products);
        setInput('');
        setShowGreeting(false);
    };

    const getBotResponse = (message) => {
        const lowerMessage = message.toLowerCase();
        const matchedProducts = products.filter(product => {
            const productText = product.text.toLowerCase();
            return lowerMessage.split(' ').some(word => productText.includes(word));
        });

        if (matchedProducts.length > 0) {
            const productWord = lowerMessage.split(' ').find(word => products.some(product => product.text.toLowerCase().includes(word)));
            const responseText = `I found ${matchedProducts.length > 1 ? 'some' : 'a'} ${productWord || 'product'} that you may like. You can buy ${matchedProducts.length > 1 ? 'them' : 'it'} by clicking on ${matchedProducts.length > 1 ? 'them' : 'it'} and adding ${matchedProducts.length > 1 ? 'them' : 'it'} to your cart.`;
            return { message: { sender: 'bot', text: responseText }, products: matchedProducts };
        } else {
            return { message: { sender: 'bot', text: 'Sorry, I could not find any products matching your description.' }, products: [] };
        }
    };

    const handleCardClick = (product) => {
        setSelectedProduct(product);
        setIsCardOpen(true);
    };

    const handleCloseCard = () => {
        setIsCardOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="chatbot-container">
            <div className="response">
                {showGreeting && (
                    <div className="greeting">
                        <h2>Hello👋</h2>
                        <h2>How can I help you today?</h2>
                    </div>
                )}
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        <div className="message-sender">{msg.sender === 'user' ? 'You' : 'Assistant'}</div>
                        <div className="message-text">{msg.text}</div>
                    </div>
                ))}
            </div>
            <div className="cards">
                <div className="cards__container">
                    <div className="cards__wrapper">
                        <ul className="cards__items">
                            {recommendedProducts.map((product, index) => (
                                <CardItem
                                    key={index}
                                    src={product.src}
                                    text={product.text}
                                    price={product.price}
                                    store={product.store}
                                    onClick={() => handleCardClick(product)}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <form className="input-form" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message here..."
                />
            </form>
            {selectedProduct && (
                <OpenCard isOpen={isCardOpen} cardData={selectedProduct} onClose={handleCloseCard} />
            )}
        </div>
    );
};

export default Chatbot;