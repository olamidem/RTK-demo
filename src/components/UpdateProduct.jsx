
import { useState } from "react";
import {
  useUpdateProductMutation,
  useGetProductByIDQuery,
} from "../app/service/dummyData";

// ==========================================
// 1. PARENT CONTAINER (Handles API Fetching)
// ==========================================
const UpdateProduct = ({ productId = 1 }) => {
  const {
    data: initialData,
    isLoading: isFetching,
    isError,
  } = useGetProductByIDQuery(productId);

  if (isFetching) {
    return (
      <div style={styles.centerFlex}>
        <div style={styles.loadingPulse}>
          Loading existing product details...
        </div>
      </div>
    );
  }

  if (isError || !initialData) {
    return (
      <div style={styles.centerFlex}>
        <div style={styles.errorBadge}>
          Oops! Could not find a product with ID #{productId}.
        </div>
      </div>
    );
  }

  // By passing initialData.id as a unique KEY, React will completely
  // remount the Child Form when data loads, initializing state instantly.
  return (
    <ProductEditForm
      key={initialData.id}
      initialData={initialData}
      productId={productId}
    />
  );
};

// ==========================================
// 2. CHILD FORM (Handles State & Formatting)
// ==========================================
const ProductEditForm = ({ initialData, productId }) => {
  const [updateProduct, { data: updatedData, isError, isLoading: isUpdating }] =
    useUpdateProductMutation();

  // Initialize state directly from the freshly resolved database cache
  const [form, setForm] = useState({
    title: initialData.title || "",
    brand: initialData.brand || "",
    category: initialData.category || "",
    price: initialData.price || "",
    stock: initialData.stock || "",
    description: initialData.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price) return;

    try {
      await updateProduct({
        id: productId,
        title: form.title,
        brand: form.brand,
        category: form.category,
        price: Number(form.price),
        stock: Number(form.stock),
        description: form.description,
      }).unwrap();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>Update Product #{productId}</h1>

        <div style={styles.splitGrid}>
          {/* Left Side: Dynamic Form */}
          <form onSubmit={handleUpdate} style={styles.formCard}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Product Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>

            <div style={styles.row}>
              <div style={{ ...styles.inputGroup, flex: 1 }}>
                <label style={styles.label}>Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
              <div style={{ ...styles.inputGroup, flex: 1 }}>
                <label style={styles.label}>Category</label>
                <input
                  type="text"
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.row}>
              <div style={{ ...styles.inputGroup, flex: 1 }}>
                <label style={styles.label}>Price ($) *</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  required
                  min="0"
                  style={styles.input}
                />
              </div>
              <div style={{ ...styles.inputGroup, flex: 1 }}>
                <label style={styles.label}>Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  min="0"
                  style={styles.input}
                />
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
                style={styles.textarea}
              />
            </div>

            {isError && (
              <div style={styles.errorAlert}>
                Failed to apply modifications. Please verify system data.
              </div>
            )}

            <button
              type="submit"
              disabled={isUpdating}
              style={{
                ...styles.submitBtn,
                backgroundColor: isUpdating ? "#94a3b8" : "#2563eb",
                cursor: isUpdating ? "not-allowed" : "pointer",
              }}
            >
              {isUpdating ? "Saving Changes..." : "Apply Updates"}
            </button>
          </form>

          {/* Right Side: Readable Success Card Summary */}
          <div style={styles.displayCard}>
            <h3 style={styles.displayTitle}>Live Change Register</h3>

            {!updatedData && !isUpdating && (
              <div style={styles.emptyState}>
                Adjust the left configuration parameters and submit to generate
                a structured revision summary here.
              </div>
            )}

            {isUpdating && (
              <div style={styles.loadingPulse}>
                Syncing patch record payloads with server instances...
              </div>
            )}

            {updatedData && (
              <div style={styles.receiptBody}>
                <div style={styles.successRibbon}>
                  <span>✓ Server Confirmed Modifications Applied</span>
                </div>

                <div style={styles.receiptRow}>
                  <span style={styles.receiptLabel}>
                    Target Record Identifier
                  </span>
                  <span style={styles.receiptValueEmphasis}>
                    #{updatedData.id}
                  </span>
                </div>

                <div style={styles.receiptRow}>
                  <span style={styles.receiptLabel}>Updated Name</span>
                  <span style={styles.receiptValue}>{updatedData.title}</span>
                </div>

                <div style={styles.receiptRow}>
                  <span style={styles.receiptLabel}>Brand Entity</span>
                  <span style={styles.receiptValue}>{updatedData.brand}</span>
                </div>

                <div style={styles.receiptRow}>
                  <span style={styles.receiptLabel}>System Category</span>
                  <span style={styles.receiptValue}>
                    {updatedData.category}
                  </span>
                </div>

                <div style={styles.receiptRow}>
                  <span style={styles.receiptLabel}>
                    Adjusted Warehouse Count
                  </span>
                  <span style={styles.receiptValue}>
                    {updatedData.stock} items
                  </span>
                </div>

                <div style={styles.divider} />

                <div style={{ marginBottom: "16px" }}>
                  <span style={styles.receiptLabel}>Saved Narrative Block</span>
                  <p style={styles.receiptDescription}>
                    {updatedData.description}
                  </p>
                </div>

                <div style={styles.totalRow}>
                  <span>New Adjusted Valuation</span>
                  <span style={styles.totalPrice}>
                    ${Number(updatedData.price).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. CLEAN UI INLINE JAVASCRIPT STYLES
// ==========================================
const styles = {
  pageBackground: {
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: "48px 24px",
    color: "#334155",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  pageTitle: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: "32px",
  },
  splitGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "32px",
    alignItems: "start",
  },
  formCard: {
    backgroundColor: "#ffffff",
    padding: "28px",
    borderRadius: "16px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  row: {
    display: "flex",
    gap: "16px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#475569",
  },
  input: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
  },
  textarea: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    fontFamily: "inherit",
    outline: "none",
    resize: "vertical",
  },
  submitBtn: {
    color: "#ffffff",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: "600",
    marginTop: "8px",
    transition: "background-color 0.2s ease",
  },
  displayCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "28px",
    border: "1px solid #e2e8f0",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
    minHeight: "400px",
    display: "flex",
    flexDirection: "column",
  },
  displayTitle: {
    margin: "0 0 20px 0",
    color: "#0f172a",
    fontSize: "16px",
    fontWeight: "700",
    borderBottom: "2px solid #f1f5f9",
    paddingBottom: "12px",
  },
  emptyState: {
    margin: "auto",
    textAlign: "center",
    fontSize: "14px",
    color: "#94a3b8",
    maxWidth: "260px",
    lineHeight: "1.6",
  },
  loadingPulse: {
    margin: "auto",
    color: "#2563eb",
    fontSize: "14px",
    fontWeight: "500",
  },
  receiptBody: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  successRibbon: {
    backgroundColor: "#eff6ff",
    color: "#1e40af",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "600",
    marginBottom: "20px",
    textAlign: "center",
  },
  receiptRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px dashed #f1f5f9",
  },
  receiptLabel: {
    fontSize: "13px",
    color: "#64748b",
    fontWeight: "500",
  },
  receiptValue: {
    fontSize: "14px",
    color: "#1e293b",
    fontWeight: "600",
    textAlign: "right",
  },
  receiptValueEmphasis: {
    fontSize: "14px",
    color: "#2563eb",
    backgroundColor: "#eff6ff",
    padding: "2px 8px",
    borderRadius: "6px",
    fontWeight: "700",
  },
  divider: {
    height: "1px",
    backgroundColor: "#e2e8f0",
    margin: "16px 0",
  },
  receiptDescription: {
    fontSize: "13px",
    lineHeight: "1.5",
    color: "#475569",
    marginTop: "6px",
    backgroundColor: "#f8fafc",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #f1f5f9",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: "16px",
    borderTop: "2px solid #2563eb",
    fontSize: "15px",
    fontWeight: "700",
    color: "#0f172a",
  },
  totalPrice: {
    fontSize: "22px",
    fontWeight: "800",
    color: "#2563eb",
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
  errorAlert: {
    backgroundColor: "#fff1f2",
    color: "#e11d48",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "13px",
    fontWeight: "500",
  },
};

export default UpdateProduct;
