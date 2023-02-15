import React from 'react';

import style from './MainHeader.module.css';

function MainHeader(props) {
  return (
    <header className={style[ 'main-header' ]}>
        {props.children}
    </header>
  )
}

export default MainHeader