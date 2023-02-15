import React from 'react'
import style from './Card.module.css';

function Card(props) {
    const classes = props.className;
  return (
    <div className={`${style.card} ${classes}`} onClick={props.onClick}>
        {props.children}
    </div>
  )
}

export default Card