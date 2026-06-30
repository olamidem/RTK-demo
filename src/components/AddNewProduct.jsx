import { useState } from "react";
import { useAddNewProductMutation } from "../app/service/dummyData";

const AddNewProduct = () => {
  const [addNewProduct, { data, isError, isLoading }] =
    useAddNewProductMutation();

  // Local state to capture form inputs dynamically
  const [form, setForm] = useState({
    title: "",
    brand: "",
    category: "",
    price: "",
    stock: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault(); // Prevent page refresh on submit

    // Quick validation
    if (!form.title || !form.price) return;

    try {
      const newProductData = {
        title: form.title,
        brand: form.brand || "Generic Brand",
        category: form.category || "General",
        price: Number(form.price),
        stock: Number(form.stock) || 1,
        description: form.description || "No description provided.",
        images: ["https://placehold.co/600x400?text=New+Product"],
      };

      await addNewProduct(newProductData).unwrap();

      // Reset form on success
      setForm({
        title: "",
        brand: "",
        category: "",
        price: "",
        stock: "",
        description: "",
      });
    } catch (error) {
      console.error("Error Adding Product", error);
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        <h1 style={styles.pageTitle}>Create New Product</h1>

        <div style={styles.splitGrid}>
          {/* Left Side: The Interactive Form */}
          <form onSubmit={handleAddProduct} style={styles.formCard}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Product Title *</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Wireless Noise-Cancelling Headphones"
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
                  placeholder="e.g. Sony"
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
                  placeholder="e.g. Electronics"
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
                  placeholder="99.99"
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
                  placeholder="50"
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
                placeholder="Write a brief overview of the product..."
                rows="4"
                style={styles.textarea}
              />
            </div>

            {isError && (
              <div style={styles.errorAlert}>
                Failed to add product. Please try again.
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                ...styles.submitBtn,
                backgroundColor: isLoading ? "#94a3b8" : "#0f172a",
                cursor: isLoading ? "not-allowed" : "pointer",
              }}
            >
              {isLoading ? "Adding Product..." : "Create Product"}
            </button>
          </form>

          {/* Right Side: Data Response Output Window */}
          <div style={styles.responseContainer}>
            <h3 style={styles.responseTitle}>Server Response Status</h3>

            {!data && !isLoading && !isError && (
              <div style={styles.emptyState}>
                Fill out the form and submit to view the API response payloads
                here.
              </div>
            )}

            {isLoading && (
              <div style={styles.loadingPulse}>
                Sending mutation request payload to server...
              </div>
            )}

            {data && (
              <div style={styles.successWrapper}>
                <div style={styles.successBadge}>
                  ✓ Success: Product Created (Mocked)
                </div>
                <pre style={styles.jsonBlock}>
                  {JSON.stringify(data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};;

// CSS-in-JS style object
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
    gap: "20px",
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
    color: "#0f172a",
    outline: "none",
    transition: "border-color 0.15s ease",
  },
  textarea: {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    color: "#0f172a",
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
  responseContainer: {
    backgroundColor: "#0f172a",
    borderRadius: "16px",
    padding: "24px",
    color: "#94a3b8",
    minHeight: "400px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.2)",
  },
  responseTitle: {
    margin: "0 0 16px 0",
    color: "#f8fafc",
    fontSize: "14px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    borderBottom: "1px solid #334155",
    paddingBottom: "12px",
  },
  emptyState: {
    margin: "auto",
    textAlign: "center",
    fontSize: "14px",
    color: "#475569",
    maxWidth: "260px",
    lineHeight: "1.5",
  },
  loadingPulse: {
    margin: "auto",
    color: "#38bdf8",
    fontSize: "14px",
    fontWeight: "500",
  },
  successWrapper: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  successBadge: {
    backgroundColor: "#065f46",
    color: "#34d399",
    padding: "8px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: "600",
    marginBottom: "16px",
  },
  jsonBlock: {
    margin: 0,
    backgroundColor: "#1e293b",
    padding: "16px",
    borderRadius: "8px",
    color: "#38bdf8",
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
    fontSize: "13px",
    overflowX: "auto",
    lineHeight: "1.5",
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

export default AddNewProduct;
