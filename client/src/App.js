import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, Route } from "react-router-dom";
import Navmenu from './components/Navmenu';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <Switch>       
        <Route path='/feed/:id' component = {Navmenu}>
        </Route>
        <Route path='/'>
          <h1>Hello World</h1>
          <Login />
        </Route>      
      </Switch>
    </div>
  );
}

export default App;
