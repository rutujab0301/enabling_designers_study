
import React, { useState } from "react";
import "./CircleGapTrial.css";


type TrialComponentProps = {
  path: string;
  instruction?: string;
  onNext: (response: string) => void;
};


const ICON_MAP: Record<string, string> = {
  top: "assets/icons/top.svg",
  topRight: "assets/icons/top-right.svg",
  right: "assets/icons/right.svg",
  bottomRight: "assets/icons/bottom-right.svg",
  bottom: "assets/icons/bottom.svg",
  bottomLeft: "assets/icons/bottom-left.svg",
  left: "assets/icons/left.svg",
  topLeft: "assets/icons/top-left.svg",
  unknown: "assets/icons/cant-tell.svg"
};

const BUTTON_ORDER = [
  "topLeft", "top", "topRight",
  "left", "right",
  "bottomLeft", "bottom", "bottomRight"
];

export default function CircleGapTrial({ path, instruction, onNext }: TrialComponentProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (value: string) => {
    setSelected(value);
    onNext(value);
  };

  return (
    <div className="circle-gap-layout">
      {instruction && <p className="instruction">{instruction}</p>}
      <div className="stimulus-container">
        <div className="button-grid">
          {BUTTON_ORDER.map((pos) => (
            <button
              key={pos}
              className={`icon-button ${pos}`}
              onClick={() => handleClick(pos)}
            >
              <img src={ICON_MAP[pos]} alt={pos} />
            </button>
          ))}
        </div>
        <img src={path} alt="stimulus" className="stimulus-image" />
        <button className="cant-tell" onClick={() => handleClick("unknown")}>I CAN'T TELL!</button>
      </div>
    </div>
  );
}
