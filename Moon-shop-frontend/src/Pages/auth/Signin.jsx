// Importing logo image, Link, and useNavigate from React Router
import logo from "../../assets/Images/Moon Shop-logos.jpeg";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css"; // Importing styles for the authentication component
import { useState } from "react"; // Importing useState hook for managing component state
import axios from "../../api/axios"; // Importing axios for handling HTTP requests
import useAuth from "../../hooks/useAuth"; // Importing custom hook for authentication
import Cookies from "cookie-universal"; // Importing cookie library for managing cookies

// Functional component named Signin for handling user sign-in
const Signin = () => {
  // Destructuring properties and methods from the useAuth hook
  const { setAuth, auth } = useAuth();
  // Creating a new instance of the Cookies library
  const NewCookie = new Cookies();

  // State variables for email, password, error message, and navigation
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const navigate = useNavigate();

  // Function to handle form submission on user sign-in
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sending a POST request to the server for user login
      const response = await axios.post(
        "/api/users/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Extracting relevant data from the response
      const name = response.data.name;
      const token = response.data.token;
      const id = response.data.id;
      const admin = response.data.admin;

      // Creating an authentication object
      const authObject = { name, token, id, admin, email };

      // Updating the authentication state using the setAuth function
      setAuth(authObject);

      // Converting the authentication object to a string
      const authString = JSON.stringify(authObject);

      // Setting the authentication string as a cookie
      NewCookie.set("auth", authString);

      // Navigating to the home page
      navigate("/");
    } catch (err) {
      // Handling errors during the login process
      if (!err?.response) {
        setErrmsg("Server not respons");
      } else {
        setErrmsg(err.response.data.message);
      }
    }
  };

  // JSX structure for the sign-in component
  return (
    <div className="main">
      <section className="sign-in">
        <div className="authcontainer">
          <div className="signin-content">
            <div className="signin-image">
              <figure>
                {/* Displaying the logo image */}
                <img src={logo} alt="sing up image" />
              </figure>
              {/* Link to navigate to the sign-up page */}
              <Link to="/signup" className="signup-image-link">
                Create an account
              </Link>
            </div>

            <div className="signin-form">
              {/* Sign-in form with email, password, and submit button */}
              <h2 className="form-title">Sign in</h2>
              {errmsg && (
                // Displaying a warning message in case of an error
                <div className="warning-msg">
                  <i className="fa fa-warning"></i>
                  {errmsg}
                </div>
              )}
              <form onSubmit={handleSubmit} className="register-form" id="login-form">
                <div className="form-group">
                  {/* Input field for email */}
                  <label htmlFor="your_email">
                    <i className="zmdi zmdi-account material-icons-name"></i>
                  </label>
                  <input
                    type="text"
                    name="your_email"
                    id="your_email"
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  {/* Input field for password */}
                  <label htmlFor="your_pass">
                    <i className="zmdi zmdi-lock"></i>
                  </label>
                  <input
                    type="password"
                    name="your_pass"
                    id="your_pass"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group form-button">
                  {/* Submit button for logging in */}
                  <button className="btn">Log in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Exporting the Signin component as the default export
export default Signin;
