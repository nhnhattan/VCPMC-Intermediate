import { Col, Row } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loadRoles } from "../../../../redux/actions/roleActions";
// Firebase
import { db } from "../../../../firebase";
import { addDoc, collection } from "firebase/firestore";

// SVG
import { ArrowRight } from "../../../../assets/svg/ArrowRight";

// Antd
import { Table } from "antd";
import "./AddRole.css";

const AddRole = () => {
  const roleDoc = collection(db, "roles");
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  // Data Table
  const columns = [
    {
      title: "Chức năng",
      dataIndex: "func",
    },
    {
      title: "Mã chức năng",
      dataIndex: "funcID",
    },
  ];

  const data = [
    {
      key: "1",
      func: "Phân quyền người dùng",
      funcID: "nguoidung_phanquyen",
    },
    {
      key: "2",
      func: "Tạo người dùng",
      funcID: "nguoidung_tao",
    },
    {
      key: "3",
      func: "Cập nhật thông tin người dùng",
      funcID: "nguoidung_capnhat",
    },
    {
      key: "4",
      func: "Xóa người dùng",
      funcID: "nguoidung_xoa",
    },
    {
      key: "5",
      func: "Xem thông tin chi tiết",
      funcID: "nguoidung_xemchitiet",
    },
    {
      key: "6",
      func: "Danh sách Media",
      funcID: "nguoidung_xemdanhsach",
    },
    {
      key: "7",
      func: "Tải lên Media",
      funcID: "nguoidung_tailentep",
    },
    {
      key: "8",
      func: "Chỉnh sửa thông tin Media",
      funcID: "nguoidung_chinhsua",
    },
    {
      key: "9",
      func: "Xóa Media",
      funcID: "nguoidung_xoa",
    },
    {
      key: "10",
      func: "Phê duyệt Media",
      funcID: "nguoidung_pheduyet",
    },
  ];

  const nameRoleRef = useRef<HTMLInputElement>(null);
  const descriptionRoleRef = useRef<HTMLTextAreaElement>(null);
  let arrayFunc: any = [];
  let rowKeyArray: any = [];

  const rowSelection: any = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      arrayFunc = [];
      selectedRows.map((row: any) => {
        arrayFunc.push(row.func);
      });
      rowKeyArray = selectedRowKeys;
    },
  };

  let role: string;

  let userManage = {
    nguoidung_phanquyen: false,
    nguoidung_tao: false,
    nguoidung_capnhat: false,
    nguoidung_xoa: false,
    nguoidung_xemchitiet: false,
  };

  let libraryManage = {
    nguoidung_xemdanhsach: false,
    nguoidung_tailentep: false,
    nguoidung_chinhsua: false,
    nguoidung_xoa: false,
    nguoidung_pheduyet: false,
  };

  const handleChecked = () => {
    userManage = {
      nguoidung_phanquyen: false,
      nguoidung_tao: false,
      nguoidung_capnhat: false,
      nguoidung_xoa: false,
      nguoidung_xemchitiet: false,
    };

    libraryManage = {
      nguoidung_xemdanhsach: false,
      nguoidung_tailentep: false,
      nguoidung_chinhsua: false,
      nguoidung_xoa: false,
      nguoidung_pheduyet: false,
    };

    arrayFunc.map((func: string) => {
      switch (func) {
        case "Phân quyền người dùng":
          return (userManage.nguoidung_phanquyen = true);
          break;
        case "Tạo người dùng":
          return (userManage.nguoidung_tao = true);
          break;
        case "Cập nhật thông tin người dùng":
          return (userManage.nguoidung_capnhat = true);
          break;
        case "Xóa người dùng":
          return (userManage.nguoidung_xoa = true);
          break;
        case "Xem thông tin chi tiết":
          return (userManage.nguoidung_xemchitiet = true);
          break;
        case "Danh sách Media":
          return (libraryManage.nguoidung_xemdanhsach = true);
          break;
        case "Tải lên Media":
          return (libraryManage.nguoidung_tailentep = true);
          break;
        case "Chỉnh sửa thông tin Media":
          return (libraryManage.nguoidung_chinhsua = true);
          break;
        case "Xóa Media":
          return (libraryManage.nguoidung_xoa = true);
          break;
        case "Phê duyệt Media":
          return (libraryManage.nguoidung_pheduyet = true);
          break;
      }
    });
    if (arrayFunc.length <= 4) {
      role = "Lisences";
    } else if (arrayFunc.length > 4 && arrayFunc.length <= 8) {
      role = "Super Admin";
    } else if (arrayFunc.length > 8) {
      role = "System Admin";
    } else {
      role = "";
    }
  };

  const handleAddRole = async () => {
    try {
      await handleChecked();
      await addDoc(roleDoc, {
        key: 1,
        nameRole: nameRoleRef.current?.value,
        description: descriptionRoleRef.current?.value,
        role: role,
        userManage: userManage,
        libraryManage: libraryManage,
        rowkey: rowKeyArray,
      }).then(()=> {
        dispatch(loadRoles)
      })
      .then(() => {
        toast.success("Tạo vai trò thành công!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/users-management")
      });
    } catch (err) {
      console.log(err);
      alert("That bai");
    }
  };

  return (
    <div className="add-role-wrapper">
      <div className="add-role-location-wrapper">
        <p>Cài đặt</p>
        <div className="right-arrow-icon">
          <ArrowRight />
        </div>
        <p>
          <Link to="/users-management" className="add-role-content-link">
            Phân quyền người dùng
          </Link>
        </p>
        <div className="right-arrow-icon">
          <ArrowRight />
        </div>
        <p>Cập nhật</p>
      </div>
      <p className="add-role-header-content">Cập nhật vai trò người dùng</p>
      <div className="add-role-form-wrapper">
        <div className="add-role-col-left">
          <div className="input-wrapper">
            <p>Tên vai trò:</p>
            <input type="text" ref={nameRoleRef} />
          </div>
          <div className="input-wrapper">
            <p>Mô tả:</p>
            <textarea ref={descriptionRoleRef} />
          </div>
        </div>
        <div className="add-role-col-right">
          <p>Phân quyền chức năng:</p>

          <div className="table-add-role-wrapper">
            <div className="table-role-col-left">
              <p>Tên nhóm chức năng</p>
              <div className="table-role-grouped table-group-row-1">
                <p>Quản lý người dùng</p>
              </div>
              <div className="table-role-grouped">
                <p>Quản lý thư viện</p>
              </div>
            </div>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              pagination={false}
              style={{ width: "750px" }}
            />
          </div>
        </div>
      </div>
      <div className="button-add-role-wrapper">
        <button
          className="btn-cancel"
          onClick={() => {
            navigate("/users-management");
          }}
        >
          Hủy
        </button>
        <button className="btn-add-role" onClick={handleAddRole}>
          Lưu
        </button>
      </div>
    </div>
  );
};

export default AddRole;
