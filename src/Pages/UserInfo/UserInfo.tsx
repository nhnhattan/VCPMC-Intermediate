import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../redux/actions/userActions";

import { useNavigate } from "react-router-dom";
const UserInfo = () => {
  const usercurrentData = useSelector((state: any) => state.users.currentUser);
  const dispatch: any = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          dispatch(userLogout(null));
          navigate("/login");
        }}
        style={{width: 100, height: 100, cursor: "pointer"}}
      >
        Log out
      </button>
    </div>
  );
};

export default UserInfo;
