import React, { useEffect, useState } from "react";
import "./App.css";
import "../node_modules/video-react/dist/video-react.css";

import { LogoPage } from "./assets/svg/LogoPage";

import { useLocation } from "react-router-dom";
import { pathClosedMenu } from "./components/Sidebar/Sidebar";

// Router
import MainRouter from "./Routers/MainRouter";

// Bar
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// antd
import { Row, Col } from "antd";

// Redux
import { loadRoles } from "./redux/actions/roleActions";
import { loadUsers } from "./redux/actions/userActions";
import { getUserById } from "./redux/actions/userActions";
import { loadFeedbacks } from "./redux/actions/feedbackActions";
import { loadTypeContracts } from "./redux/actions/typeContractAction";
import { loadGenres } from "./redux/actions/genresActions";
import { loadRecord } from "./redux/actions/recordActions";

import { useDispatch, useSelector } from "react-redux";

function App() {
  const usercurrentData = useSelector((state: any) => state.users.currentUser);
  const roleData = useSelector((state: any) => state.roles.roleData);
  const feedbackData = useSelector(
    (state: any) => state.feedbacks.feedbackData
  );

  const user = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");
  const login = localStorage.getItem("login");

  const location = useLocation();
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(loadRoles);
    dispatch(loadUsers);
    dispatch(getUserById(userId));
    dispatch(loadFeedbacks);
    dispatch(loadTypeContracts);
    dispatch(loadGenres);
    dispatch(loadRecord)
  }, []);

  const [barWidth, setBarWidth] = useState(true);
  useEffect(() => {
    if (pathClosedMenu.includes(location.pathname)) {
      setBarWidth(true);
    } else {
      setBarWidth(false);
    }
  }, [location.pathname]);

  return (
    <div className="App">
      <div className="wrapper">
        <ToastContainer />

        {login === "true" ? (
          <>
            <Row style={{ height: "100%" }}>
              <Col span={barWidth ? 2 : 1}>
                <Sidebar />
              </Col>
              <Col span={barWidth ? 22 : 23} style={{ paddingLeft: 15 }}>
                <Topbar />
                <MainRouter />
              </Col>
            </Row>
          </>
        ) : (
          <>
            <MainRouter />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
