import React, { useState } from 'react';
import CheckIcon from '@material-ui/icons/Check';
import CancelIcon from '@material-ui/icons/Cancel';
import { connect, useDispatch } from 'react-redux';
import { storeOrders } from '../../actions/main-actions';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import {
    Button, Typography, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper,
    Dialog, DialogActions, DialogContent, Slide,
    AppBar, Toolbar, IconButton,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { changeRequestStatus } from '../../utils/requisitions/orders';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles2 = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));
const OrdersDialog = ({ orders, point, id, value, customer }) => {
    const dispatch = useDispatch();

    const storeActiveOrders = (orders) => {
        dispatch(storeOrders(orders))
    }
    async function confirmOrder(OrderId, nestedOrderId, value) {
        const result = await changeRequestStatus(OrderId, nestedOrderId, value);
        storeActiveOrders(result)
    }
    const classes2 = useStyles2();
    const newOrders = orders;

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const [open, setOpen] = useState(false);
    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleOpen}>
                Atender pedidos
            </Button>
            <Dialog fullScreen open={open} onClose={() => { handleClose(); }} TransitionComponent={Transition} aria-labelledby="form-dialog-title">
                <AppBar className={classes2.appBar}>
                    <Toolbar>

                        <Typography variant="h6" className={classes2.title}>
                            Total da comanda de {customer} até o momento: R$ {value}
                        </Typography>

                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>

                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell >Nome</TableCell>
                                    <TableCell >Quantidade</TableCell>
                                    <TableCell >Valor unitário</TableCell>
                                    <TableCell >Valor do item</TableCell>
                                    <TableCell >Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {newOrders && newOrders.map((orders, index) => (
                                    <TableRow key={orders._id}>
                                        <TableCell >{orders.name}</TableCell>
                                        <TableCell >{orders.quantity}</TableCell>
                                        <TableCell >{orders.value}</TableCell>
                                        <TableCell >{orders.value * orders.quantity}</TableCell>
                                        {orders.confirmed === 0 ? <>
                                            <TableCell >
                                                <Button
                                                    variant="contained"
                                                    color="default"
                                                    startIcon={<HourglassEmptyIcon />}
                                                    onClick={() => { confirmOrder(id, orders._id, 3) }}

                                                >
                                                    Em preparo
                                                </Button>
                                            </TableCell>

                                            <TableCell >
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<CheckIcon ></CheckIcon>}
                                                    onClick={() => { confirmOrder(id, orders._id, 1) }}
                                                >
                                                    Confirmar
                                        </Button>

                                            </TableCell>
                                            <TableCell >
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    startIcon={<CancelIcon />}
                                                    onClick={() => { confirmOrder(id, orders._id, 2) }}
                                                >
                                                    Não atender
                                                </Button>
                                            </TableCell>

                                        </>
                                            : ''}
                                        {orders.confirmed === 1 ? <TableCell >
                                            Pedido confirmado!
                                    </TableCell> : ''}
                                        {orders.confirmed === 2 ? <TableCell >
                                            Pedido negado!
                                    </TableCell> : ''}
                                        {orders.confirmed === 3 ?
                                            <TableCell >
                                                Atualmente em preparo!
                                            <Button
                                                    variant="contained"
                                                    color="primary"
                                                    startIcon={<CheckIcon ></CheckIcon>}
                                                    onClick={() => { confirmOrder(id, orders._id, 1) }}
                                                >
                                                    Confirmar?
                                        </Button>

                                            </TableCell> : ''}
                                        {orders.confirmed === 4 ? <TableCell >
                                            Pedido entregue
                                    </TableCell> : ''}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog >
        </>
    );
}
export default connect(null, null)(OrdersDialog);