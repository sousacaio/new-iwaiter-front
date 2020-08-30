import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Button, TextField, Checkbox, Box, Grid } from '@material-ui/core';
import { CssBaseline, FormControlLabel, Link, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { setId, setToken, setData } from '../../services/auth';
import { connect } from 'react-redux';
import { fetchCatalog, fetchAddress, fetchSettings } from '../../actions/main-actions';
import { useStyles } from './styles';
import { doLogin } from '../../utils/requisitions/login';
import { Formik } from 'formik';
import * as Yup from 'yup'
import ErrorMessage from '../../components/ErrorMessage';

function SignInSide(props) {
    const classes = useStyles();

    const handleFetchSettings = (data) => {
        props.fetchSettings(data);
    }
    const handleFetchAddress = (data) => {
        props.fetchAddress(data);
    }
    const handleFetchCatalog = (data) => {
        props.fetchCatalog(data);
    }

    async function handleSignIn(values) {
        const response = await doLogin(values.email, values.password);
        const { settings, catalog, address, token, _id, establishment, authorized } = response;
        if (authorized) {
            handleFetchSettings(settings);
            handleFetchCatalog(catalog)
            handleFetchAddress(address)
            setToken(token);
            setId(_id);
            setData(JSON.stringify(establishment))
            props.history.push("/orders");
        }
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .label('Email')
            .email('Digite um email válido')
            .required('É necessário um email válido para fazer login'),
        password: Yup.string()
            .label('Password')
            .required('O campo "senha" não pode ficar em branco')
            .min(4, 'A senha tem que ter pelo menos 6 caracteres ')
    })
    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    onSubmit={values => handleSignIn(values)}
                    validationSchema={validationSchema}
                >{({ values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isValid
                }) => (
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Iwaiter
                            </Typography>
                            <form className={classes.form} onSubmit={handleSubmit}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    autoComplete="email"
                                    autoFocus
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                />
                                <ErrorMessage errorValue={touched.email && errors.email} />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                                <ErrorMessage errorValue={touched.password && errors.password} />
                                <FormControlLabel
                                    control={<Checkbox value="remember" color="primary" />}
                                    label="Remember me"
                                />

                                <Button
                                    onClick={handleSubmit}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    disabled={!isValid}
                                    color="primary"
                                    className={classes.submit} > Login
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">Esqueceu a senha?</Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signup" variant="body2">
                                            {"Sua primeira vez aqui? Registre-se!"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Box mt={5}>
                                    <Copyright />
                                </Box>
                            </form>
                        </div>
                    )}
                </Formik>
            </Grid>
        </Grid>
    );
}
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
export default connect(mapStateToProps, mapDispatchToProps)(SignInSide);