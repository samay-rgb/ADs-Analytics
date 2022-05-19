import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, useSearchParams } from "react-router-dom";
import Unavailable from "./Unavailable";
import "./customStyles.css";

export default function Table() {
  const { startDate, endDate } = useParams();
  const [load, setLoad] = useState(true);
  let [searchParams] = useSearchParams();
  let arr = searchParams.get("q").split(" ");
  const headings = {
    date: "Date",
    app_id: "App",
    requests: "Requests",
    responses: "Responses",
    clicks: "Clicks",
    impressions: "Impressions",
    revenue: "Revenue",
    fill_rate: "Fill Rate",
    ctr: "CTR",
  };
  const [formattedData, setFormattedData] = useState([]);
  const names = {
    123456: "Panda Draw",
    789652: "Number Ninja",
    741553: "Word Crush",
    986321: "Brain Quiz",
    320248: "Age Calculator",
  };

  const getData = async () => {
    setLoad(true);
    const response = await Axios.get(
      `http://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`
    );
    formatData(response.data.data);
    setLoad(false);
  };
  const formatData = (data) => {
    const newappState = data.map((app) => {
      app.date = app.date.substring(0, 10);
      app.app_id = names[app.app_id];
      app.fill_rate = ((app.requests * 100.0) / app.responses).toFixed(2);
      app.ctr = ((app.clicks * 100.0) / app.impressions).toFixed(2);
      return app;
    });
    setFormattedData(newappState);
  };
  const onClick = (e) => {
    const newApp = [...formattedData];
    newApp.sort((a, b) => {
      if (typeof a[e.target.name] === "string")
        return a[e.target.name].localeCompare(b[e.target.name]);
      return a[e.target.name] - b[e.target.name];
    });
    console.log(newApp);
    setFormattedData(newApp);
  };
  const getSubheading = (p) => {
    if (p === "date") {
      let d1 = new Date(startDate);
      let d2 = new Date(endDate);
      return Math.ceil((d2 - d1) / (1000 * 3600 * 24)) + 1;
    }
    if (p === "app_id") return formattedData.length;
    if (p === "fill_rate" || p === "ctr")
      return (
        (
          formattedData.reduce((sum, a) => sum + Number(a[p]), 0) /
          formattedData.length
        ).toFixed(2) + "%"
      );
    if (p === "revenue")
      return formattedData.reduce((sum, a) => sum + a[p], 0).toFixed(2);
    return (
      (formattedData.reduce((sum, a) => sum + a[p], 0) / 1000000).toFixed(3) +
      "M"
    );
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, [startDate, endDate]);
  return (
    <div className="container mt-2">
      {load ||
      formattedData.length < 2 ||
      startDate.localeCompare(endDate) === 1 ||
      endDate.localeCompare(startDate) === -1 ? (
        <Unavailable />
      ) : (
        <table className="table">
          <thead>
            <tr>
              {arr.map((attr, idx) => (
                <th key={idx} className="text-center" scope="col">
                  <img
                    src="https://img.icons8.com/ios-filled/25/000000/empty-filter.png"
                    alt=""
                    onClick={onClick}
                    name={attr}
                    className="img"
                  />
                  <br />
                  {headings[attr]} <br />
                  {attr === "revenue" ? "$" : ""} {getSubheading(attr)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {formattedData.map((app, idx) => (
              <tr key={idx}>
                {arr.map((attr, idx) => (
                  <td key={idx} className="text-center">
                    {app[attr]}{" "}
                    {attr === "ctr" || attr === "fill_rate" ? "%" : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
