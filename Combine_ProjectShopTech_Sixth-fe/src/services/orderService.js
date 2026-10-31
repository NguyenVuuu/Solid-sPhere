import { API_BASE_URL } from "../config/api";

export const updateShippedDate = async (updateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/admin/update-shipped-date`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      },
      body: JSON.stringify(updateData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update shipped date');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating shipped date:', error);
    throw error;
  }
};

export const getShippedOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/admin/shipped-orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch shipped orders');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching shipped orders:', error);
    throw error;
  }
};
