import React from 'react';
import './css/app.css';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link, Route, Switch } from 'react-router-dom';
import { HomePage } from './app/screens/homePage';
import { ProductsPage } from './app/screens/productsPage';
import { OrdersPage } from './app/screens/ordersPage';
import { UserPage } from './app/screens/userPage';

function App() {
  return (
    <div>
    <nav>
      <ul>
      <li>
          <Link to="/">HomePage</Link>
        </li>
        <li>
          <Link to="/products">ProductsPage</Link>
        </li>
        <li>
          <Link to="/orders">OrdersPage</Link>
        </li>
        <li>
          <Link to="/member-page">UserPage</Link>
        </li>
        
      </ul>
    </nav>

    <Switch>
      <Route path="/products">
        <ProductsPage />
      </Route>
      <Route path="/orders">
        <OrdersPage />
      </Route>
      <Route path="/members-page">
        <UserPage />
      </Route>
      <Route path="/">
        <HomePage />
      </Route>
    </Switch>
  </div>
  );
}





export default App;
