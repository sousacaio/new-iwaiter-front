import React, { useState, useEffect, useCallback } from 'react';
import './Configs.css';
import Wrapper from '../../components/Material-ui/Wrapper';
import api from '../../services/api';
import { getId } from '../../services/auth'
import { Grid, TextField, Card, CardActionArea, CardMedia, Button } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import camera from '../../assets/camera.svg';


import { useStyles } from './styles'


const Account = () => {
    const [data, setData] = useState([]);
    const [, updateState] = React.useState();
    const forceUpdate = useCallback(() => updateState({}), []);
    const handleData = name => event => {
        setData({ ...data, [name]: event.target.value });
    };

    function getData() {
        api.get(`establishment/${getId()}/account`).then(r => {
            console.log(r);
        });
    }

    async function handleForm() {
        await api.put('/bar', {
            nome: data.nome,
            endereco: data.endereco,
            email: data.email,
            phone: data.phone
        })
            .then((r) => {

            });
    }


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
                            <form >
                                <label
                                    id="thumbnail"
                                >
                                    <input type="file" />
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
                                startIcon={<VpnKeyIcon />}
                            >
                                Trocar senha
                             </Button>
                        </Grid>
                    </Grid>

                </Grid>
            </React.Fragment>
        </Wrapper>
    )

}
export default Account;