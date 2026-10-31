// Mock Product Service - Thay thế các API calls bằng mock data
import { mockProducts, getProductById } from '../mockData/products';
import { getProductById as getProductByIdAPI } from '../apis/productApi';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Lấy sản phẩm theo ID với chi tiết đầy đủ
 * @param {number|string} id - ID của sản phẩm
 * @returns {Promise<Object>} Dữ liệu sản phẩm
 */
export const getProductByIdWithDetails = async (id) => {
  await delay();
  
  try {
    // Try to get from real API first
    const apiProduct = await getProductByIdAPI(id);
    
    if (apiProduct) {
      // Transform API response to match expected format
      const transformedProduct = {
        productID: apiProduct.id,
        productName: apiProduct.name,
        categoryName: apiProduct.category?.name || 'Laptop',
        seriesName: apiProduct.seriesName || 'Premium',
        price: apiProduct.unitPrice?.toLocaleString('vi-VN') + '₫' || '0₫',
        image: apiProduct.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image',
        description: apiProduct.description || 'No description available',
        attributeList: apiProduct.attributeList || 'No attributes available',
        stock: apiProduct.stock || 0,
        brand: apiProduct.brand || 'Unknown',
        unitPrice: apiProduct.unitPrice || 0
      };
      
      return {
        EC: 1,
        EM: 'Success',
        DT: [transformedProduct]
      };
    }
    
    // Fallback to mock data
    const product = getProductById(id);
    
    if (product) {
      return {
        EC: 1,
        EM: 'Success',
        DT: [product]
      };
    }
    
    return {
      EC: 0,
      EM: 'Product not found',
      DT: []
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    
    // Fallback to mock data on error
    try {
      const product = getProductById(id);
      
      if (product) {
        return {
          EC: 1,
          EM: 'Success',
          DT: [product]
        };
      }
    } catch (mockError) {
      console.error("Error fetching from mock data:", mockError);
    }
    
    return {
      EC: 0,
      EM: 'Error fetching product',
      DT: []
    };
  }
};

/**
 * Lấy chi tiết sản phẩm theo ID
 * @param {number|string} id - ID của sản phẩm
 * @returns {Promise<Object>} Dữ liệu chi tiết sản phẩm
 */
export const getProductDetailById = async (id) => {
  await delay();
  
  try {
    // Try to get from real API first
    const apiProduct = await getProductByIdAPI(id);
    
    if (apiProduct) {
      // Transform API response to match expected format
      const transformedProduct = {
        productID: apiProduct.id,
        productName: apiProduct.name,
        categoryName: apiProduct.category?.name || 'Laptop',
        seriesName: apiProduct.seriesName || 'Premium',
        price: apiProduct.unitPrice?.toLocaleString('vi-VN') + '₫' || '0₫',
        image: apiProduct.imageUrl || 'https://via.placeholder.com/400x300?text=No+Image',
        description: apiProduct.description || 'No description available',
        attributeList: apiProduct.attributeList || 'No attributes available',
        stock: apiProduct.stock || 0,
        brand: apiProduct.brand || 'Unknown',
        unitPrice: apiProduct.unitPrice || 0
      };
      
      return {
        EC: 1,
        EM: 'Success',
        DT: [transformedProduct]
      };
    }
    
    // Fallback to mock data
    const product = getProductById(id);
    
    if (product) {
      return {
        EC: 1,
        EM: 'Success',
        DT: [product]
      };
    }
    
    return {
      EC: 0,
      EM: 'Product not found',
      DT: []
    };
  } catch (error) {
    console.error("Error fetching product detail:", error);
    
    // Fallback to mock data on error
    try {
      const product = getProductById(id);
      
      if (product) {
        return {
          EC: 1,
          EM: 'Success',
          DT: [product]
        };
      }
    } catch (mockError) {
      console.error("Error fetching from mock data:", mockError);
    }
    
    return {
      EC: 0,
      EM: 'Error fetching product detail',
      DT: []
    };
  }
};

/**
 * Lấy tất cả sản phẩm
 * @returns {Promise<Object>} Danh sách sản phẩm
 */
export const getAllProducts = async () => {
  await delay();
  
  try {
    return {
      EC: 1,
      EM: 'Success',
      DT: mockProducts
    };
  } catch (error) {
    console.error("Error fetching all products:", error);
    return {
      EC: 0,
      EM: 'Error fetching products',
      DT: []
    };
  }
};

/**
 * Lấy sản phẩm theo category
 * @param {string} categoryName - Tên category
 * @returns {Promise<Object>} Danh sách sản phẩm
 */
export const getProductsByCategory = async (categoryName) => {
  await delay();
  
  try {
    const products = mockProducts.filter(
      p => p.categoryName.toLowerCase() === categoryName.toLowerCase()
    );
    
    return {
      EC: 1,
      EM: 'Success',
      DT: products
    };
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return {
      EC: 0,
      EM: 'Error fetching products',
      DT: []
    };
  }
};

// Updated: 2025-10-12T16:06:39.518Z

// Updated: 2025-10-12T16:08:45.747Z
