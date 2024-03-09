import { Link } from "react-router-dom";
import { useShoppingCart } from "../../../context/ShoppingCartContext";
import "./ProductCard.css";
import { FaCartShopping } from "react-icons/fa6";
import { MdDelete, MdDoneOutline } from "react-icons/md";

const ProductCard = ({
  id,
  name,
  shortDescription,
  Image,
  Price,
  Brand,
  CountInStock,
}) => {
  // Access shopping cart context to manage item quantity and actions
  const { getItemQuantity, increaseCartQuantity, removeFromCart } =
    useShoppingCart();

  // Get the quantity of the current item in the shopping cart
  const quantity = getItemQuantity(id);

  return (
    <div key={id} className="product-card">
      {/* Product badge - Uncomment and customize if needed */}
      {/* <div className="badge">Hot</div> */}
      
      {/* Product thumbnail */}
      <div className="product-tumb">
        <Link to={`/product/${id}`}>
          <img src={Image} alt={Image} />
        </Link>
      </div>

      {/* Product details */}
      <div className="product-details">
        <span className="product-catagory">{Brand}</span>
        <h4>
          {/* Link to the product details page */}
          <Link to={`/product/${id}`}>{name}</Link>
        </h4>
        
        {/* Product price and action buttons */}
        <div className="product-bottom-details">
          <div className="product-price">${Price}</div>

          {/* Action buttons based on item quantity in the cart */}
          <div className="product-links">
            <div className="your-component">
              {/* If the item is not in the cart, display the add-to-cart button */}
              {quantity === 0 ? (
                <p onClick={() => increaseCartQuantity(id)}>
                  <FaCartShopping className="add-icon" />
                </p>
              ) : (
                // If the item is already in the cart, display the remove-from-cart button
                <p className="hover-icon">
                  <MdDoneOutline className="Correct-icon" />
                  <MdDelete
                    onClick={() => removeFromCart(id)}
                    className="delete-icon add-icon"
                  />
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
