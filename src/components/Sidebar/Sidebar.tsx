import React, { useEffect, useState } from "react";

// React-Router
import { NavLink, useLocation, useParams } from "react-router-dom";

// SVG
import { LogoMenu } from "../../assets/svg/LogoMenu";
import { RecordIcon } from "../../assets/svg/RecordIcon";
import { RevenueIcon } from "../../assets/svg/RevenueIcon";
import { PlaylistIcon } from "../../assets/svg/PlaylistIcon";
import { CreateCalendarIcon } from "../../assets/svg/CreateCalendarIcon";
import { ManageIcon } from "../../assets/svg/ManageIcon";
import { SettingIcon } from "../../assets/svg/SettingIcon";
import { SupportIcon } from "../../assets/svg/SupportIcon";
import { MiniMenuIcon } from "../../assets/svg/MiniMenuIcon";
// Icons
import { MdOutlineMoreVert } from "react-icons/md";

import "./sidebar.css";

export const pathClosedMenu = [
  "/record",
  "/users-management",
  "/playlist",
  "/create-calendar",
  "/userInfomation",
  "/userInfomation/Update",
  "/configuration",
  "/contract",
  "/support/tutorial",
  "/support/downloads",
  "/support/feedback",
  "/contract/updateTypeContract",
  "/record/Manage-approve",
  "/contract/updateWarningWork",
  "/GenreManagement",
  "/GenreManagement/UpdateGenre",
  "/ControlCycle"
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlur, setIsBlur] = useState(false);
  const location = useLocation();
  var params = useParams();

  useEffect(() => {
    if (pathClosedMenu.includes(location.pathname)) {
      setIsOpen(true);
      setIsBlur(false);
    } else {
      setIsOpen(false);
      setIsBlur(true);
    }
  }, [location]);

  return (
    <>
      {isOpen ? (
        <>
          <div className="sidebar-wrapper">
            <div className="logo-menu">
              <LogoMenu />
            </div>
            <div className="sidebar">
              <NavLink to={"/record"} className="navbar-item">
                <div className="icon">
                  <RecordIcon />
                </div>
                <p>Kho bản ghi</p>
              </NavLink>
              <NavLink to={"/playlist"} className="navbar-item ">
                <div className="icon">
                  <PlaylistIcon />
                </div>
                <p>Playlist</p>
              </NavLink>
              <NavLink to={"/create-calendar"} className="navbar-item  ">
                <div className="icon">
                  <CreateCalendarIcon stroke="none" />
                </div>
                <p>Lập lịch phát</p>
              </NavLink>
              <div className="navbar-item-list">
                <div className="navbar-item ">
                  <div className="icon">
                    <ManageIcon />
                  </div>
                  <p>Quản lý</p>
                </div>
                <MdOutlineMoreVert className="more-icon-navbar" />
                <div className="navbar-list-child">
                  <div className="navbar-child-item">
                    <p>Quản lý hợp đồng</p>
                  </div>
                  <div className="navbar-child-item">
                    <p>Quản lý thiết bị</p>
                  </div>
                  <div className="navbar-child-item">
                    <p>Đơn vị uỷ quyền</p>
                  </div>
                  <div className="navbar-child-item">
                    <p>Đơn vị sử dụng</p>
                  </div>
                </div>
              </div>
              <div className="navbar-item-list">
                <div className="navbar-item">
                  <div className="icon">
                    <RevenueIcon fill="none" />
                  </div>
                  <p>Doanh thu</p>
                </div>
                <MdOutlineMoreVert className="more-icon-navbar" />
                <div className="navbar-list-child">
                  <div className="navbar-child-item">
                    <p>Báo cáo doanh thu</p>
                  </div>
                  <div className="navbar-child-item">
                    <p>Lịch sử đối soát</p>
                  </div>
                  <div className="navbar-child-item">
                    <p>Phân phối doanh thu</p>
                  </div>
                </div>
              </div>
              <div className="navbar-item-list">
                <div className="navbar-item ">
                  <div className="icon">
                    <SettingIcon />
                  </div>
                  <p>Cài đặt</p>
                </div>
                <MdOutlineMoreVert className="more-icon-navbar" />
                <div className="navbar-list-child">
                  <div className="navbar-child-item">
                    <NavLink
                      to={"users-management"}
                      className="navbar-child-item-link"
                    >
                      <p>Phân quyền người dùng</p>
                    </NavLink>
                  </div>
                  <div className="navbar-child-item">
                    <NavLink
                      to={"/configuration"}
                      className="navbar-child-item-link"
                    >
                      <p>Cấu hình</p>
                    </NavLink>
                  </div>
                  <div className="navbar-child-item">
                    <NavLink
                      to={"/contract"}
                      className="navbar-child-item-link"
                    >
                      <p>Quản lý hợp đồng</p>
                    </NavLink>
                  </div>
                  <div className="navbar-child-item">
                    <NavLink
                      to={"/GenreManagement"}
                      className="navbar-child-item-link"
                    >
                      <p>Thông tin tác phẩm</p>
                    </NavLink>
                  </div>
                  <div className="navbar-child-item">
                  <NavLink
                      to={"/ControlCycle"}
                      className="navbar-child-item-link"
                    >
                      <p>Chu kỳ đối soát</p>
                    </NavLink>
                    
                  </div>
                </div>
              </div>
              <div className="navbar-item-list">
                <div className="navbar-item ">
                  <div className="icon">
                    <SupportIcon />
                  </div>
                  <p>Hỗ trợ</p>
                </div>
                <MdOutlineMoreVert className="more-icon-navbar" />
                <div className="navbar-list-child">
                  <div className="navbar-child-item">
                    <NavLink
                      to={"support/tutorial"}
                      className="navbar-child-item-link"
                    >
                      <p>Hướng dẫn sử dụng</p>
                    </NavLink>
                  </div>
                  <div className="navbar-child-item">
                    <NavLink
                      to={"support/downloads"}
                      className="navbar-child-item-link"
                    >
                      <p>Tải app</p>
                    </NavLink>
                  </div>
                  <div className="navbar-child-item">
                    <NavLink
                      to={"support/feedback"}
                      className="navbar-child-item-link"
                    >
                      <p>Feedback</p>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {isBlur ? (
            <div
              className="sidebar-mini-wrapper-blur"
              onClick={() => {
                setIsOpen(false);
              }}
            ></div>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <div
            className="sidebar-wrapper-mini"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <div>
              <MiniMenuIcon />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Sidebar;
