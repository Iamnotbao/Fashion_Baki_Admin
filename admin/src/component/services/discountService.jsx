import axios from 'axios';
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
const url = import.meta.env.VITE_WEBSOCKET_PATH;
let stompClient = null


const API_BASE_URL = import.meta.env.VITE_API_URL+'/discount-codes';


export const createDiscountCode = async (discount) => {
    console.log("discount code: ", discount);   
    
    try {
        const response = await axios.post(API_BASE_URL, discount,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log("create discount code response: ", response.data);
        
        return response.data;
    }
    catch (error) {
        console.error("Error creating discount code:", error);
        throw error;
    }
}
export const getAllDiscountCode = async () => {
    try {
        const response = await axios.get(API_BASE_URL,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log("get all discount code response: ", response.data);
        
        return response.data;
    } catch (error) {
        console.error("Error creating discount code:", error);
        throw error;
    }
}
export const updateDiscountCode = async (id, discount) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${id}`, discount,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log("update discount code response: ", response.data);
        
        return response.data;
    }
    catch (error) {
        console.error("Error creating discount code:", error);
        throw error;
    }

}
export const deleteDiscountCode = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/${id}`,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log("delete discount code response: ", response);
        return response.status === 204 ? response.status : "";
    }
    catch (error) {
        console.error("Error creating discount code:", error);
        throw error;
    }

}
export const getDiscountCodeById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log("get discount code by id response: ", response.data);
        
        return response.data;
    }
    catch (error) {
        console.error("Error creating discount code:", error);
        throw error;
    }
}
export const getDiscountCodeByCode = async (code) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/code/${code}`,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        console.log("get discount code by code response: ", response.data);
        
        return response.data;
    }   
    catch (error) {
        console.error("Error creating discount code:", error);
        throw error;
    }
   
}



export const connectWebSocket = async (userId, onMessage) => {
    const socket = new SockJS(url)
    stompClient = Stomp.over(socket)
    stompClient.connect({},() => {
        console.log("Connected to WebSocket")
        
        stompClient.subscribe(`/user/${userId}/queue/discount-assigned`, (message) => {
            const body = JSON.parse(message.body)
            onMessage(body)
    })
})
}

export const disconnectWebSocket = () => {
    if (stompClient && stompClient.connected) {
        stompClient.disconnect(() => {
            console.log("Disconnected from WebSocket")
        })
    }
}

export const sendNotification = (payload) => {
    if (stompClient && stompClient.connected) {
        stompClient.send(`/app/admin-assign-discount`, {}, JSON.stringify(payload))
    } else {
        console.error("WebSocket is not connected")
    }
}

