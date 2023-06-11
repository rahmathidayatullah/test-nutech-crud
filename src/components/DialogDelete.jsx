import React from "react";
import { func } from "prop-types";
import { HiOutlineXMark } from "react-icons/hi2";
import BtnDelete from "./BtnDelete";
import BtnCancel from "./BtnCancel";

export default function DialogDelete({ setDialogDelete, handleDelete }) {
  return (
    <div className="modal">
      <div className="modal-box p-0">
        <div className="relative p-6">
          <label
            className="absolute left-[1.5rem] top-7 cursor-pointer"
            htmlFor="my-modal"
          >
            <HiOutlineXMark size={24} onClick={setDialogDelete} />
          </label>
          <h3 className="text-center text-lg font-bold">Delete form?</h3>
        </div>
        <div className="border-t border-b px-6">
          <p className="py-4 text-sm">
            Are you sure you to delete this product?
          </p>
        </div>
        <div className="modal-action flex justify-between px-6 pb-6">
          <BtnCancel forHtml="my-modal" setDialogAction={setDialogDelete} />
          <BtnDelete handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
}

DialogDelete.propTypes = {
  setDialogDelete: func.isRequired,
  handleDelete: func.isRequired,
};
