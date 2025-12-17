import api from "../../api/axios";

// export const fetchProducts = async () => {
//     const response = await api.get('/products');
//     return response.data;
// }

// export const fetchProductById = async (productId) => {
//     const response = await api.get(`/products/${productId}`);
//     return response.data;
// }

// export const createProduct = async (productData) => {
//     const response = await api.post('/products', productData);
//     return response.data;
// }

// export const updateProduct = async (productId, productData) => {
//     const response = await api.put(`/products/${productId}`, productData);
//     return response.data;
// }

// export const deleteProduct = async (productId) => {
//     const response = await api.delete(`/products/${productId}`);
//     return response.data;
// }

export const fetchProducts = () => api.get("/products");

export const createProduct = (data) => api.post("/products", data);

export const updateProduct = (id, data) => api.put(`/products/${id}`, data);

export const deleteProduct = (id) => api.delete(`/products/${id}`);