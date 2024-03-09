// React imports
import React, { useCallback, useState } from "react";

// Stylesheet import
import "./AddCategory.css";

// Axios for API requests
import axios from "../../../api/axios";

// Dropzone for handling file uploads
import { useDropzone } from "react-dropzone";

// React Icons import
import { IoMdArrowRoundBack } from "react-icons/io";

// React Router DOM hook for navigation
import { useNavigate } from "react-router-dom";

// Functional component definition
const AddCategory = () => {
  // Navigation hook
  const navigate = useNavigate();

  // State variables for form inputs and UI feedback
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const [color, setColor] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // State variable for uploaded image and callback for handling drops
  const [uploadedImage, setUploadedImage] = useState(null);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadedImage({
        file,
        preview: URL.createObjectURL(file),
      });

      setIcon(file.name);
    },
    [setIcon]
  );

  // Dropzone configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      // Creating a FormData object for multipart/form-data requests
      const formData = new FormData();
      formData.append("name", name);
      formData.append("icon", uploadedImage.file);
      formData.append("color", color);

      // Making a POST request to the API endpoint with the form data
      const response = await axios.post("/api/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handling successful response
      setSuccess("Category has been created");
      setIsLoading(false);
    } catch (err) {
      // Handling errors
      setIsLoading(false);
      if (!err?.response) {
        setErrmsg("Server not respons");
      } else {
        setErrmsg(err.response.data.message);
      }
    }
  };

  // JSX for rendering the component
  return (
    <>
      <div>
        {/* Back button */}
        <span className="back-btn-dash" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
        </span>
      </div>
      <div className="dash-container-1">
        {/* Error and success messages */}
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
        {/* Form header */}
        <div className="text">Add Category</div>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            {/* Input for category name */}
            <div className="input-data">
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Name</label>
            </div>
            {/* Input for category icon (image upload) */}
            <div className="input-data input-color">
              {/* Dropzone for handling image uploads */}
              <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? "active" : ""}`}
              >
                <input
                  onChange={(e) => setIcon(e.target.value)}
                  {...getInputProps()}
                />
                {/* Displaying the uploaded image or a prompt */}
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
            {/* Empty row */}
            <div className="form-row"></div>
          </div>
          {/* Input for selecting category color */}
          <div className="form-row">
            <input
              onChange={(e) => setColor(e.target.value)}
              className="input-color"
              type="color"
              required
            />
            <p id="lable-color" htmlFor="">
              Color
            </p>
          </div>
          {/* Submit button */}
          <div className="form-row submit-btn">
            <button className="btn">
              {isLoading ? <span className="loader"></span> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

// Exporting the component
export default AddCategory;
