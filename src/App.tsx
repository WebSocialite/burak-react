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
import AuthenticationModal from './app/components/auth';
import MemberService from './app/services/MemberService';
import { sweetErrorHandling, sweetTopSuccessAlert } from './lib/sweetAlert';
import { Messages } from './lib/config';
import { T } from './lib/types/common';
import { useGlobals } from './app/hooks/useGlobals';
import "../src/css/app.css";
import "../src/css/navbar.css";
import "../src/css/footer.css";


function App() {
  const location = useLocation();  // hook
  const {setAuthMember} = useGlobals();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const[signupOpen, setSignupOpen] = useState<boolean>(false); // by default SignUp hidden turadi false qilsak
  const[loginOpen, setLoginOpen] = useState<boolean>(false); //by default Login hidden turadi false qilsak
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  
  /**       HANDLERS    **/
  
  const handleSignupClose = () => setSignupOpen(false); // false korinishga otishni talab qlyapmiz
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseLogout = () => setAnchorEl(null);
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();
      await sweetTopSuccessAlert("success", 700);
      setAuthMember(null);
      

    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1);
    }
  };


  return (
    <>
      {location.pathname === "/" ? (
      <HomeNavbar cartItems={cartItems} 
      onAdd={onAdd}
      onRemove={onRemove} 
      onDelete={onDelete} 
      onDeleteAll={onDeleteAll}
      setSignupOpen={setSignupOpen}
      setLoginOpen={setLoginOpen}
      anchorEl={anchorEl}
      handleLogoutClick={handleLogoutClick}
      handleCloseLogout={handleCloseLogout}
      handleLogoutRequest={handleLogoutRequest}
      />) : ( 
      <OtherNavbar cartItems={cartItems} 
      onAdd={onAdd}
      onRemove={onRemove} 
      onDelete={onDelete} 
      onDeleteAll={onDeleteAll}
      setSignupOpen={setSignupOpen}
      setLoginOpen={setLoginOpen}
      anchorEl={anchorEl}
      handleLogoutClick={handleLogoutClick}
      handleCloseLogout={handleCloseLogout}
      handleLogoutRequest={handleLogoutRequest}
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
