import React, { useState } from 'react';
import { Avatar, CssBaseline, TextField, Typography } from '@material-ui/core';
import { Button, Link, Grid, Box, Input } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Formik } from 'formik';
import * as Yup from 'yup'
import ErrorMessage from '../../components/ErrorMessage';
import MaskedInput from 'react-text-mask';
import { doSignUp } from '../../utils/requisitions/signup';
import { connect } from 'react-redux';
import { fetchCatalog, fetchAddress, fetchSettings } from '../../actions/main-actions';
import { setId, setToken, setData } from '../../services/auth';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Iwaiter
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function TextMaskCustom(props) {
    const { inputRef, ...other } = props;

    return (
        <MaskedInput
            {...other}
            ref={ref => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['(', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}
const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = (props) => {
    const classes = useStyles();

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .label('Email')
            .email('Digite um email válido')
            .required('É necessário um email válido'),
        password: Yup.string()
            .label('Password')
            .required('O campo "senha" não pode ficar em branco')
            .min(6, 'A senha tem que ter pelo menos 6 caracteres '),
        passwordConfirmation: Yup.string()
            .label('passwordConfirmation')
            .required('A confirmação de senha é necessária')
            .min(4, 'A confirmação de senha tem que ter pelo menos 6 caracteres ')
            .test('passwords-match', 'As senhas devem ser iguais', function (value) {
                return this.parent.password === value;
            }),
        name: Yup.string()
            .label('Name')
            .min(1, 'É necessário mais de uma letra para registrar o nome de seu estabelecimento')
            .required('É necessário um nome válido para se registrar'),
        phone: Yup.string()
            .label('Phone')
            .required('É obrigatório um número de telefone para contato')
    })
    const handleFetchSettings = (data) => {
        props.fetchSettings(data);
    }
    const handleFetchAddress = (data) => {
        props.fetchAddress(data);
    }
    const handleFetchCatalog = (data) => {
        props.fetchCatalog(data);
    }
    const handleSignup = async (values) => {
        const res = await doSignUp(values)
        const { settings, catalog, address, token, _id, establishment, authorized } = res;
        if (authorized) {
            handleFetchSettings(settings);
            handleFetchCatalog(catalog)
            handleFetchAddress(address)
            setToken(token);
            setId(_id);
            setData(JSON.stringify(establishment))
            props.history.push("/orders");
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Cadastro de estabelecimento
                </Typography>
                <Formik
                    initialValues={{ email: '', password: '', name: '', passwordConfirmation: '', phone: '' }}
                    onSubmit={values => handleSignup(values)}
                    validationSchema={validationSchema}
                >{({ values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isValid
                }) => (
                        <form className={classes.form} noValidate>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        value={values.name}
                                        name="Name"
                                        onChange={handleChange('name')}
                                        label="Nome"
                                        autoFocus
                                        onBlur={handleBlur('name')}

                                    />
                                    <ErrorMessage errorValue={touched.name && errors.name} />
                                </Grid>

                                <Grid item xs={12}>
                                    <Grid item xs={12} sm={12}>
                                        <Input
                                            value={values.phone}
                                            onChange={handleChange('phone')}
                                            onBlur={handleBlur('phone')}
                                            inputComponent={TextMaskCustom}
                                        />
                                        <ErrorMessage errorValue={touched.phone && errors.phone} />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        value={values.email}
                                        label="Email"
                                        name="email"
                                        onChange={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                    />
                                    <ErrorMessage errorValue={touched.email && errors.email} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        value={values.password}
                                        fullWidth
                                        onChange={handleChange('password')}
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        onBlur={handleBlur('password')}
                                    />
                                    <ErrorMessage errorValue={touched.password && errors.password} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        value={values.passwordConfirmation}
                                        fullWidth
                                        onChange={handleChange('passwordConfirmation')}
                                        onBlur={handleBlur('passwordConfirmation')}
                                        name="passwordConfirmation"
                                        label="Senha"
                                        type="password"
                                        id="passwordConfirmation"

                                    />
                                    <ErrorMessage errorValue={touched.passwordConfirmation && errors.passwordConfirmation} />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit}
                                disabled={!isValid}
                                className={classes.submit}>
                                Cadastre-se!
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/" variant="body2">
                                        Já tenho uma conta!
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}

const mapStateToProps = (state) => {
    return {
        items: state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCatalog: (data) => { dispatch(fetchCatalog(data)) },
        fetchSettings: (data) => { dispatch(fetchSettings(data)) },
        fetchAddress: (data) => { dispatch(fetchAddress(data)) },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)