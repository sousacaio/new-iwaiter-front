import React, { useEffect, useState } from 'react';
import { getId } from '../../services/auth'
import { makeStyles } from '@material-ui/core/styles';
import api from '../../services/api'
import QRCode from 'qrcode.react';
import Wrapper from '../../components/Material-ui/Wrapper';
import { Grid, Paper, Button } from '@material-ui/core/'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: '100%',
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));
const QrCodes = (props) => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    function fetchData() {
        api.get(`establishment/${getId()}/points`).then((r) => {
            setData(r.data.data[0].points)
        })
    }
    useEffect(() => {
        fetchData()
    }, []);
    function downloadQR(idImg) {
        const canvas = document.getElementById(idImg);
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = `${idImg}.png`;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };
    function Qr() {
        return (
            <React.Fragment>
                {data.map((item, index) => {
                    return (
                        <Grid item lg={4} xs={12} sm={6}>
                            <Paper className={classes.paper} >
                                <div key={index}>
                                    <QRCode
                                        id={item._id}
                                        value={`http://localhost:3000/?mesa=${item._id}&bar=${getId()}`}
                                        size={290}
                                        level={"H"}
                                        includeMargin={true}
                                    />
                                    <br />
                                    <Button size="small"
                                        onClick={() => downloadQR(item._id)}
                                    >
                                        Baixar Qr Code da mesa {item.num}</Button>
                                </div>
                            </Paper>
                        </Grid>)
                })}
            </React.Fragment>
        );
    }
    return (
        <Wrapper>
            <Grid container spacing={2}>
                <Grid container item xs={12} spacing={3}>
                    <Qr />
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default QrCodes;
