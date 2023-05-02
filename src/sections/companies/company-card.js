import PropTypes from 'prop-types';
import { Avatar, Box, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, IconButton, Slide, Stack, SvgIcon, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import React, { useState } from 'react';
import ViewCompany from './view-company';
import axios from 'axios';
import { enqueueSnackbar } from 'notistack';


const Transition = React.forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export const CompanyCard = ({ company, handleEdit, setCompanyData }) => {

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [view, setView] = useState(false);

  const handleView = (customer) => {
    setSelectedCompany(customer);
    setView(true);
  }

  const handleDelete = async (id) => {
    if (id === 'Yes') {
      try {
        await axios.post('api/delete', {
          where: {
            id: selectedCompany.id
          },
          table: "company"
        });
        setCompanyData(prev => prev.filter(c => c.id !== selectedCompany.id));
        enqueueSnackbar(`${selectedCompany.name} was deleted successfuly`, { variant: "success" });
        setShowConfirm(false);
        setSelectedCompany(null);
      } catch (err) {
        enqueueSnackbar(err.response.data.message || err.message, { variant: "error" });
      }

    } else if (id === 'No') {
      setShowConfirm(false);
      setSelectedCompany(null);
    } else {
      setShowConfirm(true);
      setSelectedCompany(id);
    }
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <CardContent>
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
        <Typography
          align="center"
          gutterBottom
          variant="h5"
        >
          {company.name}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Stack
        alignItems="center"
        direction="row"
        sx={{
          width: "100%",
          justifyContent: "space-around"
        }}
      >
        <IconButton onClick={() => handleView(company)} color='secondary' aria-label="delete">
          <VisibilityIcon />
        </IconButton>
        <IconButton onClick={() => handleEdit(company.id)} color='primary' aria-label="delete">
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(company)} color='error' aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Dialog
        open={showConfirm}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete Company"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete customer "{selectedCompany?.name}" ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color='info' onClick={() => handleDelete('No')}>No</Button>
          <Button color='error' onClick={() => handleDelete('Yes')}>Yes</Button>
        </DialogActions>
      </Dialog>
      <ViewCompany open={view} setOpen={setView} company={selectedCompany} />
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired
};
