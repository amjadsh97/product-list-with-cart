import React, {useContext} from 'react';
import removeImage from '../../../public/assets/images/icon-remove-item.svg';

import {ProductContext} from '../../ProductProvider';
import {Product, ProductContextType} from '../../types';

const CartItem: React.FC<{ hasImage?: boolean; product: Product; count: number }> = ({
                                                                                       product,
                                                                                       count,
                                                                                       hasImage = false
                                                                                     }) => {
  const {removeProduct} = useContext(ProductContext) as ProductContextType;

  return (
    <div className={`cart-item ${hasImage ? "cart-item-image" : ""}`}>
      <div className="cart-side">
        {hasImage &&
					<div className='cart-item__image'>
						<img src={product.image.thumbnail} alt="thumbnail image"/>
					</div>
        }

        {hasImage ? (
          <>
            <div className="has-image-inner">
              <p className="cart-item__name">{product.name}</p>
              <div className="cart-item__details">
                <span className="cart-item__counts">{count}x</span>
                <span className="cart-item__price">@ ${product.price.toFixed(2)}</span>
                <span className="cart-item__total">${(product.price * count).toFixed(2)}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="cart-item__name">{product.name}</p>
            <div className="cart-item__details">
              <span className="cart-item__counts">{count}x</span>
              <span className="cart-item__price">@ ${product.price.toFixed(2)}</span>
              <span className="cart-item__total">${(product.price * count).toFixed(2)}</span>
            </div>
          </>
        )}
      </div>
      <button className='remove-item' onClick={() => removeProduct(product)}>
        <img src={removeImage} alt="remove item"/>
      </button>
    </div>
  );
};

export default CartItem;
