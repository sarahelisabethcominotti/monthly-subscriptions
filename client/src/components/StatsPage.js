import React from "react";
import { useContext } from "react";
import { SubscriptionContext } from "../SubscriptionContext";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


function StatsPage() {
  const { listOfSubscriptions } = useContext(SubscriptionContext);
  
  const totalPrice = listOfSubscriptions.reduce((total, sub) => total + sub.price, 0);


  const chartData = {
    labels: listOfSubscriptions.map((sub) => sub.name),

    datasets: [
      {
        label: "Subscription Price £",
        data: listOfSubscriptions.map((sub) => sub.price), 
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ], 
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <>
      <div className="page-container">
        <h1>Subscription Statistics</h1>
        <h3>Total of Subscriptions: £{totalPrice}/month</h3>
        {listOfSubscriptions.length > 0 ? (
          <Doughnut data={chartData} />
        ) : (
          <p>No subscriptions available, please add a subscription from the top left corner</p>
        )}
      </div>
    </>
  );
}

export default StatsPage;
