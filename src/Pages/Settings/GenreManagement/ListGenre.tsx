import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ApprovalIcon } from "../../../assets/svg/ApprovalIcon";
import { ArrowRight } from "../../../assets/svg/ArrowRight";
import { Table, Pagination } from "antd";
import "./ListGenre.css";
import { Link } from "react-router-dom";

const ListGenre = () => {
  const genresData = useSelector((state: any) => state.genresData.genresData);

  const [dataFull, setDataFull] = useState([
    {
      key: 1,
      nameGenre: "",
      description: "",
    },
  ]);

  const dataSource = [
    {
      key: "1",
      nameGenre: "Pop",
      description:
        "Nhạc pop là một thể loại của nhạc đương đại và rất phổ biến trong làng nhạc đại chúng.",
    },
    {
      key: "2",
      nameGenre: "Bolero",
      description:
        "Quay về với một thời hoa bướm đầy mơ mộng khi nghe các tuyệt phẩm nhạc bolero trữ tình này.",
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      render: (key: string, dataSource: any, index: number) => {
        ++index;
        return index;
      },
    },
    {
      title: "Tên thể loại",
      dataIndex: "nameGenre",
      key: "nameGenre",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
  ];
  useEffect(() => {
    setDataFull(genresData);
  }, [genresData]);

  return (
    <div className="genre-management-wrapper">
      <div className="genre-management-header">
        <p>Trang chủ</p>
        <div>
          <ArrowRight />
        </div>
        <p>Cài đặt hệ thống</p>
      </div>
      <h1>Thông tin tác phẩm</h1>
      <h4>Thể loại tác phẩm</h4>
      <div className="genre-management-body">
        <div className="genre-col-left">
          <Table dataSource={dataFull} columns={columns} pagination={false} />
          <div className="pagination-genre">
            <div className="pagination-input-wrapper">
              <p>Hiển thị </p>
              <input type="number" defaultValue={13} />
              <p>hàng trong mỗi trang</p>
            </div>
            <Pagination total={20} />
          </div>
        </div>
        <Link to={"UpdateGenre"} className="genre-col-right">
          <div>
            <ApprovalIcon />
          </div>
          <p>Chỉnh sửa</p>
        </Link>
      </div>
    </div>
  );
};

export default ListGenre;
