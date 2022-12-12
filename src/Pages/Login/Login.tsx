import React, { useEffect, useState, useRef } from "react";
import { uid } from "uid";

// firebase
import {
  doc,
  getDocs,
  getDoc,
  collection,
  updateDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, userLogin } from "../../redux/actions/userActions";
import { State } from "../../redux/reducers";

// SVG
import { LogoPage } from "../../assets/svg/LogoPage";
import { Eye } from "../../assets/svg/Eye";
import { FiEye, FiEyeOff } from "react-icons/fi";
// React-Router
import { useNavigate } from "react-router-dom";

import "./login.css";

type UserType = {
  id: string;
  username: string;
  password: string;
};

const Login = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const userData = useSelector((state: any) => state.users.users);
  const usercurrentData = useSelector((state: any) => state.users.currentUser);

  const navigate = useNavigate();

  const [errortext, setErrortext] = useState("");
  const [isEye, setIsEye] = useState(false);

  let passwordInput = document.getElementById(
    "password-input"
  ) as HTMLInputElement;
  let rememberInput = document.getElementById(
    "remember-input"
  ) as HTMLInputElement;


  const dispatch: any = useDispatch();
  useEffect(() => {
    dispatch(loadUsers);
  }, []);

  // HandleLoginEvent
  const handleLogin = async () => {
    if (
      usernameRef.current?.value === "" ||
      passwordRef.current?.value === ""
    ) {
      setErrortext("Hãy nhập tài khoản và mật khẩu");
      setTimeout(() => {
        setErrortext("");
      }, 1500);
    } else {
      const currentUser = userData.find(
        (user: UserType) =>
          user.username === usernameRef.current?.value &&
          user.password === passwordRef.current?.value
      );
      if (currentUser) {
        alert("Đăng nhập thành công");
        dispatch(userLogin(currentUser));
        if(rememberInput.checked) {
          localStorage.setItem('username', currentUser.username)
        } else {
          localStorage.removeItem('username')
          
        }
        navigate("/");
        // console.log(usercurrentData);
      } else {
        setErrortext("Sai tên đăng nhập hoặc mật khẩu");
        setTimeout(() => {
          setErrortext("");
        }, 1500);
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-content">
        <LogoPage className="logo" />
        <div className="login-form">
          <p className="login-form-content">Đăng nhập</p>
          <div>
            <p>Tên đăng nhập</p>
            <input
              type="text"
              ref={usernameRef}
              className={errortext ? `error-input-login` : ""}
            />
          </div>
          <div>
            <p>Password</p>
            <div style={{ position: "relative" }}>
              <input
                type="password"
                ref={passwordRef}
                className={errortext ? `error-input-login` : ""}
                id="password-input"
              />
              
              {isEye ? (
                <FiEyeOff
                  className="eye-login-icon"
                  onClick={() => {
                    passwordInput.type = "password";
                    setIsEye(!isEye)
                  }}
                />
              ) : (
                <FiEye
                  className="eye-login-icon"
                  onClick={() => {
                    passwordInput.type = "text";
                    setIsEye(!isEye)
                  }}

                />
              )}
              
            </div>
          </div>
          <p className="error-login">{errortext}</p>
          <label className="container">
            <input type="checkbox" name="" id="remember-input" />
            <span className="checkmark"></span>
            Ghi nhớ đăng nhập
          </label>
        </div>
        <button onClick={handleLogin}>Đăng nhập</button>
        <p className="forgot-pass-link">Quên mật khẩu?</p>
      </div>
    </div>
  );
};

export default Login;
