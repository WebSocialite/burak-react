import React from 'react';
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
import Test from './app/screens/Test';



function App() {
  const location = useLocation();  // hook
  console.log("location: ", location);
  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}
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
      <Route path="/help">
        <HelpPage />
      </Route>
      <Route path="/">
        <Test />
        {/* <HomePage /> */}
      </Route>
    </Switch>
    <Footer />
  </>
  );
}





export default App;
