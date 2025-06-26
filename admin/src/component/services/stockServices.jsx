import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL+"/stocks";

export const getAllStocks = async () => {
    try {
        const response = await axios.get(API_URL,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
       
        return response.status === 200 ? response.data : null;
    } catch (error) {
        console.log(error);
    }
}
export const getAllStocksByProduct = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/product/${id}`,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
       
        return response.status === 200 ? response.data : null;
    } catch (error) {
        console.log(error);
    }
}
export const addStock = (stock) => {
    return axios.post(`${API_URL}`, stock,{
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true,
    });
}

export const editStock = async(id,quantity) => {
    try {
        const response = await axios.patch(`${API_URL}/${id}/quantity/${quantity}`,{},{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        if (response) {
        
            return response.status;
        }
    } catch (error) {
        console.log(error);
    }
 
}
export const deleteStock = async(id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`,{},{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        if (response) {
            
            return response;
        }
    } catch (error) {
        console.log(error);
    }
 
}