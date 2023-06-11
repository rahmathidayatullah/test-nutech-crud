import React from "react";
import { func } from "prop-types";

export default function BtnDelete({ handleDelete }) {
  return (
    <button
      className="btn btn-error bg-[#FF2A12] text-[#FFFFFF]"
      onClick={handleDelete}
    >
      Delete product
    </button>
  );
}

BtnDelete.propTypes = {
  handleDelete: func.isRequired,
};
