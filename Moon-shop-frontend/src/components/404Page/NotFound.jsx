import { useNavigate } from "react-router-dom"; // Imports the useNavigate hook from react-router-dom for navigation
import "./NotFound.css"; // Imports custom CSS for the NotFound component

// Defines the NotFound functional component
const NotFound = () => {
  const navigate = useNavigate(); // Initializes navigate function using the useNavigate hook

  // Function to navigate back to the homepage
  const backHome = () => {
    navigate("/"); // Uses navigate function to redirect user to the homepage
  };

  // Renders the NotFound component's UI
  return (
    <section className="page_404"> {/* Sets the main container for the 404 page */}
      <div className="container"> {/* Container for the content */}
        <div className="row"> {/* Row for grid system */}
          <div className="col-sm-12 "> {/* Column for the content */}
            <div className="col-sm-10 col-sm-offset-1  text-center"> {/* Centers the content */}
              <div className="four_zero_four_bg"> {/* Background container for 404 */}
                <h1 className="text-center ">404</h1> {/* 404 text */}
              </div>

              <div className="contant_box_404"> {/* Content box for the message */}
                <h3 className="h2">Look like you're lost</h3> {/* Message title */}

                <p className="mesg">
                  the page you are looking for not avaible! {/* Message body */}
                </p>

                <button onClick={backHome} className="btn"> {/* Button to go back to home */}
                  Go to Home {/* Button text */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound; // Exports the NotFound component for use in other parts of the application
