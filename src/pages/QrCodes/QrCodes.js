import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { getIdBar } from '../../services/auth'
import api from '../../services/api'
import { Cont, Flexcolumn, Flexrow } from '../../components/GridArea/GridArea'
import QRCode from 'qrcode.react';
import Wrapper from '../../components/Material-ui/Wrapper';
const QrCodes = (props) => {
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
        <Wrapper>
            <div>
                {data.map((item, index) => {
                    return (
                        <div key={index} className="item">
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
                                    textDecoration: 'none',
                                }} onClick={() => downloadQR(item.numero)}> Baixar Qr Code da mesa {item.numero} </a>
                            </div>
                        </div>)
                })}
            </div>
        </Wrapper>
    );
};

export default QrCodes;
