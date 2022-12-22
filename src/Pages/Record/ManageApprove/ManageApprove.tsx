import React, { useState } from "react";
import { Row, Col, Select, Table } from "antd";

// SVG
import { ArrowRight } from "../../../assets/svg/ArrowRight";
import { SearchIcon } from "../../../assets/svg/SearchIcon";
import { ActionDenyIcon } from "../../../assets/svg/ActionDenyIcon";
import { ActionApplyIcon } from "../../../assets/svg/ActionApplyIcon";
import { ApprovalIcon } from "../../../assets/svg/ApprovalIcon";

// Elements
import TableCustom from "../../../components/TableCustom/TableCustom";

import { Link } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";

import "./ManageApprove.css";

type ExpiryDateProps = {
  status: string;
  date: string;
  outDate: boolean;
};

const ManageApprove = () => {
  const dataSource: any = [
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

  const columns: any = [
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
  const rowSelection: any = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(selectedRows);
    },
  };
  return (
    <div className="manage-approve-wrapper">
      <div className="manage-approve-header">
        <p>Kho bản ghi</p>
        <div>
          <ArrowRight />
        </div>
        <p>Quản lý phê duyệt</p>
      </div>
      <h1>Phê duyệt bản ghi</h1>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Tên bản ghi, ca sĩ,..."
        />
        <div className="search-icon">
          <SearchIcon />
        </div>
      </div>
      <div className="manage-approve-bar">
        <div className="select-wrap">
          <p>Thể loại:</p>
          <Select
            options={[
              {
                value: "all",
                label: "Tất cả",
              },
              {
                value: "pop",
                label: "Pop",
              },
              {
                value: "edm",
                label: "EDM",
              },
              {
                value: "ballad",
                label: "Ballad",
              },
            ]}
            style={{ width: "130px" }}
            defaultValue="Tất cả"
          ></Select>
        </div>
        <div className="select-wrap">
          <p>Định dạng:</p>
          <Select
            options={[
              {
                value: "all",
                label: "Tất cả",
              },
              {
                value: "audio",
                label: "Âm thanh",
              },
              {
                value: "video",
                label: "Video",
              },
            ]}
            style={{ width: "130px" }}
            defaultValue="Tất cả"
          ></Select>
        </div>
      </div>
      <div></div>
      <Row>
        <Col flex="auto" className="record-left-col">
          <TableCustom
            dataSource={dataSource}
            columns={columns}
            pagination={true}
            rowSelection={rowSelection}
          />
        </Col>
        <Col>
          <div className="manage-approve-button-wrapper">
            <div className="manage-approve-button">
              <div className="approve-icon">
                <ActionApplyIcon />
              </div>
              <p>Phê duyệt</p>
            </div>
            <div className="manage-approve-button">
              <div className="approve-icon">
                <ActionDenyIcon />
              </div>
              <p>Từ chối</p>
            </div>
            <Link to={"/record/Manage-approve/add-record"} className="manage-approve-button">
              <div className="approve-icon">
                <ApprovalIcon />
              </div>
              <p>Thêm bản ghi</p>
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ManageApprove;
