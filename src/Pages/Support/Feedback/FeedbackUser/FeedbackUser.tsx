import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

import { db } from "../../../../firebase";
import { addDoc, collection } from "firebase/firestore";

import { ArrowRight } from "../../../../assets/svg/ArrowRight";
import { Select } from "antd";
import "../Feedback.css";

const FeedbackUser = () => {
  const d = new Date();
  let date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();
  let time = d.getHours() + ":" + d.getMinutes();

  const [problem, setProblem] = useState("");
  const [userImg, setUserImg] = useState("");
  const fullNameRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const usercurrentData = useSelector((state: any) => state.users.currentUser);
  const onChangeSelect = (value: string) => {
    setProblem(value);
  };

  const handleComplain = async () => {
    try {
      const feedbackDoc = collection(db, "feedbacks");
      if (problem) {
        await addDoc(feedbackDoc, {
          problem: problem,
          nameUser: fullNameRef.current?.value,
          userImg: usercurrentData.userImg,
          content: contentRef.current?.value,
          date: date,
          time: time,
          read: false,
        }).then(() => {
          alert("Success");
        });
      } else {
        alert("Vui long chon van de");
      }
    } catch (err) {
      console.log(err);
      alert("Error: ");
    }
  };
  return (
    <div className="feedback-wrapper">
      <div className="form-feedback-wrapper">
        <div className="form-feedback-box">
          <div className="form-feedback-item">
            <p>Tên người dùng</p>
            <input
              type="text"
              value={usercurrentData.fullName}
              disabled={true}
              ref={fullNameRef}
            />
          </div>
          <div className="form-feedback-item">
            <p>Bạn muốn được hỗ trợ vấn đề gì?</p>
            <div className="feedback-select">
              <Select
                options={[
                  {
                    value: "account",
                    label: "Tài khoản",
                  },
                  {
                    value: "revenue",
                    label: "Quản lý doanh thu",
                  },
                  {
                    value: "copyright",
                    label: "Vấn đề bản quyền",
                  },
                  {
                    value: "another",
                    label: "Khác",
                  },
                ]}
                style={{ width: 700 }}
                placeholder="Chọn vấn đề bạn cần được hỗ trợ"
                onChange={onChangeSelect}
              />
            </div>
          </div>
          <div className="form-feedback-item">
            <p>Nội dung</p>
            <textarea placeholder="Nhập nội dung" ref={contentRef} />
          </div>
        </div>
      </div>
      <div className="button-feedback-wrapper">
        <button onClick={handleComplain}>Gửi</button>
      </div>
    </div>
  );
};

export default FeedbackUser;
