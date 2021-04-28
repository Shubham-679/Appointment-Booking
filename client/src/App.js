import './App.css';
import Home from './Components/Home/Home';
import { Route, Switch, Redirect } from 'react-router-dom';
import Buyer from './Components/Buyer/Buyer';
import Seller from './Components/Seller/Seller';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/sellers" component={(props) => <Seller {...props}/>} />
        <Route path="/buyers" component={(props) => <Buyer {...props}/>} />  
        <Route path="/home" component={Home} />
        <Redirect from="/"  exact to="/home" />
      </Switch>
      {/* <Home></Home> */}
    </div>
  );
}

export default App;
