// Importing the necessary React hook for context consumption
import { useContext } from "react";
// Importing the AuthContext to access authentication-related states and functions
import AuthContext from "../context/AuthContext";

// Custom hook named useAuth to conveniently access the AuthContext
const useAuth = () => {
    // Using the useContext hook to retrieve the current context value of AuthContext
    return useContext(AuthContext);
}

// Exporting the useAuth hook for use in other components
export default useAuth;
