import React, { useEffect, useReducer, useRef, useState, useContext } from 'react'
import { Link } from 'react-router-dom';

import Axios from 'axios';

import { Button } from '@mui/material';
import { CSSTransition } from 'react-transition-group';

import style from './LoginForm.module.css';
import AuthContext from '../../shared/store/auth-context';


const inputReducer = (state, action) => {
    if (action.type === 'EMAIL_INPUT') {
        return {
            ...state,
            email: {
                value: action.val,
                isValid: action.val.includes('@')
            }

        }
    }

    if (action.type === 'PASSWORD_INPUT') {
        return {
            ...state,
            password: {
                value: action.val,
                isValid: action.val.trim().length > 6
            }

        }
    }

    return state;
}


function LoginForm(props) {

    const [ error, setError ] = useState();
    const [ isError, setIsError ] = useState();
    const nodeRef = useRef();
    const ctx = useContext(AuthContext);

    const [ state, dispatch ] = useReducer(inputReducer, {
        email: {
            value: '',
            isValid: null
        },
        password: {
            value: '',
            isValid: null
        }
    })


    useEffect(() => {
        const timer = setTimeout(() => {
            setIsError(false)
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    })

    const emailInputHandler = (event) => {
        dispatch(
            {
                type: 'EMAIL_INPUT',
                val: event.target.value
            }
        )
    };

    const passwordInputHandler = (event) => {
        dispatch(
            {
                type: 'PASSWORD_INPUT',
                val: event.target.value
            }
        )
    };


    const submitHandler = async (event) => {
        event.preventDefault();

        const data = {
            email: email.value,
            password: password.value
        }


        try {
            ctx.loadingHandler(true)
            const url = 'http://localhost:5000/api/users/login'
            const { data: res } = await Axios.post(url, data)
            ctx.loggedInHandler(res.userId, res.token)
            // window.location = '/user/places'
        } catch (error) {
            setError(error.response.data)
            setIsError(true);
        }
        ctx.loadingHandler(false)
    }

    const signUpHandler = (event) => {
        props.onSignUp(event)
    }

    const { email, password } = state

    return (
        <form onSubmit={submitHandler}>
            <div className={`${style[ 'form-control' ]}`}>
                <label htmlFor='email'>Email</label>
                <input
                    className={`${email.isValid === false ? style.invalid : ''}`}
                    type='text'
                    id='email'
                    name='email'
                    value={email.value}
                    onBlur={emailInputHandler}
                    onChange={emailInputHandler}
                />

                <label htmlFor='password'>Password</label>
                <input
                    className={`${password.isValid === false ? style.invalid : ''}`}
                    type='password'
                    id='password'
                    name='password'
                    value={password.value}
                    onBlur={passwordInputHandler}
                    onChange={passwordInputHandler}
                />
            </div>
            <CSSTransition
                nodeRef={nodeRef}
                in={isError}
                timeout={200}
                classNames="error-flash"
                mountOnEnter
                unmountOnExit
            >
                <div ref={nodeRef} className={style[ 'invalid-field' ]}>
                    {error}
                </div>
            </CSSTransition>
            <div className={style[ 'form-actions' ]}>
                <Button type='submit'>Login</Button>
                <Button onClick={signUpHandler}>Create an account</Button>
            </div>
            <div className={style.link}>
                <Link>Forgot your password?</Link>
            </div>
        </form>
    )
}

export default LoginForm