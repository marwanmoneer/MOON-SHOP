import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./ImageGallery.css";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "../../../api/axios";

const ImageGallery = ({ id }) => {
  const navigate = useNavigate();
  const [errmsg, setErrmsg] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  // Callback function to handle dropped images
  const onDrop = useCallback(
    (acceptedFiles) => {
      const files = acceptedFiles.slice(0, 10); // Limit to 10 files
      const updatedImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setUploadedImages(updatedImages);
    },
    [setUploadedImages]
  );

  // useDropzone hook to enable drag-and-drop functionality
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
    maxFiles: 10,
  });

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      // Create a FormData object to send the images
      const formData = new FormData();

      // Append each image individually
      uploadedImages.forEach((image, index) => {
        formData.append(`images`, image.file);
      });

      // Send a PUT request to update the product's gallery images
      const response = await axios.put(
        "/api/products/gallery-images/" + id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Display success message
      setSuccess("Product has been updated");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (!err?.response) {
        setErrmsg("Server not responding");
      } else {
        setErrmsg(err.response.data.message);
      }
    }
  };

  return (
    <div id="popup1" className="overlay">
      <div className="popup">
        <form>
          <div>
            {/* Back button */}
            <span className="back-btn" onClick={() => navigate(-1)}>
              <IoMdArrowRoundBack />
            </span>
          </div>
          {errmsg && (
            // Display warning message if there is an error
            <div className="warning-msg">
              <i className="fa fa-warning"></i>
              {errmsg}
            </div>
          )}
          {success && (
            // Display success message if the operation is successful
            <div className="success-msg">
              <i className="fa fa-check"></i>
              {success}
            </div>
          )}
          <div className="content">
            <div className="show-images">
              {/* Dropzone for uploading images */}
              <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? "active" : ""}`}
              >
                <input {...getInputProps()} />
                {/* Display uploaded images or a prompt */}
                <div className="images-gallery">
                  {uploadedImages.length > 0 ? (
                    uploadedImages.map((image, index) => (
                      <img
                        key={index}
                        src={image.preview}
                        alt={`Uploaded ${index + 1}`}
                      />
                    ))
                  ) : (
                    <p>Drag or click to upload images (up to 10 images)</p>
                  )}
                </div>
              </div>
              {/* Submit button */}
              <div className="form-row submit-btn">
                <button onClick={handleSubmit} className="btn">
                  {isLoading ? <span className="loader"></span> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageGallery;
