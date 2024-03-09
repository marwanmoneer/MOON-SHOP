import { useEffect, useState } from "react";
import "./categories.css";

import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "../../../api/axios";

// Component to display and manage categories
const Categories = () => {
  const [categories, SetCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories on component mount
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

  // Remove a category by its ID
  const removeCategory = async (id) => {
    try {
      await axios.delete(`/api/categories/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      const updatedCategories = categories.filter((category) => category.id !== id);
      SetCategories(updatedCategories);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="cont-tab">
      <div>
        <span className="back-btn-dash" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
        </span>
      </div>
      <h3 className="tab-title">Categories</h3>
      <div className="tbl-header">
        <table className="dash-table">
          <thead>
            <tr>
              <th>ICON</th>
              <th>NAME</th>
              <th>COLOR</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="tbl-content">
        <table className="dash-table">
          <tbody>
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr key={category?.id}>
                  <td><img className="cate-icon" src={category?.icon} alt={category?.icon} /></td>
                  <td>{category?.name}</td>
                  <td>{category?.color}</td>
                  <td>
                    <div className="flex-btn">
                      <button
                        onClick={() =>
                          navigate(`/dashboard/category/${category?.id}`)
                        }
                        className="cssbuttons-io-button-edit"
                      >
                        <MdEdit className="acti-btn" />
                      </button>
                      <button
                        onClick={() => removeCategory(category.id)}
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

export default Categories;
