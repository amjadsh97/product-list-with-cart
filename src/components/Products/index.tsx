import data from "../../data.json";
import ProductItem from "../ProductItem";

const Products = () => {
  return (
    <div className="products">
      <h1 className='food-type'>Desserts</h1>
      <div className="products-wrapper">
        {data.map((product, id) => (
          <ProductItem key={id} product={product}/>
        ))}
      </div>
    </div>
  );
};

export default Products;
