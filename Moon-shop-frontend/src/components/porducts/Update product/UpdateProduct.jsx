import { useCallback, useEffect, useState } from "react";
import "./UpdateProduct.css";
import { useDropzone } from "react-dropzone";
import ImageGallery from "../Images gallery/ImageGallery";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "../../../api/axios";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const [errmsg, setErrmsg] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [name, SetName] = useState();
  const [richDescription, SetRichDescription] = useState("");
  const [description, SetDescription] = useState("");
  const [image, setImage] = useState(null);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [category, setCategory] = useState("");
  const [productId, setProductId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [uploadedImage, setUploadedImage] = useState(null);
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadedImage({
        file,
        preview: URL.createObjectURL(file),
      });

      setImage(file.name);
    },
    [setImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  // Fetch categories from the server
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

  // Fetch product details based on the provided ID
  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const res = await axios.get("/api/products/" + id, {
          headers: {
            Accept: "application/json",
          },
        });
        const productData = res.data;
        setProducts(productData);
        // Update default values
        SetName(productData.name);
        SetRichDescription(productData.richDescription);
        SetDescription(productData.description);
        setBrand(productData.brand);
        setPrice(productData.price);
        setCountInStock(productData.countInStock);
        setCategory(productData.category?.id);
        // Assuming there's only one image
        setUploadedImage({
          file: productData.image,
          preview: productData.image, // or whatever your image path is
        });
      } catch (error) {
        console.error(error);
      }
    };
    getProductDetails();
  }, [id]);

  const [isGalleryVisible, setGalleryVisible] = useState(false);

  // Handle form submission
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

      const response = await axios.put("/api/products/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setSuccess("Product has been updated");
      setProductId(response.data._id);
      setGalleryVisible(true);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (!err?.response) {
        setErrmsg("Server not responsive");
      } else {
        setErrmsg(err.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="dash-container-1">
        {/* Display error and success messages */}
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

        {/* Back button to navigate to the previous page */}
        <div>
          <span className="back-btn" onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack />
          </span>
        </div>

        {/* Title of the page */}
        <div className="text">Edit Product</div>

        {/* Form for updating product details */}
        <form onSubmit={handleSubmit}>
          {/* Form input fields */}
          <div className="form-row">
            <div className="input-data">
              <input
                defaultValue={products.name}
                onChange={(e) => SetName(e.target.value)}
                type="text"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Name</label>
            </div>
            <div className="input-data">
              <input
                defaultValue={products.richDescription}
                onChange={(e) => SetRichDescription(e.target.value)}
                type="text"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Short description</label>
            </div>
          </div>
          <div className="form-row">
            <div className="input-data">
              <input
                defaultValue={products.brand}
                onChange={(e) => setBrand(e.target.value)}
                type="text"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Brand</label>
            </div>
            <div className="input-data">
              <input
                defaultValue={products.price}
                onChange={(e) => setPrice(e.target.value)}
                type="number"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Price</label>
            </div>
            <div className="input-data">
              <input
                defaultValue={products.countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                type="number"
                required
              />
              <div className="underline"></div>
              <label htmlFor="">Stock</label>
            </div>
            <div className="input-data">
              <div className="category-select">
                <select
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option disabled selected>
                    Select Category
                  </option>
                  {categories.map((category) => (
                    <option
                      key={category.id}
                      value={category.id}
                      selected={
                        products?.category?.id
                          ? category.id === products?.category?.id
                          : false
                      }
                    >
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div>
              <div className="row">
                <textarea
                  cols="140"
                  name="fancy-textarea"
                  id="fancy-textarea"
                  onChange={(e) => SetDescription(e.target.value)}
                  defaultValue={products.description}
                ></textarea>
                <label htmlFor="fancy-textarea">Description</label>
              </div>
            </div>
          </div>
          <div className="form-row">
            <div className="show-image">
              {/* Dropzone for image upload */}
              <div
                {...getRootProps()}
                className={`dropzone ${isDragActive ? "active" : ""}`}
              >
                <input
                  onChange={(e) => setImage(e.target.value || image)}
                  {...getInputProps()}
                />
                {/* Display the uploaded image or a message */}
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

            {/* Display the image gallery component */}
            {isGalleryVisible && <div className=""><ImageGallery id={productId} /></div>}
          </div>
          <div className="from-row">
            {/* Display existing images in the product */}
            <div className="show-images images-gallery  ">
              {products?.images &&
                products?.images.map((image) => <img src={image} />)}
            </div>
          </div>

          {/* Display the update button if the image gallery is not visible */}
          {!isGalleryVisible && (
            <div className="form-row submit-btn">
               <button className="btn">{isLoading ? <span className="loader"></span> : "Update"}</button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default UpdateProduct;
