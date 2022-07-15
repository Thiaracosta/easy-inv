import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListActions from './pages/ListActions';
import BuyAndSell from './pages/BuyAndSell';
import Account from './pages/Account';
import Profile from './pages/Profile';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/listActions" element={ <ListActions/> } />
        <Route exact path="/buyAndSell" element={ <BuyAndSell/> } />
        <Route exact path="/account" element={ <Account/> } />
        <Route exact path="/profile" element={ <Profile/> } />
        <Route exact path="" element={ <Login/> } />
        <Route path="/*" element={ <NotFound/> } />
      </Routes>
      </Router>
  );
}

export default App;
