import React from "react";
import { Route, Routes } from "react-router-dom";
import CountriesList from "./components/common/CountriesList/CountriesList";
import CountryItem from "./components/common/CountryItem/CountryItem";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<CountriesList />} />
        <Route path="/country/:name" element={<CountryItem />} />
      </Routes>
    </>
  );
}

export default App;
