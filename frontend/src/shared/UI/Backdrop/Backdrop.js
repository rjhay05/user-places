import React from 'react'
import ReactDOM from 'react-dom'

import style from './Backdrop.module.css'

function Backdrop(props) {
    return (
        <>
            {ReactDOM.createPortal(<div className={`${style.backdrop} ${props.className}`} onClick={props.onClick}></div>,
                document.getElementById('backdrop-root'))}
        </>

    )
}

export default Backdrop