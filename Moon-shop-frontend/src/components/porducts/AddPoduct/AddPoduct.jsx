/*
This React component seems to represent a form for adding a new product. Here are comments on different sections of the code:

1. State Initialization:
   - Initializes various states to manage form data, error messages, success messages, and the list of categories.

2. Fetch Categories Effect:
   - Utilizes the useEffect hook to fetch categories from the server and populate the category dropdown.

3. File Upload Handling with Dropzone:
   - Uses the useDropzone hook to handle file uploads and previews the uploaded image.

4. Image Gallery State and Visibility:
   - Manages state for the uploaded image and controls the visibility of the image gallery.

5. Form Submission Handling:
   - Handles form submission using axios to create a new product with the provided information.

6. Conditional Rendering for Error and Success Messages:
   - Conditionally renders warning and success messages based on the state.

7. Back Button Navigation:
   - Provides a back button for navigation using the useNavigate hook.

8. Form Input Fields:
   - Renders input fields for product details such as name, description, brand, price, stock, and category.

9. Textarea for Product Description:
   - Includes a textarea for a detailed product description.

10. Image Upload Section:
    - Displays a dropzone for image upload, allowing users to drag and drop or click to upload an image.

11. Image Gallery Section:
    - Renders the image gallery component once the product has been created.

12. Submit Button:
    - Displays a submit button, conditionally rendering a loader during form submission.

Note: The comments are intended to provide a quick overview of each section's purpose in the React component code.
*/

import { useCallback, useEffect, useState } from "react";
import "./AddPoduct.css";
import axios from "../../../api/axios";
import { useDropzone } from "react-dropzone";
import ImageGallery from "../Images gallery/ImageGallery";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const AddPoduct = () => {
  // State Initialization
  const navigate = useNavigate();
  const [errmsg, setErrmsg] = useState("");
  const [success, setSuccess] = useState("");
  const [categories, setCategories] = useState([]);
  const [name, SetName] = useState("");
  const [richDescription, SetRichDescription] = useState("");
  const [description, SetDescription] = useState("");
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [category, setCategory] = useState("");
  const [productId, setProductId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Categories Effect
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("/api/categories", {
          headers: {
            Accept: "application/json",
          },
        });
        setCategories(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCategories();
  }, []);

  // File Upload Handling with Dropzone
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage(file.name);
    },
    [setImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  // Image Gallery State and Visibility
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isGalleryVisible, setGalleryVisible] = useState(false);

  // Form Submission Handling
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("richDescription", richDescription);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("countInStock", countInStock);
      formData.append("image", uploadedImage.file);
      formData.append("category", category);

      const response = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Product has been created");
      setProductId(response.data._id);
      setGalleryVisible(true);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (!err?.response) {
        setErrmsg("Server not respons");
      } else {
        setErrmsg(err.response.data.message);
      }
    }
  };

  // Render Add Product Page
  return (
    <>
      <div className="dash-container-1">
        {/* Conditional Rendering for Error and Success Messages */}
        {errmsg && (
          <div className="warning-msg">
            <i className="fa fa-warning"></i>
            {errmsg}
          </div>
        )}
        {success && (
          <div className="success-msg">
            <i className="fa fa-check"></i>
            {success}
          </div>
        )}

        {/* Back Button Navigation */}
        <div>
          <span className="back-btn" onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack />
          </span>
        </div>

        {/* Heading */}
        <div className="text">Add Product</div>

        {/* Product Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            {/* Product Name and Short Description */}
            <div className="input-data">
              <input
                onChange={(e) => SetName(e.target.value)}
                type="text"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Name</label>
            </div>
            <div className="input-data">
              <input
                onChange={(e) => SetRichDescription(e.target.value)}
                type="text"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Short description</label>
            </div>
          </div>

          <div className="form-row">
            {/* Brand, Price, Stock, and Category */}
            <div className="input-data">
              <input
                onChange={(e) => setBrand(e.target.value)}
                type="text"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Brand</label>
            </div>
            <div className="input-data">
              <input
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Price</label>
            </div>
            <div className="input-data">
              <input
                onChange={(e) => setCountInStock(e.target.value)}
                type="number"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Stock</label>
            </div>
            <div className="input-data">
              <div className="category-select">
                {/* Category Dropdown */}
                <select onChange={(e) => setCategory(e.target.value)} required>
                  <option disabled selected>
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-row">
            {/* Product Description */}
            <div>
              <div className="row">
                <textarea
                  cols="140"
                  name="fancy-textarea"
                  id="fancy-textarea"
                  onChange={(e) => SetDescription(e.target.value)}
                ></textarea>
                <label htmlFor="fancy-textarea">Description</label>
              </div>
            </div>
          </div>

          <div className="form-row">
            {/* Image Upload Section */}
            <div className="show-image">
              <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? "active" : ""}`}
              >
                <input
                  onChange={(e) => setImage(e.target.value)}
                  {...getInputProps()}
                />
                {uploadedImage ? (
                  <img
                    src={uploadedImage.preview}
                    alt="Uploaded"
                    style={{ width: "100%", height: "auto" }}
                  />
                ) : (
                  <p>Drag or click the image here</p>
                )}
              </div>
            </div>

            {/* Image Gallery Section */}
            {isGalleryVisible && (
              <div className="">
                <ImageGallery id={productId} />
              </div>
            )}
          </div>

          {/* Submit Button */}
          {!isGalleryVisible && (
            <div className="form-row submit-btn">
              <button className="btn">
                {isLoading ? <span className="loader"></span> : "Submit"}
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default AddPoduct;
