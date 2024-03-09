// EditUser.jsx

import { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const EditUser = () => {
  const navigate = useNavigate();
  const [errmsg, setErrmsg] = useState(""); // State to manage error messages
  const [success, setSuccess] = useState(""); // State to manage success messages
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false); // State to manage loading state during API request

  useEffect(() => {
    const getData = async () => {
      try {
        // Fetch user data for editing
        const res = await axios.get("/api/users/" + id, {
          headers: {
            Accept: "application/json",
          },
        });

        const data = res.data;
        // Set initial values for form inputs
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
        setCountry(data.country);
        setCity(data.city);
        setStreet(data.street);
        setApartment(data.apartment);
        setZip(data.zip);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  // States to manage form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [zip, setZip] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Make a PUT request to update user data
      const response = await axios.put(
        "/api/users/" + id,
        {
          name,
          email,
          phone,
          password,
          country,
          city,
          street,
          apartment,
          zip,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Set success message and reset loading state
      setSuccess("User has been updated");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      // Check for network error or API error and set error message accordingly
      if (!err?.response) {
        setErrmsg("Server not responding");
      } else {
        setErrmsg(err.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="dash-container-1">
        {errmsg && (
          // Display warning message if there is an error
          <div className="warning-msg">
            <i className="fa fa-warning"></i>
            {errmsg}
          </div>
        )}
        {success && (
          // Display success message if user data is successfully updated
          <div className="success-msg">
            <i className="fa fa-check"></i>
            {success}
          </div>
        )}
        <div>
          {/* Back button to navigate back */}
          <span className="back-btn" onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack />
          </span>
        </div>
        {/* Form header */}
        <div className="text">Edit User</div>
        {/* User data editing form */}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            {/* Input for user name */}
            <div className="input-data">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Name</label>
            </div>
            {/* Input for user email */}
            <div className="input-data">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Email</label>
            </div>
          </div>
          <div className="form-row">
            {/* Input for user phone */}
            <div className="input-data">
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="text"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Phone</label>
            </div>
            {/* Input for user password */}
            <div className="input-data">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="text"
              />
              <div className="underline"></div>
              <label htmlFor="">Password</label>
            </div>
          </div>
          <div className="form-row">
            {/* Input for user country */}
            <div className="input-data">
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                type="text"
              />
              <div className="underline"></div>
              <label htmlFor="">Country</label>
            </div>
            {/* Input for user city */}
            <div className="input-data">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                type="text"
              />
              <div className="underline"></div>
              <label htmlFor="">City</label>
            </div>
          </div>
          <div className="form-row">
            {/* Input for user street */}
            <div className="input-data">
              <input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                type="text"
              />
              <div className="underline"></div>
              <label htmlFor="">Street</label>
            </div>{" "}
            {/* Input for user zip code */}
            <div className="input-data">
              <input
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                type="text"
              />
              <div className="underline"></div>
              <label htmlFor="">Zip Code</label>
            </div>
            {/* Input for user apartment */}
            <div className="input-data">
              <input
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                type="text"
              />
              <div className="underline"></div>
              <label htmlFor="">Apartment</label>
            </div>
          </div>
          {/* Submit button with loading state */}
          <div className="form-row submit-btn">
            <button className="btn">
              {isLoading ? <span className="loader"></span> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUser;
