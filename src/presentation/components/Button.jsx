import React from "react";

export const Button = ({ text, ...props }) => (
  <button {...props}>{text}</button>
);
