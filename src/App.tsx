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
import useBasket from './app/hooks/useBasket';
import "../src/css/app.css";
import "../src/css/navbar.css";
import "../src/css/footer.css";
import AuthenticationModal from './app/components/auth';
import { log } from 'console';



function App() {
  const location = useLocation();  // hook
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const[signupOpen, setSignupOpen] = useState<boolean>(false);
  const[loginOpen, setLoginOpen] = useState<boolean>(false);
  
  /**       HANDLERS    **/
  
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

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

      <AuthenticationModal 
      signupOpen={signupOpen} 
      loginOpen={loginOpen} 
      handleLoginClose={handleLoginClose}
      handleSignupClose={handleSignupClose}
      />

  </>
  );
}

export default App;
