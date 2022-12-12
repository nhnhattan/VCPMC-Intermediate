import React from "react";

import { Link } from "react-router-dom";
import { Table, Pagination } from "antd";

import { GoPrimitiveDot } from "react-icons/go";

import "./TableCustom.css";

type ExpiryDateProps = {
  status: string;
  date: string;
  outDate: boolean;
};

const TableCustom = () => {
  const dataSource = [
    {
      key: "1",
      STT: "1",
      RecordName: "Mất em",
      ISRCId: "KRA40105463",
      RecordTime: "04:27",
      Singer: "Phan Mạnh Quỳnh",
      Composer: "Phan Mạnh Quỳnh",
      Genre: "Ballad",
      Format: "Audio",
      ExpiryDate: {
        status: "Còn thời hạn",
        date: "02/10/2019",
        outDate: true,
      },
      update: "Cập nhật",
      listen: "Nghe",
    },
    {
      key: "2",
      STT: "2",
      RecordName: "Ergonomic Fresh Chips",
      ISRCId: "KRA40105519",
      RecordTime: "16:18",
      Singer: "Chillies",
      Composer: "Chillies",
      Genre: "Ballad",
      Format: "Audio",
      ExpiryDate: {
        status: "Đã hết hạn",
        date: "02/10/2019",
        outDate: false,
      },
      update: "Cập nhật",
      listen: "Nghe",
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "STT",
      key: "STT",
    },
    {
      title: "Tên bản ghi",
      dataIndex: "RecordName",
      key: "RecordName",
    },
    {
      title: "Mã ISRC",
      dataIndex: "ISRCId",
      key: "ISRCId",
    },
    {
      title: "Thời lượng",
      dataIndex: "RecordTime",
      key: "RecordTime",
    },
    {
      title: "Ca sĩ",
      dataIndex: "Singer",
      key: "Singer",
    },
    {
      title: "Tác giả",
      dataIndex: "Composer",
      key: "Composer",
    },
    {
      title: "Thể loại",
      dataIndex: "Genre",
      key: "Genre",
    },
    {
      title: "Định dạng",
      dataIndex: "Format",
      key: "Format",
    },
    {
      title: "Thời hạn sử dụng",
      dataIndex: "ExpiryDate",
      render: (ExpiryDate: ExpiryDateProps) => {
        return ExpiryDate.outDate ? (
          <div className="expiry-date-wrapper">
            <div className="expiry-status">
              <GoPrimitiveDot className="dot-icon-active" />
              {ExpiryDate.status}
            </div>
            <div className="expiry-date-label">{ExpiryDate.date}</div>
          </div>
        ) : (
          <div className="expiry-date-wrapper">
            <div className="expiry-status">
              <GoPrimitiveDot className="dot-icon-not-active" />
              {ExpiryDate.status}
            </div>
            <div className="expiry-date-label">{ExpiryDate.date}</div>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "update",
      render: (dataSource: any) => {
        return (
          <>
            <Link to={""} className="link-table">
              Cập nhật
            </Link>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "listen",
      render: (dataSource: any) => {
        return (
          <>
            <Link to={""} className="link-table">
              Nghe
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <div className="table-custom-wrapper">
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        // bordered
      />
      <div className="pagination-custom-wrapper">
        <div className="pagination-input-wrapper">
          <p>Hiển thị </p>
          <input type="number" defaultValue={13} />
          <p>hàng trong mỗi trang</p>
        </div>
        <Pagination total={dataSource?.length} />
      </div>
    </div>
  );
};

export default TableCustom;
