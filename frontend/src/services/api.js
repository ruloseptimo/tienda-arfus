import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const fetchProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const createProduct = async (productData) => {
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
};

export const deleteProduct = async (productId) => {
    const response = await axios.delete(`${API_URL}/products/${productId}`);
    return response.data;
};

export const fetchBuyers = async () => {
    const response = await axios.get(`${API_URL}/queries/transaction-report`);
    return response.data;
};


// Reporte de productos con precio > 50 y stock < 20
export const fetchProductsReport = async () => {
    const response = await axios.get(`${API_URL}/queries/products-report`);
    return response.data;
};