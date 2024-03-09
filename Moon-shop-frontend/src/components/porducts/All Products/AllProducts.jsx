/*
This React component appears to be responsible for displaying a list of products in a dashboard. Here are comments on different sections of the code:

1. State Initialization:
   - Initializes state to store the list of products retrieved from the server.

2. Fetch Products Effect:
   - Utilizes the useEffect hook to fetch products from the server and update the state.

3. Product Removal Function:
   - Defines a function (`removeProducts`) to delete a product by making an API request and updating the state accordingly.

4. Back Button Navigation:
   - Provides a back button for navigation using the useNavigate hook.

5. Table Header:
   - Renders the table header with columns: IMAGE, NAME, PRICE, QTY, and ACTIONS.

6. Table Content:
   - Populates the table body with product information, including image, name, price, quantity, and action buttons.

7. Edit and Delete Buttons:
   - Provides buttons for editing and deleting each product, triggering navigation or removal when clicked.

8. Conditional Rendering:
   - Checks if there are products to display and renders a message if the list is empty.

9. Styling:
   - Applies CSS classes and styles for visual presentation.

Note: The comments aim to provide an overview of each section's functionality in the React component code.
*/

import { useEffect, useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "../../../api/axios";

const AllProducts = () => {
  // State Initialization
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  // Fetch Products Effect
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/products", {
          headers: {
            Accept: "application/json",
          },
        });
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  // Product Removal Function
  const removeProducts = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      const updated = products.filter((category) => category.id !== id);
      setProducts(updated);
    } catch (error) {
      console.error(error);
    }
  };

  // Render All Products Page
  return (
    <section className="cont-tab">
      {/* Back Button Navigation */}
      <div>
        <span className="back-btn-dash" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
        </span>
      </div>

      {/* Title */}
      <h3 className="tab-title">Products</h3>

      {/* Table Header */}
      <div className="tbl-header">
        <table className="dash-table">
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>QTY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
        </table>
      </div>

      {/* Table Content */}
      <div className="tbl-content">
        <table className="dash-table">
          <tbody>
            {products.length > 0 ? (
              // Mapping through Products
              products.map((product) => (
                <tr key={product?.id}>
                  <td>
                    <img
                      className="cate-icon"
                      src={product?.image}
                      alt={product?.image}
                    />
                  </td>
                  <td>{product?.name}</td>
                  <td>{product?.price}</td>
                  <td>{product?.countInStock}</td>

                  {/* Edit and Delete Buttons */}
                  <td>
                    <div className="flex-btn">
                      {/* Edit Button */}
                      <button
                        onClick={() =>
                          navigate(`/dashboard/product/${product?.id}`)
                        }
                        className="cssbuttons-io-button-edit"
                      >
                        <MdEdit className="acti-btn" />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => removeProducts(product?.id)}
                        className="cssbuttons-io-button-delete"
                      >
                        <MdDeleteForever className="acti-btn" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // Conditional Rendering for Empty List
              <tr>
                <td colSpan="5">No Products to display</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AllProducts;
