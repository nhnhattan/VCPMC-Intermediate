import React, { useState, useEffect, useRef } from "react";

import { Link } from "react-router-dom";

// Firebase
import { db } from "../../../../firebase";
import { addDoc, collection } from "firebase/firestore";

// Types
import { RoleType } from "../../../../Types/RoleType";
import { UserType } from "../../../../Types/UserType";

// Redux
import { useDispatch, useSelector } from "react-redux";

// SVG
import { ArrowRight } from "../../../../assets/svg/ArrowRight";
import { RequiredIcon } from "../../../../assets/svg/RequiredIcon";

import "./AddUser.css";
import "./select-custom.css";
import "./callendar-custom.css";
import { Select, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
const AddUser = () => {
  const dataRole = useSelector((state: any) => state.roles.roleData);

  const userDoc = collection(db, "users");

  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [dateOut, setDateOut] = useState("");
  const [roleUser, setRoleUser] = useState("");
  const dateFormat = "DD/MM/YYYY";
  const onDatePickerChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    setDateOut(dateString);
  };

  const onChangeSelect = (value: string) => {
    setRoleUser(value);
  };

  const handleAddUser = async () => {
    try {
      addDoc(userDoc, {
        firstName: "",
        lastName: "",
        fullName: fullNameRef.current?.value,
        phone: phoneRef.current?.value,
        email: emailRef.current?.value,
        password: passwordRef.current?.value,
        username: usernameRef.current?.value,
        timeOut: dateOut,
        role: roleUser,
        userstatus: "false",
        birthday: "",
        userImg: "http://cdn.onlinewebfonts.com/svg/img_312847.png",
      }).then(()=> {
        alert("thanh cong")
      })
    } catch (error) {
      console.log(error);
      alert("that bai")

    }
  };

  return (
    <div className="add-user-wrapper">
      <div className="add-user-header">
        <p>C??i ?????t</p>
        <div className="icon-arrow-right">
          <ArrowRight />
        </div>
        <Link to={"/users-management"} className="add-user-link">
          Ph??n quy???n ng?????i d??ng
        </Link>
        <div className="icon-arrow-right">
          <ArrowRight />
        </div>
        <p>Th??m ng?????i d??ng</p>
      </div>
      <p className="header-content">Th??m ng?????i d??ng m???i</p>
      <div className="add-user-form">
        <div className="add-user-col-left">
          <div className="add-user-form-item">
            <p>
              T??n ng?????i d??ng:{" "}
              <span style={{ marginLeft: 4 }}>
                <RequiredIcon />
              </span>
            </p>
            <input type="text" ref={fullNameRef} />
          </div>
          <div className="add-user-form-item">
            <p>S??? ??i???n tho???i:</p>
            <input type="text" ref={phoneRef} />
          </div>
          <div className="add-user-form-item">
            <p>Ng??y h???t h???n:</p>
            {/* <input type="date" /> */}
            <DatePicker
              style={{ width: "422px" }}
              className="add-user-calendar"
              placeholder={""}
              
              onChange={onDatePickerChange}
              format={dateFormat}
            />
          </div>
          <div className="add-user-form-item">
            <p>
              Vai tr??:{" "}
              <span style={{ marginLeft: 4 }}>
                <RequiredIcon />
              </span>
            </p>
            <div className="select-add-user">
              <Select
                options={dataRole.map((role: RoleType) => {
                  return {
                    label: role.nameRole,
                    value: role.nameRole,
                  };
                })}
                style={{ width: 422 }}
                defaultValue="Vui l??ng ch???n"
                onChange={onChangeSelect}
              />
            </div>
          </div>
        </div>
        <div className="add-user-col-right">
          <div className="add-user-form-item">
            <p>Email:</p>
            <input type="text" ref={emailRef} />
          </div>
          <div className="add-user-form-item">
            <p>
              T??n ????ng nh???p:{" "}
              <span style={{ marginLeft: 4 }}>
                <RequiredIcon />
              </span>
            </p>
            <input type="text" ref={usernameRef} />
          </div>
          <div className="add-user-form-item">
            <p>
              M???t kh???u:{" "}
              <span style={{ marginLeft: 4 }}>
                <RequiredIcon />
              </span>
            </p>
            <input type="text" ref={passwordRef} />
          </div>
        </div>
      </div>
      <p className="required-content">
        <span style={{ marginRight: 4 }}>
          <RequiredIcon />
        </span>{" "}
        l?? nh???ng tr?????ng th??ng tin b???t bu???c
      </p>
      <div className="add-user-button-wrapper">
        <button>H???y</button>
        <button onClick={handleAddUser}>L??u</button>
      </div>
    </div>
  );
};

export default AddUser;
