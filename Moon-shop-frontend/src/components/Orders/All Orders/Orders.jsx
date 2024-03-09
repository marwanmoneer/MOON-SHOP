import { useEffect, useState } from "react";
import "./Orders.css";
import axios from "../../../api/axios";
import useAuth from "../../../hooks/useAuth";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
const Orders = () => {
  const { auth } = useAuth();
  const token = auth.token;
  const [orders, SetOrders] = useState([]);
  
  const navigate = useNavigate();
  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get("/api/orders", {
          headers: {
            Accept: "application/json",
            // Authorization: "Bearer " + token,
          },
        });
        SetOrders(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getOrders();
  }, []);
  const removeOrders = async (id) => {
    try {
      await axios.delete(`/api/orders/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      const updatedOrders = orders.filter((order) => order.id !== id);
      // console.log(updatedOrders);
      SetOrders(updatedOrders);
    } catch (error) {
      console.error(error);
    }
  };
  return (
 
      <section className="cont-tab">
         <div >
          <span className="back-btn-dash" onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack />
          </span>
        </div>
        <h3 className="tab-title">Orders</h3>
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
              {orders.length > 0 ? (
                orders.map((order) => (
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
                        <button  onClick={() => navigate(`/dashboard/order/${order?.id}`)} className="cssbuttons-io-button-edit">
                          <MdEdit className="acti-btn" />
                        </button>
                        <button
                          onClick={() => removeOrders(order?.id)}
                          className="cssbuttons-io-button-delete"
                        >
                          <MdDeleteForever className="acti-btn" />
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
  
  );
};

export default Orders;


