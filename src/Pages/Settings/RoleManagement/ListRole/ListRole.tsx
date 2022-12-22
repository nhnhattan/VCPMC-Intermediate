import React, { useState, useEffect } from "react";

import { db } from "../../../../firebase";
import { deleteDoc, doc } from "firebase/firestore";

// Redux

import { Link } from "react-router-dom";
import { RoleType } from "../../../../Types/RoleType";
import TableCustom from "../../../../components/TableCustom/TableCustom";
import { Popconfirm } from "antd";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { loadRoles } from "../../../../redux/actions/roleActions";

import { toast } from "react-toastify";

import "./ListRole.css";

const ListRole = () => {
  const data = useSelector((state: any) => state.roles.roleData);
  const dispatch: any = useDispatch();

  const [roleData, setRoleData] = useState<RoleType[] | []>([]);

  const onConfirmDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "roles", id))
        .then(() => {
          toast.success("Xóa tài khoản thành công!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .then(() => {
          dispatch(loadRoles);
        });
    } catch (err) {}
  };

  useEffect(() => {
    var arr = data.map((role: RoleType) => {
      return {
        ...role,
        key: role.id,
      };
    });
    setRoleData(arr);
  }, [data]);

  const columnsRoles = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (key: string, roleData: RoleType, index: number) => {
        ++index;
        return index;
      },
    },
    {
      title: "Tên nhóm người dùng",
      dataIndex: "nameRole",
      key: "nameRole",
    },
    {
      title: "Số lượng người dùng",
      dataIndex: "lengthRole",
      key: "lengthRole",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
    },

    {
      title: "Mô tả",
      dataIndex: "description",
      render: (description: string) => {
        return (
          <>
            <div className="role-description">{description}</div>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "update",
      render: (key: string, index: RoleType) => {
        return (
          <>
            <Link
              to={`updateRole/${index.id}`}
              className="role-update-link-table"
            >
              Cập nhật
            </Link>
          </>
        );
      },
    },
    {
      title: "",
      dataIndex: "update",
      render: (key: string, roleData: RoleType) => {
        return (
          <>
            <Popconfirm
              title="Bạn chắc chắn muốn xóa vai trò này?"
              onConfirm={() => {
                onConfirmDelete(roleData.id);
              }}
              okText="Xóa"
              cancelText="Hủy"
            >
              <p className="role-remove-item">Xóa</p>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  return (
    <div>
      <TableCustom
        dataSource={data}
        columns={columnsRoles}
        pagination={false}
        rowSelection={false}
      />
    </div>
  );
};

export default ListRole;
