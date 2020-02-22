import React from 'react';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Badge from '@material-ui/core/Badge';
// Generate Order Data
function createData(id_ordem, id_comanda, id_pedido, numero_mesa, cliente, status) {
    return { id_ordem, id_comanda, id_pedido, numero_mesa, cliente, status };
}

const rows = [
    createData(0, 2, 'Cerveja', 3, "fulano", 0),
    createData(2, 2, 'Vinho', 3, "sicrano", 0),
    createData(2, 2, 'Vinho', 3, "sicrano", 0),
    createData(2, 2, 'Vinho', 3, "sicrano", 0),
]
function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles(theme => ({
    seeMore: {
        marginTop: theme.spacing(3),
    },
}));

export default function Orders({ titulo, estado, naFila }) {
    const classes = useStyles();
    return (
        <React.Fragment>
    
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell> <Title>{titulo}</Title></TableCell>
                        <TableCell>    <Badge badgeContent={naFila} color="secondary" >
                        </Badge></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                </TableBody>
            </Table>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Comanda</TableCell>
                        <TableCell>Pedido</TableCell>
                        <TableCell>Mesa</TableCell>
                        <TableCell>Cliente</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id_ordem}>
                            <TableCell>{row.id_comanda}</TableCell>
                            <TableCell>{row.id_pedido}</TableCell>
                            <TableCell>{row.numero_mesa}</TableCell>
                            <TableCell>{row.cliente}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell><Button variant="contained" color="primary">Aceitar</Button></TableCell>
                            <TableCell><Button variant="contained" color="secondary">Negar</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className={classes.seeMore}>
                <Link color="primary" href="#" onClick={preventDefault}>
                    Ver todas as comandas {estado}

                </Link>
            </div>
        </React.Fragment>
    );
}