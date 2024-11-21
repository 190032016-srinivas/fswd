import React, { createContext, useRef, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("default message");
  const [globalProducts, setGlobalProducts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const bypassRef = useRef(false);
  return (
    <GlobalContext.Provider
      value={{
        snackbarMessage,
        setSnackbarMessage,
        snackbarOpen,
        setSnackbarOpen,
        globalProducts,
        setGlobalProducts,
        searchValue,
        setSearchValue,
        bypassRef,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
