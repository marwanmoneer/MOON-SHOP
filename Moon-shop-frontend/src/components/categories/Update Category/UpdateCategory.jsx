import React, { useCallback, useEffect, useState } from "react";
import axios from "../../../api/axios";

import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";

// Component for updating a category
const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [category, setCategory] = useState({
    id: "",
    name: "",
    icon: "",
    color: "",
  });
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const [color, setColor] = useState("");
  const [errmsg, setErrmsg] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/categories/" + id, {
          headers: {
            Accept: "application/json",
          },
        });

        setCategory(res.data);
        setName(res.data.name);
        setColor(res.data.color);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("icon", uploadedImage.file || category.icon);
      formData.append("color", color);

      const response = await axios.put("/api/categories/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Category has been updated");
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

  return (
    <>
      <div>
        <span className="back-btn-dash" onClick={() => navigate(-1)}>
          <IoMdArrowRoundBack />
        </span>
      </div>
      <div className="dash-container-1">
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
        <div className="text">Edit Category</div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="input-data">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Name</label>
            </div>
            <div className="input-data input-color">
              <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? "active" : ""}`}
              >
                <input
                  onChange={(e) => setIcon(e.target.value)}
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
              <img src={category?.icon} alt={category?.icon} />
            </div>
            <div className="form-row"></div>
          </div>
          <div className="form-row">
            <input
              onChange={(e) => setColor(e.target.value)}
              className="input-color"
              defaultValue={color}
              type="color"
              required
            />
            <p id="lable-color" htmlFor="">
              Color
            </p>
          </div>
          <div className="form-row submit-btn">
            <button className="btn">
              {isLoading ? <span className="loader"></span> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateCategory;
