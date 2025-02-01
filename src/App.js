import { AppRoutes } from './Routes/AppRoutes';
import './App.css';
import Header from './Components/Header';
import React from 'react';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  console.log("App Component Rendered");
  return (
    <>
  
       <Header/> 
       <ToastContainer position="top-right" autoClose={3000} />
      <AppRoutes/>
    </>
    );
}

export default App;
