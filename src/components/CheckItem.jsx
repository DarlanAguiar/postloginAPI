import React from "react";

import "./CheckItem.css"

const CheckItem = ({ item }) => {
  console.log(item);
  return <p className="item">{item}</p>;
};

export default CheckItem;
