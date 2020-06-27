import React, { useEffect, useState } from 'react';
import { getId } from '../../services/auth'
import api from '../../services/api'
import QRCode from 'qrcode.react';
import Wrapper from '../../components/Material-ui/Wrapper';
import { Grid, Paper, Button } from '@material-ui/core/'
import { useStyles } from './styles'
const QrCodes = (props) => {
    const classes = useStyles();
    const [data, setData] = useState([]);
    async function fetchData() {
        const response = await api.get(`establishment/${getId()}/points`)
        setData(response.data.data)
    }

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
    
    useEffect(() => {
        fetchData()
    }, []);
    return (
        <Wrapper>
            <Grid container spacing={2}>
                <Grid container item xs={12} spacing={3}>
                    {data.map((item, index) => {
                        return (
                            <Grid item lg={4} xs={12} sm={6} key={index}>
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
                </Grid>
            </Grid>
        </Wrapper>
    );
};

export default QrCodes;
