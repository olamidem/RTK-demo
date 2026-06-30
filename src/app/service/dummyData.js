import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  endpoints: (builder) => ({
    //get all products (reading data)
    getAllProducts: builder.query({
      query: () => "/products",
    }),
    // get products by ID
    getProductByID: builder.query({
      query: (id) => `/products/${id}`,
    }),
    addNewProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products/add",
        method: "POST",
        body: newProduct,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),

    updateeProduct: builder.mutation({
      query: ({ id, updatedProduct }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: updatedProduct,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIDQuery,
  useAddNewProductMutation,
  useUpdateeProductMutation,
} = productsApi;
