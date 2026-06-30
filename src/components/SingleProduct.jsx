import { useGetProductByIDQuery } from "../app/service/dummyData";

const SingleProduct = ({ productId = 1 }) => {
  // Pass the ID to the RTK Query hook
  const {
    data: product,
    isError,
    isLoading,
  } = useGetProductByIDQuery(productId);

  // Skeleton Loading State for Single Product View
  if (isLoading) {
    return (
      <div style={styles.container}>
        <div style={styles.splitLayout}>
          <div
            style={{
              ...styles.skeleton,
              aspectRatio: "1/1",
              borderRadius: "16px",
            }}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div style={{ ...styles.skeleton, width: "40%", height: "20px" }} />
            <div style={{ ...styles.skeleton, width: "80%", height: "36px" }} />
            <div style={{ ...styles.skeleton, width: "25%", height: "28px" }} />
            <div
              style={{
                ...styles.skeleton,
                width: "100%",
                height: "80px",
                marginTop: "12px",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={styles.centerFlex}>
        <div style={styles.errorBadge}>
          Oops! Could not load product details. Please try again.
        </div>
      </div>
    );
  }

  // Fallback if data structure is missing
  if (!product) return null;

  const isLowStock = product.stock <= 10;

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        {/* Back Link / Breadcrumb placeholder */}
        <div style={styles.breadcrumb}>
          <span>Products</span> &rarr;{" "}
          <span style={{ color: "#0f172a", fontWeight: "500" }}>
            {product.category}
          </span>
        </div>

        <div style={styles.splitLayout}>
          {/* Left Column: Image Showcase */}
          <div style={styles.imageSection}>
            <div style={styles.mainImageWrapper}>
              <img
                src={product.thumbnail}
                alt={product.title}
                style={styles.mainImage}
              />
              <span style={styles.categoryBadge}>{product.category}</span>
            </div>

            {/* Optional Small Thumbnail Strip if images array exists */}
            {product.images && product.images.length > 1 && (
              <div style={styles.thumbnailStrip}>
                {product.images.slice(0, 4).map((img, index) => (
                  <div key={index} style={styles.smallThumbWrapper}>
                    <img
                      src={img}
                      alt={`${product.title} view ${index + 1}`}
                      style={styles.smallThumb}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Detailed Product Info */}
          <div style={styles.infoSection}>
            <div style={styles.metaRow}>
              <span style={styles.brandText}>{product.brand}</span>
              <div style={styles.ratingBadge}>
                ★ {product.rating} <span style={styles.ratingScale}>/ 5</span>
              </div>
            </div>

            <h1 style={styles.productTitle}>{product.title}</h1>

            <div style={styles.priceRow}>
              <span style={styles.priceText}>
                ${product.price?.toLocaleString()}
              </span>
              <span
                style={{
                  ...styles.stockBadge,
                  color: isLowStock ? "#e11d48" : "#059669",
                  backgroundColor: isLowStock ? "#fff1f2" : "#ecfdf5",
                }}
              >
                {product.stock > 0
                  ? `${product.stock} units available`
                  : "Out of stock"}
              </span>
            </div>

            <div style={styles.divider} />

            <div style={styles.descriptionBlock}>
              <h3 style={styles.sectionHeading}>Description</h3>
              <p style={styles.descriptionText}>{product.description}</p>
            </div>

            {/* Simulated Action Area */}
            <div style={styles.actionArea}>
              <button
                style={styles.primaryButton}
                disabled={product.stock === 0}
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
              <button style={styles.secondaryButton}>Save to Wishlist</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// CSS-in-JS style object
const styles = {
  pageBackground: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: "#334155",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "40px 24px",
  },
  breadcrumb: {
    fontSize: "14px",
    color: "#64748b",
    marginBottom: "24px",
    textTransform: "capitalize",
  },
  splitLayout: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "48px",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    border: "1px solid #e2e8f0",
    padding: "32px",
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",
  },
  imageSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  mainImageWrapper: {
    position: "relative",
    aspectRatio: "1 / 1",
    backgroundColor: "#f1f5f9",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #f1f5f9",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  categoryBadge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(4px)",
    color: "#0f172a",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "uppercase",
    padding: "6px 12px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  },
  thumbnailStrip: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
  },
  smallThumbWrapper: {
    aspectRatio: "1 / 1",
    backgroundColor: "#f1f5f9",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #e2e8f0",
    cursor: "pointer",
  },
  smallThumb: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  brandText: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
  ratingBadge: {
    backgroundColor: "#fef3c7",
    color: "#d97706",
    fontWeight: "700",
    fontSize: "13px",
    padding: "4px 8px",
    borderRadius: "8px",
  },
  ratingScale: {
    color: "#f59e0b",
    fontWeight: "400",
    fontSize: "11px",
  },
  productTitle: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#0f172a",
    margin: "0 0 16px 0",
    lineHeight: "1.2",
  },
  priceRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
  },
  priceText: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f172a",
  },
  stockBadge: {
    fontSize: "12px",
    fontWeight: "600",
    padding: "4px 10px",
    borderRadius: "9999px",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e2e8f0",
    marginBottom: "24px",
  },
  descriptionBlock: {
    marginBottom: "32px",
  },
  sectionHeading: {
    fontSize: "14px",
    fontWeight: "700",
    color: "#0f172a",
    textTransform: "uppercase",
    margin: "0 0 8px 0",
    letterSpacing: "0.05em",
  },
  descriptionText: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#475569",
    margin: 0,
  },
  actionArea: {
    display: "flex",
    gap: "12px",
  },
  primaryButton: {
    flex: 2,
    backgroundColor: "#0f172a",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    padding: "14px 24px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: "transparent",
    color: "#334155",
    border: "1px solid #cbd5e1",
    borderRadius: "12px",
    padding: "14px 24px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  centerFlex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "400px",
  },
  errorBadge: {
    backgroundColor: "#fef2f2",
    color: "#dc2626",
    padding: "12px 24px",
    borderRadius: "12px",
    fontWeight: "500",
    border: "1px solid #fee2e2",
  },
  skeleton: {
    backgroundColor: "#e2e8f0",
    borderRadius: "8px",
  },
};

export default SingleProduct;
