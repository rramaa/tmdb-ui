import { createContext, useContext, useState } from "react";

export const defaultHeader = "Welcome to TMDB";

let headerContext = createContext(defaultHeader);

export const useHeaderContext = () => useContext(headerContext);

export function Provider({ children }) {
  const [headerTitle, setHeaderTitle] = useState(defaultHeader);
  return (
    <headerContext.Provider value={{ setHeaderTitle, headerTitle }}>
      {children}
    </headerContext.Provider>
  );
}
