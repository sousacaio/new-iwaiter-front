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

            <header class="header" role="banner">
                <h1 class="logo">
                    <Link to="/mesas"><span>Qmesa</span></Link>
                </h1>
                <div class="nav-wrap">
                    <nav class="main-nav" role="navigation">
                        <ul class="unstyled list-hover-slide">
                            <li><Link to="/mesas">Mesas</Link></li>
                            <li><Link to="/cardapio">Cardapio</Link></li>
                            <li><Link to="#">Fale conosco</Link></li>
                            <li><Link onClick={() => { handleLogout() }}>Sair</Link ></li>
                        </ul>
                    </nav>
                    <ul class="social-links list-inline unstyled list-hover-slide">
                        <li><Link to="#">Twitter</Link></li>
                        <li><Link to="#">Google+</Link></li>
                        <li><Link to="#">GitHub</Link></li>
                        <li><Link to="#">CodePen</Link></li>
                    </ul>
                </div>
            </header>
        </div>
    );
}

export default Menu;
