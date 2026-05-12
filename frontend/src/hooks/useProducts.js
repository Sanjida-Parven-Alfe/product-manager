import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';
import { showSuccess, showError, showLoading, dismissToast } from '../utils/toast';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    total: 0,
  });
  const [search, setSearch] = useState('');

  const fetchProducts = useCallback(async (page = 1, searchQuery = '') => {
    setLoading(true);
    try {
      const { data } = await api.get('/products', {
        params: { page, limit: 9, search: searchQuery },
      });
      setProducts(data.data);
      setPagination(data.pagination);
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProducts(1, search);
    }, 400);
    return () => clearTimeout(delay);
  }, [search, fetchProducts]);

  const createProduct = async (formData) => {
    const toastId = showLoading('Adding product...');
    setFormLoading(true);
    try {
      await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      dismissToast(toastId);
      showSuccess('Product added!');
      fetchProducts(1, search);
      return true;
    } catch (error) {
      dismissToast(toastId);
      showError(error.response?.data?.message || 'Failed to add product');
      return false;
    } finally {
      setFormLoading(false);
    }
  };

  const updateProduct = async (id, formData) => {
    const toastId = showLoading('Updating product...');
    setFormLoading(true);
    try {
      await api.put(`/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      dismissToast(toastId);
      showSuccess('Product updated!');
      fetchProducts(pagination.page, search);
      return true;
    } catch (error) {
      dismissToast(toastId);
      showError(error.response?.data?.message || 'Failed to update product');
      return false;
    } finally {
      setFormLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    const toastId = showLoading('Deleting product...');
    try {
      await api.delete(`/products/${id}`);
      dismissToast(toastId);
      showSuccess('Product deleted!');
      fetchProducts(pagination.page, search);
    } catch (error) {
      dismissToast(toastId);
      showError(error.response?.data?.message || 'Failed to delete product');
    }
  };

  const handlePageChange = (page) => {
    fetchProducts(page, search);
  };

  return {
    products,
    loading,
    formLoading,
    pagination,
    search,
    setSearch,
    createProduct,
    updateProduct,
    deleteProduct,
    handlePageChange,
  };
};

export default useProducts;