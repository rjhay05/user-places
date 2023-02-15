import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import style from './Navbar.module.css';
import SideDrawer from './SideDrawer';


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
        <h1 className={style.title}><Link to="/">Your Place</Link></h1>
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