import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    IconButton,
    Slide,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
    DialogActions,
    Chip
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useState } from 'react';
import React from 'react';
import { phoneFromat } from 'src/utils/format';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useSnackbar } from 'notistack';
import { SeverityPill } from 'src/components/severity-pill';
import QuantityInput from 'src/layouts/dashboard/QuntityInput';
import ViewProduct from './product-view';




const Transition = React.forwardRef(function Transition(
    props,
    ref
) {
    return <Slide direction="up" ref={ref} {...props} />;
});




export const ProductsTable = (props) => {
    const {
        count = 0,
        items = [],
        onDeselectAll,
        onDeselectOne,
        onPageChange = () => { },
        onRowsPerPageChange,
        onSelectAll,
        onSelectOne,
        page = 0,
        rowsPerPage = 0,
        selected = [],
        handleEdit,
        setProductData
    } = props;

    const selectedSome = (selected.length > 0) && (selected.length < items.length);
    const selectedAll = (items.length > 0) && (selected.length === items.length);
    const [showConfirm, setShowConfirm] = useState(false);
    const [view, setView] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { enqueueSnackbar } = useSnackbar();

    const handleDelete = async (id) => {
        if (id === 'Yes') {
            try {
                await axios.post('api/delete', {
                    where: {
                        id: selectedProduct.id
                    },
                    table: "product"
                });
                setProductData(prev => prev.filter(c => c.id !== selectedProduct.id));
                enqueueSnackbar(`${selectedProduct.name} was deleted successfuly`, { variant: "success" });
                setShowConfirm(false);
                setSelectedProduct(null);
            } catch (err) {
                enqueueSnackbar(err.response.data.message || err.message, { variant: "error" });
            }

        } else if (id === 'No') {
            setShowConfirm(false);
            setSelectedProduct(null);
        } else {
            setShowConfirm(true);
            setSelectedProduct(id);
        }
    }

    const handleView = (product) => {
        setSelectedProduct(product);
        setView(true);
    }

    const statusMap = {
        "en stock": "success",
        "rupture de stock": "error"
    }

    return (
        <Card>
            <Scrollbar>
                <Box sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedAll}
                                        indeterminate={selectedSome}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                onSelectAll?.();
                                            } else {
                                                onDeselectAll?.();
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    Product Name
                                </TableCell>
                                <TableCell>
                                    Category
                                </TableCell>
                                <TableCell>
                                    SKU
                                </TableCell>
                                <TableCell>
                                    Variants
                                </TableCell>
                                <TableCell>
                                    Price
                                </TableCell>
                                <TableCell>
                                    Quantity
                                </TableCell>
                                <TableCell>
                                    Status
                                </TableCell>
                                <TableCell>
                                    Actions
                                </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((product) => {
                                const isSelected = selected.includes(product.id);

                                return (
                                    <TableRow
                                        hover
                                        key={product.id}
                                        selected={isSelected}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={(event) => {
                                                    if (event.target.checked) {
                                                        onSelectOne?.(product.id);
                                                    } else {
                                                        onDeselectOne?.(product.id);
                                                    }
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Stack
                                                alignItems="center"
                                                direction="row"
                                                spacing={2}
                                            >
                                                <Avatar src={product.image} variant='square'>
                                                    {getInitials(product.name)}
                                                </Avatar>
                                                <Typography variant="subtitle2">
                                                    {product.name}
                                                </Typography>
                                            </Stack>
                                        </TableCell>
                                        <TableCell>
                                            {product.category}
                                        </TableCell>
                                        <TableCell>
                                            {product.sku}
                                        </TableCell>
                                        <TableCell>
                                            {product.options.length}
                                        </TableCell>
                                        <TableCell>
                                            {product.price}DH
                                        </TableCell>
                                        <TableCell>
                                            <QuantityInput {...{ name: 'quantity', tableData: product, table: 'product' }} />
                                        </TableCell>
                                        <TableCell>
                                            <SeverityPill color={statusMap[product.status]}>
                                                {product.status}
                                            </SeverityPill>
                                        </TableCell>
                                        <TableCell>
                                            <Stack direction="row">
                                                <IconButton onClick={() => handleView(product)} color='secondary' aria-label="delete">
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleEdit(product)} color='primary' aria-label="delete">
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton onClick={() => handleDelete(product)} color='error' aria-label="delete">
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Scrollbar>
            <TablePagination
                component="div"
                count={count}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
            <Dialog
                open={showConfirm}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Delete Product"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Are you sure you want to delete product "{selectedProduct?.name}" ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='info' onClick={() => handleDelete('No')}>No</Button>
                    <Button color='error' onClick={() => handleDelete('Yes')}>Yes</Button>
                </DialogActions>
            </Dialog>
            <ViewProduct open={view} setOpen={setView} product={selectedProduct} />
        </Card>
    );
};

ProductsTable.propTypes = {
    count: PropTypes.number,
    items: PropTypes.array,
    onDeselectAll: PropTypes.func,
    onDeselectOne: PropTypes.func,
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    onSelectAll: PropTypes.func,
    onSelectOne: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    selected: PropTypes.array
};
