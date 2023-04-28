import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AddPopup from 'src/layouts/dashboard/Add';



const companies = [
  {
    id: '2569ce0d517a7f06d3ea1f24',
    createdAt: '27/03/2019',
    description: 'Dropbox is a file hosting service that offers cloud storage, file synchronization, a personal cloud.',
    logo: '/assets/logos/logo-dropbox.png',
    title: 'Dropbox',
    downloads: '594'
  },
  {
    id: 'ed2b900870ceba72d203ec15',
    createdAt: '31/03/2019',
    description: 'Medium is an online publishing platform developed by Evan Williams, and launched in August 2012.',
    logo: '/assets/logos/logo-medium.png',
    title: 'Medium Corporation',
    downloads: '625'
  },
  {
    id: 'a033e38768c82fca90df3db7',
    createdAt: '03/04/2019',
    description: 'Slack is a cloud-based set of team collaboration tools and services, founded by Stewart Butterfield.',
    logo: '/assets/logos/logo-slack.png',
    title: 'Slack',
    downloads: '857'
  },
  {
    id: '1efecb2bf6a51def9869ab0f',
    createdAt: '04/04/2019',
    description: 'Lyft is an on-demand transportation company based in San Francisco, California.',
    logo: '/assets/logos/logo-lyft.png',
    title: 'Lyft',
    downloads: '406'
  },
  {
    id: '1ed68149f65fbc6089b5fd07',
    createdAt: '04/04/2019',
    description: 'GitHub is a web-based hosting service for version control of code using Git.',
    logo: '/assets/logos/logo-github.png',
    title: 'GitHub',
    downloads: '835'
  },
  {
    id: '5dab321376eff6177407e887',
    createdAt: '04/04/2019',
    description: 'Squarespace provides software as a service for website building and hosting. Headquartered in NYC.',
    logo: '/assets/logos/logo-squarespace.png',
    title: 'Squarespace',
    downloads: '835'
  }
];

const Page = () => {

  const [showAdd, setShowAdd] = useState(false);
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

  const ADDProps = {
    handleSubmit,
    buttons,
    open: showAdd,
    title,
    setOpen: setShowAdd,
    Fields,
    formik
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
                  Companies
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
                  onClick={() => { setShowAdd(prev => !prev); formik.setValues(initialValues); setButtons(["Cancel", "Save"]); setTitle("Add New Company") }}
                >
                  Add
                </Button>
                <AddPopup {...ADDProps} />
              </div>
            </Stack>
            <CompaniesSearch />
            <Grid
              container
              spacing={3}
            >
              {companies.map((company) => (
                <Grid
                  xs={12}
                  md={6}
                  lg={4}
                  key={company.id}
                >
                  <CompanyCard company={company} />
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Pagination
                count={3}
                size="small"
              />
            </Box>
          </Stack>
        </Container>
      </Box>
    </>
  )
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
