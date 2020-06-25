import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Button, TextField, Checkbox, Box, Grid } from '@material-ui/core';
import { CssBaseline, FormControlLabel, Link, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import api from '../../services/api';
import { setId, setToken, setData } from '../../services/auth';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { fetchCatalog, fetchAddress, fetchSettings } from '../../actions/main-actions';
import { useStyles } from '../../styles/loginStyles';

function SignInSide(props) {
    const classes = useStyles();
    const [signin, setSignIn] = useState({ email: '', password: '' });
    const handleLoginChange = (e) => setSignIn({
        ...signin, [e.target.name]: e.target.value,
    });
    const [open, setOpen] = useState(false);
    const [message, setMessage] = React.useState('');
    const handleFetchSettings = (data) => {
        props.fetchSettings(data);
    }
    const handleFetchAddress = (data) => {
        props.fetchAddress(data);
    }
    const handleFetchCatalog = (data) => {
        props.fetchCatalog(data);
    }

    async function handleSignIn(e) {
        e.preventDefault();
        const { email, password } = signin;
        try {
            await api.post('/establishment/auth',
                { email: email, password: password })
                .then((response) => {
                    if (response) {
                        const { data: { data: { establishment, token } } } = response;
                        const { settings, catalog, address } = establishment;
                        handleFetchSettings(settings);
                        handleFetchCatalog(catalog)
                        handleFetchAddress(address)
                        setToken(token);
                        setId(establishment._id);
                        setData(JSON.stringify(establishment))
                        props.history.push("/orders");
                    }
                }).catch(function (error) {
                    if (error.response) {
                        setOpen(true)
                        setMessage(error.response.data.message);
                    }
                });
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                            value={signin.email}
                            name="email"
                            onChange={handleLoginChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            onChange={handleLoginChange}
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Collapse in={open}>
                            <Alert
                                severity="error"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => { setOpen(false); }}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >
                                {message}
                            </Alert>
                        </Collapse>
                        <Button
                            onClick={handleSignIn}
                            type="submit"
                            fullWidth
                            variant="contained"
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
            </Grid>
        </Grid>
    );
}
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
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