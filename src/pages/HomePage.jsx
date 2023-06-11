/* eslint-disable consistent-return */
/* eslint-disable no-nested-ternary */
import { Link } from "react-router-dom";
import React, { useState, useEffect, useContext, useRef } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import ReactPaginate from "react-paginate";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProduct,
  rupiah,
} from "../utils/local-data";
import GlobalContext from "../context/GlobalContext";

function HomePage() {
  const ref = useRef();
  const { dialogAdd, changeDialogAdd } = useContext(GlobalContext);
  const [listProduct, setListProduct] = useState([]);
  const [dialogDelete, setDialogDelete] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [load, setLoad] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 3;
  const pagesVisited = pageNumber * productsPerPage;
  const [idProduct, setIdProduct] = useState(null);
  const [messageDialog, setMessageDialog] = useState("");
  const [dialogAction, setDialogAction] = useState(false);
  const [modeEdit, setModeEdit] = useState(false);
  const [statusLoad, setStatusLoad] = useState("idle");
  const [imageObj, setImgObj] = useState(null);

  const [form, setForm] = useState({
    name: "",
    purchasePrice: "",
    sellingPrice: "",
    stock: "",
    imageProduct: "",
  });

  const changeForm = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const changeSearch = (e) => {
    const { value } = e.target;
    setKeyword(value);
    const result = getAllProducts().filter((items) => {
      const check = JSON.stringify(items.name).toLocaleLowerCase();
      return check.includes(value.toLocaleLowerCase());
    });
    if (value === "") {
      setLoad(!load);
    } else {
      setPageNumber(0);
      setStatusLoad("process");
      setTimeout(() => {
        setStatusLoad("success");
        setListProduct(result);
      }, 800);
    }
  };

  const pageCount = Math.ceil(listProduct.length / productsPerPage);

  const changePage = ({ selected }) => {
    setLoad(!load);
    setPageNumber(selected);
  };

  const reset = () => {
    ref.current.value = "";
  };

  const closeDialog = () => {
    reset();
    setImgObj(null);
    changeDialogAdd();
    setIdProduct(null);
    setModeEdit(false);
    setForm({
      name: "",
      purchasePrice: "",
      sellingPrice: "",
      stock: "",
      imageProduct: "",
    });
  };

  const showDialogDelete = (id) => {
    setDialogDelete(true);
    setIdProduct(id);
  };

  const handleDelete = () => {
    deleteProduct(idProduct);
    setDialogAction(true);
    setMessageDialog("delete product successfully.");
    setPageNumber(0);
    setLoad(!load);
    setTimeout(() => {
      setDialogAction(false);
    }, 2000);
    setDialogDelete(false);
  };

  const handleShowEditProduct = (id) => {
    setModeEdit(true);
    setIdProduct(id);
    const detailProduct = getProduct(id);
    setForm(detailProduct);
    changeDialogAdd();
  };

  const submitAddProduct = (e) => {
    e.preventDefault();
    if (idProduct) {
      editProduct(
        idProduct,
        form.name,
        form.purchasePrice,
        form.sellingPrice,
        form.stock
      );
      setMessageDialog("success edit successfully.");
    } else {
      addProduct(form.name, form.purchasePrice, form.sellingPrice, form.stock);
      setMessageDialog("success add successfully.");
    }
    setDialogAction(true);
    setLoad(!load);
    setTimeout(() => {
      setDialogAction(false);
    }, 2000);
    changeDialogAdd();
    setModeEdit(false);
  };

  const changeImage = (event) => {
    const { files, name } = event.target;
    if (files && files[0]) {
      if (files[0].size > 1 * 1000 * 1024) {
        alert("File with maximum size of 1MB is allowed");
      } else {
        setForm({ ...form, [name]: files[0].name });
        setImgObj(URL.createObjectURL(files[0]));
      }
    }
  };

  useEffect(() => {
    setStatusLoad("process");
    setTimeout(() => {
      setStatusLoad("success");
      setListProduct(getAllProducts());
    }, 800);
  }, [load]);

  return (
    <section className="p-3 sm:p-5 md:p-10 border">
      <div className="flex flex-wrap items-center justify-between gap-5">
        <div>
          <h1 className="font-semibold text-xl">List Product</h1>
          <p className="mt-2 text-xs text-red-500">
            Image hanya static tidak dinamis karena tidak ada api
          </p>
        </div>
        <input
          type="text"
          value={keyword}
          placeholder="Search .."
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => changeSearch(e)}
        />
      </div>
      <hr className="mt-5" />
      <ul className="grid grid-cols-1 laptop:grid-cols-3 gap-1 sm:gap-5 laptop:gap-10 p-0 sm:p-5 mt-5 sm:mt-10 h-[29rem] laptop:h-[23rem] overflow-hidden">
        {statusLoad === "success" && listProduct.length ? (
          listProduct
            .slice(pagesVisited, pagesVisited + productsPerPage)
            .map((product) => (
              <li key={product.id} className="relative col-span-1">
                {/* hover */}
                <div className="opacity-0 absolute z-10 inset-0 hover:bg-gray-600 hover:bg-opacity-50 hover:opacity-100 transition-all rounded-xl">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="flex items-center gap-5">
                      <Link
                        className="btn btn-sm btn-accent text-white"
                        to={`/product/${product.id}`}
                      >
                        Detail
                      </Link>
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleShowEditProduct(product.id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-error text-white"
                        onClick={() => showDialogDelete(product.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex-row laptop:flex-col card w-full bg-base-100 shadow-xl overflow-hidden border">
                  <figure>
                    <img
                      className="h-20 sm:h-32 laptop:h-auto"
                      src="../images/istockphoto-1354989842-1024x1024.jpg"
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body p-4">
                    <div className="flex items-center justify-between">
                      <h2 className="card-title">{product.name}</h2>
                      <p className="text-right text-xs text-gray-600 font-semibold">
                        Stock : {product.stock}
                      </p>
                    </div>
                    <table className="mt-2 text-sm">
                      <tbody>
                        <tr>
                          <td>Purchase Price</td>
                          <td>:</td>
                          <td>{rupiah(product.purchasePrice)}</td>
                        </tr>
                        <tr>
                          <td>Selling Price</td>
                          <td>:</td>
                          <td>{rupiah(product.sellingPrice)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </li>
            ))
        ) : statusLoad === "process" ? (
          <div className="flex justify-center items-center">
            <h3 className="font-semibold hidden sm:block">Loading</h3>
            <div className="w-full flex items-center justify-center">
              <span className="loading loading-ball loading-xs" />
              <span className="loading loading-ball loading-sm" />
              <span className="loading loading-ball loading-md" />
              <span className="loading loading-ball loading-lg" />
            </div>
          </div>
        ) : (
          <div className="w-full text-center">
            <h1>Data tidak ditemukan !</h1>
          </div>
        )}
      </ul>
      <div className="flex items-center justify-center mt-10">
        <ReactPaginate
          previousLabel="Previous"
          nextLabel="Next"
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="paginationBttns"
          previousLinkClassName="previousBttn"
          nextLinkClassName="nextBttn"
          className="wrapper-paginate"
          disabledClassName="paginationDisabled"
          activeClassName="paginationActive"
        />
      </div>
      <input
        type="checkbox"
        checked={dialogDelete}
        id="my-modal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box p-0">
          <div className="relative p-6">
            <label
              className="absolute left-[1.5rem] top-7 cursor-pointer"
              htmlFor="my-modal"
            >
              <HiOutlineXMark
                size={24}
                onClick={() => setDialogDelete(false)}
              />
            </label>
            <h3 className="text-center text-lg font-bold">Delete form?</h3>
          </div>
          <div className="border-t border-b px-6">
            <p className="py-4 text-sm">
              Are you sure you to delete this product?
            </p>
          </div>
          <div className="modal-action flex justify-between px-6 pb-6">
            <button onClick={() => setDialogDelete(false)}>
              <label
                htmlFor="my-modal"
                className="btn btn-ghost bg-[#F2F2F5] text-[#5C00E6]"
              >
                Cancel
              </label>
            </button>
            <button
              className="btn btn-error bg-[#FF2A12] text-[#FFFFFF]"
              onClick={handleDelete}
            >
              Delete product
            </button>
          </div>
        </div>
      </div>
      <input
        type="checkbox"
        checked={dialogAdd}
        id="my-modal-add"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box p-0">
          <div className="relative p-6">
            <label
              className="absolute left-[1.5rem] top-7 cursor-pointer"
              htmlFor="my-modal-add"
            >
              <HiOutlineXMark size={24} onClick={closeDialog} />
            </label>
            <h3 className="text-center text-lg font-bold">
              {modeEdit ? "Edit product" : "Add new product"}
            </h3>
          </div>
          <div className="border-t border-b px-6">
            <div className="py-5">
              <form id="my-form" onSubmit={submitAddProduct}>
                <div className="form-control w-full max-w-xs">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name product"
                    className="input input-bordered w-full max-w-xs"
                    required
                    value={form.name}
                    onChange={(e) => changeForm(e)}
                  />
                </div>
                <div className="form-control w-full max-w-xs mt-2">
                  <input
                    type="number"
                    name="purchasePrice"
                    placeholder="Purchase price"
                    className="input input-bordered w-full max-w-xs"
                    required
                    value={form.purchasePrice}
                    onChange={(e) => changeForm(e)}
                  />
                </div>
                <div className="form-control w-full max-w-xs mt-2">
                  <input
                    type="number"
                    name="sellingPrice"
                    placeholder="Selling price"
                    className="input input-bordered w-full max-w-xs"
                    required
                    value={form.sellingPrice}
                    onChange={(e) => changeForm(e)}
                  />
                </div>
                <div className="form-control w-full max-w-xs mt-2">
                  <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    className="input input-bordered w-full max-w-xs"
                    required
                    value={form.stock}
                    onChange={(e) => changeForm(e)}
                  />
                </div>
                <div className="form-control w-full max-w-xs mt-2">
                  <input
                    type="file"
                    ref={ref}
                    className="file-input file-input-bordered w-full max-w-xs"
                    accept="image/png, image/gif, image/jpeg"
                    required
                    name="imageProduct"
                    onChange={(e) => changeImage(e)}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  File hanya include img,png tidak bisa di upload karena tidak
                  ada api, hanya preview dan validasi max 200kb
                </p>
                {imageObj !== null ? (
                  <img className="mt-5" src={imageObj} alt="img" />
                ) : (
                  ""
                )}
              </form>
            </div>
          </div>
          <div className="modal-action flex justify-between px-6 pb-6">
            <button onClick={closeDialog}>
              <label
                htmlFor="my-modal"
                className="btn btn-ghost bg-[#F2F2F5] text-[#5C00E6]"
              >
                Cancel
              </label>
            </button>
            <button
              form="my-form"
              type="submit"
              className="btn btn-error bg-[#FF2A12] text-[#FFFFFF]"
            >
              {modeEdit ? "Edit product" : "Add product"}
            </button>
          </div>
        </div>
      </div>
      {dialogAction && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>{messageDialog}</span>
          </div>
        </div>
      )}
    </section>
  );
}
export default HomePage;
