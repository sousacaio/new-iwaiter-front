import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Wrapper from '../../components/Material-ui/Wrapper';
import api from '../../services/api';
import { makeStyles } from '@material-ui/core/styles';
import { getIdBar, getToken } from '../../services/auth'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import camera from '../../assets/camera.svg';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';
import './Configs.css';

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%'
    },
    root2: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '50ch',
        },
    },
    button: {
        margin: theme.spacing(1),
    }, modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Conta = () => {
    const [data, setData] = useState([]);
    const [errorsPwd, setErrorsPwd] = useState([]);
    const [errors, setErrors] = useState([]);
    const [, updateState] = React.useState();
    const [open, setOpen] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [openAlertPwd, setOpenAlertPwd] = React.useState(false);
    const [password, setPassword] = useState('');
    const forceUpdate = useCallback(() => updateState({}), []);
    const [thumbnail, setThumbnail] = useState(null);
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])
    const handleData = name => event => {
        setData({ ...data, [name]: event.target.value });
    };

    function getData() {
        api.get('/bar', { headers: { id: getIdBar(), token: getToken() } }).then(r => {
            setData(r.data.bar);
        });
    }
    async function handlePhoto() {
        if (thumbnail) {
            const form = new FormData();
            form.append('thumbnail', thumbnail);
            await api.post('/barphoto', form, { headers: { id: getIdBar(), token: getToken() } }).then(
                (r) => {
                    console.log(r)
                    if (r) {
                        alert('Foto de perfil do bar alterada!');
                        forceUpdate();
                    }
                });
        } else {
            alert('Escolha uma foto de perfil!');
        }
    }
    async function handleForm() {
        await api.put('/bar', {
            nome: data.nome,
            endereco: data.endereco,
            email: data.email,
            phone: data.phone
        }, { headers: { id: getIdBar(), token: getToken() } })
            .then((r) => {
                if (!r.data.errors) {
                    alert('Dados alterados!');
                    setErrors([]);
                    forceUpdate();
                } else {
                    setErrors(r.data.errors);
                    setOpenAlert(true)
                }
            });
    }
    const handlePwdChange = async () => {
        if (!password) {
            alert('Digite uma senha!');
        } else {
            await api.put('/bar', { password }, { headers: { id: getIdBar(), token: getToken() } })
                .then((r) => {
                    if (!r.data.errors) {
                        alert('Senha alterada!');
                        handleClose();
                        setErrorsPwd([]);
                    } else {
                        setErrorsPwd(r.data.errors);
                        setOpenAlertPwd(true)
                    }
                });
        }
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        getData();
    }, [forceUpdate]);
    var foto = `http://${process.env.REACT_APP_NOT_SECRET_CODE}/files/${data.foto}`;
    const classes = useStyles();
    return (
        <Wrapper>
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item lg={4} xs={12} sm={6}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Foto bar"
                                    height="200"
                                    image={foto}
                                    title="Foto bar"
                                />
                            </CardActionArea>
                            <br />
                            <form onSubmit={handlePhoto}>
                                <label
                                    id="thumbnail"
                                    style={{ backgroundImage: `url(${preview})` }}
                                    className={thumbnail ? 'has-thumbnail' : ''}
                                >
                                    <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                                    <img src={camera} alt="Select img" />
                                </label>
                                <Button size="small" type="submit" color="primary" style={{ marginLeft: '35%', marginBottom: 10, marginTop: -5 }}>
                                    Trocar foto
                                </Button>
                            </form>
                        </Card>
                    </Grid>
                    <Grid item lg={8} xs={12} sm={6}>
                        <form className={classes.root2} noValidate autoComplete="off">
                            <div>
                                <TextField
                                    required
                                    id="nome"
                                    label="Nome"
                                    name="nome"
                                    value={data.nome}
                                    onChange={handleData('nome')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    required
                                    id="email"
                                    label="Email"
                                    name="email"
                                    value={data.email}
                                    onChange={handleData('email')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />

                                <TextField
                                    required
                                    id="endereco"
                                    label="Endereco"
                                    name="endereco"
                                    value={data.endereco}
                                    onChange={handleData('endereco')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    required
                                    id="phone"
                                    label="Telefone"
                                    name="phone"
                                    onChange={handleData('phone')}
                                    value={data.phone}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <Collapse in={openAlert}>
                                {errors.map((mensagens, i) => {
                                    return <>
                                        <Alert
                                            severity="error"
                                            action={
                                                <IconButton
                                                    aria-label="close"
                                                    color="inherit"
                                                    size="small"
                                                    onClick={() => { setOpenAlert(false); }}
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
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    className={classes.button}
                                    onClick={() => handleForm()}
                                >
                                    Atualizar dados
                             </Button>
                            </Grid>
                        </form>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                className={classes.button}
                                onClick={handleClickOpen}
                                startIcon={<VpnKeyIcon />}
                            >
                                Trocar senha
                             </Button>
                        </Grid>
                    </Grid>

                </Grid>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Troca de senha</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Após trocar de senha,sua nova senha entrará imediatamente em vigor
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="password"
                            id="password"
                            label="Nova senha"
                            type="password"
                            fullWidth
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                        />
                        <Collapse in={openAlertPwd}>
                            {errorsPwd.map((mensagens, i) => {
                                return <>
                                    <Alert
                                        severity="error"
                                        action={
                                            <IconButton
                                                aria-label="close"
                                                color="inherit"
                                                size="small"
                                                onClick={() => { setOpenAlertPwd(false); }}
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                     </Button>
                        <Button onClick={handlePwdChange} color="primary">
                            Confirmar nova senha
                    </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Wrapper>
    )

}
export default Conta;