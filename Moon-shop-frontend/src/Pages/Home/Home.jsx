import { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./Home.css";
import ProductCard from "../../components/porducts/ProductCard/ProductCard";
import ShoppingCart from "../../components/ShoppingCart/ShoppingCart";
import { Link } from "react-router-dom";

export const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get("/api/products");
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.log("errot message:" + error);
      }
    };
    getdata();
  }, []);
  return (
    <div>
      <section className="hero">
        <div className="container-hero">
          <h1>
            New Arrivals <br />
          </h1>
          <Link to='/allproducts'>Discover the entire collection</Link>
        </div>
      </section>
      <section id="Projects">
        {products.map((product) => (
          <>
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              shortDescription={product.richDescription}
              Image={product.image}
              Price={product.price}
              Brand={product.brand}
              CountInStock={product.countInStock}
            />
          </>
        ))}
      </section>
    </div>
  );
};
