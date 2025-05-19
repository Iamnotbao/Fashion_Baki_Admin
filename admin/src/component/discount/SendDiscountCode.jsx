import React, { useState, useEffect } from "react";
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Grid,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Checkbox,
    FormControlLabel,
    InputAdornment,
    Box,
    Divider,
    CircularProgress
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import SendIcon from "@mui/icons-material/Send";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleIcon from "@mui/icons-material/People";
import { connectWebSocket, disconnectWebSocket, sendNotification } from "../services/notificationService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendDiscountCode = ({ selectedDiscount = {} }) => {
    const [selectedUsers, setSelectedUsers] = useState("all");
    const [loading, setLoading] = useState(false);
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [discountType, setDiscountType] = useState("percentage");
    const [oneTimeUse, setOneTimeUse] = useState(false);


    useEffect(() => {
        connectWebSocket('1', (notification) => {
            console.log("Notification received:", notification);
            toast.info(notification.title);
        });

        return () => {
            disconnectWebSocket();
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData(event.target);
        const code = formData.get("code");
        const user = formData.get("user");
        try {
            await sendNotification(
                {
                    code: code,
                    userId: user,
                    userName: 'lethebao',
                }
            );
            toast.success(`The discount code ${code} has been sent to ${selectedUsers === "all" ? "all users" : "selected users"}.`);
        } catch (error) {
            console.error("Error sending discount code:", error);
            toast.error("Failed to send discount code. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    const handleDiscountTypeChange = (event) => {
        setDiscountType(event.target.value);
    };

    const handleSelectedUsersChange = (event) => {
        setSelectedUsers(event.target.value);
    };
    return (
        <>
            <ToastContainer position="top-right"  />
            <Card sx={{ maxWidth: 900, mx: "auto", mb: 4 }}>
                <CardHeader
                    title={
                        <Typography variant="h5" component="h2">
                            Send Discount Code
                        </Typography>
                    }
                    subheader="Create and send discount codes to your customers"
                />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ mb: 3 }}>
                                    <TextField
                                        name="code"
                                        label="Discount Code"
                                        placeholder="BAKI...."
                                        value={selectedDiscount.code ? (selectedDiscount.code) : "BAKI"}
                                        fullWidth
                                        required
                                        variant="outlined"
                                        helperText="Enter a unique code for this discount"
                                    />
                                </Box>

                                <Grid container spacing={2} sx={{ mb: 3 }}>
                                    <Grid item xs={6}>
                                        <FormControl fullWidth>
                                            <InputLabel id="discount-type-label">Discount Type</InputLabel>
                                            <Select
                                                labelId="discount-type-label"
                                                id="discount-type"
                                                value={discountType}
                                                label="Discount Type"
                                                onChange={handleDiscountTypeChange}
                                            >
                                                <MenuItem value="percentage">Percentage (%)</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            name="amount"
                                            label={"Percentage"}
                                            type="number"
                                            fullWidth
                                            required
                                            variant="outlined"
                                            value={selectedDiscount.percentage ? (selectedDiscount.percentage) : "0"}
                                            inputProps={{
                                                min: 1,
                                                max: discountType === "percentage" ? 100 : undefined,
                                                step: discountType === "percentage" ? 1 : 0.01
                                            }}
                                            placeholder={discountType === "percentage" ? "20" : "10.00"}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        {"%"}
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box sx={{ mb: 3 }}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="Expiry Date"
                                            value={expiryDate}
                                            onChange={(newValue) => setExpiryDate(newValue)}
                                            disablePast
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    fullWidth
                                                    required
                                                    helperText="When this discount code will expire"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <CalendarTodayIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Box>

                                <Box sx={{ mb: 0, pt: 3 }}>
                                    <FormControl fullWidth>
                                        <TextField
                                            name="user"
                                            label="Recipents"
                                            placeholder="user"
                                            fullWidth
                                            required
                                            variant="outlined"
                                        />
                                    </FormControl>
                                </Box>

                                {selectedUsers === "custom" && (
                                    <Box sx={{ mb: 3 }}>
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            startIcon={<PeopleIcon />}
                                        >
                                            Select Users
                                        </Button>
                                    </Box>
                                )}

                                <Box sx={{ mb: 3 }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={oneTimeUse}
                                                onChange={(e) => setOneTimeUse(e.target.checked)}
                                                name="oneTimeUse"
                                            />
                                        }
                                        label="One-time use per customer"
                                    />
                                </Box>
                            </Grid>

                            <Grid item xs={12} sx={{ mt: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    disabled={loading}
                                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                                >
                                    {loading ? "Processing..." : "Send Discount Code"}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
                <Divider />
                <Box sx={{ p: 2, bgcolor: "#f5f5f5" }}>
                    <Typography variant="caption" color="text.secondary">
                        Discount codes are tracked and can be managed in the Promotions section.
                        Analytics for usage will be available in the Reports dashboard.
                    </Typography>
                </Box>
            </Card>
        </>
    );
};

export default SendDiscountCode;