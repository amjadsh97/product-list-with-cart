export interface Image {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
}

export interface Product {
  image: Image;
  name: string;
  category: string;
  price: number;
}

export interface ProductContextType {
  products: Product[];
  selectedProducts: Product[];
  setProducts: (products: Product[]) => void;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  changeCountOfProduct: (product: Product, type:string) => void;
}