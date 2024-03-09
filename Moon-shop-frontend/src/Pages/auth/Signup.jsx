// Importing necessary dependencies and assets
import logo from "../../assets/Images/Moon Shop-logos.jpeg";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import axios from "../../api/axios";
import { useState } from "react";

// Functional component for user signup
const Signup = () => {
  // State variables for managing form input and display messages
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const [success, setSuccess] = useState(false);

  // React Router hook for navigation
  const navigat = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending a POST request to register a new user
      const response = await axios.post(
        "/api/users/register",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Updating the state to indicate successful registration
      setSuccess(true);
    } catch (err) {
      // Handling different error scenarios and updating the error message
      if (!err?.response) {
        setErrmsg("Server not responding");
      } else if (err.response.status === 401) {
        setErrmsg("Email already exists");
      } else {
        setErrmsg(err.response.data.message);
      }
    }
  };

  return (
    <div className="main">
      <section className="signup">
        <div className="authcontainer">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Sign up</h2>
              {/* Displaying error messages if any */}
              {errmsg && (
                <div className="warning-msg">
                  <i className="fa fa-warning"></i>
                  {errmsg}
                </div>
              )}
              {/* Displaying success message and login button on successful registration */}
              {success ? (
                <>
                  <div className="success-msg">
                    <i className="fa fa-check"></i>
                    Account created
                  </div>
                  <div className="form-group form-button">
                    <button
                      onClick={() => navigat("/signin")}
                      className="btn"
                    >
                      Login
                    </button>
                  </div>
                </>
              ) : (
                // Displaying the registration form
                <form
                  onSubmit={handleSubmit}
                  className="register-form"
                  id="register-form"
                >
                  <div className="form-group">
                    <label htmlFor="name">
                      <i className="zmdi zmdi-account material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      <i className="zmdi zmdi-email"></i>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pass">
                      <i className="zmdi zmdi-lock"></i>
                    </label>
                    <input
                      type="password"
                      name="pass"
                      id="pass"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  {/* Button to submit the registration form */}
                  <div className="form-group form-button">
                    <button className="btn">Register</button>
                  </div>
                </form>
              )}
            </div>
            {/* Displaying the Moon Shop logo and a link to navigate to the signin page */}
            <div className="signup-image">
              <figure>
                <img src={logo} alt="sign up image" />
              </figure>
              <Link to="/signin" className="signup-image-link">
                I am already a member
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Exporting the Signup component for use in other parts of the application
export default Signup;
