import React from 'react';
import './Emoji.css';

const Emoji = props => (
    <div className="emoji">
        <span
            role="img"
            aria-label={props.label ? props.label : ""}
            aria-hidden={props.label ? "false" : "true"}
        >
         {props.count ? props.count : ""}   {props.symbol}
        </span>
    </div>
);
export default Emoji;