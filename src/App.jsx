/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React, { useMemo, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
// pages
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  const [dialogAdd, setDialogAdd] = useState(false);

  const changeDialogAdd = () => {
    setDialogAdd(!dialogAdd);
  };

  const globalContextValue = useMemo(
    () => ({
      dialogAdd,
      changeDialogAdd,
    }),
    [dialogAdd]
  );

  return (
    <GlobalProvider value={globalContextValue}>
      <main className="max-w-6xl mx-auto">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <Link to="/" className="btn btn-ghost normal-case text-xl">
              Home
            </Link>
          </div>
          <div className="navbar-end">
            <button
              className="btn btn-sm sm:btn-md btn-primary"
              onClick={changeDialogAdd}
            >
              Add Product
            </button>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<DetailPage />} />
        </Routes>
      </main>
    </GlobalProvider>
  );
}

export default App;
