import React from 'react';
import { logout } from '../../services/auth';
import { Link } from 'react-router-dom';
import { Li } from "../GridArea/GridArea";
import './Menu.scss';
// https://codepen.io/jreyesgs/pen/qqomjK/
const Menu = (history) => {
    function handleLogout() {
        logout();
        localStorage.removeItem('currentIdUser');
    }
    return (
        <main className="main">
            <aside className="sidebar">
                <nav className="nav">
                    <ul>
                        <Li width={100} height={14.5}>
                            <Link to="/mesas">Agora</Link>
                        </Li>
                        <Li width={100} height={14.5}>
                            <Link to="/addmesas">+ mesas</Link>
                        </Li>
                        <Li width={100} height={14.5}>
                            <Link to="/cardapio">Cardapio</Link>
                        </Li>
                        <Li width={100} height={14.5}>
                            <Link to="/addcardapio">+ itens</Link>
                        </Li>
                        <Li width={100} height={14.5}>
                            <Link to="/qr">Qr Codes</Link>
                        </Li>
                        <Li width={100} height={14.5}>
                            <Link to="/configurações">Configurações</Link>
                        </Li>
                        <Li width={100} height={14.5}>
                            <Link to="" onClick={() => { handleLogout() }}>Sair</Link >
                        </Li>
                    </ul>
                </nav>
            </aside>
        </main>
    );
}

export default Menu;