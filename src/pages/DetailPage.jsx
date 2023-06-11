import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getProduct, rupiah } from "../utils/local-data";

function DetailPage() {
  const { id } = useParams();
  const [detailProduct, setDetailProduct] = useState(null);

  useEffect(() => {
    setDetailProduct(getProduct(id));
  }, [id]);

  if (detailProduct === null) {
    return "";
  }

  return (
    <section className="p-3 sm:p-5 md:p-10 border">
      <div className="flex flex-wrap items-center justify-between gap-5 mt-3">
        <h1 className="font-semibold text-xl">Detail Product {id}</h1>
      </div>
      <hr className="mt-5" />

      <div className="hero bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-5">{detailProduct.name}</h1>
            <table className="mt-2 text-sm">
              <tbody>
                <tr>
                  <td>Purchase Price</td>
                  <td>:</td>
                  <td>{rupiah(detailProduct.purchasePrice)}</td>
                </tr>
                <tr>
                  <td>Selling Price</td>
                  <td>:</td>
                  <td>{rupiah(detailProduct.sellingPrice)}</td>
                </tr>
              </tbody>
            </table>
            <Link to="/" className="btn btn-primary mt-10">
              Back
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailPage;
