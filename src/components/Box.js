import React from "react";
import "./customStyles.css";
const Box = ({
  attrName,
  attrNumber,
  attrVal,
  handleDrag,
  handleDrop,
  setShow,
}) => {
  return (
    <div
      draggable={true}
      id={attrNumber}
      name={attrName}
      onDragOver={(ev) => ev.preventDefault()}
      onDragStart={handleDrag}
      onDrop={handleDrop}
      className={
        attrNumber === 1 || attrNumber === 2
          ? "attribute selected"
          : "attribute"
      }
      onClick={setShow}
    >
      {attrVal}
    </div>
  );
};

export default Box;
