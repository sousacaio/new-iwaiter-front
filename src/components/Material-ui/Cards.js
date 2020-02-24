import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits(props) {
  const classes = useStyles();
  const fontColor = props.ocupado === 'sim' ? '#ffffff' : 'textSecondary';
  return (
    <React.Fragment>
      <Typography component="p" variant="h3">
        Mesa: {props.numero}
      </Typography>
      <Typography color={fontColor} className={classes.depositContext}>
        {props.ocupado === 'sim' ? 'Mesa ocupada' : 'Mesa desocupada'}
      </Typography>
      <div>
        {props.ocupado === 'sim' ? <div>
          <Button variant="contained" color="primary">Ver comanda</Button>
        </div> : null}
      </div>
    </React.Fragment>
  );
}