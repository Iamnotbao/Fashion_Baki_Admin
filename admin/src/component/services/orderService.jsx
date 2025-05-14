import axios from  'axios';


const API_BASE_URL = import.meta.env.VITE_API_URL+'/service/orders';


export const getAllOrder =async()=>{
    const response = await axios.get(API_BASE_URL,{
        headers: {
            'Content-Type': 'application/json',
        },withCredentials: true
    });
    return response.data;
}
export const getOrderById =async(id)=>{
    const response = await axios.get(`${API_BASE_URL}/${id}`,{
        headers: {
            'Content-Type': 'application/json',
        },withCredentials: true
    });
    return response.data;
}
 
export const changeOrderStatus =async(id,status)=>{
    const response = await axios.put(`${API_BASE_URL}/${id}/${status}`,{
        headers: {
            'Content-Type': 'application/json',
        },withCredentials: true
    });
    return response.data;
}

