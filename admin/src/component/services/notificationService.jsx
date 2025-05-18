
import SockJS from 'sockjs-client'
import { Stomp } from '@stomp/stompjs'
const url = import.meta.env.VITE_WEBSOCKET_PATH;


let stompClient = null
export const connectWebSocket = async (userId, onMessage) => {
    const socket = new SockJS(url)
    stompClient = Stomp.over(socket)
    stompClient.connect({},() => {
        console.log("Connected to WebSocket")
        
        stompClient.subscribe(`/user/${userId}/queue/notifications`, (message) => {
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
        stompClient.send(`/app/admin-send-notification`, {}, JSON.stringify(payload))
    } else {
        console.error("WebSocket is not connected")
    }
}