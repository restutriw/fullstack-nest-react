import { Button, Dialog, DialogContent, DialogTitle, Grid, TextField } from '@mui/material';
import React from 'react'

const FormCustomerModal = ({ title, open, handleClose, formikProps, disabledField=[] }) => {
  return (
    <React.Fragment>
      <Dialog 
        open={open} 
        onClose={handleClose}
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center' }}>{ title }</DialogTitle>
        <DialogContent>
          <form onSubmit={formikProps.handleSubmit}>
            <Grid 
              container 
              spacing={2}
              flexDirection={'column'} 
              sx={{ padding: '0.5rem'}}
            >
              {
                Object.keys(formikProps.values).map((item, index) => {
                  return (
                    <Grid item key={index}>
                      <TextField 
                        disabled={ disabledField.includes(item) ? true : false }
                        id="outlined-basic"
                        variant="outlined"
                        name={item}
                        label={item}
                        value={formikProps.values[item]}
                        onChange={formikProps.handleChange}
                        onBlur={formikProps.handleBlur}
                        error={formikProps.touched[item] && formikProps.errors[item]}
                        helperText={formikProps.touched[item] && formikProps.errors[item] && `${item} cannot be empty`}
                        fullWidth
                      />
                    </Grid>
                  )
                })
              }
              <Grid item sx={{ alignSelf: 'center' }}>
                <Button variant='contained' type='submit'> Save Customer </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  )
}

export default FormCustomerModal;