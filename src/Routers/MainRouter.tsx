import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// ProtechRoutes
import { ProtechRoutes } from "./ProtechRoutes";

//Elememt
// Login - ForgotPassword
import Login from "../Pages/Login/Login";

// Pages
// Record
import Record from "../Pages/Record/Record";
import ManageApprove from "../Pages/Record/ManageApprove/ManageApprove";
import AddRecord from "../Pages/Record/ManageApprove/AddRecord/AddRecord";

// Playlist
import Playlist from "../Pages/Playlist/Playlist";

// UserInfo
import UserInfo from "../Pages/UserInfo/UserInfo";
import UpdateUserInfo from "../Pages/UserInfo/Update/UpdateUserInfo";

// UserManagement
import ListUser from "../Pages/Settings/UserManagement/ListUser/ListUser";
import AddUser from "../Pages/Settings/UserManagement/AddUser/AddUser";
import UpdateUser from "../Pages/Settings/UserManagement/UpdateUser/UpdateUser";

// Setting
// RoleManagement
import AddRole from "../Pages/Settings/RoleManagement/AddRole/AddRole";
import UpdateRole from "../Pages/Settings/RoleManagement/UpdateRole/UpdateRole";
// Configuration
import Configuration from "../Pages/Settings/Configuration/Configuration";
// Contract
import Contract from "../Pages/Settings/Contract/Contract";
import UpdateTypeContract from "../Pages/Settings/Contract/UpdateTypeContract/UpdateTypeContract";
// Support
import Feedback from "../Pages/Support/Feedback/Feedback";
import Downloads from "../Pages/Support/Downloads/Downloads";
import Tutorial from "../Pages/Support/Tutorial/Tutorial";

// ErrorPage
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
const MainRouter = () => {
  return (
    <Routes>
      <Route element={<ProtechRoutes />}>
        <Route path="/" element={<Navigate replace to="record" />} />
        <Route path="/record" element={<Record />} />
        <Route path="/record/Manage-approve" element={<ManageApprove />} />
        <Route
          path="/record/Manage-approve/add-record"
          element={<AddRecord />}
        />

        <Route path="/playlist" element={<Playlist />} />

        <Route path="/userInfomation" element={<UserInfo />} />
        <Route path="/userInfomation/Update" element={<UpdateUserInfo />} />

        {/* Setting */}
        <Route path="/users-management" element={<ListUser />} />
        <Route path="/users-management/AddRole" element={<AddRole />} />
        <Route
          path="/users-management/updateRole/:roleID"
          element={<UpdateRole />}
        />
        <Route path="users-management/AddUser" element={<AddUser />} />
        <Route
          path="/users-management/updateUser/:userID"
          element={<UpdateUser />}
        />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/contract" element={<Contract />} />
        <Route path="/contract/updateTypeContract" element={<UpdateTypeContract />} />




        <Route path="/support/feedback" element={<Feedback />} />
        <Route path="/support/downloads" element={<Downloads />} />
        <Route path="/support/tutorial" element={<Tutorial />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/error-page" element={<ErrorPage />} />
    </Routes>
  );
};

export default MainRouter;
