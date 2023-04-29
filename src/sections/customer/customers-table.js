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
  DialogActions
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useState } from 'react';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { phoneFromat } from 'src/utils/format';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShowView from 'src/layouts/dashboard/show';
import { useSnackbar } from 'notistack';




const Transition = React.forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});




export const CustomersTable = (props) => {
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
    setCustomerData
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  const [showConfirm, setShowConfirm] = useState(false);
  const [view, setView] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = async (id) => {
    if (id === 'Yes') {
      try {
        await axios.post('api/delete', {
          where: {
            id: selectedCustomer.id
          },
          table: "customer"
        });
        setCustomerData(prev => prev.filter(c => c.id !== selectedCustomer.id));
        enqueueSnackbar(`${selectedCustomer.name} was deleted successfuly`, { variant: "success" });
        setShowConfirm(false);
        setSelectedCustomer(null);
      } catch (err) {
        enqueueSnackbar(err.response.data.message || err.message, { variant: "error" });
      }

    } else if (id === 'No') {
      setShowConfirm(false);
      setSelectedCustomer(null);
    } else {
      setShowConfirm(true);
      setSelectedCustomer(id);
    }
  }

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    setView(true);
  }

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table style={{
            tableLayout: "fixed",
          }}>
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
                  Name
                </TableCell>
                <TableCell>
                  Phone Number
                </TableCell>
                <TableCell>
                  Location
                </TableCell>
                <TableCell>
                  CIN
                </TableCell>
                <TableCell>
                  ICE
                </TableCell>
                <TableCell>
                  Type
                </TableCell>
                <TableCell>
                  Created At
                </TableCell>
                <TableCell>
                  Actions
                </TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer) => {
                const isSelected = selected.includes(customer.id);
                const createdAt = format(new Date(customer.createdAt), 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={isSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(customer.id);
                          } else {
                            onDeselectOne?.(customer.id);
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
                        <Avatar src={customer.avatar}>
                          {getInitials(customer.name)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {customer.name.split(' ')[0]}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {phoneFromat(customer.phoneNumber)}
                    </TableCell>
                    <TableCell style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {customer.city}, {customer.address}
                    </TableCell>
                    <TableCell style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {customer.iceNumber}
                    </TableCell>
                    <TableCell style={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}>
                      {customer.cinNumber}
                    </TableCell>
                    <TableCell>
                      {customer.type}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row">
                        <IconButton onClick={() => handleView(customer)} color='secondary' aria-label="delete">
                          <VisibilityIcon />
                        </IconButton>
                        <IconButton onClick={() => handleEdit(customer.id)} color='primary' aria-label="delete">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(customer)} color='error' aria-label="delete">
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
        <DialogTitle>{"Delete Customer"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete customer "{selectedCustomer?.name}" ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='info' onClick={() => handleDelete('No')}>No</Button>
          <Button color='error' onClick={() => handleDelete('Yes')}>Yes</Button>
        </DialogActions>
      </Dialog>
      <ShowView open={view} setOpen={setView} customer={selectedCustomer} />
    </Card>
  );
};

CustomersTable.propTypes = {
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
