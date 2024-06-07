import React, { createContext, useState } from 'react';
import axios from 'axios';
// Create the context
const AuthContext = createContext();

// Create a provider component
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(0);
  React.useEffect(()=>{
    async function check(){
      let response = await axios.get("http://localhost:3000/check-login");
      {isLoggedIn<2?setIsLoggedIn(response.data):<></>}
      console.log(response.data);
    }
    check();
  },[])

  const login = () => {
    setIsLoggedIn(1);
  };

  const logout = () => {
    setIsLoggedIn(0);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn,setIsLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
