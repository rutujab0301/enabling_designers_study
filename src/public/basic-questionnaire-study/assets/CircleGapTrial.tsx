import React, { useState } from "react";
import "./CircleGapTrial.css";
import { StimulusParams } from "../../../store/types";

const BASE = import.meta.env.BASE_URL ?? "/";
const resolvePath = (p: string) => `${BASE}${p.replace(/^\/+/, "")}`;

const ICON_MAP: Record<string, string> = {
  top: "basic-questionnaire-study/assets/icons/top.png",
  topRight: "basic-questionnaire-study/assets/icons/top-right.png",
  right: "basic-questionnaire-study/assets/icons/right.png",
  bottomRight: "basic-questionnaire-study/assets/icons/bottom-right.png",
  bottom: "basic-questionnaire-study/assets/icons/bottom.png",
  bottomLeft: "basic-questionnaire-study/assets/icons/bottom-left.png",
  left: "basic-questionnaire-study/assets/icons/left.png",
  topLeft: "basic-questionnaire-study/assets/icons/top-left.png",
  unknown: "basic-questionnaire-study/assets/icons/cant-tell.png",
};

const BUTTON_ORDER = [
  "topLeft",
  "top",
  "topRight",
  "left",
  "right",
  "bottomLeft",
  "bottom",
  "bottomRight",
] as const;

type Params = { imagePath: string; instruction?: string };

export default function CircleGapTrial({
  parameters,
  setAnswer,
}: StimulusParams<Params>) {
  const [selected, setSelected] = useState<string | null>(null);

  const imageSrc = resolvePath(parameters.imagePath);

  const handleClick = (value: string) => {
    setSelected(value);
    setAnswer({
      status: true,
      answers: { gapPosition: value },
    });
  };

  return (
    <div className="circle-gap-layout">
      {parameters.instruction && (
        <p className="instruction">{parameters.instruction}</p>
      )}

      <div className="stimulus-container">
        <div className="button-grid">
          {BUTTON_ORDER.map((pos) => (
            <button
              key={pos}
              className={`icon-button ${pos}`}
              onClick={() => handleClick(pos)}
              aria-label={pos.replace(/([A-Z])/g, " $1")}
            >
              <img src={resolvePath(ICON_MAP[pos])} alt="" />
            </button>
          ))}
        </div>

        <img src={imageSrc} alt="stimulus" className="stimulus-image" />

        
        <button className="cant-tell" onClick={() => handleClick("unknown")}>
          I CAN'T TELL!
        </button>
      </div>
    </div>
  );
}
