import React from 'react';
import { logout } from '../../services/auth';
import { Link } from 'react-router-dom';
import { TotalColumn, TotalRow } from "../GridArea/GridArea";
import './Menu.scss';
// https://codepen.io/jreyesgs/pen/qqomjK/
const Menu = (history) => {
    function handleLogout() {
        logout();
        localStorage.removeItem('currentIdUser');
    }
    return (
        <TotalColumn size={10}>
            <div className="header">
                <div className="main-nav">
                    <ul className="unstyled list-hover-slide">
                        <li>
                            <TotalRow altura={1}>
                                <Link to="/mesas">Mesas</Link>
                            </TotalRow>
                        </li>
                        <li>
                            <TotalRow altura={5}>
                                <Link to="/addmesas">Adicionar mesas</Link>
                            </TotalRow>
                        </li>
                        <li>
                            <TotalRow altura={5}>
                            <Link to="/cardapio">Cardapio</Link>
                        </TotalRow>
                        </li>
                        <li>
                            <TotalRow altura={5}>
                                <Link to="/addcardapio">Adicionar itens ao cardápio</Link>
                            </TotalRow>
                        </li>
                        <li>
                            <TotalRow altura={5}>
                                <Link to="/qr">Qr Codes</Link>
                            </TotalRow>
                        </li>
                        <li>
                            <TotalRow altura={5}>
                                <Link to="/configurações">Configurações</Link>
                            </TotalRow>
                        </li>
                        <li>
                            <TotalRow altura={5}>
                                <Link to="" onClick={() => { handleLogout() }}>Sair</Link >
                            </TotalRow>
                        </li>
                    </ul>
                </div>
            </div>
        </TotalColumn>
    );
}

export default Menu;
