import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ProtechRoutes
import { ProtechRoutes } from "./ProtechRoutes";

//Elememt
import Login from "../Pages/Login/Login";
import Record from "../Pages/Record/Record";
import UserInfo from "../Pages/UserInfo/UserInfo";

const MainRouter = () => {
  return (
    <Routes>
      <Route element={<ProtechRoutes />}>
        <Route path="/" element={<Record />} />
        <Route path="/userInfomation" element={<UserInfo />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default MainRouter;
