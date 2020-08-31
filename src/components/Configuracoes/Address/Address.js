import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button } from '@material-ui/core'
import { Formik } from 'formik';
import * as Yup from 'yup'
import ErrorMessage from '../../ErrorMessage';
import { getSettings, saveAddress } from '../../../utils/requisitions/settings'
const useStyles = makeStyles(theme => ({
    toolbarTitle: {
        flex: 1,
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: '100%'
    },
    checkboxInterna: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxExterna: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const Address = () => {
    const [data, setData] = useState([])
    const classes = useStyles();
    const getData = async () => {
        const res = await getSettings()
        console.log(res.address)
        setData(res.address)
    }

    const validationSchema = Yup.object().shape({
        zipcode: Yup.string()
            .length(9, 'Seu cep não pode conter mais de 8 digítos')
            .required('É necessário um cep válido'),
        street: Yup.string()
            .required('É necessário um nome/número de rua válido'),
        number: Yup.number()
            .required('É necessário o numero do endereço do seu estabelecimento'),
        complement: Yup.string()
            .max(50, 'Meio grandinho esse complemento,não?'),
        city: Yup.string()
            .required('É necessário o nome da sua cidade'),
        state: Yup.string()
            .required('É necessário o nome do seu etado'),
        country: Yup.string()
            .required('É necessário o nome do seu país')
    })

    const save = async (values) => {
        const res = await saveAddress(values);
        if (res) {
            getData()
        }
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <Grid  >
            <Formik
                enableReinitialize
                initialValues={{
                    zipcode: data ? data.zipcode : '',
                    street: data ? data.street : '',
                    number: data ? data.number : '',
                    complement: data ? data.complement : '',
                    city: data ? data.city : '',
                    state: data ? data.state : '',
                    country: data ? data.country : ''
                }}
                onSubmit={values => save(values)}
                validationSchema={validationSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isValid
                }) => (

                        <form onSubmit={handleSubmit}>
                            <Grid item direction="row" >
                                <TextField
                                    variant="outlined"
                                    margin="dense"
                                    required
                                    fullWidth
                                    id="outlined-required"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="Cep"


                                    name="zipcode"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.zipcode}
                                />
                                <ErrorMessage errorValue={touched.zipcode && errors.zipcode} />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="street"
                                    label="Rua"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.street}
                                    id="outlined-required"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <ErrorMessage errorValue={touched.street && errors.street} />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="number"
                                    name="number"
                                    label="Numero"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.number}
                                    id="outlined-required"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <ErrorMessage errorValue={touched.number && errors.number} />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    fullWidth
                                    helperText="Se não houver complemento,pode deixar o campo vazio"
                                    name="complement"
                                    label="Complemento"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.complement}
                                    id="outlined-required"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <ErrorMessage errorValue={touched.complement && errors.complement} />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="city"
                                    label="Cidade"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city}
                                    id="outlined-required"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <ErrorMessage errorValue={touched.city && errors.city} />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="state"
                                    label="Estado"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.state}
                                    id="outlined-required"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <ErrorMessage errorValue={touched.state && errors.state} />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="country"
                                    label="País"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.country}
                                    id="outlined-required"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <ErrorMessage errorValue={touched.country && errors.country} />

                                <Button
                                    onClick={handleSubmit}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={!isValid}
                                    color="primary"
                                    className={classes.submit} > Salvar
                             </Button>
                            </Grid>
                        </form>

                    )}
            </Formik>
        </Grid>
    )
}

export default Address;