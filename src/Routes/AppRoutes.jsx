import React from 'react';
import {Routes, Route } from "react-router-dom"
import Home from '../Components/Home'
import ProductList from '../Components/ProductList';
import CreateProduct from '../Components/Create-Products';
 export const AppRoutes =() => {
  console.log("AppRoutes Component Rendered");
    return(
      <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/products" element={<ProductList/>}/>
     <Route path="/createproducts/:id" element={<CreateProduct />} />
    <Route path="/createproducts" element={<CreateProduct />} />
     </Routes>
   
    );
}