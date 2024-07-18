// import React, {useContext} from 'react';
// import iconAddToCart from "../../../public/assets/images/icon-add-to-cart.svg"
// import iconDecrement from "../../../public/assets/images/icon-decrement-quantity.svg"
// import iconIncrement from "../../../public/assets/images/icon-increment-quantity.svg"
// import {Product, ProductContextType} from "../../types";
// import {ProductContext} from "../../ProductProvider";
//
//
// const ProductItem:React.FC<{ product: Product }> = ({product}) => {
//   const context = useContext(ProductContext) as ProductContextType;
//   const { addProduct, removeProduct, selectedProducts } = context;
//
//   const productCounts = selectedProducts.reduce((acc, product) => {
//     acc[product.name] = (acc[product.name] || 0) + 1;
//     return acc;
//   }, {} as Record<string, number>);
//
//   console.log({productCounts})
//   if (!context) {
//     throw new Error('SelectedProducts must be used within a ProductProvider');
//   }
//   return (
//     <div className="product-item">
//       <div className="picture-wrapper">
//         <picture>
//           <source media="(max-width:767px)" srcSet={product.image.mobile}/>
//           <source media="(max-width:1170px)" srcSet={product.image.tablet}/>
//           <img src={product.image.desktop} alt="product image"/>
//         </picture>
//       </div>
//       <div className="product-inner">
//         <div className="buttons-wrapper">
//           <button onClick={() => addProduct(product)} className='add-to-cart'>
//             <img src={iconAddToCart} alt=""/>
//             <span>Add to Cart</span>
//           </button>
//           {/*{show this button if this product selected before and handle add remove the count of products}*/}
//           <div className='change-cart d-none'>
//             <span><img src={iconDecrement} alt=""/></span>
//             <span>1</span>
//             <span><img src={iconIncrement} alt=""/></span>
//           </div>
//         </div>
//
//         <div className="flow-details">
//           <p className="product-category">{product.category}</p>
//           <p className="product-name">{product.name}</p>
//           <p className="product-price">${product.price.toFixed(2)}</p>
//         </div>
//
//       </div>
//
//
//     </div>
//   );
// };
//
//
// export default ProductItem;

import React, { useContext } from 'react';
import iconAddToCart from '../../../public/assets/images/icon-add-to-cart.svg';
import iconDecrement from '../../../public/assets/images/icon-decrement-quantity.svg';
import iconIncrement from '../../../public/assets/images/icon-increment-quantity.svg';
import { Product, ProductContextType } from '../../types';
import { ProductContext } from '../../ProductProvider';

const ProductItem: React.FC<{ product: Product }> = ({ product }) => {
  const context = useContext(ProductContext) as ProductContextType;
  const { addProduct, selectedProducts, changeCountOfProduct } = context;

  if (!context) {
    throw new Error('ProductItem must be used within a ProductProvider');
  }

  const productCount = selectedProducts.reduce((acc, p) => {
    acc[p.name] = (acc[p.name] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)[product.name] || 0;

  return (
    <div className="product-item">
      <div className="picture-wrapper">
        <picture>
          <source media="(max-width:767px)" srcSet={product.image.mobile} />
          <source media="(max-width:1170px)" srcSet={product.image.tablet} />
          <img src={product.image.desktop} alt="product image" />
        </picture>
      </div>
      <div className="product-inner">
        <div className="buttons-wrapper">
          {productCount > 0 ? (
            <div className="change-cart">
              <button onClick={() => changeCountOfProduct(product, "-")}>
                <img src={iconDecrement} alt="decrement quantity"/>
              </button>
              <span>{productCount}</span>
              <button onClick={() => changeCountOfProduct(product, "+")}>
                <img src={iconIncrement} alt="increment quantity"/>
              </button>
            </div>
          ) : (
            <button onClick={() => addProduct(product)} className="add-to-cart">
              <img src={iconAddToCart} alt="add to cart" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>

        <div className="flow-details">
          <p className="product-category">{product.category}</p>
          <p className="product-name">{product.name}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
