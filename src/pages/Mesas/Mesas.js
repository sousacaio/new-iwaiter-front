import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { getIdBar } from '../../services/auth'
import api from '../../services/api'
import { Container, Coluna, Linha } from '../../components/GridArea/GridArea'
import QRCode from 'qrcode.react';
const Mesas = (props) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        function fetchData() {
            api.get('/mesas', { headers: { id: getIdBar() } }).then((r) => { setData(r.data.mesas); console.log(r.data.mesas) })
        }
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
    return (
        <Container>
            <Linha width={100} heigth={100}  >
                <Coluna height={100} position="fixed" style={{ position: 'fixed' }}>
                    <Menu />
                </Coluna>
                <Coluna width={60} heigth={100} style={{ position: 'absolute', left: '30vw' }}>
                    {data.map((item, index) => {
                        return (
                            <div style={{ display: 'flex', flexDirection: 'row', boxShadow: ' 0 0 10px', margin: '10px', background: '#35302D' }} key={index}>
                                <QRCode
                                    id={item.numero}
                                    value={`http://localhost:3000/?mesa=${item.numero}&bar=${getIdBar()}`}
                                    size={290}
                                    level={"H"}
                                    includeMargin={true}
                                />
                                <br />
                                <div style={{ width: '100%', margin: 'auto' }}>
                                    <a href="/#" style={{
                                        position: 'static',
                                        lineHeight: '5em',
                                        right: '10%',
                                        textTransform: 'uppercase',
                                        textDecoration: 'none',
                                        letterSpacing: '0.4em',
                                        color: 'rgba(255, 255, 255, 245)',
                                        display: 'block'
                                    }} onClick={() => downloadQR(item.numero)}> Baixar Qr Code da mesa {item.numero} </a>
                                </div>
                            </div>)
                    })}
                </Coluna>
            </Linha>
        </Container>
    );
};

export default Mesas;
