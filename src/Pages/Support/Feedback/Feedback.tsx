import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import FeedbackUser from "./FeedbackUser/FeedbackUser";
import FeedbackAdmin from "./FeedbackAmin/FeedbackAdmin";
import { ArrowRight } from "../../../assets/svg/ArrowRight";
import Loading from "../../../components/Loading/Loading";
import "./Feedback.css";

const Feedback = () => {
  const usercurrentData = useSelector((state: any) => state.users.currentUser);

  return (
    <div className="feedback-wrapper">
      <div className="feedback-header">
        <p>Hỗ trợ</p>
        <div className="feedback-header-icon">
          <ArrowRight />
        </div>
        <p>Feedback</p>
      </div>
      <h1>Feedback</h1>
      {usercurrentData.role === "Super Admin" ? (
        <FeedbackAdmin />
      ) : !usercurrentData.role ? (
        <Loading />
      ) : (
        <FeedbackUser />
      )}
    </div>
  );
};

export default Feedback;
