import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_NODE_URL; 

export const getAllReview = async () => {
    try {
        const response = await axios.get(baseUrl,{
            withCredentials: true, 
        });
       
        return response.data;
    } catch (error) {
        console.error("API error:", error);
    }
};

export const getReviewsByProduct = async (productId) => {
  
    
    try {
        const response = await axios.get(`${baseUrl}/product?productId=${productId}`);
    
        return response.data;
    } catch (error) {
        console.error("API error:", error);
    }
};

export const createReview = async (review) => {
    
    
    try {
        const response = await axios.post(baseUrl,review,{
            withCredentials: true, 
        });
     
        return response.data;
    } catch (error) {
        console.error("API error:", error);
    }
};
export const deleteReview = async (productId,reviewId) => {
    
    try {
        const response = await axios.delete(`${baseUrl}?productId=${productId}&reviewId=${reviewId}`,{
            withCredentials: true, 
        });
        return response.data;
    } catch (error) {
        console.error("API error:", error);
    }
};