import React, { useEffect, useState, useRef } from "react";
import { db } from "../../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { loadTypeContracts } from "../../../redux/actions/typeContractAction";
import Loading from "../../../components/Loading/Loading";
import { ArrowRight } from "../../../assets/svg/ArrowRight";
import { Radio, DatePicker } from "antd";
import type { DatePickerProps } from "antd";
import dayjs from "dayjs";
import moment from "dayjs";
import "./ControlCycle.css";
import "./RadioCustom.css";
import "./CallendarCustom.css";
import { toast } from "react-toastify";
import { updateDoc, doc } from "firebase/firestore";
const dateFormat = "DD/MM/YYYY";

const ControlCycle = () => {
  const dispatch = useDispatch<any>();

  const [value, setValue] = useState("quarter");
  const [data, setData] = useState([{ id: "", startdate: "", enddate: "" }]);
  const cycleData = useSelector((state: any) => state.typeContracts.cycleData);
  
  const onChange = (e: any) => {
    setValue(e.target.value);
    localStorage.setItem("cycleValue", e.target.value);
  };

  const cycleValue = localStorage.getItem("cycleValue");

  useEffect(() => {
    if (!cycleValue) {
      setValue("quarter");
      localStorage.setItem("cycleValue", "quarter");
    } else {
      setValue(cycleValue);
    }
    if (cycleData) {
      setData(cycleData);
    }
  }, []);
  const [startdate, setStartdate] = useState(cycleData[0].startdate);
  const [enddate, setEnddate] = useState(cycleData[0].enddate);


  const onDatePickerStartChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    setStartdate(dateString);
  };
  const onDatePickerEndChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    setEnddate(dateString);
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(doc(db, "CycleControl", data[0].id), {
        enddate: enddate,
        startdate: startdate,
      }).then(() => {
        dispatch(loadTypeContracts)
        toast.success("Th??m thanh cong!", {
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
    } catch (err) {
      toast.error("Th??m that bai!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      {data ? (
        <div className="control-cycle-wrapper">
          <div className="control-cycle-header">
            <p>Trang ch???</p>
            <div>
              <ArrowRight />
            </div>
            <p>C??i ?????t h??? th???ng</p>
            <div>
              <ArrowRight />
            </div>
            <p>Th??ng tin t??c ph???m</p>
          </div>
          <h1>C??i ?????t h??? th???ng</h1>
          <div className="control-cycle-body">
            <h4>C??i ?????t chu k?? ?????i so??t</h4>
            <div>
              <Radio.Group
                onChange={onChange}
                defaultValue={cycleValue}
                className="radio-control-cycle-wrapper"
              >
                <Radio value={"quarter"} className="radio-quarter">
                  <p className="radio-content">?????i so??t theo qu??</p>{" "}
                  {value === "quarter" ? (
                    <div className="quater-radio-div-wrapper">
                      <p>
                        Qu?? 1:<span>01/06 - 30/07</span>
                      </p>
                      <p>
                        Qu?? 2:<span>01/08 - 30/09</span>
                      </p>
                      <p>
                        Qu?? 3:<span>01/10 - 30/11</span>
                      </p>
                      <p>
                        Qu?? 4:<span>01/12 - 31/12</span>
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                </Radio>

                <Radio value={"month"}>
                  {" "}
                  <p className="radio-content">?????i so??t theo th??ng </p>{" "}
                  {value === "month" ? (
                    <div className="month-radio-div-wrapper">
                      <div style={{ paddingRight: "172px" }}>
                        <p>Ng??y b???t ?????u:</p>{" "}
                        <DatePicker
                          style={{ width: "298px" }}
                          className="add-user-calendar"
                          placeholder={"dd/mm/yyyy"}
                          defaultValue={
                            data[0].startdate
                              ? moment(data[0].startdate, dateFormat)
                              : moment("01/01/2000", dateFormat)
                          }
                          onChange={onDatePickerStartChange}
                          format={dateFormat}
                        />
                      </div>
                      <div>
                        <p>Ng??y k???t th??c:</p>{" "}
                        <DatePicker
                          style={{ width: "298px" }}
                          className="add-user-calendar"
                          placeholder={"dd/mm/yyyy"}
                          defaultValue={
                            data[0].enddate
                              ? moment(data[0].enddate, dateFormat)
                              : moment("01/01/2000", dateFormat)
                          }
                          onChange={onDatePickerEndChange}
                          format={dateFormat}
                        />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </Radio>
              </Radio.Group>
            </div>
          </div>
          <div className="control-cycle-button-wrapper">
            <button onClick={handleUpdate}>L??u</button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default ControlCycle;
