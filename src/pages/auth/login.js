import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { Layout as AuthLayout } from 'src/layouts/auth/layout';
import axios from 'axios';
import { Store } from '../../utils/store';
import { useSnackbar } from 'notistack';

const Page = () => {

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { state: { userInfo }, dispatch } = useContext(Store);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      username: Yup
        .string()
        .required('Email is required'),
      password: Yup
        .string()
        .required('Password is required'),
    }),
    onSubmit: async (values, helpers) => {
      closeSnackbar();
      try {
        const { data } = await axios.post('/api/userAuth', {
          username: values.username,
          password: values.password
        });
        dispatch({
          type: "USER_LOGIN",
          data
        });
        router.push('/');
      } catch (err) {
        enqueueSnackbar(err.response.data.message || err.message, { variant: "error" });
      }
    }
  });

  useEffect(
    () => {

      if (userInfo) {
        router
          .replace({
            pathname: '/',
            query: router.asPath !== '/' ? { continueUrl: router.asPath } : undefined
          })
      }
    },
    [router.isReady]
  );

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Login
              </Typography>
            </Stack>
            <Tabs
              sx={{ mb: 3 }}
              value={"email"}
            >
              <Tab
                label="Email"
                value="email"
              />
            </Tabs>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.username && formik.errors.username)}
                  fullWidth

                  label="Username/email"
                  name="username"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  type="text"

                />
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth

                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
              </Stack>
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                Continue
              </Button>
            </form>

          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthLayout>
    {page}
  </AuthLayout>
);

export default Page;
