import { useEffect } from "react";
import { connectWebSocket, disconnectWebSocket, sendNotification } from "../../component/services/notificationService";



const NotificationManagement = () => {
    useEffect(() => {
        connectWebSocket('1', (notification) => {
            console.log("Notification received:", notification);
        });
        return () => {
            disconnectWebSocket();
        }
    }, []);
    const handleSend = () => {
        sendNotification({
            userId: '4',
            title: 'Test from admin',
            content: 'Marry Christmas',
        })
    }
    return (<>
        <div>
            <h2>WebSocket Notification Tester</h2>
            <button onClick={handleSend}>Send Test Notification</button>
        </div>
    </>);
}

export default NotificationManagement;