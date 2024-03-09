// Importing the custom hook useAuth and the cookie library
import useAuth from "./useAuth";
import Cookies from "cookie-universal";

// Custom hook named useRefresh for handling authentication refresh
const useRefresh = () => {
  // Creating a new instance of the Cookies library
  const NewCookie = new Cookies();
  // Destructuring the setAuth function from the useAuth hook
  const { setAuth } = useAuth();

  // Retrieving the authentication string from cookies
  const savedAuthString = NewCookie.get("auth");

  // Function for refreshing authentication based on the savedAuthString
  const refresh = async () => {
    setAuth(() => {
      // Checking if there is a saved authentication string
      if (savedAuthString) {
        // Assuming that savedAuthString is a valid authentication object
        const savedAuthObject = savedAuthString;
        // Returning the saved authentication object
        return savedAuthObject;
      }

      // If no saved authentication string is found, returning an empty object
      return {};
    });
  };

  // Returning the refresh function
  return refresh;
};

// Exporting the useRefresh hook for use in other components
export default useRefresh;
