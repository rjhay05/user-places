import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import style from './Navbar.module.css';
import SideDrawer from './SideDrawer';
import PlaceIcon from '../images/place.png'


function Navbar() {

  const [ isDrawer, setIsDrawer ] = useState(false)
  const showDrawerHandler = () => {
    setIsDrawer(true)
  }

  const closeDrawerHandler = () => {
    setIsDrawer(false)
  }
  return (
    <>
      <MainHeader>
        <div className={style.brand}>
          <div className={style.title}>
            <h1>Userly</h1>
          </div>
          <div className={style.icon}>
            <Link to='/'><img src={PlaceIcon} alt="User Places" /></Link>
          </div>
        </div>
        <button className={style.button} onClick={showDrawerHandler}>
          <span> </span>
          <span> </span>
          <span> </span>
        </button>
        <nav className={style.nav}>
          <NavLinks />
        </nav>
      </MainHeader>
      <SideDrawer onClick={closeDrawerHandler} show={isDrawer} onClose={closeDrawerHandler}>
        <NavLinks className={style[ 'nav-drawer' ]} onClick={closeDrawerHandler} />
      </SideDrawer>

    </>
  )
}

export default Navbar