import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Table from "./components/Table";
// import Table from "./components/Table";

function App() {
  return (
    <div className="App">
      <Home />
      <Routes>
        <Route path="/table/:startDate/:endDate" element={<Table />} />
        {/* <Route path="/table" element={<Table />} /> */}
      </Routes>
    </div>
  );
}

export default App;
