import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { User } = useUser();
  const path = useLocation().pathname.split("/")[1];
  return (
    <nav className="main-nav">
      <div className="navbar">
        <Link to='/login' className="nav-item nav-links"><b>TensorGo</b></Link>
        {path !== "login" && User && (
          <>
          <Link to="/" className="nav-item nav-links">
          <img src={User?.picture} style={{ borderRadius: "50%", height: 30, width: 30, marginRight: 10}}></img>
            {User?.name}
            </Link>
          </>  
        )}
      </div>
    </nav>
  );
};

export default Navbar;
