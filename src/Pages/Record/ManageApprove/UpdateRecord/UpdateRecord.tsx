import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadRecord } from "../../../../redux/actions/recordActions";
import { Link, useParams, useNavigate } from "react-router-dom";
import { RecordType } from "../../../../Types/RecordType";
import { ArrowRight } from "../../../../assets/svg/ArrowRight";
import { DeleteRecordIcon } from "../../../../assets/svg/DeleteRecordIcon";
import { UpdateImageRecord } from "../../../../assets/svg/UpdateImageRecord";
import { MusicIcon } from "../../../../assets/svg/MusicIcon";
import { GenreType } from "../../../../Types/GenreType";
import { RequiredIcon } from "../../../../assets/svg/RequiredIcon";
import "./UpdateRecord.css";
import { Select } from "antd";
const UpdateRecord = () => {
  const params = useParams();
  const navigate = useNavigate();
  const recordData = useSelector((state: any) => state.recordsData.recordsData);

  const currentRecord = recordData.find(
    (record: RecordType) => record.id === params.RecordId
  );
  const dataGenres = useSelector((state: any) => state.genresData.genresData);

  const [data, setData] = useState({
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
  });
  useEffect(() => {
    if (currentRecord) {
      setData(currentRecord);
    }
  }, [currentRecord, params.RecordId]);

  const onChangeSelect = (value: string) => {
    console.log(value);
  };

  return (
    <div className="update-record-wrapper">
      <div className="update-record-header">
        <Link to={"/record"} className="update-record-link">
          Kho bản ghi
        </Link>
        <div>
          <ArrowRight />
        </div>
        <p>Cập nhật thông tin</p>
      </div>
      <h1>Bản ghi - Mất em</h1>
      <div className="update-record-body">
        <div className="update-record-col-left">
          <div className="update-record-col-disable">
            <div className="update-record-col-top">
              <h4>Thông tin bản ghi</h4>
              <div className="record-image-wrapper">
                <div className="record-image-icon">
                  <UpdateImageRecord />
                </div>
              </div>
              <div className="record-file-wrapper">
                <div>
                  <MusicIcon />
                </div>
                <p>Matem.mp3</p>
              </div>
              <div className="record-infomation">
                <div className="record-info-item">
                  <p>Ngày thêm:</p>
                  <p>07/04/2021 - 17:45:30</p>
                </div>
                <div className="record-info-item">
                  <p>Người tải lên:</p>
                  <p>Super Admin</p>
                </div>
                <div className="record-info-item">
                  <p>Người duyệt:</p>
                  <p>
                    Hệ thống <br />
                    (Tự động phê duyệt)
                  </p>
                </div>
                <div className="record-info-item">
                  <p>Ngày phê duyệt:</p>
                  <p>07/04/2021 - 17:45:50</p>
                </div>
              </div>
            </div>
            <div className="update-record-col-bottom">
              <h4>Thông tin ủy quyền</h4>
              <div className="record-infomation">
                <div className="record-info-item">
                  <p>Số hợp đồng:</p>
                  <p>BH123</p>
                </div>
                <div className="record-info-item">
                  <p>Ngày nhận ủy quyền:</p>
                  <p>01/05/2021</p>
                </div>
                <div className="record-info-item">
                  <p>Ngày hết hạn:</p>
                  <p>01/05/2021</p>
                </div>
                <div className="record-info-item">
                  <p>Trạng thái:</p>
                  <p>Còn thời hạn</p>
                </div>
              </div>
            </div>
          </div>
          <div className="update-record-col-form">
            <h4>Chỉnh sửa thông tin</h4>

            <div className="update-record-form-item">
              <p>
                Tên bản ghi:{" "}
                <span>
                  <RequiredIcon />
                </span>
              </p>
              <input type="text" />
            </div>
            <div className="update-record-form-item">
              <p>Mã ISRC: <span>
                  <RequiredIcon />
                </span></p>
              <input type="text" />
            </div>
            <div className="update-record-form-item">
              <p>Ca sĩ: <span>
                  <RequiredIcon />
                </span></p>
              <input type="text" />
            </div>
            <div className="update-record-form-item">
              <p>Tác giả: <span>
                  <RequiredIcon />
                </span></p>
              <input type="text" />
            </div>
            <div className="update-record-form-item">
              <p>Nhà sản xuất:</p>
              <input type="text" />
            </div>
            <div className="update-record-form-item">
              <p>Thể loại: <span>
                  <RequiredIcon />
                </span></p>
              <Select
                options={dataGenres.map((genre: GenreType) => {
                  return {
                    label: genre.nameGenre,
                    value: genre.nameGenre,
                  };
                })}
                style={{ width: "100%" }}
                defaultValue="Vui lòng chọn"
                onChange={onChangeSelect}
                className="update-record-select"
              />
            </div>
          </div>
        </div>
        <div className="update-record-col-right">
          <DeleteRecordIcon />
          <p>Xóa bản ghi</p>
        </div>
      </div>
      <div className="update-record-button-wrapper">
        <button
          onClick={() => {
            navigate("/record");
          }}
        >
          Hủy
        </button>
        <button>Lưu</button>
      </div>
    </div>
  );
};

export default UpdateRecord;
