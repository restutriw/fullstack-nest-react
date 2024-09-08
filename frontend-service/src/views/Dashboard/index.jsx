import { Alert, Button, Container, Grid, Tab, Tabs, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomerDataList from '../../components/CustomerDataList'
import { AddCircleOutlineRounded } from '@mui/icons-material'
import * as Yup from 'yup';
import { useFormik } from 'formik';
import FormCustomerModal from '../../components/FormCustomerModal';
import { createCustomer } from '../../services';
import { Constant } from '../../constants/constants';

const initialValues = {
  nama: '',
  alamat: '',
  kota: ''
};

const validationSchema = Yup.object().shape({
  nama: Yup.string().required(),
  alamat: Yup.string().required(),
  kota: Yup.string().required(),
})

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isAddingNewCustomer, setIsAddingNewCustomer] = useState(false);
  const [refreshTable, setRefreshTable] = useState(true);
  const [alert, setAlert] = useState({
    open: false,
    severity: '',
    message: ''
  });

  const handleTabChange = (e, newValue) => {
    setTabValue(newValue);
  }

  const newCustomerFormik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      handleAddNewCustomer(values);
    }
  });

  const handleCloseAddingNewCustomer = () => {
    setIsAddingNewCustomer(false);
  }

  const handleAddNewCustomer = async (values) => {
    createCustomer(tabValue, values)
      .then(() => {
        setRefreshTable(true);
        setAlert({
          open: true,
          severity: 'success',
          message: `Successfully creating customer using Service ${tabValue === Constant.EXPRESS_ID ? 'ExpressJs': 'NestJs'}`
        })
      }).catch((err) => {
        setRefreshTable(false);
      }).finally(() => {
        setIsAddingNewCustomer(false);
      });
  }

  const handleUpdateCustomer = () => {
    setAlert({
      open: true,
      severity: 'success',
      message: `Successfully updating customer using Service ${tabValue === Constant.EXPRESS_ID ? 'ExpressJs': 'NestJs'}`
    })
  }

  const handleDeleteCustomer = () => {
    setAlert({
      open: true,
      severity: 'success',
      message: `Successfully deleting customer using Service ${tabValue === Constant.EXPRESS_ID ? 'ExpressJs': 'NestJs'}`
    })
  }

  useEffect(() => {
    if (alert.open) {
      const timeOut = setTimeout(() => {
        setAlert({
          open: false,
          severity: '',
          message: ''
        });
      }, 3000)

      return () => {
        clearTimeout(timeOut)
      }
    }
  }, [alert])

  return (
    <Container>
      <Alert 
        severity={alert.severity} 
        sx={{ visibility: alert.open ? 'visible' : 'hidden' }}
      > 
        {alert.message} 
      </Alert>

      <Grid 
        container
        spacing={4}
        flexDirection={"column"}
        alignItems={"center"} 
        justifyContent={"center"} 
        height={'95vh'}
      >
        <Grid item width={"100%"}>
          <Typography variant={"h5"} textAlign={"center"}>Customer List</Typography>
        </Grid>
        <Grid item width={"100%"}>
          <Grid container spacing={4} flexDirection={"column"} paddingTop={0}>
            <Grid item width={"100%"}>
              <Tabs value={tabValue} onChange={handleTabChange} centered>
                <Tab label="ExpressJS" sx={{ flexGrow: 1}} />
                <Tab label="NestJS" sx={{ flexGrow: 1}} />
              </Tabs>
            </Grid>
            <Grid item>
              <CustomerDataList 
                serviceID={tabValue} 
                onRefresh={() => setRefreshTable(refreshTable)}
                onUpdate={() => handleUpdateCustomer()}
                onDelete={() => handleDeleteCustomer()}
              />
            </Grid>
            <Grid item alignSelf={"flex-end"}>
              <Button 
                variant='contained' 
                startIcon={<AddCircleOutlineRounded />}
                onClick={() => setIsAddingNewCustomer(true)}
              >
                Add Customer
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <FormCustomerModal 
        title={'Add New Customer'}
        open={isAddingNewCustomer}
        handleClose={handleCloseAddingNewCustomer}
        formikProps={newCustomerFormik}
      />
    </Container>
  )
}

export default Dashboard;