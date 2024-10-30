import { useContext, useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { apiUrl } from "./Calendar";
import { SubscriptionContext } from "../SubscriptionContext";

function Navigation() {
  const { listOfSubscriptions, setListOfSubscriptions } =
    useContext(SubscriptionContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [recurrency, setRecurrency] = useState("");

  const createSubscription = () => {
    Axios.post(`${apiUrl}/createSubscription`, {
      name,
      price,
      start,
      end,
      recurrency,
    }).then((response) => {
      // add subscription immediately to calendar once you click sumbit button
      setListOfSubscriptions([
        ...listOfSubscriptions,
        { name, price, start, end, recurrency },
      ]);
      alert("SUBSCRIPTION ADDED SUCCESSFULLY");
    });
  };

  // open popup
  //   openAddSubscription.addEventListener("click", function (event) {
  //     event.preventDefault();
  //     addSubscriptionForm.style.display = "flex";
  //   });
  const openAddSubscription = () => {
    document.getElementById("add-subscription-popup").style.display = "flex";
  };

  // close popup
  const closeAddSubscription = () => {
    document.getElementById("add-subscription-popup").style.display = "none";
  };

  return (
    <>
      <header className="App-header">
        <button className="header-icon" onClick={openAddSubscription}>
          <span className="material-symbols-rounded" id="add">
            add
          </span>
        </button>
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <p>My Monthly Subscriptions</p>
        </Link>
        <Link to="/stats">
          <button className="header-icon">
            <span className="material-symbols-rounded">bar_chart</span>
          </button>
        </Link>
      </header>
      <aside>
        <div id="add-subscription-popup">
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            id="close-popup"
            onClick={closeAddSubscription}
          >
            X
          </button>
          <div className="add-susbcription-form">
            <div>
              Subscription
              <input
                type="text"
                placeholder="Subscription name..."
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div>
              Price<br></br>
              <input
                type="number"
                placeholder="Price..."
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
            <div>
              {" "}
              Start date<br></br>
              <input
                type="date"
                placeholder="Start date..."
                onChange={(event) => {
                  setStart(event.target.value);
                }}
              />
            </div>
            <div>
              End date<br></br>
              <input
                type="date"
                placeholder="End date..."
                onChange={(event) => {
                  setEnd(event.target.value);
                }}
              />
            </div>
            <div>
              Recurrence
              <input
                type="text"
                id="myInput"
                list="suggestions"
                placeholder="Recurrence..."
                onChange={(event) => {
                  setRecurrency(event.target.value);
                }}
              />
            </div>
            <datalist id="suggestions">
              {/* <option value="weekly">Every week</option> */}
             <option value="monthly">Every month</option>
          {/* <option value="yearly">Every year</option> */}
            </datalist>
            <button
              onClick={() => {
                createSubscription();
                closeAddSubscription();
              }}
            >
              Add subscription
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Navigation;
