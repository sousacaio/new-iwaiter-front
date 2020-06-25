import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles(theme => ({
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
    submit: {
        margin: theme.spacing(0),
    },
    paper: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        margin: theme.spacing(2, 0, 2, 2),
        width: '90%'
    }
}));