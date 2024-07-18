import React, {useContext, useState} from 'react';
import emptyStateImage from '../../../public/assets/images/illustration-empty-cart.svg';

import {ProductContext} from '../../ProductProvider';
import {Product, ProductContextType} from '../../types';
import CartItem from '../CartItem';
import carbon from "../../../public/assets/images/icon-carbon-neutral.svg"
import check from "../../../public/assets/images/icon-order-confirmed.svg"
import Modal from "../Modal";

const Cart: React.FC = () => {
  const [isOrderConfirmed, setIsOrderConfirmed] = useState<boolean>(false)
  const context = useContext(ProductContext) as ProductContextType;
  const {selectedProducts} = context;

  // Calculate the count of each product
  const productCounts = selectedProducts.reduce((acc, product) => {
    acc[product.name] = (acc[product.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Create a list of unique products with their counts
  const uniqueProducts = selectedProducts.reduce((acc: Product[], product) => {
    if (!acc.find(p => p.name === product.name)) {
      acc.push(product);
    }
    return acc;
  }, []);

  // Calculate total price
  const totalPrice = selectedProducts.reduce((acc, product) => acc + product.price, 0);

  const handleConfirmOrder = () => {
    setIsOrderConfirmed(true);
  }

  return (
    <div className="cart">
      <h2>Your Cart ({selectedProducts.length})</h2>
      {selectedProducts.length > 0 ? (
        <>
          {uniqueProducts.map((product) => (
            <CartItem
              key={product.name}
              product={product}
              count={productCounts[product.name]}
            />
          ))}

          <p className="total-price">
            <span className='text'>Order Total</span>
            <span className='value'>${totalPrice.toFixed(2)}</span>
          </p>
          <p className='delivery-type'>
            <img src={carbon} alt="carbon image"/> <span>This is <strong>carbon-neutral</strong> delivery</span>
          </p>
          <button className='order-button' onClick={() => handleConfirmOrder()}>Confirm Order</button>
        </>
      ) : (
        <div className="empty-state">
          <img src={emptyStateImage} alt=""/>
          <p>Your added items will appear here</p>
        </div>
      )}
      <Modal isOpen={isOrderConfirmed} onClose={() => setIsOrderConfirmed(false)}>
        <img src={check} alt=""/>
        <h3 className='modal-title'>Order Confirmed!</h3>
        <p className='modal-description'>We hope enjoy your food!</p>
        <div className="order-details">
          {uniqueProducts.map((product) => (
            <CartItem
              key={product.name}
              product={product}
              count={productCounts[product.name]}
              hasImage
            />
          ))}
          <p className="total-price">
            <span className='text'>Order Total</span>
            <span className='value'>${totalPrice.toFixed(2)}</span>
          </p>
        </div>
        <button className='order-button' onClick={() => setIsOrderConfirmed(false)}>Start New Order</button>
      </Modal>
    </div>
  );
};

export default Cart;
