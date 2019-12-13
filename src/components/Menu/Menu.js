import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../services/auth';
import './Menu.scss';
// https://codepen.io/jreyesgs/pen/qqomjK/
const Menu = () => {
    function handleLogout() {
        logout();
        localStorage.removeItem('currentIdUser');
    }

    return (
        <nav className="btn-pluss-wrapper">
            <h2 className="tooltip">Look!</h2>
            <div href="#" className="btn-pluss">
                <ul>
                    <li><Link to="/mesas">Meu Cardapio</Link></li>
                    <li><Link to="/mesas">Minhas Mesas</Link></li>
                    <li><Link to="/mesas">Fale Conosco</Link></li>
                    <li><Link to="/" onClick={() => { handleLogout() }}>Sair</Link></li>
                </ul>
            </div>
        </nav>

    );
}

export default Menu;
