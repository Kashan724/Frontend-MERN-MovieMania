import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const authorizationToken = `Bearer ${token}`;
   
    const storeTokenInLS = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
      };
      const userAuthentication = async (authorizationToken) => {
        try {
          const response = await fetch('http://localhost:4000/api/auth/user', {
            method: 'GET',
            headers: {
              Authorization: authorizationToken,
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log("User data fetched:", data.userData);
            return data.userData;
          } else {
            console.error("Error fetching user data");
            return null;
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          return null;
        }
      };
       // tackling the logout functionality
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };


      return (
        <AuthContext.Provider
          value={{
            storeTokenInLS,
            authorizationToken,
            userAuthentication,
            LogoutUser
          }}
        >
          {children}
        </AuthContext.Provider>
      );
    };


      export const useAuth = () => {
        const authContextValue = useContext(AuthContext);
        if (!authContextValue) {
          throw new Error("useAuth used outside of the Provider");
        }
        return authContextValue;
      };