import './App.css';
import { Calendar } from "./components/Calendar.js";
// import Subscriptions from "./components/Subscriptions.js";


function App() {


  return (
    <div className="App">
      
      <header className="App-header">
        <p>My Monthly Subscriptions</p>
      </header>
      <main className="App-main">
        <Calendar/>
        {/* <Subscriptions/> */}
      </main>
    </div>
  );
}

export default App;
