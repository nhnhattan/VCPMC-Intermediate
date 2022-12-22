import React from "react";

// SVG
import { DownIcon } from "../../assets/svg/DownIcon";
import { FlagVietNam } from "../../assets/svg/FlagVietNam";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/userActions";

import { useNavigate } from "react-router-dom";
import "./topbar.css";
import { UserType } from "../../Types/UserType";

const Topbar = () => {
  const userData = useSelector((state: any) => state.users.users);
  const usercurrentData = useSelector((state: any) => state.users.currentUser);

  const userId = localStorage.getItem("userId");

  let currentUser = userData.find((user: UserType) => user.id === userId);

  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="topbar-wrapper">
      <div className="change-language">
        <p>Tiếng Việt</p>
        <div className="flag-icon">
          <FlagVietNam width="23" height="23" />
        </div>
        <div className="down-icon">
          <DownIcon fill="white" />
        </div>
      </div>
      <div
        className="topbar-info-user"
        onClick={() => {
          navigate("/userInfomation");
        }}
      >
        <div className="image-user-bar"></div>
        {usercurrentData ? (
          <div className="topbar-user-content">
            <p className="topbar-user-name">{usercurrentData.firstName} .{usercurrentData.lastName}</p>
            <p className="topbar-user-role">{usercurrentData.role}</p>
          </div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
    </div>
  );
};

export default Topbar;
