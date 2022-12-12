import React from "react";

// SVG
import { DownIcon } from "../../assets/svg/DownIcon";
import { FlagVietNam } from "../../assets/svg/FlagVietNam";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/userActions";

import { useNavigate } from "react-router-dom";
import "./topbar.css";
const Topbar = () => {
  const usercurrentData = useSelector((state: any) => state.users.currentUser);
  const dispatch: any = useDispatch();
  const navigate = useNavigate()

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
          navigate("/userInfomation")
        }}
      >
        <div className="image-user-bar"></div>
        <div className="topbar-user-content">
          <p className="topbar-user-name">Ng.Tuyết</p>
          <p className="topbar-user-role">Admin</p>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
