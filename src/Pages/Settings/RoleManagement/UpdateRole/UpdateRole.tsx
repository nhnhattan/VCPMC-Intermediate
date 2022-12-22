import React, { useState, useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { db } from "../../../../firebase";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";

import { Table } from "antd";
import Loading from "../../../../components/Loading/Loading";
import { ArrowRight } from "../../../../assets/svg/ArrowRight";

import { useSelector, useDispatch } from "react-redux";
import { loadRoles } from "../../../../redux/actions/roleActions";

import "./UpdateRole.css";

import { RoleType } from "../../../../Types/RoleType";

const UpdateRole = () => {
  // Table
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

  const params = useParams();
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const dataRole = useSelector((state: any) => state.roles.roleData);

  const nameRoleRef = useRef<HTMLInputElement>(null);
  const descriptionRoleRef = useRef<HTMLTextAreaElement>(null);

  const currentRole: RoleType = dataRole.find(
    (role: RoleType) => params.roleID === role.id
  );

  const [dataSuccess, setDataSuccess] = useState<RoleType>();

  let role: string;

  const [rowKeys, setRowKeys] = useState([]);

  useEffect(() => {
    if (currentRole) {
      setRowKeys(currentRole.rowkey);
      setDataSuccess(currentRole);
    }
  }, [currentRole]);

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

    rowKeys.map((func: string) => {
      switch (func) {
        case "1":
          return (userManage.nguoidung_phanquyen = true);
          break;
        case "2":
          return (userManage.nguoidung_tao = true);
          break;
        case "3":
          return (userManage.nguoidung_capnhat = true);
          break;
        case "4":
          return (userManage.nguoidung_xoa = true);
          break;
        case "5":
          return (userManage.nguoidung_xemchitiet = true);
          break;
        case "6":
          return (libraryManage.nguoidung_xemdanhsach = true);
          break;
        case "7":
          return (libraryManage.nguoidung_tailentep = true);
          break;
        case "8":
          return (libraryManage.nguoidung_chinhsua = true);
          break;
        case "9":
          return (libraryManage.nguoidung_xoa = true);
          break;
        case "10":
          return (libraryManage.nguoidung_pheduyet = true);
          break;
      }
    });
    if (rowKeys.length <= 4) {
      role = "Lisences";
    } else if (rowKeys.length > 4 && rowKeys.length <= 8) {
      role = "Super Admin";
    } else if (rowKeys.length > 8) {
      role = "System Admin";
    } else {
      role = "";
    }
  };

  const rowSelectionUpdate: any = {
    selectedRowKeys: rowKeys,
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      setRowKeys(selectedRowKeys);
    },
  };

  const handleUpdateRole = async () => {
    try {
      await handleChecked();
      await updateDoc(doc(db, "roles", currentRole.id), {
        nameRole: nameRoleRef.current?.value,
        description: descriptionRoleRef.current?.value,
        userManage: userManage,
        libraryManage: libraryManage,
        rowkey: rowKeys,
      }).then(() => {
        dispatch(loadRoles);
        toast.success("Cập nhật vai trò thành công!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/users-management");
      });
    } catch (err) {
      toast.error("Cập nhật vai trò thất bại!", {
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
      {currentRole ? (
        <div className="update-role-wrapper">
          <div className="update-role-header">
            <p>Cài đặt</p>
            <div>
              <ArrowRight />
            </div>
            <Link to={"/users-management"} className="update-role-link">
              Phân quyền người dùng
            </Link>
            <div>
              <ArrowRight />
            </div>
            <p>Cập nhật</p>
          </div>
          <h1>Cập nhật vai trò người dùng</h1>
          <div className="update-role-body-wrapper">
            <div className="update-role-col-left">
              <div className="input-wrapper">
                <p>Tên vai trò:</p>
                <input
                  type="text"
                  ref={nameRoleRef}
                  defaultValue={dataSuccess?.nameRole}
                />
              </div>
              <div className="input-wrapper">
                <p>Mô tả:</p>
                <textarea
                  ref={descriptionRoleRef}
                  defaultValue={dataSuccess?.description}
                />
              </div>
            </div>
            <div className="update-role-col-right">
              <p>Phân quyền chức năng:</p>

              <div className="table-update-role-wrapper">
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
                  rowSelection={rowSelectionUpdate}
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
            <button className="btn-add-role" onClick={handleUpdateRole}>
              Lưu
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UpdateRole;
