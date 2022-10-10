import React from "react";
import { Link } from "react-router-dom";

interface ToolbarProps {}

export const Toolbar: React.FC<
  ToolbarProps
> = ({}) => {
  return (
    <div className="w-full p-1 bg-purple-800 flex-center">
      <div className="w-full p-1  flex justify-between items-center">
        <Link to="/">HOME</Link>
        <Link to="/about">ABOUT</Link>
      </div>
    </div>
  );
};
