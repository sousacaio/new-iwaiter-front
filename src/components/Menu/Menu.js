import React from 'react';
import { logout } from '../../services/auth';
import { Link } from 'react-router-dom';
import './Menu.scss';
// https://codepen.io/jreyesgs/pen/qqomjK/
const Menu = (history) => {
    function handleLogout() {
        logout();
        localStorage.removeItem('currentIdUser');
    }
    return (
        <div>

            <header className="header" role="banner">
                <h1 className="logo">
                    <Link to="/mesas"><span>Qmesa</span></Link>
                </h1>
                <div className="nav-wrap">
                    <nav className="main-nav" role="navigation">
                        <ul className="unstyled list-hover-slide">
                            <li><Link to="/mesas">Mesas</Link></li>
                            <li><Link to="/addmesas">Adicionar mesas</Link></li>
                            <li><Link to="/cardapio">Cardapio</Link></li>
                            <li><Link to="/addcardapio">Adicionar itens ao cardápio</Link></li>
                            <li><Link to="/qr">Qr Codes</Link></li>
                            <li><Link to="/configurações">Configurações</Link></li>
                            <li><Link to="" onClick={() => { handleLogout() }}>Sair</Link ></li>
                        </ul>
                    </nav>
                    <ul className="social-links list-inline unstyled list-hover-slide">
                        <li><Link to="/">Twitter</Link></li>
                        <li><Link to="/">Google+</Link></li>
                        <li><Link to="/">GitHub</Link></li>
                        <li><Link to="/">CodePen</Link></li>
                    </ul>
                </div>
            </header>
        </div>
    );
}

export default Menu;
