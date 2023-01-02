import React, { useState } from "react";
import { db } from "../../../../firebase";
import { loadRecord } from "../../../../redux/actions/recordActions";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./AddRecord.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Select } from "antd";

import ReactPlayer from "react-player";
import { GenreType } from "../../../../Types/GenreType";
const AddRecord = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();

  const dataGenres = useSelector((state: any) => state.genresData.genresData);

  const RecordNameRef = useRef<HTMLInputElement>(null);
  const ISRCIdRef = useRef<HTMLInputElement>(null);
  const SingerRef = useRef<HTMLInputElement>(null);
  const ComposerRef = useRef<HTMLInputElement>(null);
  const ProducerRef = useRef<HTMLInputElement>(null);
  const [genre, setGenre] = useState("");
  const [format, setFormat] = useState("");
  const RecordTimeRef = useRef<HTMLInputElement>(null);
  const RecordLinkRef = useRef<HTMLInputElement>(null);
  const d = new Date();
  let date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();

  const usercurrentData = useSelector((state: any) => state.users.currentUser);
  function add_months(dt: any, n: number) {
    return new Date(dt.setMonth(dt.getMonth() + n));
  }
  const onChangeSelect = (value: string) => {
    setGenre(value);
  };

  const onChangeFormatSelect = (value: string) => {
    setFormat(value);
  };

  let dateAfter = add_months(d, 1);
  let dateOut =
    dateAfter.getDate() +
    "/" +
    (dateAfter.getMonth() + 1) +
    "/" +
    dateAfter.getFullYear();
  const handleAddRecord = async () => {
    try {
      const recordDoc = collection(db, "records");
      await addDoc(recordDoc, {
        RecordName: RecordNameRef.current?.value,
        ISRCId: ISRCIdRef.current?.value,
        Singer: SingerRef.current?.value,
        Composer: ComposerRef.current?.value,
        Producer: ProducerRef.current?.value,
        Genre: genre,
        Format: format,
        RecordTime: RecordTimeRef.current?.value,
        dateAdd: date,
        usernameAdd: usercurrentData.role,
        personApprove: "Hệ thống",
        dateApprove: "",
        RecordLink: RecordLinkRef.current?.value,
        status: true,
        approveStatus: false,
        ExpiryDate: dateOut,
        RecordImage:
          "https://yt3.ggpht.com/UfLp-kaMiWIc-EGV3hCJkxpoSMgVCJCt7ef1B0i8Bgp1QV3GYGQGksyBpAGkfQ6zYbvYhBy2Fcs=s900-c-k-c0x00ffffff-no-rj",
      })
        .then(() => {
          dispatch(loadRecord);
          navigate("/record/Manage-approve");
        })
        .then(() => {
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
        });
    } catch (e) {
      console.log(e);
      alert("That bai");
    }
  };
  return (
    <div className="add-record-wrapper">
      <div className="add-record-form-wrapper">
        <div className="add-record-col-left">
          <div className="input-wrapper">
            <p>Tên bản ghi</p>
            <input type="text" ref={RecordNameRef} />
          </div>
          <div className="input-wrapper">
            <p>Ca sĩ</p>
            <input type="text" ref={SingerRef} />
          </div>
          <div className="input-wrapper">
            <p>Mã ISRC:</p>
            <input type="text" ref={ISRCIdRef} />
          </div>
          <div className="input-wrapper">
            <p>Tác giả:</p>
            <input type="text" ref={ComposerRef} />
          </div>
          <div className="input-wrapper">
            <p>Nhà sản xuất:</p>
            <input type="text" ref={ProducerRef} />
          </div>
        </div>
        <div className="add-record-col-right">
          <div className="input-wrapper">
            <p>Thể loại:</p>
            <Select
              options={dataGenres.map((genre: GenreType) => {
                return {
                  label: genre.nameGenre,
                  value: genre.nameGenre,
                };
              })}
              style={{ width: 422 }}
              defaultValue="Vui lòng chọn"
              onChange={onChangeSelect}
              className="select-add-record-wrapper"
            />
          </div>
          <div className="input-wrapper">
            <p>Định dạng:</p>
            <Select
              options={[
                {
                  value: "audio",
                  label: "Âm thanh",
                },
                {
                  value: "video",
                  label: "Video",
                },
              ]}
              style={{ width: 422 }}
              defaultValue="Vui lòng chọn"
              onChange={onChangeFormatSelect}
              className="select-add-record-wrapper"
            />
          </div>
          <div className="input-wrapper">
            <p>Id Video Youtube</p>
            <input type="text" ref={RecordLinkRef} />
          </div>
          <div className="input-wrapper">
            <p>Duration</p>
            <input type="text" ref={RecordTimeRef} />
          </div>
        </div>
      </div>
      <div className="add-record-button-wrapper">
        <button onClick={handleAddRecord}>Them record</button>
      </div>
    </div>
  );
};

export default AddRecord;
