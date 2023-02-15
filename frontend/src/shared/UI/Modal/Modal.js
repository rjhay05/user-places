import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

import style from './Modal.module.css';
import Card from '../Card/Card';
import { CSSTransition } from 'react-transition-group';
import Backdrop from '../Backdrop/Backdrop'


const ModalOverlay = (props) => {
    const nodeRef = useRef();

    let isForm;

    if(props.form){
        isForm = true
    }

    const classes = `${style.card} ${props.className}`
    const backdropClasses = `${style[ 'modal-container' ]} ${props.backdrop}`
    
    return (
        <>
            {props.show && <Backdrop />}
            <CSSTransition
                in={props.show}
                timeout={200}
                nodeRef={nodeRef}
                classNames='modal'
                mountOnEnter
                unmountOnExit
            >
                <div ref={nodeRef} className={backdropClasses} onClick={props.onClose}>
                    <Card className={classes}>
                        <div className={style.header}>
                            {props.title}
                        </div>
                        {
                            isForm ?
                                <>
                                    <div className={style.content}>
                                        {props.content}
                                    </div>
                                </>
                                :
                                <>
                                    <div className={style.content}>
                                        {props.content}
                                    </div>
                                    <div className={style.footer}>
                                        {props.footer}
                                    </div>
                                </>
                        }
                    </Card>
                </div>
            </CSSTransition>
        </>
    )

}

const Modal = (props) => {
    return ReactDOM.createPortal(<ModalOverlay {...props} />, document.getElementById('modal-root'))

}

export default Modal;
