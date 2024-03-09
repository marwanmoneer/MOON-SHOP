// Users.jsx

import { useEffect, useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "../../../api/axios";

const Users = () => {
  const [users, setUsers] = useState([]); // State to store the list of users

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from the API on component mount
    const getData = async () => {
      try {
        const res = await axios.get("/api/users", {
          headers: {
            Accept: "application/json",
          },
        });
        setUsers(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  // Function to remove a user by their ID
  const removeUser = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      // Update the users state after successfully removing the user
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="cont-tab">
      <div>
        {/* Back button to navigate back */}
        <span className="back-btn-dash" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
        </span>
      </div>
      {/* Section title */}
      <h3 className="tab-title">Users</h3>
      {/* Table header */}
      <div className="tbl-header">
        <table className="dash-table">
          <thead>
            <tr>
              <th>EMAIL</th>
              <th>NAME</th>
              <th>PHONE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
        </table>
      </div>
      {/* Table content */}
      <div className="tbl-content">
        <table className="dash-table">
          <tbody>
            {users.length > 0 ? (
              users.slice(0).reverse().map((user) => (
                <tr key={user?.id}>
                  {/* Display user information in each row */}
                  <td>{user?.email}</td>
                  <td>{user?.name}</td>
                  <td>{user?.phone}</td>
                  {/* Action buttons for editing and deleting users */}
                  <td>
                    <div className="flex-btn">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/user/${user?.id}`)
                        }
                        className="cssbuttons-io-button-edit"
                      >
                        <MdEdit className="acti-btn" />
                      </button>
                      <button
                        onClick={() => removeUser(user?.id)}
                        className="cssbuttons-io-button-delete"
                      >
                        <MdDeleteForever className="acti-btn" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // Display a message if there are no users
              <td>No users to display</td>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Users;
