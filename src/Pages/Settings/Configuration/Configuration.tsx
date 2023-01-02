import React, { useEffect, useState } from "react";
import { ArrowRight } from "../../../assets/svg/ArrowRight";
import { CheckThemeIcon } from "../../../assets/svg/CheckThemeIcon";
import { SliderLeftIcon } from "../../../assets/svg/SliderLeftIcon";
import { SliderRightIcon } from "../../../assets/svg/SliderRightIcon";
import Loading from "../../../components/Loading/Loading";

import Theme1 from "../../../assets/image/Theme1.png";
import Theme2 from "../../../assets/image/Theme2.png";
import Theme3 from "../../../assets/image/Theme3.png";
import Theme4 from "../../../assets/image/Theme4.png";

import { toast } from "react-toastify";
import { Select, theme } from "antd";

import "./Configuration.css";

type SliderProps = {
  id: number;
  title: string;
  img: string;
};

const Configuration = () => {
  const dataSlider = [
    {
      id: 1,
      title: "Theme 1",
      img: Theme1,
    },
    {
      id: 2,
      title: "Theme 2",
      img: Theme2,
    },
    {
      id: 3,
      title: "Theme 3",
      img: Theme3,
    },
    {
      id: 4,
      title: "Theme 4",
      img: Theme4,
    },
  ];

  const handleScrollRight = () => {
    var slider = document.getElementById("slider") as HTMLDivElement;
    slider.scrollLeft += 256;
  };

  const handleScrollLeft = () => {
    var slider = document.getElementById("slider") as HTMLDivElement;
    slider.scrollLeft -= 256;
  };

  const onChangeSelect = (value: string) => {
    localStorage.setItem("language", value);
  };
  const themeUserLocal = Number(localStorage.getItem("ThemeId"));
  const languageUserLocal = localStorage.getItem("language");

  const [themeUser, setThemeUse] = useState(0);
  const [language, setLanguage] = useState("vietnamese");
  useEffect(() => {
    if (themeUserLocal) {
      setThemeUse(themeUserLocal);
    } else {
      setThemeUse(0);
    }
    if(!languageUserLocal) {
      setLanguage("vietnamese")
    } else {
      setLanguage(languageUserLocal)
    }
  });
  return (
    <>
      {!themeUser ? (
        <Loading />
      ) : (
        <div className="config-wrapper">
          <div className="config-header">
            <p>Cài đặt</p>
            <div>
              <ArrowRight />
            </div>
            <p>Cài đặt hệ thống</p>
          </div>
          <h1>Cài đặt cấu hình</h1>
          <div className="config-body-wraper">
            <div className="config-col-left">
              <div
                className="theme-choose-wrapper"
                style={{
                  backgroundImage: `url(${dataSlider[themeUser - 1].img})`,
                }}
              >
                <div className="icon-check-theme">
                  <CheckThemeIcon />
                </div>
              </div>
              <p>{dataSlider[themeUser - 1].title}</p>
            </div>
            <div className="config-col-right">
              <div className="slider-icon-left" onClick={handleScrollLeft}>
                <SliderLeftIcon />
              </div>
              <div className="container-slider" id={"slider"}>
                {dataSlider.map((slider: SliderProps) => {
                  return (
                    <div className="slider-item-wrapper" key={slider.id}>
                      <div
                        className="slider-image-container"
                        style={{
                          backgroundImage: `url(${slider.img})`,
                        }}
                        onClick={() => {
                          setThemeUse(slider.id);
                          localStorage.setItem("ThemeId", String(slider.id));
                          toast("Đã đổi sang " + slider.title + "!", {
                            position: "top-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                          });
                        }}
                      >
                        {Number(themeUser) === slider.id ? (
                          <div className="icon-check-theme">
                            <CheckThemeIcon />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <p>{slider.title}</p>
                    </div>
                  );
                })}
              </div>
              <div className="slider-icon-right" onClick={handleScrollRight}>
                <SliderRightIcon />
              </div>
            </div>
          </div>
          <div className="select-language-wrapper">
            <p>Ngôn ngữ hiển thị</p>
            <div className="select-language-setting">
              <Select
                options={[
                  {
                    value: "vietnamese",
                    label: "Tiếng việt",
                  },
                  {
                    value: "english",
                    label: "Tiếng anh",
                  },
                ]}
                style={{ width: 246 }}
                defaultValue={language}
                onChange={onChangeSelect}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Configuration;
