import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const apiUrl = import.meta.env.VITE_API_URL;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${apiUrl}/api/` }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ _id }) => ({ type: "Product", id: _id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    addProduct: builder.mutation({
      query: (formData) => ({
        url: "products",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation({
      query: ({ id, formData }) => ({
        url: `products/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        // { type: "Product", id: "LIST" }, 
      ],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
  }),
});

// Export hooks
export const {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} = productsApi;
