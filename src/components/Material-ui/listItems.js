import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../services/auth';
function handleLogout() {
    logout();
    localStorage.removeItem('currentIdUser');
}
export const mainListItems = (

    <div>
        <ListItem button>
            <ListItemIcon>
                <Link to="/mesas" style={{ textDecoration: 'none', color: 'inherit', }}>
                    <FormatListBulletedIcon />
                </Link>
            </ListItemIcon>
            <Link to="/mesas" style={{ textDecoration: 'none', color: 'inherit', }}>
                <ListItemText primary="Comandas" />
            </Link>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Link to="/addmesas" style={{ textDecoration: 'none', color: 'inherit', }}>
                    <LocalDiningIcon />
                </Link>
            </ListItemIcon>
            <Link to="/addmesas" style={{ textDecoration: 'none', color: 'inherit', }}>
                <ListItemText primary="Mesas" />
            </Link>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Link to="/cardapio" style={{ textDecoration: 'none', color: 'inherit', }}>
                    <AddIcon />
                </Link>
            </ListItemIcon>
            <Link to="/cardapio" style={{ textDecoration: 'none', color: 'inherit', }}>
                <ListItemText primary="Adicionar cardápio" />
            </Link>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <Link to="/qr" style={{ textDecoration: 'none', color: 'inherit', }}>
                    <CameraAltIcon />
                </Link>
            </ListItemIcon>
            <Link to="/qr" style={{ textDecoration: 'none', color: 'inherit', }}>
                <ListItemText primary="Qr codes" />
            </Link>
        </ListItem>
    </div >
);
export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <Link to="/configuracoes" style={{ textDecoration: 'none', color: 'inherit', }}>
                    <SettingsIcon />
                </Link>
            </ListItemIcon>
            <Link to="/configuracoes" style={{ textDecoration: 'none', color: 'inherit', }}>
                <ListItemText primary="Configurações" />
            </Link>
        </ListItem>
        <ListItem button>

            <ListItemIcon>
                <Link to="" onClick={() => handleLogout()} style={{ textDecoration: 'none', color: 'inherit', }}>
                    <ExitToAppIcon />
                </Link>
            </ListItemIcon>
            <Link to="" onClick={() => handleLogout()} style={{ textDecoration: 'none', color: 'inherit'}}>
                <ListItemText primary="Sair" />
            </Link>
        </ListItem>
    </div>
);