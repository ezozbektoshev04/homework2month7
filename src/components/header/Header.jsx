import React from "react";
import "./header.scss";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <nav>
        <div className="d1">
          <p className="p1">Товары</p>
          <div className="d2">
            <NavLink to="/profile" className="p2">
              Главная
            </NavLink>
            <p className="p3">/</p>
            <NavLink to="/products" className="p4">
              Товары
            </NavLink>
          </div>
        </div>
        <div className="d3">
          <button className="header-btn" onClick={() => navigate("")}>
            <img src="/image5.svg" alt="" />
            Выйти
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
