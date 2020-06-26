import React, { useEffect, useState } from 'react';
import { getId } from '../../services/auth'
import api from '../../services/api'
import AddIcon from '@material-ui/icons/Add';
import Wrapper from '../../components/Material-ui/Wrapper';
import {
    Grid, Fab, AppBar, Toolbar, Typography, InputBase, Card,
    CardActionArea, CardActions, CardContent, CardMedia, Button
} from '@material-ui/core';
import '../Configs/Configs.css';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import AddCardapio from '../../components/Cardapio/AddCardapio';
import ItemCardapio from '../../components/Cardapio/ItemCardapio';
import { useStyles } from './styles';
const Catalog = (props, history) => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [idUpdateForm, setIdUpdateForm] = useState(0);
    const [categoria, setCategoria] = useState('');
    const [formState, setFormState] = useState(false);
    async function fetchData() {
        const response = await api.get(`establishment/${getId()}/catalog`);
        setData(response.data.data[0].catalog);
    }
    function SearchFilterFunction(text) {
        //se n tiver texto,traz os dados dnv
        if (!text) {
            fetchData();
        }
        const newData = data.filter(function (item) {
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setData(newData);
    }
    function SearchFilterByCategory(cat) {
        if (cat === null) {
            fetchData()
        } else {
            doFilter(cat)
        }
    }
    function doFilter(cat) {
        const newData = data.filter(function (item) {
            const itemData = item.category ? item.category.toUpperCase() : ''.toUpperCase();
            const textData = cat.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        setData(newData);
    }
    function openForm() {
        setFormState(true)
    }
    function closeForm() {
        setFormState(false)
    }
    function openUpdateForm(id) {
        setIdUpdateForm(id)
    }
    async function clean() {
        const val = 0;
        setIdUpdateForm(val);
    }

    useEffect(() => {
        fetchData()
    }, [idUpdateForm]);
    return (
        <Wrapper>
            <Grid container spacing={4}>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            {!categoria ?
                                <>
                                    <Typography className={classes.title} variant="h6" noWrap
                                        onClick={() => { setCategoria('comidas'); SearchFilterByCategory('comidas'); }}
                                    >
                                        Comidas
                                    </Typography>
                                    <Typography className={classes.title} variant="h6" noWrap>
                                        |
                                    </Typography>
                                    <Typography className={classes.title} variant="h6" noWrap
                                        onClick={() => { setCategoria('bebidas'); SearchFilterByCategory('bebidas') }}>
                                        Bebidas
                                    </Typography>
                                    <Typography className={classes.title} variant="h6" noWrap>
                                        |
                                    </Typography>
                                    <Typography className={classes.title} variant="h6" noWrap
                                        onClick={() => { setCategoria('sobremesas'); SearchFilterByCategory('sobremesas') }}
                                    >
                                        Sobremesas
                                     </Typography>
                                </>
                                :
                                <Typography className={classes.title} variant="h6" noWrap
                                    onClick={() => { SearchFilterByCategory(null); setCategoria(null) }}
                                >
                                    <RefreshIcon fontSize="large" style={{ margin: 10 }} />
                                </Typography>
                            }
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    onChange={e => SearchFilterFunction(e.target.value)}
                                    placeholder="Pesquisa..."
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                />
                            </div>
                        </Toolbar>

                    </AppBar>
                </div>
            </Grid>
            <Grid container>
                {data.map((item, index) => {
                    var foto = `http://${process.env.REACT_APP_NOT_SECRET_CODE}/files/${item.foto}`;
                    return (
                        <Grid key={index} item lg={4} xs={12} sm={6}>
                            <div>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        {item.photo ? <CardMedia
                                            component="img"
                                            alt="Foto do produto"
                                            height="140"
                                            image={foto}
                                            title="Foto do produto"
                                        /> : <CardMedia
                                                component="img"
                                                alt="Foto do produto"
                                                height="140"
                                                image="https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80"
                                                title="Foto do produto"
                                            />}
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {item.name}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {item.description}...
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => openUpdateForm(item._id)}>
                                            Editar
                                            <ItemCardapio
                                                id={item._id}
                                                name={item.name}
                                                category={item.category}
                                                description={item.description}
                                                value={item.value}
                                                photo={item.photo}
                                                idItem={idUpdateForm}
                                                fetchData={fetchData}
                                                clean={clean}
                                            />
                                        </Button>
                                        <Button size="small" color="primary">
                                            {item.category}
                                        </Button>
                                        <Button size="small" color="primary">
                                            R${item.value}
                                        </Button>
                                        <Button size="small" color="primary">
                                            Promoções ativas
                                            </Button>
                                    </CardActions>
                                </Card>
                            </div>
                        </Grid>
                    );
                })}
            </Grid>
            <Fab color="primary" onClick={() => openForm()} style={{ position: 'fixed', bottom: '5%', right: '3%' }} aria-label="add">
                <AddIcon />
            </Fab>
            <AddCardapio closeForm={closeForm} open={formState} fetchData={fetchData} />
        </Wrapper >
    );
};

export default Catalog;
