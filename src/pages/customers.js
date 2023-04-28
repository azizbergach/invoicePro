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




const Page = ({ data }) => {

  const { state, dispatch } = useContext(Store);
  const [customerData, setCustomerData] = useState(data);

  const useCustomers = (page, rowsPerPage) => {
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



  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const customers = useCustomers(page, rowsPerPage);
  const customersIds = useCustomerIds(customers);
  const customersSelection = useSelection(customersIds);
  const [showAdd, setShowAdd] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [buttons, setButtons] = useState(["Cancel", "Save"]);
  const [title, setTitle] = useState("Add New Customer");

  const handleSearch = (str) => {
    setCustomerData(data.filter(c => c.name.includes(str) || c.phoneNumber.includes(str) || c.city.includes(str) || c.type.includes(str)))
  }

  const initialValues = {
    name: '',
    type: 'individual',
    phoneNumber: '',
    city: 'Agadir',
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


  const add = async (id, values) => {
    try {

    } catch (error) {

    }
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
    console.log('created new', data);
    setCustomerData(prev => [...prev, data]);
    dispatch({
      type: "CREATE_CUSTOMER",
      data
    })

    setShowAdd(false);
  }


  const update = async (id, values) => {

    const { data } = await axios.post('/api/update', {
      table: "customer",
      where: {
        id
      },
      data: {
        name: values.name,
        type: values.type,
        phoneNumber: values.phoneNumber,
        city: values.city,
        address: values.address,
        cinNumber: values.cinNumber,
        iceNumber: values.iceNumber
      }

    });

    console.log("updated :", data);

    setCustomerData(prev => prev.map(customer => { if (customer.id === id) return data }));

    dispatch({
      type: "UPDATE_CUSTOMER",
      data
    })

    setShowAdd(false);
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
        const apiFunction = selectedId ? update : add;
        const id = selectedId || null;
        await apiFunction(id, values);
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });


  const handleSubmit = (e) => {
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

  const handleEdit = async (id) => {
    setShowAdd(true);
    setSelectedId(id);
    const { data } = await axios.post('/api/read', {
      table: "customer",
      id
    })
    formik.setValues(data, false);
    setButtons(["Discard", "Update"]);
    setTitle("Update Customer Info");
  }

  const ADDProps = {
    handleSubmit,
    buttons,
    open: showAdd,
    title,
    setOpen: setShowAdd,
    Fields,
    formik
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
            <CustomersSearch selected={customersSelection.selected} handleSearch={handleSearch} handleDeleteMany={handleDeleteMany} />
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