import { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket, sendNotification } from "../../component/services/notificationService";
import { ToastContainer, toast } from "react-toastify";
import SendIcon from "@mui/icons-material/Send";
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Grid,
    Button,

    Box,
    Divider,
    CircularProgress,
    TextField,
    InputLabel
} from "@mui/material";
const NotificationManagement = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        connectWebSocket('1', (notification) => {
            console.log("Notification received:", notification);
        });
        return () => {
            disconnectWebSocket();
        }
    }, []);

    const notificationColumns = [
        { key: "id", label: "No." },
        { key: "title", label: "Content" },
        { key: "sendAt", label: "Time" },
        { key: "status", label: "Status Of Message" }

    ];

    const handleSend = async () => {
        const formData = new FormData(event.target);
        const userId = formData.get("user");
        const title = formData.get("title");
        const content = formData.get("content");



        try {
            await sendNotification({
                userId: userId,
                title: title,
                content: content,
            })
            toast.success(`The notification has been sent to ${userId}.`);
        } catch (error) {
            console.error("Error sending discount code:", error);
            toast.error("Failed to send discount code. Please try again.");
        } finally {
            setLoading(false);
        }
    };




    return (<>
        <ToastContainer position="top-right" />
        <Card sx={{ maxWidth: 900, mx: "auto", mb: 4 }}>
            <CardHeader
                title={
                    <Typography variant="h5" component="h2" sx={{ fontWeight: "bold" }}>
                        Notification
                    </Typography>
                }
                subheader="Create and send notification"
            />
            <CardContent>
                <form onSubmit={handleSend}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ mb: 3 }}>
                                <InputLabel sx={{ fontWeight: "bold", color: "#333333", fontSize: "22px" }} id="user-type-label">User</InputLabel>
                                <TextField
                                    name="user"
                                    placeholder="Choose User..."
                                    variant="outlined"
                                    helperText="Choose the user you want to send "
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box>
                                <InputLabel sx={{ fontWeight: "bold", color: "#333333", fontSize: "22px", marginBottom: "7px" }} id="user-type-label">Annoucement</InputLabel>
                                <TextField
                                    name="title"
                                    label="Title"
                                    placeholder="Enter the title..."
                                    fullWidth
                                    multiline
                                    rows={1}
                                    variant="outlined"
                                    helperText="This title will be sent to user"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ mb: 3 }}>
                                <TextField
                                    name="content"
                                    label="Content"
                                    placeholder="Enter an content..."
                                    fullWidth
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    helperText="This notification will be sent to user"
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ ml: "auto", mr: "auto" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                size="large"
                                disabled={loading}
                                startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                            >
                                {loading ? "Processing..." : "Send Announcement"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
            <Divider />
            <Box sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                <Typography variant="caption" color="text.secondary">
                    Notification will be sent directly to user.
                    Client will be received an email approve that announcement has been sent.
                </Typography>
            </Box>
        </Card>


    </>);
}

export default NotificationManagement;