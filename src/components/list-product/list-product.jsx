import React, { useEffect, useState } from "react";
import crossIcon from "../../assets/cross_icon.png";
import { API_URL } from "../../config";
import { getToken, handleUnauthorized } from "../../helpers/auth";
import "./list-product.css";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await fetch(`${API_URL}/allProducts`);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      setAllProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Could not load products:", error);
      setAllProducts([]);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const removeProduct = async (id, name) => {
    try {
      const response = await fetch(`${API_URL}/removeProduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "auth-token": getToken() || "",
        },
        body: JSON.stringify({ id: id, name: name }),
      });
      if (handleUnauthorized(response)) return;
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        alert(data?.error || `Could not remove product (HTTP ${response.status})`);
        return;
      }
      await fetchInfo();
    } catch (error) {
      console.error("Could not remove product:", error);
      alert("Could not reach the server. Please try again.");
    }
  };

  return (
    <div className="list-product">
      <h1>All Product List</h1>
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
    </div>
  );
};

export default ListProduct;
