import React from 'react';
import './ChatCards.css';

const CardItem = ({ src, text, price, store, onClick }) => {
    return (
        <li className="cards__item" onClick={onClick}>
            <div className="cards__item__link">
                <figure className="cards__item__pic-wrap">
                    <img src={src} alt="Product Image" className="cards__item__img" />
                </figure>
                <div className="cards__item__info">
                    <h5 className="cards__item__text">{text}</h5>
                    <p className="cards__item__price">{price}</p>
                    <p className="cards__item__store">{store}</p>
                </div>
            </div>
        </li>
    );
};

export default CardItem;
