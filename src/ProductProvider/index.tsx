import {createContext, useState, useEffect, ReactNode} from 'react';
import {Product, ProductContextType} from '../types';

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const ProductProvider = ({children}: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : [];
  });

  const [selectedProducts, setSelectedProducts] = useState<Product[]>(() => {
    const storedSelectedProducts = localStorage.getItem('selectedProducts');
    return storedSelectedProducts ? JSON.parse(storedSelectedProducts) : [];
  });

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const addProduct = (product: Product) => {
    setSelectedProducts([...selectedProducts, product]);
  };

  const removeProduct = (product: Product) => {
    setSelectedProducts(selectedProducts.filter(p => p.name !== product.name));
  };

  const changeCountOfProduct = (product: Product, type: string) => {
    setSelectedProducts(prev => {
      if (type === "+") {
        return [...prev, product];
      } else if (type === "-") {
        const productIndex = prev.findIndex(p => p.name === product.name);
        if (productIndex !== -1) {
          const updatedProducts = [...prev];
          updatedProducts.splice(productIndex, 1);
          return updatedProducts;
        }
      }
      return prev;
    })
  }

  return (
    <ProductContext.Provider
      value={{products, selectedProducts, setProducts, addProduct, removeProduct, changeCountOfProduct}}>
      {children}
    </ProductContext.Provider>
  );
};

export {ProductProvider, ProductContext};
