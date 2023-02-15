import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../store/auth-context';

import style from './NavLinks.module.css';

function NavLinks(props) {
    const ctx = useContext(AuthContext);
    const classes = props.className;

    const userId = localStorage.getItem('UserId')

    const logoutHandler = () => {
        ctx.logoutHandler()
    }
    return (
         <ul className={`${style[ 'nav-list' ]} ${classes}`}>
            <li>
                <NavLink to="/">Users</NavLink>
            </li>
            {
                ctx.isLoggedIn &&
                <li>
                    <NavLink to={`/${userId}/myplaces`}>My Places</NavLink>
                </li>
            }
            {
                !ctx.isLoggedIn ? 
                <li><NavLink to="/auth/login">Login</NavLink></li> 
                : 
                <li><NavLink onClick={logoutHandler}>Logout</NavLink></li>
            }
        </ul>
    )
}

export default NavLinks