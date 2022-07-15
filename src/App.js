import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Switch>
      <Route exact path="/listActions" component={ ListActions } />
      <Route exact path="/buyAndSell" component={ BuyAndSell } />
      <Route exact path="/account" component={ Account } />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/" component={ Login } />
      <Route path="/*" component={ NotFound } />
    </Switch>
  );
}

export default App;
