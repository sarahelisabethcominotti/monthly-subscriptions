import React, { createContext, useState, useEffect } from "react";
import Axios from "axios";
import { apiUrl } from "./components/Calendar";
export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [listOfSubscriptions, setListOfSubscriptions] = useState([]);
  const [listOfLogos, setListOfLogos] = useState([])

  useEffect(() => {
    Axios.get(`${apiUrl}/getSubscriptions`).then((response) => {
      setListOfSubscriptions(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get(`https://api.uplead.com/v2/company-name-to-domain?company_name=spotify`).then((response) => {
      setListOfLogos(response.data);
    });
  }, []);
console.log('test')
  console.log(listOfLogos)

  return (
    <SubscriptionContext.Provider value={{ listOfSubscriptions, setListOfSubscriptions, listOfLogos, setListOfLogos }}>
      {children}
    </SubscriptionContext.Provider>
  );
};
