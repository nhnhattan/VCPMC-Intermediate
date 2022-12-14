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
      title: "T??n b???n ghi",
      dataIndex: "RecordName",
      key: "RecordName",
    },
    {
      title: "M?? ISRC",
      dataIndex: "ISRCId",
      key: "ISRCId",
    },
    {
      title: "Th???i l?????ng",
      dataIndex: "RecordTime",
      key: "RecordTime",
    },
    {
      title: "Ca s??",
      dataIndex: "Singer",
      key: "Singer",
    },
    {
      title: "T??c gi???",
      dataIndex: "Composer",
      key: "Composer",
    },
    {
      title: "Th??? lo???i",
      dataIndex: "Genre",
      key: "Genre",
    },
    {
      title: "?????nh d???ng",
      dataIndex: "Format",
      key: "Format",
    },
    {
      title: "Th???i h???n s??? d???ng",
      dataIndex: "ExpiryDate",
      render: (ExpiryDate: ExpiryDateProps) => {
        return ExpiryDate.status ? (
          <div className="expiry-date-wrapper">
            <div className="expiry-status">
              <GoPrimitiveDot className="dot-icon-active" />
              C??n th???i h???n
            </div>
            <div className="expiry-date-label">{ExpiryDate.date}</div>
          </div>
        ) : (
          <div className="expiry-date-wrapper">
            <div className="expiry-status">
              <GoPrimitiveDot className="dot-icon-not-active" />
              ???? h???t h???n
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
              C???p nh???t
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

      <p className="heading-text">Kho b???n ghi</p>
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="T??n b???n ghi, ca s??,..."
        />
        <div className="search-icon">
          <SearchIcon />
        </div>
      </div>
      <Row>
        <Col flex="auto" className="record-left-col">
          <div className="record-select-bar">
            <div className="select-wrap">
              <p>Th??? lo???i:</p>
              <Select
                options={[
                  {
                    value: "all",
                    label: "T???t c???",
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
                defaultValue="T???t c???"
              ></Select>
            </div>
            <div className="select-wrap">
              <p>?????nh d???ng:</p>
              <Select
                options={[
                  {
                    value: "all",
                    label: "T???t c???",
                  },
                  {
                    value: "audio",
                    label: "??m thanh",
                  },
                  {
                    value: "video",
                    label: "Video",
                  },
                ]}
                style={{ width: 130 }}
                defaultValue="T???t c???"
              ></Select>
            </div>
            <div className="select-wrap">
              <p>Th???i h???n s??? d???ng:</p>

              <Select
                options={[
                  {
                    value: "all",
                    label: "T???t c???",
                  },
                  {
                    value: "current",
                    label: "C??n th???i h???n",
                  },
                  {
                    value: "outdate",
                    label: "H???t h???n",
                  },
                ]}
                style={{ width: 131 }}
                defaultValue="T???t c???"
              ></Select>
            </div>
            <div className="select-wrap">
              <p>Tr???ng th??i:</p>
              <Select
                options={[
                  {
                    value: "all",
                    label: "T???t c???",
                  },
                  {
                    value: "by-user",
                    label: "Duy???t b???i ng?????i d??ng",
                  },
                  {
                    value: "by-auto",
                    label: "Duy???t t??? ?????ng",
                  },
                ]}
                style={{ width: 200 }}
                defaultValue="T???t c???"
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
                            Ca s??: <span>{data.Singer}</span>
                          </p>
                          <p>
                            S??ng t??c: <span>{data.Producer}</span>
                          </p>
                          <p>
                            S??? h???p ?????ng: <span></span>
                          </p>
                        </div>
                        <div className="card-item-footer">
                          <div className="card-item-properties-wrapper">
                            <div className="card-item-properties">
                              <p>Th??? lo???i</p>
                              <p>{data.Genre}</p>
                            </div>
                            <div className="card-item-properties">
                              <p>?????nh d???ng</p>
                              <p>{data.Format}</p>
                            </div>
                            <div className="card-item-properties">
                              <p>Th???i l?????ng</p>
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
                  <p>Hi???n th??? </p>
                  <input type="number" defaultValue={13} />
                  <p>h??ng trong m???i trang</p>
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
                    update: "C???p nh???t",
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
              Qu???n l?? <br /> ph?? duy???t
            </p>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Record;
