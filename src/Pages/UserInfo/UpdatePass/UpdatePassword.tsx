import React, { useState, useRef } from "react";

// Redux
import { useSelector } from "react-redux";

// Firebase
import { db } from "../../../firebase";
import { collection, updateDoc, doc } from "firebase/firestore";

import "./UpdatePassword.css";

// Types
import { UserType } from "../../../Types/UserType";

const UpdatePassword = ({ isOpen, setIsOpen, userName }: any) => {
  const oldPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);
  const rePasswordRef = useRef<HTMLInputElement>(null);
  const usercurrentData = useSelector((state: any) => state.users.currentUser);
  const userData = useSelector((state: any) => state.users.users);
  const userId: any = localStorage.getItem("userId");

  const handleUpdatePass = async () => {
    try {
      const currentUser = userData.find(
        (user: UserType) =>
          user.username === usercurrentData.username &&
          user.password === oldPasswordRef.current?.value
      );
      if (currentUser) {
        if (newPasswordRef.current?.value === rePasswordRef.current?.value) {
          const docRef = doc(db, "users", userId);
          await updateDoc(docRef, {
            password: newPasswordRef.current?.value,
          }).then(()=> {
            alert("Cập nhật mật khẩu thành công")
          }).then(()=> {
            setIsOpen(false)
          })
        } else {
          alert("Mật khẩu nhập lại không chính xác");
        }
      } else {
        alert("Mật khẩu cũ không chính xác");
      }
    } catch (err) {
      alert("That bai");
    }
  };
  return (
    <>
      <div className="update-password-wrapper">
        <div className="update-password-form">
          <p className="header-content">Thay đổi mật khẩu</p>
          <div className="update-password-item">
            <p>Mật khẩu hiện tại:</p>
            <input type="password" ref={oldPasswordRef} />
          </div>
          <div className="update-password-item">
            <p>Mật khẩu mới:</p>
            <input type="password" ref={newPasswordRef} />
          </div>
          <div className="update-password-item">
            <p>Nhập lại mật khẩu mới:</p>
            <input type="password" ref={rePasswordRef} />
          </div>
          <div className="button-update-wrapper">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Hủy
            </button>
            <button onClick={handleUpdatePass}>Lưu</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
