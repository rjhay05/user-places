import React from 'react';
import LoginContainer from '../components/LoginContainer';
import style from './Login.module.css';

function Login() {



  return (

      <div className={style.login}>
        <LoginContainer />
      </div>
  )
}

export default Login