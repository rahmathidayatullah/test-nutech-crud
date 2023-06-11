import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center">
      <h3 className="font-semibold hidden sm:block">Loading</h3>
      <div className="w-full flex items-center justify-center">
        <span className="loading loading-ball loading-xs" />
        <span className="loading loading-ball loading-sm" />
        <span className="loading loading-ball loading-md" />
        <span className="loading loading-ball loading-lg" />
      </div>
    </div>
  );
}
