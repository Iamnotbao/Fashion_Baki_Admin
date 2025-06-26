import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, TextField, Typography } from "@mui/material"
import DialogTitle from '@mui/material/DialogTitle';
import { editStock } from "../services/stockServices";
import { useState } from "react";

const EditStock = ({ handleEdit, open, selectedStock,setLoading,setUpdate }) => {
    const [quantity, setQuantity] = useState(1);
    const hanldeEditStock = async() => {
        const response = await editStock(selectedStock,quantity);
        if(response===204){
            setLoading(false);
            setUpdate(false);
            handleEdit();
        }
    }
    return (
        <>
            <Dialog
                open={open}
                onClose={handleEdit}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle >
                    Edit Stock - Product {selectedStock}
                </DialogTitle>
                <DialogContent>
                    <div >
                        <Box
                            component="form"
                            sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-suffix-shrink"
                                label="Quantity"
                                variant="outlined"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                            />
                        </Box>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEdit}>Cancle</Button>
                    <Button onClick={hanldeEditStock} autoFocus>
                        Edit
                    </Button>
                </DialogActions>
            </Dialog></>
    )
}
export default EditStock;