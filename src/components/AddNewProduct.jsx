import { useAddNewProductMutation } from "../app/service/dummyData";

const AddNewProduct = () => {
  const [addNewProduct, { data, isError, isLoading }] =
    useAddNewProductMutation();

  if (isError) {
    console.error("Error Adding Product");
  }
  if (isLoading) {
    console.log("Adding Product...");
  }
  const handleAddProduct = async () => {
    try {
      const newProductData = {
        title: "New Product",
        description: "New Product Description",
        price: 100,
        stock: 10,
        images: ["https://example.com/image.jpg"],
        category: "New Category",
        brand: "New Brand",
      };
      await addNewProduct(newProductData);
    } catch (error) {
      console.error("Error Adding Product", error);
    }
  };

  return (
    <div>
      <h1>AddNewProduct</h1>
      <button onClick={handleAddProduct} disabled={isLoading}>
        Add New Product
      </button>
    </div>
  );
};

export default AddNewProduct;
