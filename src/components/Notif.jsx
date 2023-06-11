import React from "react";
import { string } from "prop-types";

export default function Notif({ messageDialog }) {
  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-success">
        <span>{messageDialog}</span>
      </div>
    </div>
  );
}

Notif.propTypes = {
  messageDialog: string.isRequired,
};
