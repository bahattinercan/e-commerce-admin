import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";

import AddProduct from "../../components/add-product/add-product";
import ListProduct from "../../components/list-product/list-product";
import "./admin.css";
const Admin = () => {
  return (
    <div className="admin">
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/addProduct" element={<AddProduct></AddProduct>}></Route>
        <Route path="/listProduct" element={<ListProduct></ListProduct>}></Route>
      </Routes>
    </div>
  );
};

export default Admin;
