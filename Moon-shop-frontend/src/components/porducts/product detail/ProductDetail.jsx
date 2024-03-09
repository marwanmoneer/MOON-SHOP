import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../../api/axios";

import { MdDoneOutline } from "react-icons/md";
import "./ProductDetail.css";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import { IoMdArrowRoundBack } from "react-icons/io";

const ProductDetail = () => {
  // Extracting the product ID from the URL parameters
  const { id } = useParams();
  // Accessing shopping cart functionality from the context
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();
  // State to store the details of the product
  const [product, setProduct] = useState([]);
  // Hook for navigation within the app
  const navigate = useNavigate();

  // Fetching product details when the component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/api/products/" + id);
        setProduct(res.data);
      } catch (error) {
        console.log("error message:", error);
      }
    };

    getData();
  }, [id]);

  // State to manage the currently displayed image
  const [currentImg, setCurrentImg] = useState(product?.image);

  // Handling thumbnail clicks to change the displayed image
  const handleThumbnailClick = (image) => {
    setCurrentImg(image);
  };

  // Retrieving the quantity of the product in the shopping cart
  const quantity = getItemQuantity(id);

  return (
    <div>
      <div className="card-wrapper">
        <div className="card">
          <div className="product-imgs">
            {/* Back button to navigate to the previous page */}
            <div>
              <span className="back-btn" onClick={() => navigate(-1)}>
                <IoMdArrowRoundBack />
              </span>
            </div>
            <div className="img-display">
              {/* Displaying the currently selected image */}
              <div className="img-showcase">
                <img
                  src={currentImg || product?.image}
                  alt={currentImg || product?.image}
                />
              </div>
            </div>
            <div className="img-select">
              {/* Displaying thumbnails for product images */}
              {product?.images &&
                product?.images.map((image, index) => (
                  <div
                    key={index}
                    className={`img-item ${
                      currentImg === image ? "active" : ""
                    }`}
                    onClick={() => handleThumbnailClick(image)}
                  >
                    <img
                      src={image}
                      className="shoe-image"
                      alt={`shoe image ${index + 1}`}
                    />
                  </div>
                ))}
            </div>
          </div>

          <div className="product-content">
            {/* Product details including name, description, price, and brand */}
            <h2 className="product-title">{product?.name}</h2>
            <div className="product-rating">
              <p className="new-price">{product?.richDescription}</p>
            </div>

            <div className="product-price">
              <p className="new-price">
                Price: <span>${product?.price}</span>
              </p>
            </div>

            <div className="product-detail">
              <p>{product.description}</p>

              {/* Additional details such as brand and category */}
              <ul className="list-br">
                <li>
                  Brand: <span>{product?.brand}</span>
                </li>
                <li>
                  Category: <span>{product?.category?.name || "NA"}</span>
                </li>
              </ul>
            </div>

            <div className="purchase-info">
              {/* Add to Cart button or quantity input based on whether the product is in the cart */}
              {quantity === 0 ? (
                <button
                  onClick={() => increaseCartQuantity(id)}
                  type="button"
                  className="btn"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="quantity ">
                  <div className="input-group quantity-field">
                    <button
                      onClick={() => decreaseCartQuantity(id)}
                      className="btn-cart"
                    >
                      -
                    </button>
                    <p className="inp-cart">{quantity}</p>
                    <button
                      onClick={() => increaseCartQuantity(id)}
                      className="btn-cart"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
