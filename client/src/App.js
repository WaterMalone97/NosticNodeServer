import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'reactstrap'
import { Switch, Route } from "react-router-dom";
import Navmenu from './components/Navmenu';
import Login from './components/Login';
import Profile from './components/Profile';
import Feed from './components/Feed';
import Search from './components/Search';

//nest routes for navbar "/:location/:id"
function App() {
  return (
    <div>
      <Route exact path='/'>
        <h1>Hello World</h1>
        <Login />
      </Route>
      <Route path='/:location/:id' component = {Navmenu}></Route>
      <Col className="pt-5 pb-5">
      <Switch>
        <Route path='/feed/:id' component = {Feed}></Route>
        <Route path='/profile/:id' component = {Profile}></Route>
        <Route path='/search/:input' component = {Search}></Route>       
      </Switch>
      </Col>  
    </div>
  );
}

export default App;
