import React from "react";
import { Link } from "react-router-dom";
import { string, func, number, shape } from "prop-types";
import { rupiah } from "../utils/local-data";

export default function ItemProduct(props) {
  const {
    product: { id, name, stock, purchasePrice, sellingPrice },
    handleShowEditProduct,
    showDialogDelete,
  } = props;
  return (
    <li key={id} className="relative col-span-1">
      {/* hover */}
      <div className="opacity-0 absolute z-10 inset-0 hover:bg-gray-600 hover:bg-opacity-50 hover:opacity-100 transition-all rounded-xl">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="flex items-center gap-5">
            <Link
              className="btn btn-sm btn-accent text-white"
              to={`/product/${id}`}
            >
              Detail
            </Link>
            <button
              className="btn btn-sm btn-primary"
              onClick={handleShowEditProduct}
            >
              Edit
            </button>
            <button
              className="btn btn-sm btn-error text-white"
              onClick={showDialogDelete}
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
            <h2 className="card-title">{name}</h2>
            <p className="text-right text-xs text-gray-600 font-semibold">
              Stock : {stock}
            </p>
          </div>
          <table className="mt-2 text-sm">
            <tbody>
              <tr>
                <td>Purchase Price</td>
                <td>:</td>
                <td>{rupiah(purchasePrice)}</td>
              </tr>
              <tr>
                <td>Selling Price</td>
                <td>:</td>
                <td>{rupiah(sellingPrice)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </li>
  );
}

const productShapes = {
  id: string.isRequired,
  name: string.isRequired,
  stock: number.isRequired,
  purchasePrice: number.isRequired,
  sellingPrice: number.isRequired,
};

ItemProduct.propTypes = {
  product: shape(productShapes),
  handleShowEditProduct: func.isRequired,
  showDialogDelete: func.isRequired,
};

ItemProduct.defaultProps = {
  product: {},
};
