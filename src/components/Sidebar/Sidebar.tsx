import React from "react";

// React-Router
import { NavLink } from "react-router-dom";

// SVG
import { LogoMenu } from "../../assets/svg/LogoMenu";
import { RecordIcon } from "../../assets/svg/RecordIcon";
import { RevenueIcon } from "../../assets/svg/RevenueIcon";
import { PlaylistIcon } from "../../assets/svg/PlaylistIcon";
import { CreateCalendarIcon } from "../../assets/svg/CreateCalendarIcon";
import { ManageIcon } from "../../assets/svg/ManageIcon";
import { SettingIcon } from "../../assets/svg/SettingIcon";
import { SupportIcon } from "../../assets/svg/SupportIcon";

// Icons
import { MdOutlineMoreVert } from "react-icons/md";

import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-wrapper">
      <div className="logo-menu">
        <LogoMenu />
      </div>
      <div className="sidebar">
        <NavLink to={"/"} className="navbar-item">
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
              <p>Phân quyền người dùng</p>
            </div>
            <div className="navbar-child-item">
              <p>Cấu hình</p>
            </div>
            <div className="navbar-child-item">
              <p>Quản lý hợp đồng</p>
            </div>
            <div className="navbar-child-item">
              <p>Thông tin tác phẩm</p>
            </div>
            <div className="navbar-child-item">
              <p>Chu kỳ đối soát</p>
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
              <p>Hướng dẫn sử dụng</p>
            </div>
            <div className="navbar-child-item">
              <p>Tải app</p>
            </div>
            <div className="navbar-child-item">
              <p>Feedback</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
