import React, { useState, useMemo, useEffect } from 'react';
import api from '../../services/api';
import { Container } from '@material-ui/core';
import './ItemCardapio.css'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));
export default function ItemCardapio(props, history) {
    const classes = useStyles();

    const [thumbnail, setThumbnail] = useState(null);
    const [, setFoto] = useState(null)
    const [valor, setValor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [descricao, setDescricao] = useState('');
    const [nome, setNome] = useState('');
    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])
    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData();
        const id = props.id;
        data.append('valor', valor);
        data.append('categoria', categoria);
        data.append('nome', nome);
        data.append('descricao', descricao);
        data.append('thumbnail', thumbnail);
        await api.put('/cardapio', data, { headers: { id: id } }).then(
            (r) => {
                if (r.data.errors) {
                    alert('Ops,houve algum erro');
                } else {
                    alert('Atualizado!');
                }

            }
        );
    }

    useEffect(() => {
        function fetchData() {
            api.get('/cardapio', { headers: { id: props.id } }).then((r) => {
                console.log(r)
                setNome(r.data.nome);
                setValor(r.data.valor)
                setCategoria(r.data.categoria);
                setDescricao(r.data.descricao);
                setFoto(r.data.foto);
            });
        }
        fetchData()
    }, [props.id])
    return (
        <Container maxWidthMd>
            <Grid>
                <div className={classes.root}>
                    <div>
                        <TextField
                            id="standard-full-width"
                            label={nome}
                            defaultValue={nome}
                            onChange={event => setNome(event.target.value)}
                            style={{ margin: 8 }}
                            placeholder="Nome"
                            helperText="Nome do seu produto"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="None"
                            id="margin-none"
                            defaultValue="Default Value"
                            className={classes.textField}
                            helperText="Some important text"
                        />
                        <TextField
                            label="Dense"
                            id="margin-dense"
                            defaultValue="Default Value"
                            className={classes.textField}
                            helperText="Some important text"
                            margin="dense"
                        />
                        <TextField
                            label="Normal"
                            id="margin-normal"
                            defaultValue="Default Value"
                            className={classes.textField}
                            helperText="Some important text"
                            margin="normal"
                        />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="">

                    <div >
                        <label htmlFor="nome">Nome</label><br />
                        <input
                            required
                            className="input"
                            id="nome"
                            value={nome}
                            onChange={event => setNome(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="valor">Valor</label><br />
                        <input
                            required
                            className="input"
                            id="valor"
                            value={valor}
                            onChange={event => setValor(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="valor">Descricao</label><br />
                        <input
                            required
                            className="input"
                            id="valor"
                            value={descricao}
                            onChange={event => setDescricao(event.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="categoria">Categoria</label><br />
                        <input
                            required
                            id="categoria"
                            value={categoria}
                            className="input"
                            onChange={event => setCategoria(event.target.value)}
                        />
                    </div>
                    <div className="item social">
                        <label id="thumbnail" style={{ backgroundImage: `url(${preview})` }}
                            className={thumbnail ? 'has-thumbnail' : ''}
                        >
                            <input type="file" onChange={event => setThumbnail(event.target.files[0])} name="photo" />
                            {/* {foto ? <img src={`http://localhost:3000/files/${foto}`} alt="Select img" /> :
                            <img src={Camera} alt="Select img" />
                        } */}

                        </label>
                    </div>
                    <button type="submit" className="btn">Alterar</button>

                </form >
            </Grid>
        </Container>
    )
}
