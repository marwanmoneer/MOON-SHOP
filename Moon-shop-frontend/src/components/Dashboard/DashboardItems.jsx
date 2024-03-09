/*
  DashboardItems Component:

  This component fetches and displays various statistics and the last 5 orders in the dashboard.
  It uses the useEffect hook to fetch data from the backend upon component mount.

  - State:
    - productsCount: Holds the count of products fetched from the backend.
    - ordersCount: Holds the count of orders fetched from the backend.
    - usersCount: Holds the count of users fetched from the backend.
    - categoriesCount: Holds the count of categories fetched from the backend.

  - useEffect:
    - Fetches data from the backend using axios for products, orders, users, and categories.
    - Sets the state variables with the fetched data.

  - Render:
    - Displays the counts of products, users, orders, and categories in two separate boxes.
    - Renders a table with the last 5 orders, showing order details such as user name, date, status, total price, and actions.

  - Navigation:
    - Clicking on the "Edit" button redirects to the detailed order page.

  Note: Some data might be empty if there is an error fetching it from the backend.
*/
import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { MdEdit } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";

const DashboardItems = () => {
  const navigate = useNavigate();
  const [productsCount, setProductsCount] = useState([]);
  const [ordersCount, setOrdersCount] = useState([]);
  const [usersCount, setUsersCount] = useState([]);
  const [categoriesCount, setCategoriesCount] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsRes = await axios.get("/api/products");
        const ordersRes = await axios.get("/api/orders");
        const usersRes = await axios.get("/api/users");
        const categoriesRes = await axios.get("/api/categories");

        setProductsCount(productsRes.data);
        setOrdersCount(ordersRes.data);
        setUsersCount(usersRes.data);
        setCategoriesCount(categoriesRes.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {/* Display product, user, order, and category counts */}
      <div className="content">
        <div className="first-box">
          <div className="box one">
            <span>{productsCount?.length}</span>
            <p>The Number Of Products</p>
          </div>
          <div className="box tow">
            <span>{usersCount?.length}</span>
            <p>The Number Of Users</p>
          </div>
        </div>
        <div className="secound-box">
          <div className="box three">
            <span>{ordersCount?.length}</span>
            <p>The Number Of Orders</p>
          </div>
          <div className="box four">
            <span>{categoriesCount?.length}</span>
            <p>The Number Of Categories</p>
          </div>
        </div>
      </div>

      {/* Display the last 5 orders in a table */}
      <section>
        <h3 className="title-dash">last 5 orders</h3>
        <div className="tbl-header">
          <table className="dash-table">
            <thead>
              <tr>
                <th>ORDER</th>
                <th>DATE</th>
                <th>STATUS</th>
                <th>TOTAL</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="tbl-content">
          <table className="dash-table">
            <tbody>
              {ordersCount.length > 0 ? (
                ordersCount.slice(0, 5).map((order) => (
                  <tr key={order?.id}>
                    <td>{order?.user?.name}</td>
                    <td>
                      {order?.dateOrdered
                        ? new Date(order.dateOrdered).toLocaleDateString(
                            "en-GB"
                          )
                        : ""}
                    </td>
                    <td>{order?.status}</td>
                    <td>${order?.totalPrice}</td>
                    <td>
                      <div className="flex-btn">
                        <button
                          onClick={() =>
                            navigate(`/dashboard/order/${order?.id}`)
                          }
                          className="cssbuttons-io-button-edit"
                        >
                          <MdEdit className="acti-btn" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <td>No Orders to display</td>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default DashboardItems;
