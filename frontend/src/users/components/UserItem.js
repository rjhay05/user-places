import React from 'react'
import {  useNavigate } from 'react-router-dom';

import Card from '../../shared/UI/Card/Card';

import style from './UserItem.module.css';

function UserItem(props) {

  const navigate = useNavigate()
  const viewUserHandler = () => {
    const url = `/${props.id}/places`
    navigate(url)
  }

  if(props.placeCount === 0){
    return;
  }

  return (
      <Card className={style.card} onClick={viewUserHandler}>
        <div className={style[ 'card-header' ]}>
          {/* <Avatar /> */}
          <h1>{props.name}</h1>
        </div>
        <div className={style[ 'card-body' ]}>
          <b>Places:</b> {props.placeCount}
        </div>
      </Card>

  )
}

export default UserItem