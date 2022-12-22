import React, { useState, useEffect } from "react";

// Firebase
import { db } from "../../../../firebase";
import { doc, updateDoc } from "firebase/firestore";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { loadUsers } from "../../../../redux/actions/userActions";

import { useNavigate, Navigate, NavLink, Link } from "react-router-dom";

// SVG
import { ArrowRight } from "../../../../assets/svg/ArrowRight";
import { AddUserIcon } from "../../../../assets/svg/AddUserIcon";
import { SearchIcon } from "../../../../assets/svg/SearchIcon";
import { AddRoleIcon } from "../../../../assets/svg/AddRoleIcon";

// Components
import TableCustom from "../../../../components/TableCustom/TableCustom";
import ListRole from "../../RoleManagement/ListRole/ListRole";

//toastify
import { toast } from "react-toastify";

import "./ListUser.css";
import { Switch, Popconfirm } from "antd";
import { UserType } from "../../../../Types/UserType";
const ListUser = () => {
  const userDatas = useSelector((state: any) => state.users.users);
  const [data, setData] = useState<UserType[] | []>([]);
  const [status, setStatus]: any = useState("");

  const dispatch = useDispatch<any>();

  useEffect(() => {
    var arr = userDatas.map((user: UserType) => {
      return {
        ...user,
        key: user.id,
      };
    });
    setData(arr);
  }, [userDatas]);

  const handleChange = async (id: string, checked: boolean) => {
    try {
      const docRef = doc(db, "users", id);
      await updateDoc(docRef, {
        userstatus: checked,
      }).then(() => {
        const notify = () =>
          toast("🦄 Wow so easy!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        notify();
        dispatch(loadUsers);
      });
    } catch (e) {
      const notify = () =>
        toast.error("🦄 Wow so easy!", {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      notify();
      console.log(e);
    }
  };

  const columnsUsers = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (key: UserType, roleData: UserType, index: number) => {
        ++index;
        return index;
      },
    },
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Trạng thái",
      dataIndex: "userstatus",
      render: (
        dataUserSource: UserType,
        index: UserType,
        userstatus: boolean
      ) => {
        return index.userstatus ? (
          <div className="user-status-wrapper">
            <Switch
              checked={index.userstatus}
              onChange={(checked) => {
                handleChange(index.id, checked);
              }}
            />
            <p>Đang kích hoạt</p>
          </div>
        ) : (
          <div className="user-status-wrapper">
            <Switch
              checked={index.userstatus}
              onChange={(checked) => {
                handleChange(index.id, checked);
              }}
            />
            <p>Ngừng kích hoạt</p>
          </div>
        );
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Ngày hết hạn",
      dataIndex: "timeOut",
      key: "timeOut",
    },
    {
      title: "",
      dataIndex: "update",
      render: (dataUserSource: UserType, index: UserType) => {
        return (
          <>
            <Link to={`updateUser/${index.id}`} className="user-update-link-table">
              Cập nhật
            </Link>
          </>
        );
      },
    },
  ];

  const login = localStorage.getItem("login");
  const navigate = useNavigate();

  const [tabUserOpen, setTabUserOpen] = useState(true);

  return (
    <>
      <div className="user-management-wrapper">
        <div className="user-header">
          <p>Cài đặt</p>{" "}
          <div className="right-arrow-icon">
            <ArrowRight />
          </div>
          <p>Phân quyền người dùng</p>
        </div>
        <p className="header-content">
          {tabUserOpen
            ? `Danh sách người dùng`
            : `Vai trò người dùng trên hệ thống`}
        </p>

        <div className="user-table-wrapper">
          <div className="col-left">
            <div className="user-management-bar-wrapper">
              <div className="switch-wrapper">
                <div
                  className={
                    tabUserOpen ? `switch-item-box active` : `switch-item-box`
                  }
                  onClick={() => {
                    setTabUserOpen(true);
                  }}
                >
                  <p>Danh sách người dùng</p>
                </div>
                <div
                  className={
                    tabUserOpen ? `switch-item-box` : `switch-item-box active`
                  }
                  onClick={() => {
                    setTabUserOpen(false);
                  }}
                >
                  <p>Vai trò người dùng</p>
                </div>
              </div>
              <div className="user-search-box">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Nhập tên người dùng"
                />
                <div className="search-icon">
                  <SearchIcon />
                </div>
              </div>
            </div>
            {tabUserOpen ? (
              <TableCustom
                dataSource={data}
                columns={columnsUsers}
                pagination={true}
                rowSelection={false}
              />
            ) : (
              <ListRole />
            )}
          </div>
          <div className="col-right">
            {tabUserOpen ? (
              <Link to={"AddUser"} className="user-management-add-user">
                <div>
                  <AddUserIcon />
                </div>
                <p>Thêm người dùng</p>
              </Link>
            ) : (
              <Link to={"AddRole"} className="user-management-add-user">
                <div>
                  <AddRoleIcon />
                </div>
                <p>Thêm vai trò</p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListUser;
