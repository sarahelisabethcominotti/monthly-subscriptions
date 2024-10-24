import "./App.css";
import Main from "./components/Main.js";
import Navigation from "./components/Navigation.js";
import { SubscriptionProvider } from "./SubscriptionContext.js";
// import Subscriptions from "./components/Subscriptions.js";

function App() {
  return (
    <SubscriptionProvider>
    <div className="App">
      <Navigation />
      <Main />
    </div>
    </SubscriptionProvider>
  );
}

export default App;
