import React, { useState } from 'react';
import { logout } from '../../services/auth';
import { Link } from 'react-router-dom';
import Form from '../CatInputs/Form';
import './Menu.css';
import ModalMesas from '../Modal/ModalMesas';
import ModalFaleConosco from '../Modal/ModalFaleConosco';
// https://codepen.io/jreyesgs/pen/qqomjK/
const Menu = (history) => {
    const [mesas, setMesas] = useState(false);
    const [FaleConosco, setFaleConosco] = useState(false);


    function openMesas() {
        setMesas(true)
    }
    function dissmissMesas() {
        setMesas(false)
    }
    function openFaleConosco() {
        setFaleConosco(true)
    }
    function dissmissFaleConosco() {
        setFaleConosco(false)
    }

    function handleLogout() {
        logout();
        localStorage.removeItem('currentIdUser');
    }

    return (
        <div className="menu">
            <div className="label">Opções</div>
            <div className="spacer"></div>
            <div className="item2" ><Link to="/cardapio" style={{ textDecoration: 'none', color: 'black' }}><span>Cardápio</span></Link></div>
            <div className="item2" onClick={() => openMesas()}> <span>Mesas</span></div>
            <div className="item2" onClick={() => openFaleConosco()}><span>Fale Conosco</span></div>
            <div onClick={() => handleLogout()} className="item2"><span>Sair</span></div>
            <ModalMesas
                visible={mesas}
                dismiss={dissmissMesas}
                children={<div><Form /></div>}
            />
            <ModalFaleConosco
                visible={FaleConosco}
                dismiss={dissmissFaleConosco}
                children={<div>FaleConosco </div>}
            />
        </div >
    );
}

export default Menu;
