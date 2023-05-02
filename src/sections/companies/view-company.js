import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Box } from "@mui/system";
import { phoneFromat } from "src/utils/format";

function ViewCompany({ company, open, setOpen }) {

    const handleClose = () => {
        setOpen(false)
    }
    return company ? (<Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle>
            Company #ID: {company.companyNumber}
        </DialogTitle>
        <DialogContent style={{ minWidth: 600, padding: 50 }}>
            <div style={{ display: "flex", justifyContent: 'space-between' }} >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pb: 3
                    }}
                >
                    <Avatar
                        src={company.logoUrl}
                        variant="square"
                    />
                </Box>
                <div>
                    <strong>Raison Social</strong>
                    <p>{company.name}</p>
                </div>
                <div>
                    <strong>Siége Social</strong>
                    <p>{company.city}</p>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: 'space-between' }} >
                <div>
                    <strong>N° de Tèléphone</strong>
                    <p>{phoneFromat(company.phoneNumber)}</p>
                </div>
                <div>
                    <strong>Address</strong>
                    <p>{company.address}</p>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: 'space-between' }} >
                <div>
                    <strong>IF</strong>
                    <p>{company.ifNumber || "none"}</p>
                </div>
                <div>
                    <strong>ICE</strong>
                    <p>{company.iceNumber || "none"}</p>
                </div>
                <div>
                    <strong>RIB</strong>
                    <p>{company.bank} :{company.iceNumber || "none"}</p>
                </div>
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
        </DialogActions>
    </Dialog >) : null;
}

export default ViewCompany;