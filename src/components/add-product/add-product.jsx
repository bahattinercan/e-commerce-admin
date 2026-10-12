import { useState } from "react";
import uploadArea from "../../assets/upload_area.svg";
import "./add-product.css";

const AddProduct = () => {
  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: "",
  });

  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const addProduct = async () => {
    if (!image) {
      alert("Please select a product image first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("product", image);

      const uploadResponse = await fetch("http://localhost:4000/upload", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });
      const responseData = await uploadResponse.json();

      if (!responseData?.success) {
        alert("Image upload failed");
        return;
      }

      const product = { ...productDetails, image: responseData.image_url };

      const addResponse = await fetch("http://localhost:4000/addProduct", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
      const data = await addResponse.json();

      if (data?.success) {
        alert("Product Added");
        setProductDetails({ name: "", image: "", category: "women", new_price: "", old_price: "" });
        setImage(false);
      } else {
        alert("Failed");
      }
    } catch (error) {
      console.error("Add product failed:", error);
      alert("Could not reach the server. Please try again.");
    }
  };

  return (
    <div className="add-product">
      <div className="add-product-itemfield">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name="name" placeholder="Type here" />
      </div>
      <div className="add-product-price">
        <div className="add-product-itemfield">
          <p>Price</p>
          <input
            value={productDetails.old_price}
            onChange={changeHandler}
            type="text"
            name="old_price"
            placeholder="Type here"
          />
        </div>
        <div className="add-product-itemfield">
          <p>Offer Price</p>
          <input
            value={productDetails.new_price}
            onChange={changeHandler}
            type="text"
            name="new_price"
            placeholder="Type here"
          />
        </div>
      </div>
      <div className="add-product-itemfield">
        <p>Product Category</p>
        <select
          value={productDetails.category}
          onChange={changeHandler}
          name="category"
          className="add-product-selector"
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>
      <div className="add-product-itemfield">
        <label htmlFor="file-input">
          <img src={image ? URL.createObjectURL(image) : uploadArea} alt="" className="add-product-thumnail-img" />
        </label>
        <input onChange={imageHandler} type="file" name="image" id="file-input" hidden />
      </div>
      <button onClick={addProduct} className="add-product-btn">
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
