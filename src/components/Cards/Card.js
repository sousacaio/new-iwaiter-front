import React from 'react';
import './Card.css';
const Card = (props) => (
    <div >
        <div  className="row">
            <div className="column">
                <div className="card" style={{ backgroundColor: '#35302D',color:"white" }}>Mesa:{props.numero}<br />Ocupada:{props.ocupado}<br />Id:{props.id}</div>
            </div>
        </div>
    </div>
);


export default Card;
