import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.scss';
import Home from "./Containers/Home"
import Navbar from "./Components/Navbar";
import Login from "./Containers/Login";
import Signup from "./Containers/Signup/signup";
import Addimage from "./Components/AddImage/addimage";

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/addimage" component={Addimage} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
