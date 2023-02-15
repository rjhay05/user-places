import React, { useRef } from 'react'
import ReactDOM from 'react-dom'

import { CSSTransition } from 'react-transition-group';
import Backdrop from '../UI/Backdrop/Backdrop';

import style from './SideDrawer.module.css';

function SideDrawer(props) {
    const nodeRef = useRef(null)
    const content = (
        <>
            {props.show && <Backdrop className={style.backdrop} onClick={props.onClose} />}
            <CSSTransition
                nodeRef={nodeRef}
                in={props.show}
                timeout={200}
                classNames="slide-in-left"
                mountOnEnter
                unmountOnExit
            >
                <aside ref={nodeRef}
                    className={style[ 'side-drawer' ]}
                    onClick={props.onClick}>{props.children}
                </aside>
            </CSSTransition>
        </>

    )

    return (
        <>
            {ReactDOM.createPortal(content,
                document.getElementById('drawer-root'))}

        </>
    )
}

export default SideDrawer