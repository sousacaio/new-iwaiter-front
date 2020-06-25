import React, { useState, useEffect } from 'react';
import Wrapper from '../../components/Material-ui/Wrapper';
import api from '../../services/api';
import { Grid, Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { getId } from '../../services/auth';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2),
    },
    modalOverflow: {
        overflow: 'scroll',
    }
}));

const Main = (props) => {
    const classes = useStyles();
    const [atualiza, setAtualiza] = useState('')
    const [data, setData] = useState([])
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setAtualiza('aaaa')
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setAtualiza('atualizaaaa')
    };
    async function changeRequestStatus(OrderId, nestedOrderId, value) {
        const changeStatus = await api.post(`orders/${OrderId}/changeOrderStatus/${nestedOrderId}/${value}`);
        console.log(changeStatus);
        if (changeStatus.data.success === true) {
            setAtualiza('atualiza')
        } else {
            setAtualiza('at')
        }
    }
    const body = (orders, point, id) => {
        const newOrders = orders;
        const somar = (acumulado, x) => acumulado + x;
        const valores = orders.map((item) => {
            if (item.confirmed === 1) {
                return item.value * item.quantity
            } else {
                return 0;
            }
        });

        return (
            <div style={{ marginLeft: 200, marginRight: 50 }} className={classes.paper}>
                <h2 id="simple-modal-title">Itens pedidos na mesa {point}</h2>
                <h3>Total até o momento: R$ {valores.reduce(somar)}</h3>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell >Nome</TableCell>
                                <TableCell >Quantidade</TableCell>
                                <TableCell >Valor unitário</TableCell>
                                <TableCell >Valor do item</TableCell>
                                <TableCell ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {newOrders && newOrders.map((orders, index) => (
                                <TableRow key={index}>
                                    <TableCell >{orders.name}</TableCell>
                                    <TableCell >{orders.quantity}</TableCell>
                                    <TableCell >{orders.value}</TableCell>
                                    <TableCell >{orders.value * orders.quantity}</TableCell>
                                    {orders.confirmed === 0 ? <><TableCell >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.button}
                                            endIcon={<CheckIcon ></CheckIcon>}
                                            onClick={() => { changeRequestStatus(id, orders._id, 1) }}
                                        >
                                            Confirmar
                                        </Button>

                                    </TableCell>
                                        <TableCell >
                                            <Button
                                                variant="contained"
                                                color="secondary"
                                                className={classes.button}
                                                endIcon={<CancelIcon />}
                                                onClick={() => { changeRequestStatus(id, orders._id, 2) }}
                                            >
                                                Não atender
                                                                </Button>
                                        </TableCell></>
                                        : ''}
                                    {orders.confirmed === 1 ? <TableCell >
                                        Pedido confirmado!
                                    </TableCell> : ''}
                                    {orders.confirmed === 2 ? <TableCell >
                                        Pedido negado!
                                    </TableCell> : ''}
                                    {orders.confirmed === 3 ? <TableCell >
                                        Pedido a caminho!
                                    </TableCell> : ''}
                                    {orders.confirmed === 4 ? <TableCell >
                                        Pedido entregue
                                    </TableCell> : ''}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        )
    }
    function PointMap(dados) {
        const { data } = dados;
        return (
            <React.Fragment>
                {data && data.map((item, index) => {
                    return (
                        <Card className={classes.card} key={index}>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    Comandas ativas
                                </Typography>
                                <Typography variant="h5" component="h2">
                                    Mesa :{item.point}
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Quantidade de itens pedidos:
                                    <br />
                                    {item.orders.length}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="large" onClick={handleOpen}>Abrir comanda</Button>
                            </CardActions>
                            <Modal
                                className={classes.modalOverflow}
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description"
                            >
                                {body(item.orders, item.point, item._id)}
                            </Modal>
                        </Card>
                    )
                })}
            </React.Fragment>
        );
    }
    async function getData() {
        const data = await api.post(`orders/id_establishment`, {
            id_establishment: getId()
        });
        const { data: { success } } = data;
        if (success) {
            setData(data.data);
        }
    }
    useEffect(() => {
        getData();
        return () => {
            getData();
        }
    }, [atualiza])
    console.log(data)
    return (
        <Wrapper>
            <Grid container spacing={2}>
                {PointMap(data)}
            </Grid>
        </Wrapper>

    );
}

const mapStateToProps = (state) => {
    return {
        points: state
    }
}
export default connect(mapStateToProps)(Main);