import { useGetAllProductsQuery } from "../app/service/dummyData";

const AllProducts = () => {
  const { data, isError, isLoading } = useGetAllProductsQuery();
  // Skeleton Loading State using inline styles
  if (isLoading) {
    return (
      <div style={styles.container}>
        <div
          style={{
            ...styles.skeleton,
            width: "180px",
            height: "32px",
            marginBottom: "32px",
          }}
        />
        <div style={styles.grid}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ ...styles.card, borderColor: "#f1f5f9" }}>
              <div
                style={{
                  ...styles.skeleton,
                  aspectRatio: "1/1",
                  width: "100%",
                  borderRadius: "12px",
                }}
              />
              <div
                style={{
                  ...styles.skeleton,
                  width: "70%",
                  height: "16px",
                  marginTop: "16px",
                }}
              />
              <div
                style={{
                  ...styles.skeleton,
                  width: "40%",
                  height: "16px",
                  marginTop: "8px",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div style={styles.centerFlex}>
        <div style={styles.errorBadge}>
          Oops! Something went wrong while fetching the products.
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        {/* Header Section */}
        <div style={styles.header}>
          <h1 style={styles.title}>All Products</h1>
          <p style={styles.itemCount}>
            Showing {data?.products?.length || 0} items
          </p>
        </div>

        {/* Product Grid */}
        <div style={styles.grid}>
          {data?.products?.map((product) => {
            const isLowStock = product.stock <= 10;

            return (
              <div key={product.id} style={styles.card}>
                {/* Product Image Container */}
                <div style={styles.imageContainer}>
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={styles.image}
                    loading="lazy"
                  />
                  <span style={styles.categoryBadge}>{product.category}</span>
                </div>

                {/* Product Details Wrapper */}
                <div style={styles.detailsContainer}>
                  <div style={styles.metaRow}>
                    <p style={styles.brandText}>{product.brand}</p>
                    <div style={styles.ratingBadge}>★ {product.rating}</div>
                  </div>

                  <h3 style={styles.productTitle}>{product.title}</h3>
                  <p style={styles.description}>{product.description}</p>

                  {/* Pricing & Stock Footer */}
                  <div style={styles.footerRow}>
                    <p style={styles.priceText}>
                      ${product.price.toLocaleString()}
                    </p>
                    <p
                      style={{
                        ...styles.stockBadge,
                        color: isLowStock ? "#e11d48" : "#059669",
                        backgroundColor: isLowStock ? "#fff1f2" : "#ecfdf5",
                      }}
                    >
                      {product.stock > 0
                        ? `${product.stock} left`
                        : "Out of stock"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Clean, organized JavaScript inline styles object
const styles = {
  pageBackground: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "48px 24px",
  },
  header: {
    display: "flex",
    justifyContent: "between",
    alignItems: "baseline",
    borderBottom: "1px solid #e2e8f0",
    paddingBottom: "24px",
    marginBottom: "32px",
  },
  title: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
  },
  itemCount: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
    marginLeft: "auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "24px",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "16px",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  imageContainer: {
    position: "relative",
    aspectRatio: "1 / 1",
    backgroundColor: "#f1f5f9",
    borderRadius: "12px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  categoryBadge: {
    position: "absolute",
    top: "8px",
    left: "8px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(4px)",
    color: "#334155",
    fontSize: "10px",
    fontWeight: "600",
    textTransform: "uppercase",
    padding: "4px 8px",
    borderRadius: "6px",
    border: "1px solid #f1f5f9",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    paddingTop: "16px",
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px",
  },
  brandText: {
    fontSize: "11px",
    fontWeight: "500",
    color: "#94a3b8",
    textTransform: "uppercase",
    margin: 0,
  },
  ratingBadge: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#fef3c7",
    color: "#d97706",
    fontWeight: "600",
    fontSize: "12px",
    padding: "2px 6px",
    borderRadius: "6px",
  },
  productTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1e293b",
    margin: "0 0 4px 0",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  description: {
    fontSize: "13px",
    color: "#64748b",
    margin: "0 0 16px 0",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    height: "48px", // Ensures strict structural height parity
  },
  footerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: "12px",
    borderTop: "1px solid #f1f5f9",
  },
  priceText: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#0f172a",
    margin: 0,
  },
  stockBadge: {
    fontSize: "11px",
    fontWeight: "500",
    padding: "2px 8px",
    borderRadius: "9999px",
    margin: 0,
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
    borderRadius: "4px",
    animation: "pulse 1.5s infinite ease-in-out",
  },
};

export default AllProducts;
