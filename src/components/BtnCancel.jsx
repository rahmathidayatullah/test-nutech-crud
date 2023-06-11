import React from "react";
import { string, func } from "prop-types";

export default function BtnCancel({ setDialogAction, forHtml }) {
  return (
    <button onClick={setDialogAction}>
      <label
        htmlFor={forHtml}
        className="btn btn-ghost bg-[#F2F2F5] text-[#5C00E6]"
      >
        Cancel
      </label>
    </button>
  );
}

BtnCancel.propTypes = {
  forHtml: string.isRequired,
  setDialogAction: func.isRequired,
};
