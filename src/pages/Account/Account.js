import React, { useState, useEffect } from 'react';
import './Configs.css';
import Wrapper from '../../components/Material-ui/Wrapper';
import { Grid, TextField, Card, CardActionArea, CardMedia, Button } from '@material-ui/core';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import camera from '../../assets/camera.svg';
import { fetchEstablishmentAccountData, updateEstablishmentAccount } from '../../utils/requisitions/account'
import { useStyles } from './styles'

const Account = () => {
    const [data, setData] = useState([]);
    const [shouldUpdate, setShouldUpdate] = useState(false)
    const [selectedFile, setSelectedFile] = useState()
    const [preview, setPreview] = useState()
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined)
            return
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])
    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined)
            return
        }
        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0])
    }
    const handleData = name => event => {
        setData({ ...data, [name]: event.target.value });
    };

    async function getData() {
        const response = await fetchEstablishmentAccountData();
        if (response) {
            setData(response)
        }
    }

    async function handleForm() {
        const response = await updateEstablishmentAccount(selectedFile, data)
        if (response) {
            setShouldUpdate(!shouldUpdate)
            setSelectedFile()
        }
    }

    useEffect(() => {
        getData();
    }, [shouldUpdate]);
    console.log(data)
    const classes = useStyles();
    return (
        <Wrapper>
            <React.Fragment>
                <Grid container spacing={3}>
                    <Grid item lg={4} xs={12} sm={6}>
                        <Card className={classes.root}>
                            <CardActionArea>
                                {data.photo ? <CardMedia
                                    component="img"
                                    alt="Foto bar"
                                    height="200"
                                    image={`http://${process.env.REACT_APP_NOT_SECRET_CODE}/${data.photo}`}
                                    title="Foto bar"
                                /> :
                                    <CardMedia
                                        component="img"
                                        alt="Foto bar"
                                        height="200"
                                        image={camera}
                                        title="Foto bar"
                                    />}
                            </CardActionArea>
                            <br />
                            <form >
                                <label id="thumbnail">
                                    <input type="file" onChange={onSelectFile} />
                                    {selectedFile ? <img src={preview} alt="Select img" />
                                        : <img src={camera} alt="Select img" />}
                                </label>                         
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
                                    value={data.name}
                                    onChange={handleData('name')}
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