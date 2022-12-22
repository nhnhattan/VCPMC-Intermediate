import React, { useState } from "react";
import { ArrowRight } from "../../../assets/svg/ArrowRight";
import "./Tutorial.css";

type tutorialProps = {
  id: number;
  nameTut: string;
  tutContent: [string];
};
const Tutorial = () => {
  const tutorialArray = [
    {
      id: 1,
      nameTut: "Lorem ipsum dolor sit amet",
      tutContent: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam diam sed lacus lacus. In eget morbi eros, vitae enim nunc, cursus. Nisl eleifend lectus nunc massa aliquam, tellus in imperdiet. Malesuada suspendisse gravida tortor neque quis accumsan et posuere. Ac turpis urna ipsum pretium nisi aenean. Facilisis scelerisque placerat eget lorem eget maecenas.        ",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam diam sed lacus lacus. In eget morbi eros, vitae enim nunc, cursus. Nisl eleifend lectus nunc massa aliquam, tellus in imperdiet. Malesuada suspendisse gravida tortor neque quis accumsan et posuere. Ac turpis urna ipsum pretium nisi aenean. Facilisis scelerisque placerat eget lorem eget maecenas:        ",
        "•  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam.        ",
        "•  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam.",
        "•  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam diam sed lacus lacus. In eget morbi eros, vitae enim nunc, cursus. Nisl eleifend lectus nunc massa aliquam, tellus in imperdiet. Malesuada suspendisse gravida tortor neque quis accumsan et posuere. Ac turpis urna ipsum pretium nisi aenean. Facilisis scelerisque placerat eget lorem eget maecenas. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
        
      ],
    },
    {
      id: 2,
      nameTut: "Consectetur adipiscing elit sed do",
      tutContent: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam diam sed lacus lacus. In eget morbi eros, vitae enim nunc, cursus. Nisl eleifend lectus nunc massa aliquam, tellus in imperdiet. Malesuada suspendisse gravida tortor neque quis accumsan et posuere. Ac turpis urna ipsum pretium nisi aenean. Facilisis scelerisque placerat eget lorem eget maecenas",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam diam sed lacus lacus. In eget morbi eros, vitae enim nunc, cursus. Nisl eleifend lectus nunc massa aliquam, tellus in imperdiet. Malesuada suspendisse gravida tortor neque quis accumsan et posuere. Ac turpis urna ipsum pretium nisi aenean. Facilisis scelerisque placerat eget lorem eget maecenas:",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Platea sit placerat odio lorem. Cum eleifend bibendum ipsum quis scelerisque dui nibh odio id. Nam cras nec non posuere etiam.",
      ],
    },
  ];
  const [tutId, setTutId] = useState(1);
  const [tut, setTut] = useState(tutorialArray[0]);
  return (
    <div className="tutorial-wrapper">
      <div className="tutorial-header">
        <p>Hỗ trợ</p>
        <div>
          <ArrowRight />
        </div>
        <p>Hướng dãn sử dụng</p>
      </div>
      <h1>Hướng dẫn sử dụng</h1>
      <div className="tutorial-body-wrapper">
        <div className="tutorial-body-left">
          <div className="header-left">
            <p>Danh mục hướng dẫn</p>
          </div>
          <div className="menu-tutorial">
            {tutorialArray.map((tutto: any) => {
              return (
                <div
                  className={
                    tutId === tutto.id
                      ? `tutorial-item active`
                      : `tutorial-item`
                  }
                  key={tutto.id}
                  onClick={() => {
                    setTutId(tutto.id);
                    setTut(tutto);
                  }}
                >
                  <p>
                    {tutto.id}. {tutto.nameTut}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="tutorial-body-right">
          <p>{tut.nameTut}</p>
          {tut.tutContent.map((content: any) => {
            return (
              <p className="tutorial-content">
                {content} <br />
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
