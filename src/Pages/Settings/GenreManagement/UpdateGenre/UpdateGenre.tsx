import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGenres } from "../../../../redux/actions/genresActions";
import { db } from "../../../../firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "../../../../assets/svg/ArrowRight";
import { AddTypeContract } from "../../../../assets/svg/AddTypeContract";
import { Table, Pagination } from "antd";
import "./UpdateGenre.css";
import { toast } from "react-toastify";
import { GenreType } from "../../../../Types/GenreType";
const UpdateGenre = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const genresData = useSelector((state: any) => state.genresData.genresData);

  const [itemClick, setItemClick] = useState(1);
  const [buttonDisable, setButtonDisable] = useState(true);
  const [dataFull, setDataFull] = useState([
    {
      key: 1,
      nameGenre: "Pop",
      description:
        "Nhạc pop là một thể loại của nhạc đương đại và rất phổ biến trong làng nhạc đại chúng.",
    },
  ]);

  const dataSource = [
    {
      key: 1,
      nameGenre: "Pop",
      description:
        "Nhạc pop là một thể loại của nhạc đương đại và rất phổ biến trong làng nhạc đại chúng.",
    },
    {
      key: 2,
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
        return (
          <p
            onClick={() => {
              setItemClick(dataSource.key);
            }}
          >
            {index}
          </p>
        );
      },
    },
    {
      title: "Tên thể loại",
      dataIndex: "nameGenre",
      render: (key: string, dataSource: any, index: number) => {
        return itemClick === dataSource.key ? (
          <input
            type={"text"}
            defaultValue={dataSource.nameGenre}
            className="input-genre-table-1"
            onChange={(e: any) => {
              dataFull.map((data: any) => {
                if (data.key === dataSource.key) {
                  data.nameGenre = e.target.value;
                }
              });
            }}
          />
        ) : (
          <p
            onClick={() => {
              setItemClick(dataSource.key);
            }}
            style={{ cursor: "text" }}
          >
            {dataSource.nameGenre}
          </p>
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      render: (key: string, dataSource: any, index: number) => {
        return itemClick === dataSource.key ? (
          <input
            type={"text"}
            defaultValue={dataSource.description}
            className="input-genre-table-2"
            onChange={(e: any) => {
              dataFull.map((data: any) => {
                if (data.key === dataSource.key) {
                  data.description = e.target.value;
                }
              });
            }}
          />
        ) : (
          <p
            onClick={() => {
              setItemClick(dataSource.key);
            }}
            style={{ cursor: "text" }}
          >
            {dataSource.description}
          </p>
        );
      },
    },
  ];
  const [numRow, setNumRow] = useState(0);
  let datakey: any = [];
  if (genresData) {
    genresData.map((genre: GenreType) => {
      datakey.push(genre.key);
    });
  }
  useEffect(() => {
    setDataFull(genresData);
    setNumRow(genresData.length);
  }, [genresData]);

  const handleAddRow = () => {
    let dataSource = dataFull;
    dataSource = [
      ...dataSource,
      {
        key: Number(numRow + 1),
        nameGenre: "Nhập thể loại",
        description: "Nhập mô tả",
      },
    ];
    setDataFull(dataSource);
    setNumRow(numRow + 1);
    setItemClick(numRow + 1);
    setButtonDisable(false);
  };

  const handleUpdate = async () => {
    try {
      dataFull.map((data: any) => {
        if (datakey.includes(data.key)) {
          updateDoc(doc(db, "genres", data.id), {
            key: data.key,
            nameGenre: data.nameGenre,
            description: data.description,
          });
        } else {
          addDoc(collection(db, "genres"), {
            key: Number(data.key),
            nameGenre: data.nameGenre,
            description: data.description,
          });
        }
      });
      dispatch(loadGenres);
      setButtonDisable(true)
      navigate("/GenreManagement");
      toast.success("Thêm thành công!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setItemClick(0);
    } catch (err) {}
  };
  return (
    <div className="genre-management-wrapper">
      <div className="genre-management-header">
        <p>Cài đặt hệ thống</p>

        <div>
          <ArrowRight />
        </div>
        <p>Chỉnh sửa thông tin</p>
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
            <Pagination total={50} />
          </div>
        </div>
        {buttonDisable ? (
          <div className="genre-col-right" onClick={handleAddRow}>
            <div>
              <AddTypeContract />
            </div>
            <p>Thêm mới</p>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="button-genre-add-wrapper">
        <button
          onClick={() => {
            navigate("/GenreManagement");
          }}
        >
          Hủy
        </button>
        <button onClick={handleUpdate}>Lưu</button>
      </div>
    </div>
  );
};

export default UpdateGenre;
