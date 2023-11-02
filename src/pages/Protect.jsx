import React from "react";
import { Outlet } from "react-router-dom";
import Error4 from "../components/Error4";

const Protect = () => {
  const userLogin = localStorage.getItem("bripan_token");
  return userLogin ? (
    <Outlet />
  ) : (
    <>
      {" "}
      <Error4 />{" "}
    </>
  );
};

export default Protect;
