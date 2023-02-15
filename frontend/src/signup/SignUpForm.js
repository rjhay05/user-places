import React, { useContext, useEffect, useReducer, useRef, useState } from 'react'
import Axios from 'axios'

import { CSSTransition } from 'react-transition-group';
import { Button } from '@mui/material';
import style from '../login/components/LoginForm.module.css';
import AuthContext from '../shared/store/auth-context';

const inputReducer = (state, action) => {

    if (action.type === 'NAME_INPUT') {
        return {
            ...state,
            name: {
                value: action.val,
                isValid: action.val.trim().length > 5
            }
        }
    }


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

    if (action.type === 'CONFIRM_PASSWORD_INPUT') {
        return {
            ...state,
            confirmPassword: {
                value: action.val,
                isValid: action.val.trim().length > 6
            }
        }
    }

    return state
}

function SignUpForm(props) {

    const [ state, dispatch ] = useReducer(inputReducer, {
        name: {
            value: '',
            isValid: null
        },
        email: {
            value: '',
            isValid: null
        },
        password: {
            value: '',
            isValid: null
        },
        confirmPassword: {
            value: '',
            isValid: null
        }
    })


    const [ error, setError ] = useState('')
    const [ isError, setIsError ] = useState(false)
    const ctx = useContext(AuthContext)
    const nodeRef = useRef()

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsError(false)
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    })

    const nameHandler = (event) => {
        dispatch({
            type: 'NAME_INPUT',
            val: event.target.value
        })

    }

    const emailHandler = (event) => {
        dispatch({
            type: 'EMAIL_INPUT',
            val: event.target.value
        })

    }

    const passwordHandler = (event) => {
        dispatch({
            type: 'PASSWORD_INPUT',
            val: event.target.value
        })

    }

    const confirmPasswordHandler = (event) => {
        dispatch({
            type: 'CONFIRM_PASSWORD_INPUT',
            val: event.target.value
        })

    }

    const submitHandler = async (event) => {
        event.preventDefault();

        const data = {
            name: name.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        }

        try {
            ctx.loadingHandler(true)
            const url = 'http://localhost:5000/api/users/signup'
            await Axios.post(url, data)
            window.location = '/auth/login'
        } catch (error) {
            setError(error.response.data)
            setIsError(true)
        }
        ctx.loadingHandler(false)
    }

    const loginHandler = (event) => {
        props.onLogin(event)
    }

    const { name, email, password, confirmPassword } = state;

    return (
        <form onSubmit={submitHandler}>
            <div className={`${style[ 'form-control' ]}`}>
                <label htmlFor='name'>Name</label>
                <input
                    className={`${name.isValid === false ? style.invalid : ''}`}
                    type='text'
                    id='name'
                    name='name'
                    value={name.value}
                    onBlur={nameHandler}
                    onChange={nameHandler}
                />

                <label htmlFor='name'>Email</label>
                <input
                    className={`${email.isValid === false ? style.invalid : ''}`}
                    type='text'
                    id='email'
                    name='email'
                    value={email.value}
                    onBlur={emailHandler}
                    onChange={emailHandler}
                />

                <label htmlFor='password'>Password</label>
                <input
                    className={`${password.isValid === false ? style.invalid : ''}`}
                    type='password'
                    id='password'
                    name='password'
                    value={password.value}
                    onBlur={passwordHandler}
                    onChange={passwordHandler}
                />

                <label htmlFor='password'>Confirm Password</label>
                <input
                    className={`${confirmPassword.isValid === false ? style.invalid : ''}`}
                    type='password'
                    id='confirmPassword'
                    name='confirmPassword'
                    value={confirmPassword.value}
                    onBlur={confirmPasswordHandler}
                    onChange={confirmPasswordHandler}
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
                <Button type='submit'>Create</Button>
                <Button onClick={loginHandler}>Go back to login</Button>
            </div>
        </form>
    )
}

export default SignUpForm