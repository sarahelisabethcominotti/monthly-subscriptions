import React from "react";
import { Routes, Route } from "react-router-dom";
import Calendar from "./Calendar";
import StatsPage from "./StatsPage";

function Main() {
  return (
    <main className="App-main">
      <Routes>
        <Route exact path="/" element={<Calendar />}></Route>
        <Route exact path="/stats" element={<StatsPage />}></Route>
        {/* <Subscriptions/> */}
      </Routes>
    </main>
  );
}

export default Main;
