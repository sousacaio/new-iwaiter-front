import React, { useEffect, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import { getIdBar } from '../../services/auth'
import api from '../../services/api'
import { Flexcolumn, Flexrow, TotalRow, TotalColumn } from '../../components/GridArea/GridArea'
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
        <Flexrow altura={12}>
            <Flexcolumn size={3}>
                <Menu />
            </Flexcolumn>
            <Flexcolumn size={9}>
                <TotalColumn size={10}>
                    {data.map((item, index) => {
                        return (
                            <TotalRow key={index} altura={1}>
                                <QRCode
                                    id={item.numero}
                                    value={`http://localhost:3000/?mesa=${item.numero}&bar=${getIdBar()}`}
                                    size={290}
                                    level={"H"}
                                    includeMargin={true}
                                />
                                <a href="/#" onClick={() => downloadQR(item.numero)}> Baixar Qr Code da mesa {item.numero} </a>
                            </TotalRow>)
                    })}
                </TotalColumn>
            </Flexcolumn>
        </Flexrow>
    );
};

export default Mesas;
