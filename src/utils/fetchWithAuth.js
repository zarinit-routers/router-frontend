export const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem('jwtToken');
    
    if (!token) {
      throw new Error('No authentication token found');
    }
  
    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  
    const response = await fetch(url, {
      ...options,
      headers,
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
  
    return response.json();
  };
  