import React, { useState } from 'react';
import { Avatar, CssBaseline, TextField, Typography } from '@material-ui/core';
import { Button, Link, Grid, Box } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import api from '../../services/api';

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

export default function SignUp() {
    const classes = useStyles();
    const [signup, setSignUp] = useState({ email: '', password: '', nome: '', endereco: '', phone: '' });
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState([]);

    const handleSingUpChange = (e) => setSignUp({
        ...signup, [e.target.name]: e.target.value,
    });
    async function handleSignUp(e) {
        e.preventDefault();
        const { email, password, nome, endereco, phone } = signup;

        try {
            const response = await api.post('/bar',
                { email, password, nome, endereco, phone }
            );
            console.log(response)
            const { data: { errors, message } } = response;
            if (errors) {
                setMessage(errors);
                setOpen(true)
            }
            if (message) {
                alert(message)
            }

        } catch (err) {
            alert("Houve um problema com o cadastro, tente novamente mais tarde");
        }

    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={signup.nome}
                                name="nome"
                                onChange={handleSingUpChange}
                                id="firstName"
                                label="Nome do bar"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={signup.phone}
                                id="phone"
                                onChange={handleSingUpChange}
                                label="Telefone"
                                name="phone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                value={signup.endereco}
                                id="phone"
                                onChange={handleSingUpChange}
                                label="Endereço"
                                name="endereco"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                value={signup.email}
                                label="Email Address"
                                name="email"
                                onChange={handleSingUpChange}
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                value={signup.password}
                                fullWidth
                                onChange={handleSingUpChange}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSignUp}
                        className={classes.submit}>

                        Sign Up
                    </Button>
                    <Collapse in={open}>
                              {message.map((mensagens,i)=>{
                                return <>   
                                <Alert
                            severity="error"
                                action={
                                    <IconButton
                                        aria-label="close"
                                        color="inherit"
                                        size="small"
                                        onClick={() => {setOpen(false);}}
                                    >
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            >                             
                                {mensagens.message}
                                 </Alert>
                                </>
                            })}
                          
                        </Collapse>
                      
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/" variant="body2">
                                Já tenho uma conta!
                             </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}