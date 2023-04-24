import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import AddPopup from 'src/layouts/dashboard/Add';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';



const data = [

];

const useCustomers = (page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [page, rowsPerPage]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    },
    [customers]
  );
};

const Page = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [showAdd, setShowAdd] = useState(false)

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  const formik = useFormik({
    initialValues: {
      name: '',
      type: 'individual',
      phoneNumber: '',
      city: 'Agadir',
      address: '',
      cinNumber: '',
      iceNumber: '',
      submit: null
    },
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(100)
        .matches(/\w+/i)
        .required()
      ,
      type: Yup
        .string(),
      phoneNumber: Yup
        .string()
        .max(9)
        .min(9)
        .matches(/\d+/i)
        .required(),
      city: Yup
        .string(),
      address: Yup
        .string()
        .required(),
      cinNumber: Yup
        .string()
        .matches(/\w{4,}/i)
      ,
      iceNumber: Yup
        .string()
        .matches(/\d{10}/i)
      ,
    }),
    onSubmit: async (values, helpers) => {
      try {

        const { data } = await axios.post('/api/create', {
          table: "customer",
          name: values.name,
          type: values.type,
          phoneNumber: values.phoneNumber,
          city: values.city,
          address: values.address,
          cinNumber: values.cinNumber,
          iceNumber: values.iceNumber
        });
        dispatch({
          type: "CREATE_CUSTOMER",
          data
        })
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  const Fields = [
    {
      name: "stack",
      childs: [
        {
          label: "Name",
          name: "name"
        },
        {
          label: "Type",
          name: "type"
        }
      ]
    },
    {
      name: "stack",
      childs: [
        {
          label: "City",
          name: "city"
        },
        {
          label: "Address",
          name: "address"
        }
      ]
    },
    {
      name: "stack",
      childs: [
        {
          label: "Phone Number",
          name: "phoneNumber"
        }
      ]
    },
    {
      name: "stack",
      childs: [
        {
          label: "CIN",
          name: "cinNumber"
        },
        {
          label: "ICE",
          name: "iceNumber"
        }
      ]
    }
  ]

  return (
    <>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Customers
                </Typography>
                <Stack
                  alignItems="center"
                  direction="row"
                  spacing={1}
                >
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowUpOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Import
                  </Button>
                  <Button
                    color="inherit"
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <ArrowDownOnSquareIcon />
                      </SvgIcon>
                    )}
                  >
                    Export
                  </Button>
                </Stack>
              </Stack>
              <div>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  variant="contained"
                  onClick={() => setShowAdd(prev => !prev)}
                >
                  Add
                </Button>
              </div>
              <AddPopup open={showAdd} type="customer" setOpen={setShowAdd} Fields={Fields} formik={formik} />
            </Stack>
            <CustomersSearch />
            <CustomersTable
              count={data.length}
              items={customers}
              onDeselectAll={customersSelection.handleDeselectAll}
              onDeselectOne={customersSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={customersSelection.handleSelectAll}
              onSelectOne={customersSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={customersSelection.selected}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
