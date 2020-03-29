import React from 'react';
import LandingPage from './Containers/LandingPage';
import { Route, Switch } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/locationID/:id' render={() =>  <LandingPage/> } />
        <Route path='/pcpID/:id' render={() =>  <LandingPage/> } />
        <Route path='/' render={() =>  <LandingPage/> } />
      </Switch>
    </div>
  );
}

export default App;
