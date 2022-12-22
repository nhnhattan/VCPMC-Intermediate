import React, { useState } from "react";
import { Row, Col, Select } from "antd";

// SVG
import { SearchIcon } from "../../assets/svg/SearchIcon";
import { ListIcon } from "../../assets/svg/ListIcon";
import { TabIcon } from "../../assets/svg/TabIcon";
import { ApprovalIcon } from "../../assets/svg/ApprovalIcon";
import { PlayIcon } from "../../assets/svg/PlayIcon";
// Elements
import TableCustom from "../../components/TableCustom/TableCustom";

import "./record.css";
import "./select-custom.css"

import { Link } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";


type ExpiryDateProps = {
  status: string;
  date: string;
  outDate: boolean;
};

const Record = () => {

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

  const [listIsOpen, setListIsOpen] = useState(true);
  const [tabIsOpen, setTabIsOpen] = useState(false);

  const [selectFormatIsOpen, setSelectFormatIsOpen] = useState(false);
  const [selectDateIsOpen, setSelectDateIsOpen] = useState(false);
  const [selectStatusIsOpen, setSelectStatusIsOpen] = useState(false);

  return (
    <div className="home-wrapper">
      <p className="heading-text">Kho bản ghi</p>
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
      <Row>
        <Col flex="auto" className="record-left-col">
          <div className="record-select-bar">
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
                style={{ width: 130}}
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
                style={{ width: 130}}
                defaultValue="Tất cả"
              ></Select>
            </div>
            <div className="select-wrap">
              <p>Thời hạn sử dụng:</p>
              
              <Select
                options={[
                  {
                    value: "all",
                    label: "Tất cả",
                  },
                  {
                    value: "current",
                    label: "Còn thời hạn",
                  },
                  {
                    value: "outdate",
                    label: "Hết hạn",
                  },
                ]}
                style={{ width: 131}}
                defaultValue="Tất cả"
              ></Select>
            </div>
            <div className="select-wrap">
              <p>Trạng thái:</p>
              <Select
                options={[
                  {
                    value: "all",
                    label: "Tất cả",
                  },
                  {
                    value: "by-user",
                    label: "Duyệt bởi người dùng",
                  },
                  {
                    value: "by-auto",
                    label: "Duyệt tự động",
                  },
                ]}
                style={{ width: 200}}
                defaultValue="Tất cả"
              ></Select>
            </div>
            <div className="list-tab-icon-wrap">
              {listIsOpen ? (
                <div className="list-icon">
                  <ListIcon stroke="#FF7506" />
                </div>
              ) : (
                <div
                  className="list-icon"
                  onClick={() => {
                    setListIsOpen(true);
                    setTabIsOpen(false);
                  }}
                >
                  <ListIcon stroke="#AEAEAE" />
                </div>
              )}

              {tabIsOpen ? (
                <div className="tab-icon">
                  <TabIcon stroke="#FF7506" fill="none" />
                </div>
              ) : (
                <div className="tab-icon">
                  <TabIcon
                    stroke="#AEAEAE"
                    fill="none"
                    onClick={() => {
                      setTabIsOpen(true);
                      setListIsOpen(false);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
          {tabIsOpen ? (
            <div>
              <Row className="tab-wrapper-open" gutter={[50, 29]}>
                <Col className="card-item-col">
                  <div className="card-item-wrapper">
                    <div className="card-item-image-wrapper">
                      <div className="card-item-play-icon">
                        <PlayIcon />
                      </div>
                    </div>
                    <div className="card-item-content-wrapper">
                      <p>Handcrafted Fresh Bacon Multy</p>
                      <p>
                        Ca sĩ: <span>Bella Poarch</span>
                      </p>
                      <p>
                        Sáng tác: <span>Leilani Zulauf</span>
                      </p>
                      <p>
                        Số hợp đồng: <span>HD395738503</span>
                      </p>
                    </div>
                    <div className="card-item-properties-wrapper">
                      <div className="card-item-properties">
                        <p>Thể loại</p>
                        <p>Pop</p>
                      </div>
                      <div className="card-item-properties">
                        <p>Định dạng</p>
                        <p>Audio</p>
                      </div>
                      <div className="card-item-properties">
                        <p>Thời lượng</p>
                        <p>03:00</p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="card-item-col">
                  <div className="card-item-wrapper">
                    <div className="card-item-image-wrapper">
                      <div className="card-item-play-icon">
                        <PlayIcon />
                      </div>
                    </div>
                    <div className="card-item-content-wrapper">
                      <p>Handcrafted Fresh Bacon Multy</p>
                      <p>
                        Ca sĩ: <span>Bella Poarch</span>
                      </p>
                      <p>
                        Sáng tác: <span>Leilani Zulauf</span>
                      </p>
                      <p>
                        Số hợp đồng: <span>HD395738503</span>
                      </p>
                    </div>
                    <div className="card-item-properties-wrapper">
                      <div className="card-item-properties">
                        <p>Thể loại</p>
                        <p>Pop</p>
                      </div>
                      <div className="card-item-properties">
                        <p>Định dạng</p>
                        <p>Audio</p>
                      </div>
                      <div className="card-item-properties">
                        <p>Thời lượng</p>
                        <p>03:00</p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="card-item-col">
                  <div className="card-item-wrapper">
                    <div className="card-item-image-wrapper">
                      <div className="card-item-play-icon">
                        <PlayIcon />
                      </div>
                    </div>
                    <div className="card-item-content-wrapper">
                      <p>Handcrafted Fresh Bacon Multy</p>
                      <p>
                        Ca sĩ: <span>Bella Poarch</span>
                      </p>
                      <p>
                        Sáng tác: <span>Leilani Zulauf</span>
                      </p>
                      <p>
                        Số hợp đồng: <span>HD395738503</span>
                      </p>
                    </div>
                    <div className="card-item-properties-wrapper">
                      <div className="card-item-properties">
                        <p>Thể loại</p>
                        <p>Pop</p>
                      </div>
                      <div className="card-item-properties">
                        <p>Định dạng</p>
                        <p>Audio</p>
                      </div>
                      <div className="card-item-properties">
                        <p>Thời lượng</p>
                        <p>03:00</p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="card-item-col">
                  <div className="card-item-wrapper">
                    <div className="card-item-image-wrapper">
                      <div className="card-item-play-icon">
                        <PlayIcon />
                      </div>
                    </div>
                    <div className="card-item-content-wrapper">
                      <p>Handcrafted Fresh Bacon Multy</p>
                      <p>
                        Ca sĩ: <span>Bella Poarch</span>
                      </p>
                      <p>
                        Sáng tác: <span>Leilani Zulauf</span>
                      </p>
                      <p>
                        Số hợp đồng: <span>HD395738503</span>
                      </p>
                    </div>
                    <div className="card-item-properties-wrapper">
                      <div className="card-item-properties">
                        <p>Thể loại</p>
                        <p>Pop</p>
                      </div>
                      <div className="card-item-properties">
                        <p>Định dạng</p>
                        <p>Audio</p>
                      </div>
                      <div className="card-item-properties">
                        <p>Thời lượng</p>
                        <p>03:00</p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col className="card-item-col">
                  <div className="card-item-wrapper">
                    <div className="card-item-image-wrapper">
                      <div className="card-item-play-icon">
                        <PlayIcon />
                      </div>
                    </div>
                    <div className="card-item-content-wrapper">
                      <p>Handcrafted Fresh Bacon Multy</p>
                      <p>
                        Ca sĩ: <span>Bella Poarch</span>
                      </p>
                      <p>
                        Sáng tác: <span>Leilani Zulauf</span>
                      </p>
                      <p>
                        Số hợp đồng: <span>HD395738503</span>
                      </p>
                    </div>
                    <div className="card-item-properties-wrapper">
                      <div className="card-item-properties">
                        <p>Thể loại</p>
                        <p>Pop</p>
                      </div>
                      <div className="card-item-properties">
                        <p>Định dạng</p>
                        <p>Audio</p>
                      </div>
                      <div className="card-item-properties">
                        <p>Thời lượng</p>
                        <p>03:00</p>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="pagination-custom-wrapper">
                <div className="pagination-input-wrapper">
                  <p>Hiển thị </p>
                  <input type="number" defaultValue={13} />
                  <p>hàng trong mỗi trang</p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <TableCustom dataSource={dataSource} columns={columns} pagination={true} rowSelection={false}/>
            </div>
          )}
        </Col>
        <Col>
          <Link to={"Manage-approve"} className="right-button-wrapper">
            <div className="approval-icon">
              <ApprovalIcon />
            </div>
            <p>
              Quản lý <br /> phê duyệt
            </p>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Record;
