import React, { useEffect, useState, useRef } from "react";

// Router
import { useNavigate } from "react-router-dom";

// Firebase
import { db } from "../../../firebase";
import { updateDoc, collection, doc } from "firebase/firestore";

// Types
import { UserType } from "../../../Types/UserType";

import { useDispatch, useSelector } from "react-redux";

import dayjs from "dayjs";
import moment from "dayjs";

import "../UserInfo.css";
import "./UpdateUser.css";

// SVG
import { UploadImageIcon } from "../../../assets/svg/UploadImageIcon";

// Antd - css
import { Row } from "antd";
import { Select, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import { format } from "path";

const UpdateUserInfo = () => {
  const userData = useSelector((state: any) => state.users.users);
  const navigate = useNavigate();
  const userId: any = localStorage.getItem("userId");
  const dateFormat = "DD/MM/YYYY";

  const usercurrentData = useSelector((state: any) => state.users.currentUser);

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [birthday, setBirthday] = useState(usercurrentData.birthday);
  const phoneRef = useRef<HTMLInputElement>(null);

  const onDatePickerChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    setBirthday(dateString);
  };

  const handleUpdateInfo = async () => {
    try {
      const docRef = doc(db, "users", userId);
      await updateDoc(docRef, {
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        phoneRef: phoneRef.current?.value,
        birthday: birthday,
      });
      alert("Thanh cong");
    } catch (err) {
      alert("That bai");
    }
  };

  return (
    <div className="user-infomation-wrapper">
      <h2>Thông tin cơ bản</h2>
      <div className="infomation-content-wrapper">
        <div className="user-info-col-left">
          <div className="image-user-box">
            <div className="image-user">
              <div className="upload-image-icon">
                <UploadImageIcon />
              </div>
            </div>
            <p>Tuyết Nguyễn</p>
          </div>
          <div className="infomation-content-box">
            <Row className="information-input-row">
              <div className="infomation-input-wrapper">
                <p>Họ:</p>
                <input
                  type="text"
                  defaultValue={usercurrentData.firstName}
                  ref={firstNameRef}
                />
              </div>
              <div className="infomation-input-wrapper">
                <p>Tên:</p>
                <input
                  type="text"
                  defaultValue={usercurrentData.lastName}
                  ref={lastNameRef}
                />
              </div>
            </Row>
            <Row className="information-input-row">
              <div className="information-input-date">
                <p>Ngày sinh:</p>
                <DatePicker
                  style={{ width: "274px", height: "48px" }}
                  className="add-user-calendar"
                  placeholder={""}
                  onChange={onDatePickerChange}
                  defaultValue={usercurrentData.birthday ? moment(usercurrentData.birthday, dateFormat) : moment("01/01/2000", dateFormat)}
                  format={dateFormat}
                />
              </div>
              <div className="infomation-input-wrapper">
                <p>Số điện thoại:</p>
                <input
                  type="text"
                  defaultValue={usercurrentData.phone}
                  ref={phoneRef}
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
      </div>
      <div className="button-update-wrapper">
        <button
          onClick={() => {
            navigate("/userInfomation");
          }}
        >
          Hủy
        </button>
        <button onClick={handleUpdateInfo}>Lưu</button>
      </div>
    </div>
  );
};

export default UpdateUserInfo;
