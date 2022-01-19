import React, { createContext, useEffect, useState } from "react";

const BagContext = createContext(undefined);
const BagDispatchContext = createContext(undefined);

// A "provider" is used to encapsulate only the
// components that needs the state in this context
function BagProvider({ children }) {
  const [bagDetails, setBagDetails] = useState([]);

  useEffect(() => {
    const bagItems = JSON.parse(localStorage.getItem("bag"));
    if (bagItems) {
      setBagDetails(bagItems);
    }
  }, []);

  return (
    <BagContext.Provider value={bagDetails}>
      <BagDispatchContext.Provider value={setBagDetails}>
        {children}
      </BagDispatchContext.Provider>
    </BagContext.Provider>
  );
}

export { BagProvider, BagContext, BagDispatchContext };
