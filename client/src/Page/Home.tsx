import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
