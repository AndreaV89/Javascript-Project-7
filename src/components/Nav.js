import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = (props) => (
    <div className="main-nav">
        <ul>
            <li><NavLink onClick={ () => props.onClick('sunset')} to="../search/sunsets">Sunsets</NavLink></li>
            <li><NavLink onClick={ () => props.onClick('waterfalls')} to="../search/waterfalls">Waterfalls</NavLink></li>
            <li><NavLink onClick={ () => props.onClick('rainbows')} to="../search/rainbows">Rainbows</NavLink></li>
        </ul>
    </div>
);

export default Nav;


