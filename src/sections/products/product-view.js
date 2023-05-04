import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import { phoneFromat } from "src/utils/format";

export default function ViewProduct({ product, open, setOpen }) {

    const handleClose = () => {
        setOpen(false)
    }


    return product ? (<Dialog
        open={open}
        onClose={handleClose}
    >
        <DialogTitle>
            product #ID: {product.productNumber}
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
                    <Image
                        width={300}
                        height={150}
                        src={product.image}
                    />
                </Box>
                <div style={{ display: "flex", justifyContent: 'space-between', flexDirection: "column" }} >
                    <div>
                        <strong>Nom du Produit</strong>
                        <p>{product.name}</p>
                    </div>
                    <div>
                        <strong>Category</strong>
                        <p>{product.category}</p>
                    </div>
                </div>
            </div>
            <div style={{ display: "flex", justifyContent: 'space-between' }} >
                <div>
                    <strong>Prix</strong>
                    <p>{product.price}DH</p>
                </div>
                <div>
                    <strong>Status</strong>
                    <p>{product.status}</p>
                </div>
                <div>
                    <strong>SKU</strong>
                    <p>{product.sku}</p>
                </div>
                <div>
                    <strong>Quantity</strong>
                    <p>{product.quantity}</p>
                </div>
            </div>
            <Divider>Options</Divider>
            <div style={{ display: "flex", justifyContent: 'space-between' }} >
                {
                    product.options.map(option => (
                        <div key={option.name}>
                            <strong>{option.name}</strong>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Variant</TableCell>
                                        <TableCell>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {option.variants.map(variant => (
                                        <TableRow key={variant.name}>
                                            <TableCell>{variant.name}</TableCell>
                                            <TableCell>{variant.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ))
                }
            </div>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Close</Button>
        </DialogActions>
    </Dialog >) : null;
}