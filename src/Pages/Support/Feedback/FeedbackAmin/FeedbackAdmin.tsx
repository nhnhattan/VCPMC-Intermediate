import React, { useEffect, useState } from "react";

import { db } from "../../../../firebase";
import { collection, updateDoc, doc } from "firebase/firestore";

import { useSelector, useDispatch } from "react-redux";
import { loadFeedbacks } from "../../../../redux/actions/feedbackActions";
import { RxDotFilled } from "react-icons/rx";

import { FeedbackAnima } from "../../../../assets/svg/FeedbackAnima";

import "./FeedbackAdmin.css";

import { FeedBackType } from "../../../../Types/FeedbackType";
const FeedbackAdmin = () => {
  const dispatch = useDispatch<any>();

  const [feedback, setFeedback]: any = useState([
    {
      id: "",
      date: "",
      problem: "",
      nameUser: "",
      read: false,
      time: "",
      userImg: "",
    },
  ]);
  const feedbackData = useSelector(
    (state: any) => state.feedbacks.feedbackData
  );
  useEffect(() => {
    if (feedbackData !== undefined) {
      setFeedback(feedbackData);
    }
  }, [feedbackData]);

  const [problem, setProblem]: any = useState();
  const handleRead = async (id: string) => {
    const docRef = doc(db, "feedbacks", id);
    await updateDoc(docRef, {
      read: true,
    });
    dispatch(loadFeedbacks);
  };
  return (
    <div className="feedback-admin-wrapper">
      <div className="feedback-admin-col-left">
        {feedback.map((fb: FeedBackType) => {
          return (
            <div
              className="feedback-admin-item"
              onClick={() => {
                setProblem(fb);
                handleRead(fb.id);
              }}
            >
              <div
                className="item-user-img"
                style={
                  fb.userImg
                    ? { backgroundImage: `url(${fb.userImg})` }
                    : {
                        backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp6W5_38I4xhQnoMQWW5aKvXuxF4vuYQSs1v2sDrC6Nx-GCOhtbHwa-rhfvn-SVaqVK7s&usqp=CAU)`,
                      }
                }
              ></div>
              <div
                className={
                  fb.read ? `item-user-wrapper` : `item-user-wrapper-unseen`
                }
              >
                <div className="item-user-info">
                  <p>{fb.nameUser}</p>
                  <p>
                    {fb.time} {fb.date}2
                  </p>
                </div>
                <div className="item-problem-content-wrapper">
                  <div className="item-ploblem-content">
                    {fb.problem === "account" ? (
                      <p>Chủ đề: Tài khoản</p>
                    ) : fb.problem === "revenue" ? (
                      <p>Chủ đề: Quản lý doanh thu</p>
                    ) : fb.problem === "copyright" ? (
                      <p>Chủ đề: Vấn đề bản quyền</p>
                    ) : (
                      <p>Chủ đề: Khác</p>
                    )}
                    <RxDotFilled className="dot-distance-icon" />
                    <p className="text-long-box">
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Asperiores eum dignissimos natus repellat expedita
                      exercitationem delectus cupiditate corporis tempora ullam
                      excepturi, voluptates, consequatur ea vel voluptas optio
                      eligendi illo aliquid?
                    </p>
                  </div>
                  {fb.read ? <></> : <RxDotFilled className="unseen-icon" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="feedback-admin-col-right">
        {problem ? (
          <div className="mail-feedback-wrapper">
            <div className="mail-feedback-header">
              <div className="user-infomation">
                <div
                  className="img-user"
                  style={
                    problem.userImg
                      ? { backgroundImage: `url(${problem.userImg})` }
                      : {
                          backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp6W5_38I4xhQnoMQWW5aKvXuxF4vuYQSs1v2sDrC6Nx-GCOhtbHwa-rhfvn-SVaqVK7s&usqp=CAU)`,
                        }
                  }
                ></div>
                <p>{problem.nameUser}</p>
              </div>
              <div className="time-wrapper">
                <p>
                  {problem.time} {problem.date}
                </p>
              </div>
            </div>
            <p className="problem-content">
              {" "}
              {problem.problem === "account" ? (
                <p>Chủ đề: Tài khoản</p>
              ) : problem.problem === "revenue" ? (
                <p>Chủ đề: Quản lý doanh thu</p>
              ) : problem.problem === "copyright" ? (
                <p>Chủ đề: Vấn đề bản quyền</p>
              ) : (
                <p>Chủ đề: Khác</p>
              )}
            </p>
            <p className="problem-mail-content">{problem.content}</p>
          </div>
        ) : (
          <div className="no-choose-problem">
            <FeedbackAnima />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackAdmin;
