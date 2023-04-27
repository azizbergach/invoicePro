import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Stack } from "@mui/system";
import { phoneFromat } from "src/utils/format";

function ShowView({ customer, open, setOpen }) {

    const stackProps = {
        direction: "row",
        spacing: 5,
        useFlexGap: true,
        justifyContent: "space-between",
        style: {
            marginBottom: 10
        }
    }

    const handleClose = () => {
        setOpen(false)
    }
    return customer ? (<Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle>
            Customer #ID: {customer.CustomerNumber}
        </DialogTitle>
        <DialogContent style={{ minWidth: 400, padding: 50 }}>
            <div style={{ display: "flex", justifyContent: 'space-between' }} >
                <div>
                    <strong>Customer Name</strong>
                    <p>{customer.name}</p>
                </div>
                <div>
                    <strong>City</strong>
                    <p>{customer.city}</p>
                </div>
            </div>
            <div>
                <strong>Phone Number</strong>
                <p>{phoneFromat(customer.phoneNumber)}</p>
            </div>
            <div>
                <strong>Address</strong>
                <p>{customer.address}</p>
            </div>
            <div style={{ display: "flex", justifyContent: 'space-between' }} >
                <div>
                    <strong>CIN</strong>
                    <p>{customer.cinNumber || "none"}</p>
                </div>
                <div>
                    <strong>ICE</strong>
                    <p>{customer.iceNumber || "none"}</p>
                </div>
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
        </DialogActions>
    </Dialog >) : null;
}

export default ShowView;