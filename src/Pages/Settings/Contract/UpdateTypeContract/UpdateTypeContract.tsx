import React, { useEffect, useState, useRef } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadTypeContracts } from "../../../../redux/actions/typeContractAction";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { db } from "../../../../firebase";
import {
  addDoc,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// SVG
import { ArrowRight } from "../../../../assets/svg/ArrowRight";
import { AddTypeContract } from "../../../../assets/svg/AddTypeContract";
import { DeleteTypeContract } from "../../../../assets/svg/DeleteTypeContract";

import Loading from "../../../../components/Loading/Loading";
import { Table } from "antd";

import moment from "dayjs";

import "./UpdateTypeContract.css";
import { TypeContractType } from "../../../../Types/TypeContractType";
type dataProps = Array<
  | {
      key: string;
      id: string;
      typeContract: string;
      revenueContract: string;
      dateApply: string;
    }
  | []
>;

const UpdateTypeContract = () => {
  const dispatch: any = useDispatch();

  const typeContractData = useSelector(
    (state: any) => state.typeContracts.typeContractData
  );

  const [datakey, setDatakey] = useState<any>();

  const [dataFull, setDataFull] = useState([
    {
      key: "1",
      id: "",
      typeContract: "",
      revenueContract: "",
      dateApply: "",
    },
  ]);

  const [numRow, setNumRow] = useState(3);
  const [datalength, setDatalength] = useState(0);
  const navigate = useNavigate();

  const [disableButton, setDisableButton] = useState(true);
  const [disableUpdate, setDisableUpdate] = useState(false);
  const dateFormat = "DD/MM/YYYY";
  const timeFormat = "hh:ss:mm";

  const handleCheckTime = (datetime: string) => {
    const text = datetime;
    const array = text.split(" ");
    const date = false;
    const time = false;
    if (
      moment(array[0], dateFormat, true).isValid() &&
      moment(array[1], "HH:mm:ss", true).isValid()
    ) {
      return true;
    } else {
      return false;
    }
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (key: string, dataSource: any, index: number) => {
        ++index;
        return index;
      },
    },
    {
      title: "Loại hợp đồng",
      dataIndex: "typeContract",
      render: (key: string, dataSource: any, index: number) => {
        return index < datalength && numRow === datalength ? (
          <input
            type={"text"}
            defaultValue={dataSource.typeContract}
            className="input-table-update-contract"
            style={{ width: 216 }}
            onChange={(e: any) => {
              dataFull.map((data: any) => {
                if (data.key === dataSource.key) {
                  data.typeContract = e.target.value;
                }
              });
            }}
          />
        ) : index >= numRow - 2 ? (
          <input
            type={"text"}
            onChange={(e: any) => {
              dataFull.map((data: any) => {
                if (data.key === dataSource.key) {
                  data.typeContract = e.target.value;
                }
              });
            }}
            placeholder={dataSource.typeContract}
            className="input-table-update-contract"
            style={{ width: 216 }}
          />
        ) : (
          <p>{dataSource.typeContract}</p>
        );
      },
    },
    {
      title: "Doanh thu VCPCM/hợp đồng (Đơn vị: %) ",
      dataIndex: "revenueContract",
      render: (key: string, dataSource: any, index: number) => {
        return index < datalength && numRow === datalength ? (
          <input
            type={"text"}
            defaultValue={dataSource.revenueContract}
            className="input-table-update-contract"
            style={{ width: 216 }}
            onChange={(e: any) => {
              dataFull.map((data: any) => {
                if (data.key === dataSource.key) {
                  data.revenueContract = e.target.value;
                }
              });
            }}
          />
        ) : index >= numRow - 2 ? (
          <input
            type={"text"}
            placeholder={dataSource.revenueContract}
            className="input-table-update-contract"
            style={{ width: 216 }}
            onChange={(e: any) => {
              dataFull.map((data: any) => {
                if (data.key === dataSource.key) {
                  data.revenueContract = e.target.value;
                }
              });
            }}
          />
        ) : (
          <p>{dataSource.revenueContract}</p>
        );
      },
    },
    {
      title: "Ngày áp dụng",
      dataIndex: "dateApply",
      render: (key: string, dataSource: any, index: number) => {
        return index < datalength && numRow === datalength ? (
          <>
            {setDisableButton(true)}
            {setDisableUpdate(true)}
            <input
              type={"text"}
              defaultValue={dataSource.dateApply}
              className="input-table-update-contract"
              style={{ width: 216 }}
              onChange={(e: any) => {
                if (e.target.value) {
                  if (
                    handleCheckTime(e.target.value) &&
                    e.target.value !== "dd/mm/yyyy hh:ss:mm"
                  ) {
                    dataFull.map((data: any) => {
                      if (data.key === dataSource.key) {
                        data.dateApply = e.target.value;
                      }
                    });
                    setDisableButton(true);
                  } else {
                    setDisableButton(false);
                  }
                } else {
                  setDisableButton(false);
                }
              }}
            />
          </>
        ) : index >= numRow - 2 ? (
          <input
            type={"text"}
            placeholder={dataSource.dateApply}
            className="input-table-update-contract"
            style={{ width: 216 }}
            onChange={(e: any) => {
              if (e.target.value) {
                if (
                  handleCheckTime(e.target.value) &&
                  e.target.value !== "dd/mm/yyyy hh:ss:mm"
                ) {
                  dataFull.map((data: any) => {
                    if (data.key === dataSource.key) {
                      data.dateApply = e.target.value;
                    }
                  });
                  setDisableButton(true);
                } else {
                  setDisableButton(false);
                }
              } else {
                setDisableButton(false);
              }
            }}
          />
        ) : (
          <p>{dataSource.dateApply}</p>
        );
      },
    },
  ];

  useEffect(() => {
    if (typeContractData) {
      const arr: any = typeContractData.map((data: TypeContractType) => {
        return data.key;
      });
      setDatakey(arr);
      setDataFull(typeContractData);
      setNumRow(Number(typeContractData.length));
      setDatalength(Number(typeContractData.length));
    }
  }, [typeContractData]);

  const handleNumRow = () => {
    let dataSource = dataFull;
    dataSource = [
      ...dataSource,
      {
        key: String(numRow + 1),
        id: "",
        typeContract: "Trọn gói",
        revenueContract: "20%",
        dateApply: "dd/mm/yyyy hh:ss:mm",
      },
      {
        key: String(numRow + 2),
        id: "",
        typeContract: "Giá trị bài hát/ lượt phát",
        revenueContract: "0%",
        dateApply: "dd/mm/yyyy hh:ss:mm",
      },
    ];
    setDataFull(dataSource);
  };

  const handleDelete = async () => {
    let dataSource = dataFull;
    // await dataSource.pop();
    // await dataSource.pop();

    // await setNumRow(numRow - 2);
    // // await setDatalength(datalength - 2);
    // dataSource = [...dataSource];
    // setDataFull(dataSource);
  };

  const handleUpdate = async () => {
    try {
      await dataFull.map((data: any) => {
        if (!datakey.includes(data.key)) {
          const day = data.dateApply.split(" ")[0];
          const time = data.dateApply.split(" ")[1];
          addDoc(collection(db, "typecontracts"), {
            key: data.key,
            typeContract: data.typeContract,
            revenueContract: data.revenueContract,
            dayApply: day,
            timeApply: time,
            dateApply: data.dateApply,
          }).then(() => {
            toast.success("Thêm thành công!", {
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
          console.log(dataFull);
        }
        if (datakey.includes(data.key)) {
          const day = data.dateApply.split(" ")[0];
          const time = data.dateApply.split(" ")[1];
          updateDoc(doc(db, "typecontracts", data.id), {
            typeContract: data.typeContract,
            revenueContract: data.revenueContract,
            dayApply: day,
            timeApply: time,
            dateApply: data.dateApply,
          });
        }
      });

      toast.success("Cập nhật thanh cong", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (err) {
      console.log(err);
      //   alert("that bai");
    }
  };

  return (
    <>
      {typeContractData ? (
        <div className="contract-wrapper">
          <div className="contract-header">
            <p>Cài đặt</p>
            <div>
              <ArrowRight />
            </div>
            <p>Quản lý loại hợp đồng</p>
          </div>
          <h1>Loại hợp đồng</h1>
          <div className="contract-body-wrapper">
            <div className="contract-col-wrapper">
              <div className="contract-upadte-table">
                <div className="table-wrapper">
                  <Table
                    dataSource={dataFull.map((data: any) => {
                      return {
                        key: data.key,
                        id: data.id,
                        typeContract: data.typeContract,
                        revenueContract: data.revenueContract,
                        dateApply: data.dateApply,
                      };
                    })}
                    columns={columns}
                    pagination={false}
                    style={{ width: "1056px", marginBottom: 0 }}
                  />
                </div>
              </div>
            </div>
            <div className="col-buton-wrapper" style={{ height: 255 }}>
              <div
                className="button-contract-item"
                onClick={() => {
                  if (disableButton) {
                    setNumRow(numRow + 2);
                    handleNumRow();
                    setDisableButton(false);
                  } else {
                    toast.error("Định dạng ngày tháng không đúng!", {
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
                }}
              >
                <div className="button-contract-icon">
                  <AddTypeContract />
                </div>
                <p>
                  Thêm lịch <br></br>áp dụng
                </p>
              </div>
              <div
                className="button-contract-item"
                onClick={() => {
                  handleDelete();
                }}
              >
                <div className="button-contract-icon">
                  <DeleteTypeContract />
                </div>
                <p>Xóa</p>
              </div>
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

export default UpdateTypeContract;
