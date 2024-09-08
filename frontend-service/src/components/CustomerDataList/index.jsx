import { CloseOutlined, DeleteForever, Edit, SearchRounded } from '@mui/icons-material';
import { Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';
import FormCustomerModal from '../FormCustomerModal';
import { deleteCustomer, getCustomerById, getCustomers, updateCustomer } from '../../services';

const header = [
  "ID",
  "No",
  "Name",
  "Address",
  "City",
  "Actions"
];

const structure = [
  "id",
  "no",
  "nama",
  "alamat",
  "kota",
  "aksi"
];

const initialValues = {
  id: '',
  no: '',
  nama: '',
  alamat: '',
  kota: ''
};

const validationSchema = Yup.object().shape({
  id: Yup.string(),
  no: Yup.string(),
  nama: Yup.string().required(),
  alamat: Yup.string().required(),
  kota: Yup.string().required(),
});

const CustomerDataList = ({ serviceID, onRefresh, onUpdate, onDelete }) => {
  const [dataTable, setDataTable] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [searchedId, setSearchedId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isDataNotFound, setIsDataNotFound] = useState(false);

  const updateCustomerFormik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,
    onSubmit: () => {
      handleUpdateCustomer();
      setIsUpdating(false);
    }
  });

  const handleUpdateFormikValue = ( index ) => {
    updateCustomerFormik.setValues(dataTable[index]);
    setIsUpdating(true)
  }

  const handleCloseUpdateModal = () => {
    setIsUpdating(false);
  }

  const handleGetAllCustomers = () => {
    getCustomers(serviceID)
      .then((res) => {
        if (res.status === 200) {
          setDataTable([...res.data]);
        }
      }).catch((err) => {
        console.log(err);
      });
  }

  const handleUpdateCustomer = () => {
    const customerId = updateCustomerFormik.values.id;

    const requestBody = {
      nama: updateCustomerFormik.values.nama,
      alamat: updateCustomerFormik.values.alamat,
      kota: updateCustomerFormik.values.kota
    };

    updateCustomer(serviceID, customerId, requestBody)
      .then(() => {
        onUpdate();
      }).catch((err) => {
        console.log(err);
      });
  }

  const handleDeleteCustomer = ( index ) => {
    const customerId = dataTable[index].id;

    deleteCustomer(serviceID, customerId)
      .then(() => {
        onDelete()
      }).catch((err) => {
        console.log(err);
      });
  }

  const handleSearchCustomer = () => {
    if(searchedId !== '') {
      setIsSearching(true);
      getCustomerById(serviceID, searchedId)
        .then((res) => {
          if (res.status === 200 && Object.keys(res.data).length > 0) {
            setIsDataNotFound(false);
            setDataTable([res.data]);
          } else {
            setIsDataNotFound(true);
          }
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  const handleCloseSearching= () => {
    setIsSearching(false);
    setSearchedId('');
    handleGetAllCustomers();
  }

  useEffect(() => {
    handleGetAllCustomers();
  }, [serviceID, onRefresh, isUpdating, onDelete]);

  useEffect(() => {
    setSearchedId('');
  }, [serviceID]);

  const ActionButtonGroups = ({ index }) => {
    return (
      <Grid container>
        <Grid item>
          <IconButton 
            color='warning'
            onClick={() => handleUpdateFormikValue(index)}
          >
            <Edit />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton 
            color='error'
            onClick={() => handleDeleteCustomer(index)}
          >
            <DeleteForever />
          </IconButton>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <TextField
        fullWidth
        variant='filled'
        placeholder='Search by id'
        value={searchedId}
        onChange={(e) => setSearchedId(e.target.value)}
        sx={{
          backgroundColor: 'primary.main',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}
        inputProps={{
          sx: {
            paddingY: '1rem',
            color: 'primary.contrastText'
          },
        }}
        InputProps={{
          endAdornment: (
            isSearching 
            ? (
              <IconButton
                sx={{ color: 'primary.contrastText' }}
                onClick={handleCloseSearching}
              >
                <CloseOutlined />
              </IconButton>
            ) : (
              <IconButton 
                sx={{ color: 'primary.contrastText' }}
                onClick={handleSearchCustomer}
              >
                <SearchRounded />
              </IconButton>
            )
          )
        }}
      />
      <TableContainer component={Paper} sx={{ maxHeight: 375, boxShadow: 'none'}}>
        <Table sx={{ width: '100%' }} stickyHeader>
          <TableHead>
            <TableRow>
              {
                header.map((item, index) => {
                  return (
                    <TableCell 
                      align="left" 
                      key={index} 
                      sx={{
                        color: '#6D6C6D',
                        borderBottom: '2px solid',
                        borderColor: 'primary.main'
                      }}
                    >
                      {item}
                    </TableCell>
                  )
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {
              isSearching && isDataNotFound 
              ? (
                <TableRow>
                  <TableCell colSpan={header.length} align={"center"}>
                    <Typography>No Customer Found</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                dataTable.map((row, index) => {
                  return (
                    <TableRow key={index}>
                      {
                        structure.map((column) => {
                          return (
                            <TableCell>
                              {
                                column === 'aksi' 
                                ? <ActionButtonGroups index={index} />
                                : <Typography>{row[column.toLowerCase()]}</Typography>
                              }
                            </TableCell>
                          )
                        })
                      }
                    </TableRow>
                  )
                })
              )
            }
          </TableBody>
        </Table>
      </TableContainer>

      <FormCustomerModal 
        title={"Update Customer Data"}
        open={isUpdating}
        handleClose={handleCloseUpdateModal}
        formikProps={updateCustomerFormik}
        disabledField={[ "id", "no", "createdAt", "updatedAt" ]}
      />
    </>
  )
}

export default CustomerDataList;