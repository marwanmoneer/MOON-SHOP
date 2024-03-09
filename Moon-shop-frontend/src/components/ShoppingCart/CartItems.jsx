// ShoppingCart.jsx

import { useEffect, useState } from "react";
import "./ShoppingCart.css";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import axios from "../../api/axios";

// CartItems component receives id and quantity as props
const CartItems = ({ id, quantity }) => {
  // State to store product details
  const [products, setProducts] = useState([]);
  // Destructure functions from useShoppingCart context hook
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart } =
    useShoppingCart();

  // Find the product with the matching id from the products array
  const items = products.find((i) => i.id === id);

  // useEffect to fetch product data when the component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch products data from the API
        const res = await axios.get("/api/products");
        // Set the products state with the fetched data
        setProducts(res.data);
      } catch (error) {
        // Log an error message if there is an error fetching data
        console.log("Error message:" + error);
      }
    };
    // Call the getData function to fetch product data
    getData();
  }, []);

  // If no matching product is found, return null
  if (!items) {
    return null;
  }

  return (
    // Display individual cart item details
    <div className="basket-product">
      <div className="item">
        {/* Display product image */}
        <div className="product-image">
          <img src={items.image} alt={items.image} className="product-frame" />
        </div>
        {/* Display product details */}
        <div className="product-details-card">
          <h1 className="product-details-title">{items.name}</h1>
        </div>
      </div>
      {/* Display product price */}
      <div className="price">{items.price}</div>
      {/* Display product quantity with buttons to increase or decrease */}
      <div className="quantity">
        <div className="input-group quantity-field">
          <button onClick={() => decreaseCartQuantity(id)} className="btn-cart">
            -
          </button>
          <p className="inp-cart">{quantity}</p>
          <button onClick={() => increaseCartQuantity(id)} className="btn-cart">
            +
          </button>
        </div>
      </div>
      {/* Display product subtotal */}
      <div className="subtotal">{items.price * quantity}</div>
      {/* Display remove button with onClick event to remove item from cart */}
      <div className="remove">
        <button className="btn" onClick={() => removeFromCart(id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItems;
