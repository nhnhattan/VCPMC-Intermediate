import React from "react";
import { AppDownloadBG } from "../../../assets/svg/AppDownloadBG";
import { ArrowRight } from "../../../assets/svg/ArrowRight";
import { ToolUploadsIcon } from "../../../assets/svg/ToolUploadsIcon";
import WindowIcon from "../../../assets/image/WindowIcon.png"
import Android from "../../../assets/image/Android.png"

import "./Download.css";
const Downloads = () => {
  return (
    <div className="download-wrapper">
      <div className="download-bg">
        <AppDownloadBG />
      </div>
      <div className="download-header">
        <p>Hỗ trợ</p>
        <div>
          <ArrowRight />
        </div>
        <p>Tải App</p>
      </div>
      <h1>Tải App</h1>
      <div className="body-wrapper">
        <div className="body-header">
          <h2>
            ứng dụng <span className="content-app">VCPMC</span>
          </h2>
        </div>
        <div className="body-content-tutorial">
          <p>
            Bạn vui lòng chọn <br />
            nền tảng phù hợp để trải nghiệm
          </p>
        </div>
        <div className="row-download">
          <div className="download-button-wrapper">
            <div className="download-button-item">
              <div className="download-icon">
                <ToolUploadsIcon />
              </div>
              <button>Tool Upload</button>
            </div>
          </div>
          <div className="download-button-wrapper">
            <div className="download-button-item">
              <div className="download-icon">
                <img src={WindowIcon} alt=""  style={{width: 154, height: 142}}/>
              </div>
              <button>Tải App Window</button>
            </div>
          </div>
          <div className="download-button-wrapper">
            <div className="download-button-item">
              <div className="download-icon">
                <img src={Android} alt="" style={{width: 205, height: 176}}/>
              </div>
              <button>Tải App Android</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Downloads;
