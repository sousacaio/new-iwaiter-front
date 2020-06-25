import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

export default function Deposits(props) {
  return (
    <React.Fragment>
      <Typography component="p" variant="h3">
        Point: {props.numero}
      </Typography>
      <div>
        {props.ocupado === 'sim' ? <div>
          <Button variant="contained" color="primary">Ver comanda</Button>
        </div> : null}
      </div>
    </React.Fragment>
  );
}