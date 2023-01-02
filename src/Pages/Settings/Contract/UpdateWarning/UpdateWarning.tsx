import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTypeContracts } from "../../../../redux/actions/typeContractAction";
import { db } from "../../../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import { ArrowRight } from "../../../../assets/svg/ArrowRight";
import Loading from "../../../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import "./UpdateWarning.css";

type warningProp = [
  {
    dayWarning: number;
  }
];
const UpdateWarning = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const warningWorkData = useSelector(
    (state: any) => state.typeContracts.warningData
  );
  const dayWarningRef = useRef<HTMLInputElement>(null);
  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "warningwork", warningWorkData[0].id), {
        dayWarning: Number(dayWarningRef.current?.value),
      }).then(() => {
        dispatch(loadTypeContracts);
        navigate("/contract");
        toast.success("Cập nhật thành công!", {
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
    } catch (error) {}
  };
  return (
    <>
      {warningWorkData ? (
        <div className="contract-wrapper">
          <div className="contract-header">
            <p>Cài đặt</p>
            <div>
              <ArrowRight />
            </div>
            <p>Quản lý loại hợp đồng</p>
          </div>
          <h1>Loại hợp đồng</h1>
          <div className="update-warning-body">
            <p>Cảnh báo hết hạn khai thác tác phẩm</p>
            <div className="update-warning-input-wrapper">
              <p>Hợp đồng được cảnh báo trước thời gian hết hạn: </p>
              <input
                type="text"
                defaultValue={warningWorkData[0].dayWarning}
                ref={dayWarningRef}
              />
              <p>ngày</p>
            </div>
          </div>
          <div className="contract-button-add-footer-wrapper">
            <button
              onClick={() => {
                navigate("/contract");
              }}
            >
              Hủy
            </button>
            <button onClick={handleUpdate}>Lưu</button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UpdateWarning;
