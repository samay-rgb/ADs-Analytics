import React from "react";

export default function Unavailable() {
  return (
    <div
      className="container mt-2 bg-secondary"
      style={{ height: "250px", borderRadius: "20px" }}
    >
      <h1 style={{ margin: "auto" }}>
        Hey! Something's not right! <br />
        We couldn't display the given data.
      </h1>
      <h3 style={{ margin: "auto" }}>Maybe try changing some filters</h3>
    </div>
  );
}
