import React, { useEffect, useState, useRef } from "react";
import { Row, Col, Select, Table, Empty, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { loadRecord } from "../../../redux/actions/recordActions";

// SVG
import { ArrowRight } from "../../../assets/svg/ArrowRight";
import { SearchIcon } from "../../../assets/svg/SearchIcon";
import { ActionDenyIcon } from "../../../assets/svg/ActionDenyIcon";
import { ActionApplyIcon } from "../../../assets/svg/ActionApplyIcon";
import { ApprovalIcon } from "../../../assets/svg/ApprovalIcon";

// Elements
import TableCustom from "../../../components/TableCustom/TableCustom";

import { Link, useNavigate } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";

import { RecordType } from "../../../Types/RecordType";
import "./ManageApprove.css";
import "./EmptyCustom.css";
import { toast } from "react-toastify";
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

type ExpiryDateProps = {
  status: string;
  date: string;
  outDate: boolean;
};

const ManageApprove = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const reasonRef = useRef<HTMLTextAreaElement>(null);

  const d = new Date();
  let date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();

  let recordData = useSelector((state: any) => state.recordsData.recordsData);
  useEffect(() => {
    dispatch(loadRecord);
  }, [recordData]);
  const [rowSelect, setRowSelect] = useState([""]);
  const filterByID = (item: any) => {
    if (!item.approveStatus) {
      return true;
    }
    return false;
  };

  recordData = recordData.filter(filterByID);

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
      setRowSelect(selectedRows);
    },
  };

  const handleApply = async () => {
    try {
      console.log(rowSelect);
      if (rowSelect === null) {
        toast.error("Chọn bài hát để phê duyệt", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        rowSelect.map((data: any) => {
          updateDoc(doc(db, "records", data.key), {
            approveStatus: true,
            dateApprove: date,
          });
        });
        dispatch(loadRecord);
        setTimeout(() => {
          navigate("/record");
        }, 1000);
        toast.success("Phê duyệt thành công!", {
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
    } catch (err) {
      console.log(err);
      toast.error("Phê duyệt thất bại!", {
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

  const handleDeny = async () => {
    try {
      rowSelect.map((data: any) => {
        addDoc(collection(db, "denyreason"), {
          content: reasonRef.current?.value,
          date: date,
          RecordName: data.RecordName,
          RecordLink: data.RecordLink
        })
        deleteDoc(doc(db, "records", data.key));
      });
      dispatch(loadRecord);
      setModal(false)
      toast.success("Từ chối thành công!", {
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
      toast.error("Từ chối thất bại!", {
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
  const [modal, setModal] = useState(false);
  const handleCancel = () => {
    setModal(false);
  };
  return (
    <div className="manage-approve-wrapper">
      <Modal
        title="Basic Modal"
        open={modal}
        onCancel={handleCancel}
        width={719}
        centered={true}
      >
        <div className="modal-deny-wrapper">
          <p>Lý do từ chối phê duyệt</p>
          <textarea ref={reasonRef} placeholder="Cho chúng tôi biết lý do bạn muốn từ chối phê duyệt bản ghi này..."></textarea>
          <div className="button-modal-wrapper">
            <button onClick={handleCancel}>Hủy</button>
            <button onClick={handleDeny}>Từ chối</button>
          </div>
        </div>
      </Modal>
      <div className="manage-approve-header">
        <Link to={"/record"} className="manage-record-link">
          Kho bản ghi
        </Link>
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
      <Row style={{ marginTop: 24 }}>
        <Col flex="auto" className="record-left-col">
          {recordData.length > 0 ? (
            <TableCustom
              dataSource={recordData.map((d: RecordType) => {
                return {
                  key: d.id,
                  RecordName: d.RecordName,
                  ISRCId: d.ISRCId,
                  RecordTime: d.RecordTime,
                  Singer: d.Singer,
                  Composer: d.Composer,
                  Genre: d.Genre,
                  Format: d.Format,
                  ExpiryDate: {
                    status: d.status,
                    date: d.ExpiryDate,
                  },
                  RecordLink: d.RecordLink,
                  update: "Cập nhật",
                  listen: "Nghe",
                };
              })}
              columns={columns}
              pagination={true}
              rowSelection={rowSelection}
            />
          ) : (
            <Empty
              style={{ marginTop: 48 }}
              description={<span>Không có bài hát nào cần phê duyệt</span>}
            />
          )}
        </Col>
        <Col>
          <div className="manage-approve-button-wrapper">
            <div className="manage-approve-button" onClick={handleApply}>
              <div className="approve-icon">
                <ActionApplyIcon />
              </div>
              <p>Phê duyệt</p>
            </div>
            <div
              className="manage-approve-button"
              onClick={() => {
                setModal(true);
              }}
            >
              <div className="approve-icon">
                <ActionDenyIcon />
              </div>
              <p>Từ chối</p>
            </div>
            <Link
              to={"/record/Manage-approve/add-record"}
              className="manage-approve-button"
            >
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
