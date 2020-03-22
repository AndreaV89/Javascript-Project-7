import React from 'react';

// Component for each photo
const Photo = props => (
    <li>
        <img src={props.url} alt=""/>
    </li>
);

export default Photo;