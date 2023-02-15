import React from 'react'
import style from './LoginContent.module.css';
import SigninImage from '../../shared/images/signin.svg'

function LoginContent() {
    return (
        <>
            <div className={style.image}>
                <img src={SigninImage} alt='signin' />
            </div>
            <div className={style.content}>
                <h1>Start sharing your journey with us</h1>
            </div>
        </>
    )
}

export default LoginContent