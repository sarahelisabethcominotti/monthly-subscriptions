import "./App.css";
import { Calendar } from "./components/Calendar.js";
// import Subscriptions from "./components/Subscriptions.js";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button className="header-icon">
          <span className="material-symbols-rounded">add</span>
        </button>
        <p>My Monthly Subscriptions</p>
        <button
          className="header-icon"
        >
          <span className="material-symbols-rounded">bar_chart</span>
        </button>
      </header>
      <main className="App-main">
        <Calendar />
        {/* <Subscriptions/> */}
      </main>
    </div>
  );
}

export default App;
