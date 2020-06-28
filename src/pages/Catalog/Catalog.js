import React, { useEffect, useState } from 'react';
import Wrapper from '../../components/Material-ui/Wrapper';
import {
    Grid, AppBar, Toolbar, Typography, InputBase, Card,
    CardActionArea, CardActions, CardContent, CardMedia, Button
} from '@material-ui/core';
import '../Account/Configs.css';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import SaveCatalogItem from '../../components/Catalog/SaveCatalogItem';
import EditCatalog from '../../components/Catalog/EditCatalog';
import { useStyles } from './styles';
import { fetchEstablishmentCatalog } from '../../utils/requisitions/catalog';

const Catalog = () => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [categoria, setCategoria] = useState('');
    const [mustReload, setMustReload] = useState(false)
    async function fetchData() {
        const response = await fetchEstablishmentCatalog();
        setData(response);
    }
    function SearchByName(text) {
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
    function SearchByCategory(category) {
        if (category === null) {
            fetchData()
        } else {
            const newData = data.filter(function (item) {
                const itemData = item.category ? item.category.toUpperCase() : ''.toUpperCase();
                const textData = category.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setData(newData);
        }
    }


    useEffect(() => {
        fetchData()
    }, [mustReload]);
    return (
        <Wrapper>
            <Grid container spacing={4}>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            {!categoria ?
                                <>
                                    <Typography className={classes.title} variant="h6" noWrap
                                        onClick={() => { setCategoria('comidas'); SearchByCategory('comidas'); }}
                                    >
                                        Comidas
                                    </Typography>
                                    <Typography className={classes.title} variant="h6" noWrap>
                                        |
                                    </Typography>
                                    <Typography className={classes.title} variant="h6" noWrap
                                        onClick={() => { setCategoria('bebidas'); SearchByCategory('bebidas') }}>
                                        Bebidas
                                    </Typography>
                                    <Typography className={classes.title} variant="h6" noWrap>
                                        |
                                    </Typography>
                                    <Typography className={classes.title} variant="h6" noWrap
                                        onClick={() => { setCategoria('sobremesas'); SearchByCategory('sobremesas') }}
                                    >
                                        Sobremesas
                                     </Typography>
                                </>
                                :
                                <Typography className={classes.title} variant="h6" noWrap
                                    onClick={() => { SearchByCategory(null); setCategoria(null) }}
                                >
                                    <RefreshIcon fontSize="large" style={{ margin: 10 }} />
                                </Typography>
                            }
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    onChange={e => SearchByName(e.target.value)}
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
                                        <EditCatalog
                                            id={item._id}
                                            name={item.name}
                                            category={item.category}
                                            description={item.description}
                                            value={item.value}
                                            photo={item.photo}
                                            mustReload={setMustReload}
                                            parentState={mustReload}
                                        />
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

            <SaveCatalogItem
                mustReload={setMustReload}
                parentState={mustReload}
            />
        </Wrapper >
    );
};

export default Catalog;
