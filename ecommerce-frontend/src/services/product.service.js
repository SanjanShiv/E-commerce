import api from "./api";

const getAllProducts = () => {
  return api.get("/products");
};

const getProduct = (id) => {
  return api.get(`/products/${id}`);
};

const createProduct = (data) => {
  return api.post("/products", data);
};

const updateProduct = (id, data) => {
  return api.put(`/products/${id}`, data);
};

const deleteProduct = (id) => {
  return api.delete(`/products/${id}`);
};

const ProductService = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default ProductService;
