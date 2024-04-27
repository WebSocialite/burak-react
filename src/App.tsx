import React, { useState } from 'react';
import './css/app.css';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import  HomePage from './app/screens/homePage';
import  ProductsPage from './app/screens/productsPage';
import  OrdersPage from './app/screens/ordersPage';
import  UserPage from './app/screens/userPage';
import  OtherNavbar from './app/components/headers/OtherNavbar';
import  HomeNavbar from './app/components/headers/HomeNavbar';
import Footer from './app/components/footer';
import HelpPage from './app/screens/helpPage';
import "../src/css/app.css";
import "../src/css/navbar.css";
import "../src/css/footer.css";
import useBasket from './app/hooks/useBasket';



function App() {
  const location = useLocation();  // hook
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  
  return (
    <>
      {location.pathname === "/" ? (
      <HomeNavbar cartItems={cartItems} 
      onAdd={onAdd}
      onRemove={onRemove} 
      onDelete={onDelete} 
      onDeleteAll={onDeleteAll}
      />) : ( 
      <OtherNavbar cartItems={cartItems} 
      onAdd={onAdd}
      onRemove={onRemove} 
      onDelete={onDelete} 
      onDeleteAll={onDeleteAll}
      />
      )}
    <Switch>
      <Route path="/products">
        <ProductsPage onAdd={onAdd}/>
      </Route>
      <Route path="/orders">
        <OrdersPage />
      </Route>
      <Route path="/members-page">
        <UserPage />
      </Route>
      <Route path="/help">
        <HelpPage />
      </Route>
      <Route path="/">
        <HomePage /> 
      </Route>
    </Switch>
    <Footer />
  </>
  );
}





export default App;
