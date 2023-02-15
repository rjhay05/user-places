import React, { useState } from 'react';

import style from './LoginContainer.module.css';
import LoginForm from './LoginForm';
import Card from '../../shared/UI/Card/Card';
import LoginContent from './LoginContent';
import SignUpForm from '../../signup/SignUpForm';


function LoginContainer() {
        
        const [isSignUp, setIsSignUp] = useState(false)
        const signUpHandler = () => {
            setIsSignUp(true);
        }
        const loginHandler = () =>{
            setIsSignUp(false)
        }
    return (
        <>
            <Card className={style[ 'left-container' ]}>
               <LoginContent />
            </Card>
            <Card className={style[ 'right-container' ]}>
                {isSignUp && <SignUpForm onLogin={loginHandler}/>}
                {!isSignUp && <LoginForm onSignUp={signUpHandler}/>}
            </Card>
        </>

    )
}

export default LoginContainer