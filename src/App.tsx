import React from "react";
import "./App.css";
import { LogoPage } from "./assets/svg/LogoPage";

// Router
import MainRouter from "./Routers/MainRouter";

// Bar
import Sidebar from "./components/Sidebar/Sidebar";
import Topbar from "./components/Topbar/Topbar";

// antd
import { Row, Col } from "antd";

import { useDispatch, useSelector } from "react-redux";

function App() {
  const usercurrentData = useSelector((state: any) => state.users.currentUser);
  const user = localStorage.getItem("username");
  return (
    <div className="App">
      <div className="wrapper">
        {usercurrentData !== null || user !== null ? (
          <>
            <Row style={{height: "100%"}}>
              <Col span={2}>
                <Sidebar />
              </Col>
              <Col span={22} style={{paddingLeft: 15}}>
                <Topbar/>
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
