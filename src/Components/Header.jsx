import React from 'react';

import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const list = [
    { 
      name: "Home", 
      url: "/" 
    },
    {
      name: "Products",
      url: "/products"
    }
  ];

  return (
    <nav className="header-nav">
      <ul className="header-menu">
        {list.map((item, index) => (
          <li key={index} className="header-item">
            <NavLink to={item.url} className="header-link">{item.name}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
