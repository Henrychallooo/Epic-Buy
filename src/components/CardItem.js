// CardItem.js
import React from 'react';
import { Link } from 'react-router-dom';

function CardItem({ src, text, price, store, onClick }) {
  return (
    <>
      <li className='cards__item' onClick={onClick}>
        <Link className='cards__item__link' to="#">
          <figure className='cards__item__pic-wrap'>
            <img
              className='cards__item__img'
              alt='Product Image'
              src={src}
            />
          </figure>
          <div className='cards__item__info'>
            <h5 className='cards__item__text'>{text}</h5>
            <p className='cards__item__price'>{price}</p>
            <p className='cards__item__store'>{store}</p>
          </div>
        </Link>
      </li>
    </>
  );
}

export default CardItem;
