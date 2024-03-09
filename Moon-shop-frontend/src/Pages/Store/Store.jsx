import { Link } from "react-router-dom";
import "./Store.css";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import ProductCard from "../../components/porducts/ProductCard/ProductCard";
import { MdCategory } from "react-icons/md";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [categories, SetCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get("/api/products");
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.log("error message:" + error);
      }
    };
    getdata();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("/api/categories", {
          headers: {
            Accept: "application/json",
          },
        });
        SetCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCategories();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category._id === selectedCategory)
    : products;

  return (
    <div>
      <nav className="stor-nav">
        <ul>
          {categories.map((category) => (
            <li key={category._id}>
              <Link  onClick={() => setSelectedCategory(category._id)}>
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <section className="stroe-products">
        {filteredProducts.map((product) => (
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
        ))}
      </section>
    </div>
  );
};

export default Store;
