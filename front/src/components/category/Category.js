import { useEffect, useState } from "react";
import * as expenses from "../../services/expenses";
import { useSelector } from "react-redux";

function Category() {
  const { currentUser } = useSelector((state) => state.user);
  const token = currentUser.token;

  return <div></div>;
}

export default Category;
