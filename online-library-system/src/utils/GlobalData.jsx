import { createContext, useState } from "react";

export const GlobalData = createContext();

export const GlobalProvider = ({ children }) => {
  const [filterValue, setFilterValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [extraBooks, setExtraBooks] = useState([]);
  const [defaultValues, setdefaultValues] = useState([
    "https://miro.medium.com/v2/resize:fit:681/1*EBOL4lka5QjcYoxj6AHp-g.png",
    "https://media.architecturaldigest.com/photos/5890e88033bd1de9129eab0a/1:1/w_870,h_870,c_limit/Artist-Designed%20Album%20Covers%202.jpg",
    "https://www.usatoday.com/gcdn/authoring/authoring-images/2024/04/18/USAT/73369584007-013-1989-taylors-version-2023.jpeg",
  ]);
  const [picIdx, setPicIdx] = useState(0);
  return (
    <GlobalData.Provider
      value={{
        filterValue,
        setFilterValue,
        searchValue,
        setSearchValue,
        extraBooks,
        setExtraBooks,
        defaultValues,
        picIdx,
        setPicIdx,
      }}
    >
      {children}
    </GlobalData.Provider>
  );
};
