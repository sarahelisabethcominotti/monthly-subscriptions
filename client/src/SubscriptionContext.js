import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";
import { apiUrl } from "./components/Calendar";
export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [listOfSubscriptions, setListOfSubscriptions] = useState([]);

  useEffect(() => {
    Axios.get(`${apiUrl}/getSubscriptions`).then((response) => {
      setListOfSubscriptions(response.data);
    });
  }, []);

  return (
    <SubscriptionContext.Provider value={{ listOfSubscriptions, setListOfSubscriptions }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
