import React from 'react';
import './App.css';
import { Switch, Route, Router } from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Page404 from './pages/Page404';
import Category from './pages/Category';
import Cart from './pages/Cart';
import Favorites from './pages/Favorites';
import './utils/utility-classes.css';
import Product from './pages/Product';
import Terms_and_conditions from './pages/Terms_and_conditions';

function App() {
  return(
    <div className="app">   
        <Switch>
          <Route path="/login" component={Login}/>
          <Route exact path="/" component={Home}/>
          <Route path="/favorites" component={Favorites}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/about" component={About}/>
          <Route path="/terms-and-conditions" component={Terms_and_conditions}/>
          <Route path="/category/:categoryName" component={Category}/>
          <Route path="/product/:productId" component={Product}/>
          <Route path="*" component={Page404}/>
        </Switch>
     
    </div>
  );
}

export default App;
