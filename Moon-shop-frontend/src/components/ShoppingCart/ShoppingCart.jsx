// ShoppingCart.jsx

import { useEffect, useState } from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import CartItems from "./CartItems";
import "./ShoppingCart.css";
import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { cartItems, getItemQuantity, cartQuantity } = useShoppingCart();

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

  return (
    <main>
      <div className="basket">
        {/* Shopping cart heading */}
        <h2 className="">Cart</h2>
        <div>
          {/* Back button to navigate back */}
          <span className="back-btn" onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack />
          </span>
        </div>
        {/* Labels for cart items */}
        <div className="basket-labels">
          <ul>
            <li className="item item-heading">Item</li>
            <li className="price">Price</li>
            <li className="quantity">Quantity</li>
            <li className="subtotal">Subtotal</li>
          </ul>
        </div>

        {/* Map through cart items and display CartItems component for each */}
        {cartItems.map((item) => {
          const productQuantity = getItemQuantity(item.id);
          // Render CartItems component only if quantity is greater than 0
          return productQuantity > 0 ? (
            <CartItems key={item.id} {...item} />
          ) : null;
        })}
      </div>

      {/* Shopping cart summary */}
      <aside>
        <div className="summary">
          {/* Total items in the cart */}
          <div className="summary-total-items">
            <span className="total-items">{cartQuantity}</span> Items in your
            Bag
          </div>

          {/* Subtotal of all items in the cart */}
          <div className="summary-subtotal">
            <div className="subtotal-title">Subtotal</div>
            <div className="subtotal-value final-value" id="basket-subtotal">
              {/* Calculate total based on product prices and quantities */}
              {cartItems.reduce((total, cartItem) => {
                const product = products.find((p) => p.id === cartItem.id);
                return total + (product?.price || 0) * cartItem.quantity;
              }, 0)}
            </div>
          </div>

          {/* Proceed to checkout button */}
          <div className="summary-checkout">
            <button
              onClick={() => navigate("/checkout")}
              className="checkout-cta"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </aside>
    </main>
  );
};

export default ShoppingCart;
