import React, {
  createContext,
  useEffect,
  useState,
} from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [admin, setAdmin] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    const storedAdmin =
      localStorage.getItem("admin");

    if (storedAdmin) {

      setAdmin(JSON.parse(storedAdmin));

      setIsAuthenticated(true);

    }

    setLoading(false);

  }, []);

  return (

    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        admin,
        setAdmin,
        loading,
      }}
    >

      {children}

    </Context.Provider>

  );

};
