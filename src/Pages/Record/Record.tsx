import React, { useEffect, useState } from "react";
import { Row, Col, Select, Modal } from "antd";
import { useSelector } from "react-redux";

import { Player } from "video-react";
import YouTube from "react-youtube";

import "react-html5video/dist/styles.css";
// SVG
import { SearchIcon } from "../../assets/svg/SearchIcon";
import { ListIcon } from "../../assets/svg/ListIcon";
import { TabIcon } from "../../assets/svg/TabIcon";
import { ApprovalIcon } from "../../assets/svg/ApprovalIcon";
import { PlayIcon } from "../../assets/svg/PlayIcon";
import { EditIcon } from "../../assets/svg/EditIcon";

// Elements
import TableCustom from "../../components/TableCustom/TableCustom";

import "./record.css";
import "./select-custom.css";
import "./ModalCustom.css";

import { Link } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import { RecordType } from "../../Types/RecordType";

type ExpiryDateProps = {
  status: boolean;
  date: string;
};

const Record = () => {
  let recordData = useSelector((state: any) => state.recordsData.recordsData);
  const filterByID = (item: any) => {
    if (item.approveStatus) {
      return true;
    }
    return false;
  };

  recordData = recordData.filter(filterByID);
  const [dataFull, setDataFull] = useState([
    {
      id: "",
      RecordName: "",
      ISRCId: "",
      Singer: "",
      Composer: "",
      Producer: "",
      Genre: "",
      Format: "",
      RecordTime: "",
      dateAdd: "",
      usernameAdd: "",
      personApprove: "",
      dateApprove: "",
      RecordLink: "",
      approveStatus: false,
      status: false,
      ExpiryDate: "",
      RecordImage: "",
    },
  ]);
  useEffect(() => {
    if (recordData) {
      setDataFull(recordData);
    }
  }, [recordData]);
  const [listen, setListen] = useState("");

  const columns: any = [
    {
      title: "STT",
      dataIndex: "STT",
      render: (key: RecordType, roleData: RecordType, index: number) => {
        ++index;
        return index;
      },
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
        return ExpiryDate.status ? (
          <div className="expiry-date-wrapper">
            <div className="expiry-status">
              <GoPrimitiveDot className="dot-icon-active" />
              Còn thời hạn
            </div>
            <div className="expiry-date-label">{ExpiryDate.date}</div>
          </div>
        ) : (
          <div className="expiry-date-wrapper">
            <div className="expiry-status">
              <GoPrimitiveDot className="dot-icon-not-active" />
              Đã hết hạn
            </div>
            <div className="expiry-date-label">{ExpiryDate.date}</div>
          </div>
        );
      },
    },
    {
      title: "",
      dataIndex: "update",
      render: (key: RecordType, dataSource: any) => {
        return (
          <>
            <Link
              to={`updateRecord/${dataSource.key}`}
              className="link-table"
              onClick={() => {
                console.log(dataSource.key);
              }}
            >
              Cập nhật
            </Link>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "listen",
      render: (key: RecordType, dataSource: any) => {
        return (
          <>
            <p
              className="link-table"
              onClick={() => {
                setModal(true);
                setListen(dataSource.RecordLink);
              }}
            >
              Nghe
            </p>
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

  const [modal, setModal] = useState(false);
  const handleCancel = () => {
    setModal(false);
  };
  const opts = {
    width: "480",
    height: "280",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
    },
  };
  return (
    <div className="home-wrapper">
      <Modal
        title="Basic Modal"
        open={modal}
        onCancel={handleCancel}
        style={{
          width: 480,
          height: 280,
        }}
        centered={true}
      >
        {/* <Player
          playsInline
          width={452}
          height={247}
          poster="/assets/poster.png"
          src={"https://www.youtube.com/watch?v=Lx2i3cnVKWg"}
        /> */}

        <YouTube
          videoId={String(listen)}
          opts={opts}
          style={{ borderRadius: "8px" }}
        />
      </Modal>

      {/* <ReactPlayer url="https://www.youtube.com/watch?v=ZDWm45jC3rM" width={452} height={247}/> */}

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
                style={{ width: 130 }}
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
                style={{ width: 130 }}
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
                style={{ width: 131 }}
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
                style={{ width: 200 }}
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
                {dataFull.map((data: RecordType) => {
                  return (
                    <Col className="card-item-col" key={data.id}>
                      <div className="card-item-wrapper">
                        <div
                          className="card-item-image-wrapper"
                          style={{
                            backgroundImage: `url(${data.RecordImage})`,
                          }}
                          onClick={() => {
                            setModal(true);
                            setListen(data.RecordLink);
                          }}
                        >
                          <div className="card-item-play-icon">
                            <PlayIcon />
                          </div>
                        </div>
                        <div className="card-item-content-wrapper">
                          <p>{data.RecordName}</p>
                          <p>
                            Ca sĩ: <span>{data.Singer}</span>
                          </p>
                          <p>
                            Sáng tác: <span>{data.Producer}</span>
                          </p>
                          <p>
                            Số hợp đồng: <span></span>
                          </p>
                        </div>
                        <div className="card-item-footer">
                          <div className="card-item-properties-wrapper">
                            <div className="card-item-properties">
                              <p>Thể loại</p>
                              <p>{data.Genre}</p>
                            </div>
                            <div className="card-item-properties">
                              <p>Định dạng</p>
                              <p>{data.Format}</p>
                            </div>
                            <div className="card-item-properties">
                              <p>Thời lượng</p>
                              <p>{data.RecordTime}</p>
                            </div>
                          </div>

                          <Link to={`updateRecord/${data.id}`} className="card-item-update" >
                            <EditIcon />
                          </Link>
                        </div>
                      </div>
                    </Col>
                  );
                })}
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
              <TableCustom
                dataSource={dataFull.map((data: RecordType) => {
                  return {
                    key: data.id,
                    RecordName: data.RecordName,
                    ISRCId: data.ISRCId,
                    RecordTime: data.RecordTime,
                    Singer: data.Singer,
                    Composer: data.Composer,
                    Genre: data.Genre,
                    Format: data.Format,
                    ExpiryDate: {
                      status: data.status,
                      date: data.ExpiryDate,
                    },
                    update: "Cập nhật",
                    listen: "Nghe",
                    RecordLink: data.RecordLink,
                  };
                })}
                columns={columns}
                pagination={true}
                rowSelection={false}
              />
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
