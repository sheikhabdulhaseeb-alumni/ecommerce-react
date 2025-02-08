import React, { createContext, useState } from "react";

// Step 1: Create the context
export const UIContext = createContext();

// Step 2: Create a provider component
export const UIProvider = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  // Step 3: Provide cart data and actions to child components
  return (
    <UIContext.Provider
      value={{
        isMenuOpen,
        toggleMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
