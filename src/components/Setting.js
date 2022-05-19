import React, { useState } from "react";
import Box from "./Box";
import { useNavigate } from "react-router-dom";
import "./customStyles.css";
// import Table from "./Table";
export default function Setting({ startDate, endDate, setSettings }) {
  let navigate = useNavigate();

  const [table, setTable] = useState(false);
  const [dragId, setDragId] = useState(0);
  const [attrs, setAttrs] = useState([
    { id: 1, order: 1, name: "date", value: "Date", show: true },
    { id: 2, order: 2, name: "app_id", value: "App", show: true },
    { id: 3, order: 3, name: "requests", value: "Request", show: false },
    { id: 4, order: 4, name: "responses", value: "Response", show: false },
    { id: 5, order: 5, name: "clicks", value: "Clicks", show: false },
    { id: 6, order: 6, name: "impressions", value: "Impression", show: false },
    { id: 7, order: 7, name: "revenue", value: "Revenue", show: false },
    { id: 8, order: 8, name: "fill_rate", value: "Fill Rate", show: false },
    { id: 9, order: 9, name: "ctr", value: "CTR", show: false },
  ]);
  const handleDrag = (e) => {
    setDragId(e.target.id);
  };
  const setShow = (e) => {
    const curattr = attrs.find((attr) => attr.id === Number(e.target.id));
    if (curattr.id === 1 || curattr.id === 2) return;
    e.target.classList.toggle("selected");
    const cur = curattr.show;
    const newattrState = attrs.map((attr) => {
      if (attr.id === Number(e.target.id)) {
        attr.show = !cur;
      }
      return attr;
    });
    setAttrs(newattrState);
    // console.log(attrs);
  };
  const handleDrop = (e) => {
    const dragattr = attrs.find((attr) => attr.id === Number(dragId));
    const dropattr = attrs.find((attr) => attr.id === Number(e.target.id));
    // console.log(dragattr);
    // console.log(dropattr);
    const dragattrOrder = dragattr.order;
    const dropattrOrder = dropattr.order;
    // console.lo;
    const newattrState = attrs.map((attr) => {
      if (attr.id === Number(dragId)) {
        attr.order = dropattrOrder;
      }
      if (attr.id === Number(e.target.id)) {
        attr.order = dragattrOrder;
      }
      return attr;
    });
    setAttrs(newattrState);
  };
  const handleClose = () => {
    console.log("closing");
    setSettings(false);
  };
  const onClick = () => {
    // console.log(attrs);
    let path = "";
    attrs
      .sort((a, b) => a.order - b.order)
      .filter((a) => a.show)
      .forEach((element) => (path = path + element.name + " "));
    // console.log(path);
    navigate(`/table/${startDate}/${endDate}?q=${path}`);
    setTable(!table);
  };
  return (
    <div className="container settings">
      <div className="title mt-1">
        <h4>Dimensions and Metrics</h4>
      </div>
      <div className=" d-flex flex-wrap">
        {attrs
          .sort((a, b) => a.order - b.order)
          .map((attr) => (
            <Box
              key={attr.id}
              attrName={attr.name}
              attrNumber={attr.id}
              attrVal={attr.value}
              handleDrag={handleDrag}
              handleDrop={handleDrop}
              setShow={setShow}
            />
          ))}
      </div>
      <div className="btns">
        <button
          type="button"
          className="btn btn-danger"
          onClick={handleClose}
          style={{ marginRight: "10px" }}
        >
          Close
        </button>
        <button type="button" className="btn btn-primary" onClick={onClick}>
          Apply Changes
        </button>
      </div>
    </div>
  );
}
