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
        <Link to="/orders" style={{ textDecoration: 'none', color: 'inherit', }}>
            <ListItem button>
                <ListItemIcon>
                    <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText primary="Comandas" />
            </ListItem>
        </Link>
        <Link to="/addmesas" style={{ textDecoration: 'none', color: 'inherit', }}>
            <ListItem button>
                <ListItemIcon>

                    <LocalDiningIcon />

                </ListItemIcon>

                <ListItemText primary="Mesas" />

            </ListItem>
        </Link>
        <Link to="/catalog" style={{ textDecoration: 'none', color: 'inherit', }}>
            <ListItem button>
                <ListItemIcon>
                    <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Catalogo" />
            </ListItem>
        </Link>
         <Link to="/qr" style={{ textDecoration: 'none', color: 'inherit', }}>
            <ListItem button>
                <ListItemIcon>
                    <CameraAltIcon />
                </ListItemIcon>
                <ListItemText primary="Qr codes" />
            </ListItem>
        </Link>
    </div >
);
export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <Link to="/configuracoes" style={{ textDecoration: 'none', color: 'inherit', }}>
            <ListItem button>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Configurações" />
            </ListItem>
        </Link>
        <Link to="" onClick={() => handleLogout()} style={{ textDecoration: 'none', color: 'inherit', }}>
            <ListItem button>
                <ListItemIcon>
                    <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Sair" />
            </ListItem>
        </Link>
    </div>
);