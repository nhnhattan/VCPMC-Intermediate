import React, { useEffect, useState, useRef } from "react";

import { db } from "../../../../firebase";
import { updateDoc, doc, deleteDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { loadUsers } from "../../../../redux/actions/userActions";

import { ArrowRight } from "../../../../assets/svg/ArrowRight";
import { RequiredIcon } from "../../../../assets/svg/RequiredIcon";
import { DeleteUserIcon } from "../../../../assets/svg/DeleteUserIcon";
import { PasswordRecoveryIcon } from "../../../../assets/svg/PasswordRecoveryIcon";
import { FiEye, FiEyeOff } from "react-icons/fi";

import { useParams, Link, useNavigate } from "react-router-dom";
import { DatePicker, Radio, Select, Popconfirm } from "antd";

import dayjs from "dayjs";
import moment from "dayjs";
import Loading from "../../../../components/Loading/Loading";
import "./UpdateUser.css";
import "./RadioCustom.css";
import "./ConfirmPopCustom.css";

import { RoleType } from "../../../../Types/RoleType";
import { UserType } from "../../../../Types/UserType";
import type { DatePickerProps } from "antd";

import { generate } from "@wcj/generate-password";

const UpdateUser = () => {
  const params = useParams();
  const dateFormat = "DD/MM/YYYY";
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();

  const dataRole = useSelector((state: any) => state.roles.roleData);
  const userData = useSelector((state: any) => state.users.users);

  const currentUser: UserType = userData.find(
    (user: UserType) => params.userID === user.id
  );

  const [role, setRole] = useState(currentUser.role);
  const [userStatus, setUserStatus] = useState(currentUser.userstatus);
  const [dateOut, setDateOut] = useState(currentUser.timeOut);

  const [eyeOpen, setEyeOpen] = useState(false);

  let passwordInput = document.getElementById(
    "password-input"
  ) as HTMLInputElement;

  const fullNameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onChangeSelect = (value: string) => {
    setRole(value);
  };

  const onChangeStatus = (e: any) => {
    setUserStatus(e.target.value);
  };

  const onDatePickerChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    setDateOut(dateString);
  };

  const confirmDelete = async () => {
    try {
      await deleteDoc(doc(db, "users", currentUser.id))
        .then(() => {
          dispatch(loadUsers);
        })
        .then(() => {
          navigate("/users-management");
          toast.success("X??a t??i kho???n th??nh c??ng!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } catch (error) {
      toast.error("X??a t??i kho???n th???t b???i!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const confirmRecovery = async () => {
    try {
      const passRecovery = generate({
        special: false,
        numeric: true,
        length: 8,
      });

      await updateDoc(doc(db, "users", currentUser.id), {
        password: passRecovery,
      })
        .then(() => {
          dispatch(loadUsers);
        })
        .then(() => {
          navigate("/users-management");
          toast.success("Kh??i ph???c m???t kh???u th??nh c??ng!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } catch (error) {
      toast.error("Kh??i ph???c m???t kh???u th???t b???i!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "users", currentUser.id);

      await updateDoc(docRef, {
        fullName: fullNameRef.current?.value,
        phone: phoneRef.current?.value,
        timeOut: dateOut,
        role: role,
        email: emailRef.current?.value,
        username: usernameRef.current?.value,
        password: passwordRef.current?.value,
        userstatus: userStatus,
      })
        .then(() => {
          dispatch(loadUsers);
        })
        .then(() => {
          navigate("/users-management");
          toast.success("C???p nh???t t??i kho???n th??nh c??ng!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } catch (err) {
      toast.error("C???p nh???t t??i kho???n th???t b???i!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      {!currentUser ? (
        <Loading />
      ) : (
        <div className="manage-update-user-wrapper">
          <div className="manage-update-user-header">
            <p>C??i ?????t</p>
            <div>
              <ArrowRight />
            </div>
            <Link to={"/users-management"} className="manage-update-user-link">
              Ph??n quy???n ng?????i d??ng
            </Link>
            <div>
              <ArrowRight />
            </div>
            <p>Ch???nh s???a</p>
          </div>
          <h1>Ch???nh s???a th??ng tin ng?????i d??ng</h1>
          <div className="manage-update-user-body-wrapper">
            <div className="manage-update-user-body">
              <div className="update-user-col-left">
                <div className="update-user-input-wrapper">
                  <p>
                    T??n ng?????i d??ng:{" "}
                    <span className="required-icon">
                      <RequiredIcon />
                    </span>
                  </p>
                  <input
                    type="text"
                    defaultValue={currentUser.username}
                    ref={fullNameRef}
                  />
                </div>
                <div className="update-user-input-wrapper">
                  <p>S??? ??i???n tho???i: </p>
                  <input
                    type="text"
                    defaultValue={currentUser.phone}
                    ref={phoneRef}
                  />
                </div>
                <div className="update-user-input-calendar">
                  <p>Ng??y h???t h???n:</p>
                  <DatePicker
                    style={{ width: 422, background: "#2B2B3F" }}
                    defaultValue={
                      currentUser.timeOut
                        ? moment(currentUser.timeOut, dateFormat)
                        : moment("01/01/2000", dateFormat)
                    }
                    format={dateFormat}
                    onChange={onDatePickerChange}
                  />
                </div>

                <div className="update-user-input-wrapper">
                  <p>
                    Vai tr??:{" "}
                    <span className="required-icon">
                      <RequiredIcon />
                    </span>
                  </p>
                  <div className="upadte-user-manage-select">
                    <Select
                      options={dataRole.map((role: RoleType) => {
                        return {
                          label: role.nameRole,
                          value: role.nameRole,
                        };
                      })}
                      style={{ width: 422, height: 48 }}
                      defaultValue={currentUser.role}
                      className="upadte-user-manage-select"
                      onChange={onChangeSelect}
                    ></Select>
                  </div>
                </div>
              </div>
              <div className="update-user-col-right">
                <div className="update-user-input-wrapper">
                  <p>Email:</p>
                  <input
                    type="text"
                    defaultValue={currentUser.email}
                    ref={emailRef}
                  />
                </div>
                <div className="update-user-input-wrapper">
                  <p>
                    T??n ????ng nh???p:{" "}
                    <span className="required-icon">
                      <RequiredIcon />
                    </span>
                  </p>
                  <input
                    type="text"
                    defaultValue={currentUser.username}
                    ref={usernameRef}
                  />
                </div>
                <div className="update-user-input-wrapper">
                  <p>
                    M???t kh???u:{" "}
                    <span className="required-icon">
                      <RequiredIcon />
                    </span>
                  </p>
                  <div className="update-user-input-password">
                    {eyeOpen ? (
                      <FiEyeOff
                        className="see-password-icon"
                        onClick={() => {
                          setEyeOpen(false);
                          passwordInput.type = "password";
                        }}
                      />
                    ) : (
                      <FiEye
                        className="see-password-icon"
                        onClick={() => {
                          setEyeOpen(true);
                          passwordInput.type = "text";
                        }}
                      />
                    )}

                    <input
                      type="password"
                      defaultValue={currentUser.password}
                      ref={passwordRef}
                      id="password-input"
                    />
                  </div>
                </div>
                <div className="update-user-input-wrapper">
                  <p>
                    Tr???ng th??i:{" "}
                    <span className="required-icon">
                      <RequiredIcon />
                    </span>
                  </p>
                  <Radio.Group
                    name="radiogroup"
                    defaultValue={currentUser.userstatus}
                    className="update-user-manage-radio"
                    onChange={onChangeStatus}
                  >
                    <Radio value={true}>??ang ho???t ?????ng</Radio>
                    <Radio value={false}>Ng???ng ho???t ?????ng</Radio>
                  </Radio.Group>
                </div>
              </div>
            </div>
            <div className="button-user-management-wrapper">
              <Popconfirm
                title="B???n ch???c ch???n mu???n x??a ng?????i d??ng n??y ch????"
                onConfirm={confirmDelete}
                okText="X??a"
                cancelText="H???y"
              >
                <div className="button-manage-user">
                  <div>
                    <DeleteUserIcon />
                  </div>
                  <p>
                    X??a ng?????i <br /> d??ng
                  </p>
                </div>
              </Popconfirm>
              <Popconfirm
                title="B???n mu???n kh??i ph???c l???i m???t kh???u c???a t??i kho???n n??y?"
                onConfirm={confirmRecovery}
                okText="C??"
                cancelText="H???y"
              >
                <div className="button-manage-user">
                  <div>
                    <PasswordRecoveryIcon />
                  </div>
                  <p>
                    Kh??i ph???c <br /> m???t kh???u
                  </p>
                </div>
              </Popconfirm>
            </div>
          </div>
          <p className="required-label">
            <span>
              <RequiredIcon />
            </span>
            l?? nh???ng tr?????ng th??ng tin b???t bu???c{" "}
          </p>
          <div className="manage-update-user-button-wrapper">
            <button
              onClick={() => {
                navigate("/users-management");
              }}
            >
              H???y
            </button>
            <button
              onClick={() => {
                handleUpdate();
              }}
            >
              L??u
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateUser;
