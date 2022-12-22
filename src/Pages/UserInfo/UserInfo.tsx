import React, { useEffect, useState } from "react";

// Types
import { UserType } from "../../Types/UserType";

// Router
import { useNavigate, Link } from "react-router-dom";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/userActions";

// Elements
import UpdatePassword from "./UpdatePass/UpdatePassword";

// SVG
import { UpdateUserInfoIcon } from "../../assets/svg/UpdateUserInfoIcon";
import ChangePasswordIcon from "../../assets/svg/ChangePasswordIcon";
import LogoutIcon from "../../assets/svg/LogoutIcon";

// Antd- css
import { Row } from "antd";
import "./UserInfo.css";

const UserInfo = () => {
  const userData = useSelector((state: any) => state.users.users);
  const usercurrentData = useSelector((state: any) => state.users.currentUser);

  const userId = localStorage.getItem("userId");

  let currentUser = userData.find((user: UserType) => user.id === userId);

  const dispatch: any = useDispatch();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(userLogout(null));
    localStorage.setItem("login", "false");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <>
      <div className="user-infomation-wrapper">
        <h2>Thông tin cơ bản</h2>
        <div className="infomation-content-wrapper">
          <div className="user-info-col-left">
            <div className="image-user-box">
              <div className="image-user"></div>
              <p>Tuyết Nguyễn</p>
            </div>
            <div className="infomation-content-box">
              <Row className="information-input-row">
                <div className="infomation-input-wrapper">
                  <p>Họ:</p>
                  <input
                    type="text"
                    defaultValue={usercurrentData.firstName}
                    disabled={true}
                  />
                </div>
                <div className="infomation-input-wrapper">
                  <p>Tên:</p>
                  <input
                    type="text"
                    defaultValue={usercurrentData.lastName}
                    disabled={true}
                  />
                </div>
              </Row>
              <Row className="information-input-row">
                <div className="infomation-input-wrapper">
                  <p>Ngày sinh:</p>
                  <input
                    type="text"
                    defaultValue={usercurrentData.birthday}
                    disabled={true}
                  />
                </div>
                <div className="infomation-input-wrapper">
                  <p>Số điện thoại:</p>
                  <input
                    type="text"
                    defaultValue={usercurrentData.phone}
                    disabled={true}
                  />
                </div>
              </Row>

              <Row className="information-input-row">
                <div className="infomation-input-wrapper">
                  <p>Email:</p>
                  <input
                    type="text"
                    style={{ width: "571px" }}
                    disabled={true}
                    className="input-disable"
                    defaultValue={usercurrentData.email}
                  />
                </div>
              </Row>
              <Row className="information-input-row">
                <div className="infomation-input-wrapper">
                  <p>Tên đăng nhập:</p>
                  <input
                    type="text"
                    style={{ width: "571px" }}
                    disabled={true}
                    className="input-disable"
                    defaultValue={usercurrentData.username}
                  />
                </div>
              </Row>
              <Row className="information-input-row">
                <div className="infomation-input-wrapper">
                  <p>Phân quyền:</p>
                  <input
                    type="text"
                    disabled={true}
                    className="input-disable"
                    defaultValue={usercurrentData.role}
                  />
                </div>
              </Row>
            </div>
          </div>
          <div className="user-info-col-right">
            <Link to={"/userInfomation/Update"} className="button-wrapper">
              <div>
                <UpdateUserInfoIcon />
              </div>
              <p>Sửa thông tin</p>
            </Link>
            <div
              className="button-wrapper"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              <div>
                <ChangePasswordIcon />
              </div>
              <p>Đổi mật khẩu</p>
            </div>
            <div className="button-wrapper" onClick={handleLogout}>
              <div>
                <LogoutIcon />
              </div>
              <p>Đăng xuất</p>
            </div>
          </div>
        </div>
      </div>
      {isOpen ? <UpdatePassword setIsOpen={setIsOpen} isOpen={isOpen}  />  : <></>}
    </>
  );
};

export default UserInfo;
