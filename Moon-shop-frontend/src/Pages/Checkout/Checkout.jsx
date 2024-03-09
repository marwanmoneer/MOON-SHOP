// Importing necessary dependencies and components
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import CartItems from "../../components/ShoppingCart/CartItems";
import "./Checkout.css";
import useAuth from "../../hooks/useAuth";
import { IoMdArrowRoundBack } from "react-icons/io";

// Functional component for the Checkout page
const Checkout = () => {
  // Retrieving user information from the authentication context
  const { auth } = useAuth();
  const user = auth.id;

  // React Router hook for navigation
  const navigate = useNavigate();

  // State variables for managing form input, display messages, and product data
  const [products, setProducts] = useState([]);
  const { cartItems, getItemQuantity, cartQuantity, clearCart } = useShoppingCart();

  const [shippingAddress1, setShippingAddress1] = useState("");
  const [shippingAddress2, setShippingAddress2] = useState("");
  const [city, setCity] = useState("");
  const [orderItems, setOrderItems] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const [success, setSuccess] = useState("");

  // Fetching product data from the server
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (error) {
        console.log("Error message:" + error);
      }
    };
    getData();
  }, []);

  // Updating order items whenever the cart items change
  useEffect(() => {
    const updatedOrderItems = cartItems.map((cartItem) => {
      return {
        quantity: cartItem.quantity,
        product: cartItem.id,
      };
    });
    setOrderItems(updatedOrderItems);
  }, [cartItems]);

  // Handling form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Checking if the user is logged in
    if (!user) {
      setErrmsg(
        <>
          Please log in first to complete the order.
          <Link to="/signin"> Log in</Link>
        </>
      );
      return;
    }
    // Checking if a payment method is selected
    if (!payment) {
      setErrmsg(`Please select a payment method`);
      return;
    }

    try {
      // Sending a POST request to create a new order
      const response = await axios.post(
        "/api/orders",
        {
          orderItems,
          shippingAddress1,
          shippingAddress2,
          city,
          zip,
          country,
          phone,
          payment,
          user: user,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Updating the state to indicate successful order placement
      setSuccess("Order completed");
      // Clearing the shopping cart and resetting form fields
      clearCart();
      setShippingAddress1("");
      setShippingAddress2("");
      setCity("");
      setZip("");
      setCountry("");
      setPhone("");
      setPayment("");
    } catch (err) {
      // Handling different error scenarios and updating the error message
      if (!err?.response) {
        setErrmsg("Server not responding");
      } else {
        setErrmsg(err.response.data.message);
      }
    }
  };

  return (
    <main>
      <div className="basket">
        <h2 className="">Checkout</h2>
        {/* Displaying error and success messages if any */}
        {errmsg && (
          <div className="warning-msg">
            <i className="fa fa-warning"></i>
            {errmsg}
          </div>
        )}
        {success && (
          <div className="success-msg">
            <i className="fa fa-check"></i>
            {success}
          </div>
        )}
        {/* Button for navigating back to the previous page */}
        <div>
          <span className="back-btn" onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack />
          </span>
        </div>
        {/* Displaying the items in the shopping cart */}
        <div className="basket-labels">
          <ul>
            <li className="item item-heading">Item</li>
            <li className="price">Price</li>
            <li className="quantity">Quantity</li>
            <li className="subtotal">Subtotal</li>
          </ul>
        </div>

        {cartItems.map((item) => {
          const productQuantity = getItemQuantity(item.id);
          // Rendering CartItems component for each item in the cart
          if (productQuantity > 0) {
            return <CartItems key={item.id} {...item} />;
          } else {
            return null;
          }
        })}
      </div>
      {/* Sidebar for order summary and delivery details */}
      <aside>
        <div className="summary">
          {/* Form for entering shipping and payment details */}
          <form onSubmit={handleSubmit}>
            <div className="summary-total-items brd-tot">
              <span className="total-items">{cartQuantity}</span> Items in your Bag
            </div>

            <div className="summary-delivery">
              <div className="Shipping">
                {/* Shipping address input fields */}
                <input
                  className="check-input"
                  type="text"
                  placeholder="Shipping Address 1"
                  value={shippingAddress1}
                  onChange={(e) => setShippingAddress1(e.target.value)}
                  required
                />
                <input
                  className="check-input"
                  type="text"
                  placeholder="Shipping Address 2"
                  value={shippingAddress2}
                  onChange={(e) => setShippingAddress2(e.target.value)}
                  required
                />
                {/* Country, city, zip code, and phone input fields */}
                <div className="check-detl">
                  <input
                    className="check-input-sm"
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                  <input
                    className="check-input-sm"
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                  <input
                    className="check-input-sm"
                    type="text"
                    placeholder="Zip code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                  />
                  <input
                    className="check-input-sm"
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>
              {/* Payment method selection dropdown */}
              <div className="custom-select">
                <select
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  required
                >
                  <option selected="selected">Select payment method</option>
                  <option value="cash on delivery">Cash on delivery</option>
                </select>
                <div className="select-arrow"></div>
              </div>
            </div>
            {/* Order total section */}
            <div className="summary-total">
              <div className="total-title">Total</div>
              <div className="total-value final-value" id="basket-total">
                {/* Calculating the total price of items in the cart */}
                {cartItems.reduce((total, cartItem) => {
                  const product = products.find((item) => item.id === cartItem.id);
                  return total + (product?.price || 0) * cartItem.quantity;
                }, 0)}
              </div>
            </div>
            {/* Checkout button */}
            <div className="summary-checkout">
              <button className="checkout-cta">Place Order</button>
            </div>
          </form>
        </div>
      </aside>
    </main>
  );
};

// Exporting the Checkout component for use in other parts of the application
export default Checkout;
