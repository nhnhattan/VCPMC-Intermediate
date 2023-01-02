import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loadTypeContracts } from "../../../redux/actions/typeContractAction";
// SVG
import { ArrowRight } from "../../../assets/svg/ArrowRight";
import { UpdateTypeContractIcon } from "../../../assets/svg/UpdateTypeContractIcon";
import { UpdateAlertDateOutIcon } from "../../../assets/svg/UpdateAlertDateOutIcon";

// Antd
import { Table } from "antd";
import TableCustom from "../../../components/TableCustom/TableCustom";
import Loading from "../../../components/Loading/Loading";
import "./Contract.css";

const Contract = () => {
  const dispatch = useDispatch<any>();
  const warningWorkData = useSelector(
    (state: any) => state.typeContracts.warningData
  );

  const [data, setData] = useState({ dayWarning: 0 });

  useEffect(() => {
    dispatch(loadTypeContracts);
  }, []);

  useEffect(() => {
    if (warningWorkData) {
      setData(warningWorkData[0]);
    }
  });

  // Data
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
      key: "typeContract",
    },
    {
      title: "Doanh thu VCPCM/hợp đồng (Đơn vị: %) ",
      dataIndex: "revenueContract",
      key: "revenue-contract",
    },
  ];

  const dataSource = [
    {
      key: "1",
      typeContract: "Trọn gói",
      revenueContract: "20%",
    },
    {
      key: "2",
      typeContract: "Giá trị bài hát/ lượt phát",
      revenueContract: "20%",
    },
  ];

  return (
    <>
      {!warningWorkData ? (
        <Loading />
      ) : (
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
              <div className="contract-col-left">
                <div className="table-wrapper">
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    style={{ width: "828px", marginBottom: 0 }}
                  />
                </div>
              </div>
              <div className="contract-col-right">
                <h4>Cảnh báo hết hạn khai thác tác phẩm</h4>
                <p>
                  Hợp đồng được cảnh báo trước thời gian hết hạn:
                  <span>
                    {data ? data.dayWarning : ""} ngày
                  </span>
                </p>
              </div>
            </div>
            <div className="col-buton-wrapper">
              <Link to={"updateTypeContract"} className="button-contract-item">
                <div className="button-contract-icon">
                  <UpdateTypeContractIcon />
                </div>
                <p>Chỉnh sửa loại hợp đồng</p>
              </Link>
              <Link to={"updateWarningWork"} className="button-contract-item">
                <div className="button-contract-icon">
                  <UpdateAlertDateOutIcon />
                </div>
                <p>Chỉnh sửa cảnh báo hết hạn</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contract;
