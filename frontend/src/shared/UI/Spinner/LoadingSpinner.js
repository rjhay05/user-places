import React from 'react'

import style from './LoadingSpinner.module.css'

function LoadingSpinner() {
    return (
        <div className={style[ 'lds-container' ]}>
            <div className={style[ 'lds-default' ]}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>

    )

}

export default LoadingSpinner