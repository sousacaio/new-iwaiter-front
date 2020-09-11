import React, { useState, useEffect } from 'react';
import {
    Dialog, DialogActions, DialogContent, DialogContentText
    , Button,
    Slide, Grid,

    AppBar, Toolbar, IconButton, Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CloseIcon from '@material-ui/icons/Close';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: "300px" || "10em",
        paddingTop: '56.25%', // 16:9
    },
};
const useStyles2 = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
}));
const DetailOrdersModal = ({ data, open, setOpen, ...props }) => {
    const classes2 = useStyles2();

    async function handleClose() {
        await setOpen(false);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    console.log(data)
    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Ver pedidos
            </Button>
            <Dialog fullScreen open={open} onClose={() => { handleClose(); }} TransitionComponent={Transition} aria-labelledby="form-dialog-title">
                <AppBar className={classes2.appBar}>
                    <Toolbar>

                        <Typography variant="h6" className={classes2.title}>
                            Itens do pedido
                        </Typography>

                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <Grid container spacing="2" direction="row">
                        {JSON.stringify(props, null, '\t')}
                        <Grid item lg={6} md={8} sm={12} xs={12} >
                            {data.map((item, index) => {
                                return (
                                    <Grid key={index}>
                                        {JSON.stringify(item, null, '\t')}
                                    </Grid>
                                )
                            })}

                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { handleClose(); }} color="primary">
                        Voltar
                    </Button>

                </DialogActions>
            </Dialog>
        </>
    )

}
export default DetailOrdersModal;