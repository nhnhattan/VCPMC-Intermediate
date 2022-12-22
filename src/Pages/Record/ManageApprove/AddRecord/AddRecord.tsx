import React from "react";
import { db } from "../../../../firebase";
import { addDoc, collection } from "firebase/firestore";
import "./AddRecord.css";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReactPlayer from "react-player";
const AddRecord = () => {
  const RecordNameRef = useRef<HTMLInputElement>(null);
  const ISRCIdRef = useRef<HTMLInputElement>(null);
  const SingerRef = useRef<HTMLInputElement>(null);
  const ComposerRef = useRef<HTMLInputElement>(null);
  const ProducerRef = useRef<HTMLInputElement>(null);
  const GenreRef = useRef<HTMLInputElement>(null);
  const FormatRef = useRef<HTMLInputElement>(null);
  const RecordTimeRef = useRef<HTMLInputElement>(null);
  const RecordLinkRef = useRef<HTMLInputElement>(null);
  const d = new Date();
  let date = d.getDate() + "/" + d.getMonth() + "/" + d.getFullYear();

  const usercurrentData = useSelector((state: any) => state.users.currentUser);
  function add_months(dt: any, n: number) {
    return new Date(dt.setMonth(dt.getMonth() + n));
  }
  let dateAfter = add_months(d, 1);
  let dateOut =
    dateAfter.getDate() +
    "/" +
    (dateAfter.getMonth() + 1) +
    "/" +
    dateAfter.getFullYear();
  console.log(dateOut);
  const handleAddRecord = async () => {
    try {
      const recordDoc = collection(db, "records");
      await addDoc(recordDoc, {
        RecordName: RecordNameRef.current?.value,
        ISRCId: ISRCIdRef.current?.value,
        Singer: SingerRef.current?.value,
        Composer: ComposerRef.current?.value,
        Producer: ProducerRef.current?.value,
        Genre: GenreRef.current?.value,
        Format: FormatRef.current?.value,
        RecordTime: RecordTimeRef.current?.value,
        dateAdd: date,
        usernameAdd: usercurrentData.role,
        personApprove: "Hệ thống",
        dateApprove: "",
        RecordLink: RecordLinkRef.current?.value,
        status: true,
        approveStatus: false,
        ExpiryDate: dateOut,
        RecordImage: "",
      }).then(()=> {
        alert("thanh cong")
      })
    } catch (e) {
      console.log(e);
      alert("That bai")
    }
  };
  return (
    <div className="add-record-wrapper">
      <div className="add-record-form-wrapper">
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
        <div className="input-wrapper">
          <p>Thể loại:</p>
          <input type="text" ref={GenreRef} />
        </div>
        <div className="input-wrapper">
          <p>Định dạng:</p>
          <input type="text" ref={FormatRef} />
        </div>
        <div className="input-wrapper">
          <p>Link</p>
          <input type="text" ref={RecordLinkRef} />
        </div>
        <div className="input-wrapper">
          <p>Duration</p>
          <input type="text" ref={RecordTimeRef} />
        </div>
        <button onClick={handleAddRecord}>Them record</button>
        {/* <ReactPlayer url='https://www.youtube.com/watch?v=Xgzz3pbOEdY' /> */}
      </div>
    </div>
  );
};

export default AddRecord;
