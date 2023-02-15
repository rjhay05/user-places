import React, { useEffect, useRef, useState } from 'react'

import style from './FileUpload.module.css';

// import { Button } from '@mui/material'

function FileUpload(props) {

    const [ file, setFile ] = useState();
    const [ previewUrl, setPreviewUrl ] = useState();

    const filePickerRef = useRef();

    useEffect(() => {
        if (!file) {
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }

        fileReader.readAsDataURL(file)
    }, [ file ])

    const fileUploadHandler = (event) => {
        let pickedFile;

        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[ 0 ]
            setFile(pickedFile)
        }else {

        }
        props.onInput(pickedFile)
    }


    // const filePickerHandler = () => {
    //     filePickerRef.current.click();
    // }


    return (
        <div className={style.actions}>
            {/* <Button color='success' variant='contained' onClick={filePickerHandler}>Upload an image</Button> */}
            <input
                type='file'
                id={props.id}
                ref={filePickerRef}
                name={props.name}
                // style={{ display: 'none' }}
                onChange={fileUploadHandler}
                required
            />
            <div className={style.preview}>
                <img src={previewUrl} alt={props.alt}/>
            </div>

        </div>
    )
}

export default FileUpload