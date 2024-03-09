import styles from "./SearchResults.module.css";
import ProductCard from "../../porducts/ProductCard/ProductCard";
import { useSearch } from "../../../context/FilterContext";

const SearchResults = () => {
  // Access search-related information using the useSearch context hook
  const { query, filteredProducts } = useSearch();

  return (
    // Container for search results with dynamic styles
    <div className={`${styles.container} ${styles.center} ${styles.gap}`}>
      {/* Display the search query in the title */}
      <h3 className={styles.title}>
        Search for "<span className={styles.query}>{query}</span>"
      </h3>
      {/* Section to show search results */}
      <section className={`${styles.results} ${styles.center} ${styles.gap}`}>
        {/* Check if there are filtered products to display */}
        {filteredProducts.length > 0 ? (
          // If there are products, map through and display ProductCard for each
          filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              shortDescription={product.richDescription}
              Image={product.image}
              Price={product.price}
              Brand={product.brand}
              CountInStock={product.countInStock}
            />
          ))
        ) : (
          // If there are no results, display a message
          <div className={styles.message}>
            {/* Icon and text message indicating no results */}
            <span className={`${styles.icon} ${styles.text}`}>
              There are no results for your search, try another search term.
            </span>
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchResults;
