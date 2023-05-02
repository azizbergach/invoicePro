import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
import prisma from 'src/lib/prisma';
import { Store } from 'src/utils/store';
import { useSnackbar } from 'notistack';
import FilterCustomers from 'src/sections/customer/customers-filter';



const useCustomers = (customerData, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(customerData, page, rowsPerPage);
    },
    [page, rowsPerPage, customerData]
  );
};

const useCustomerIds = (customers) => {
  return useMemo(
    () => {
      return customers.map((customer) => customer.id);
    }, [customers])
};



const Page = ({ data }) => {

  const { state, dispatch } = useContext(Store);
  const [customerData, setCustomerData] = useState(data);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(customerData, page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [buttons, setButtons] = useState(["Cancel", "Save"]);
  const [title, setTitle] = useState("Add New Customer");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const initialValues = {
    name: '',
    type: '',
    phoneNumber: '',
    city: '',
    address: '',
    cinNumber: '',
    iceNumber: '',
    submit: null
  }

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


  const add = async (values) => {
    try {
      const { data } = await axios.post('/api/create', {
        table: "customer",
        ...values
      });
      setCustomerData(prev => [...prev, data]);
      dispatch({
        type: "CREATE_CUSTOMER",
        data
      });
      enqueueSnackbar(`${data.name} was added successfuly`, { variant: "success" });

      setShowAdd(false);
    } catch (err) {
      enqueueSnackbar(err.response.data.message || err.message, { variant: "error" });
    }
  }


  const update = async (values) => {

    try {
      const { data } = await axios.post('/api/update', {
        table: "customer",
        where: {
          id: values.id
        },
        data: values
      });

      setCustomerData(prev => prev.map(customer => { return (customer.id === id) ? data : customer }));

      dispatch({
        type: "UPDATE_CUSTOMER",
        data
      })

      enqueueSnackbar(`${data.name} was updated successfuly`, { variant: "success" });

      setShowAdd(false);
    } catch (err) {
      enqueueSnackbar(err.response.data.message || err.message, { variant: "error" });
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup
        .string()
        .max(100)
        .matches(/\w+/i)
        .required()
      ,
      type: Yup
        .string()
        .required(),
      phoneNumber: Yup
        .string()
        .max(9)
        .min(9)
        .matches(/\d+/i)
        .required(),
      city: Yup
        .string()
        .required(),
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
        const apiFunction = selectedId ? update : add;
        const id = selectedId || null;
        await apiFunction(id, values);
      } catch (err) {
        enqueueSnackbar(err.response.data.message || err.message, { variant: "error" });
      }
    }
  });


  const handleSubmit = (e) => {
    closeSnackbar();
    formik.handleSubmit();
    e.preventDefault();
  }

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
          name: "type",
          options: ['individual', 'company']
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

  const ADDProps = {
    handleSubmit,
    buttons,
    open: showAdd,
    title,
    setOpen: setShowAdd,
    Fields,
    formik
  }

  const handleEdit = async (customer) => {
    setShowAdd(true);
    setSelectedId(customer.id);
    formik.setValues(customer, false);
    setButtons(["Discard", "Update"]);
    setTitle("Update Customer Info");
  }

  const handleDeleteMany = async (selected) => {
    console.log(selected);
    try {
      const { data } = await axios.post('/api/deleteMany', {
        table: "customer",
        idsToDelete: selected
      })
      console.log(data);
      dispatch({ action: 'DELETE_MANY', data });

      setCustomerData(prev => prev.filter(c => !selected.includes(c.id)))

    } catch (error) {
      console.log(error);
    }
  }

  const filterCustomersProps = {
    setCustomerData,
    data,
    selected: customersSelection.selected,
    handleDeleteMany: handleDeleteMany
  }

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
                  onClick={() => { setShowAdd(prev => !prev); setSelectedId(null); formik.setValues(initialValues); setButtons(["Cancel", "Save"]); setTitle("Add New Customer") }}
                >
                  Add
                </Button>
              </div>
              <AddPopup {...ADDProps} />
            </Stack>
            <FilterCustomers {...filterCustomersProps} />
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
              handleEdit={handleEdit}
              setCustomerData={setCustomerData}
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


export async function getStaticProps() {
  const res = await prisma.customer.findMany();
  const data = JSON.parse(JSON.stringify(res));
  return {
    props: { data }
  }
}

export default Page;