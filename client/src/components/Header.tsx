import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const routes = ["Login"];

  return (
    <header>
      {routes.map((route, index) => (
        <Link key={index} to={`/${route.toLowerCase()}`}>
          {route}
        </Link>
      ))}
    </header>
  );
}
