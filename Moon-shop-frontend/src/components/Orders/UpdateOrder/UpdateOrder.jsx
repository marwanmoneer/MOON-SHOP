/*
The provided React component code appears to be an order update page. Here are comments on different sections of the code:

1. Import Statements:
   - Imports necessary modules and icons from external libraries.

2. Component and State Initialization:
   - Initializes the functional component and various states for managing order data, status, error messages, and loading.

3. useEffect for Fetching Order Data:
   - Utilizes the useEffect hook to fetch order data from the server based on the provided order ID.

4. Form Submission Handling:
   - Handles the form submission for updating order status using axios. Displays success or error messages accordingly.

5. Render Order Information Section:
   - Renders the order information section, including address, user details, and a form to update the order status.

6. Render Payment Information Section:
   - Renders the payment information section, displaying the payment method.

7. Render Order Items Table:
   - Renders a table with order items, including product details such as image, name, cost, quantity, and total.

8. Dropdown for Order Status:
   - Provides a dropdown select box for updating the order status, with options like "Pending," "Waiting for payment," etc.

9. Loading and Error Messages:
   - Displays loading spinner while fetching data and provides warning and success messages.

10. Icons:
    - Utilizes icons for visual elements, including an arrow icon for navigation, an email icon, and a phone icon.

Note: The comments are intended to provide a quick overview of each section's purpose in the React component code.
*/
import { useEffect, useState } from "react";
import "./UpdateOrder.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";
import { MdEmail } from "react-icons/md";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { IoMdArrowRoundBack } from "react-icons/io";

const UpdateOrder = () => {
  // Component and State Initialization
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, SetOrder] = useState([]);
  const [status, setStatus] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Order Data Effect
  useEffect(() => {
    const getOrder = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("/api/orders/" + id, {
          headers: {
            Accept: "application/json",
          },
        });
        setIsLoading(false);
        SetOrder(res.data);
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    };

    getOrder();
  }, [id]);

  // Form Submission Handling
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        "/api/orders/" + order._id,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess("Order status updated to " + response.data.status);
    } catch (err) {
      if (!err?.response) {
        setErrmsg("Server not respons");
      } else {
        setErrmsg(err.response.data.message);
      }
    }
  };

  // Render Order Update Page
  return (
    <section className="order-section">
      <div className="order-information">
        {/* Error and Success Messages */}
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

        <div className="order-details">
          {/* Back Button */}
          <div>
            <span className="back-btn-dash" onClick={() => navigate(-1)}>
              <IoMdArrowRoundBack />
            </span>
          </div>
          {/* Order Information Heading */}
          <h3 className="section-heading">Order Information</h3>

          {/* Order Details List */}
          <ul className="order-details-list">
            {/* Shipping Address */}
            <li className="list-item">
              <span className="item-label">
                Shipping Address 1: {order?.shippingAddress1}
              </span>
              <span className="item-value">
                Shipping Address 2: {order?.shippingAddress2}
              </span>
            </li>

            {/* User and Address Details */}
            <li className="list-item">
              <span className="item-label">User: {order?.user?.name}</span>
              <span className="item-label">Country: {order?.country}</span>
              <span className="item-value">City: {order?.city}</span>
              <span className="item-value">Zip: {order?.zip}</span>
            </li>

            {/* Order Status Form */}
            <form onSubmit={handleSubmit}>
              <div className="shipping-items">
                <li className="list-item">
                  <span className="item-label status-flx">
                    Status:
                    <div className="status-select">
                      <select
                        value={status || order.status}
                        onChange={(e) => setStatus(e.target.value)}
                        required
                      >
                        <option value="Pending">Pending</option>
                        <option value="Waiting for payment">Waiting for payment</option>
                        <option value="In progress">In progress</option>
                        <option value="Complete">Complete</option>
                        <option value="Fail">Fail</option>
                      </select>
                      <div className="select-arrow"></div>
                    </div>
                  </span>

                  {/* User Email and Phone */}
                  <span className="item-value status-flx">
                    <MdEmail className="order-icon" />: {order?.user?.email}
                  </span>
                  <span className="item-value status-flx">
                    <IoPhonePortraitOutline className="order-icon" />: {order?.phone}
                  </span>

                  {/* Update Button */}
                  <button className="btn">
                    {isLoading ? <span className="loader"></span> : "Update"}
                  </button>
                </li>
              </div>
            </form>
          </ul>
        </div>
      </div>

      {/* Payment Information Section */}
      <div className="payment-details">
        <div className="payment-info">
          <h3 className="section-heading">Payment Information</h3>

          {/* Payment Method */}
          <li className="list-item">
            <span className="item-label">Payment Method:</span>
            <span className="item-value">{order?.payment}</span>
          </li>
        </div>
      </div>

      {/* Order Items Table */}
      <div className="tbl-header">
        <table className="dash-table">
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>COST</th>
              <th>QYT</th>
              <th>TOTAL</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table className="dash-table">
          <tbody>
            {/* Order Items List */}
            {order?.orderItems?.length > 0 ? (
              order?.orderItems?.map((orderItem) => (
                <tr key={orderItem._id}>
                  <td>
                    <img
                      src={orderItem.product.image}
                      alt={orderItem.product.name}
                      className="product-image"
                    />
                  </td>
                  <td>{orderItem.product.name}</td>
                  <td>${orderItem.product.price}</td>
                  <td>{orderItem.quantity}</td>
                  <td>${orderItem.product.price * orderItem.quantity}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No Products in this order</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default UpdateOrder;
