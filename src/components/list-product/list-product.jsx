import React, { useEffect, useState } from "react";
import crossIcon from "../../assets/cross_icon.png";
import { API_URL } from "../../config";
import { handleUnauthorized } from "../../helpers/auth";
import "./list-product.css";

const PAGE_SIZE = 25;

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const fetchInfo = async (targetPage = 1) => {
    try {
      const response = await fetch(
        `${API_URL}/allProducts?page=${targetPage}&limit=${PAGE_SIZE}`,
        { credentials: "include" }
      );
      if (!response.ok) {
        if (handleUnauthorized(response)) return;
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const totalCount = Number(response.headers.get("x-total-count"));

      setAllProducts((previous) => (targetPage === 1 ? data : [...previous, ...data]));
      setTotal(Number.isFinite(totalCount) ? totalCount : data.length);
      setPage(targetPage);
    } catch (error) {
      console.error("Could not load products:", error);
      alert("Could not reach the server. Please try again.");
    }
  };

  useEffect(() => {
    fetchInfo(1);
  }, []);

  const loadMore = () => {
    if (allProducts.length < total) {
      fetchInfo(page + 1);
    }
  };

  const removeProduct = async (id, name) => {
    try {
      const response = await fetch(`${API_URL}/removeProduct`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, name: name }),
      });
      if (handleUnauthorized(response)) return;
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        alert(data?.error || `Could not remove product (HTTP ${response.status})`);
        return;
      }

      // No refetch: drop the row locally so the already loaded pages stay intact.
      setAllProducts((previous) => previous.filter((product) => product.id !== id));
      setTotal((previous) => Math.max(0, previous - 1));
    } catch (error) {
      console.error("Could not remove product:", error);
      alert("Could not reach the server. Please try again.");
    }
  };

  return (
    <div className="list-product">
      <h1>All Product List</h1>
      <p className="list-product-count">
        {allProducts.length} of {total} products
      </p>
      <div className="list-product-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="list-product-all-products">
        <hr />
        {allProducts.map((product, index) => {
          return (
            <React.Fragment key={product.id ?? index}>
              <div className="list-product-format-main list-product-format">
                <img src={product.image} alt="" className="list-product-productIcon" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img
                  onClick={() => {
                    removeProduct(product.id, product.name);
                  }}
                  className="list-product-remove-icon"
                  src={crossIcon}
                  alt=""
                />
              </div>
              <hr />
            </React.Fragment>
          );
        })}
      </div>
      {allProducts.length < total ? (
        <button className="list-product-load-more" onClick={loadMore}>
          Load more
        </button>
      ) : null}
    </div>
  );
};

export default ListProduct;
