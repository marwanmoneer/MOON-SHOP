import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useRefresh from "../../hooks/useRefresh";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  // Custom hook to access authentication-related information
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  // Custom hook to refresh the authentication token
  const refresh = useRefresh();

  // Retrieve the authentication token from the auth object
  const token = auth.token;

  useEffect(() => {
    // Function to verify the refresh token and update authentication status
    const verifyRefreshToken = async () => {
      try {
        // Attempt to refresh the authentication token
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        // Update the loading state once the verification is complete
        setIsLoading(false);
      }
    };

    // If there is no authentication token, initiate the token verification
    !token ? verifyRefreshToken() : setIsLoading(false);
  }, [token, refresh]);

  // Render loading message or display the nested routes if not loading
  return <>{isLoading ? <h1>Loading...</h1> : <Outlet />}</>;
};

export default PersistLogin;
