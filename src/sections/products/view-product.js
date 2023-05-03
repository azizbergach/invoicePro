import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { phoneFromat } from "src/utils/format";

function ViewProduct({ product, open, setOpen }) {

    const handleClose = () => {
        setOpen(false)
    }
    return product ? (<Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle>
            Product #ID: {product.ProductNumber}
        </DialogTitle>
        <DialogContent style={{ minWidth: 400, padding: 50 }}>
            <div style={{ display: "flex", justifyContent: 'space-between' }} >
                <div>
                    <strong>Product Name</strong>
                    <p>{product.name}</p>
                </div>
                <div>
                    <strong>City</strong>
                    <p>{product.city}</p>
                </div>
            </div>
            <div>
                <strong>Phone Number</strong>
                <p>{phoneFromat(product.phoneNumber)}</p>
            </div>
            <div>
                <strong>Address</strong>
                <p>{product.address}</p>
            </div>
            <div style={{ display: "flex", justifyContent: 'space-between' }} >
                <div>
                    <strong>CIN</strong>
                    <p>{product.cinNumber || "none"}</p>
                </div>
                <div>
                    <strong>ICE</strong>
                    <p>{product.iceNumber || "none"}</p>
                </div>
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
        </DialogActions>
    </Dialog >) : null;
}

export default ViewProduct;