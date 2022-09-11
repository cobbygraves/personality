import React from "react";
import "./Admin.css";
import AdminBar from "../AdminBar/AdminBar";
import { Outlet } from "react-router-dom";

const Admin = () => {
  return (
    <div>
      <AdminBar />
      <Outlet />
    </div>
  );
};

export default Admin;
