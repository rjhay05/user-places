import React, { useContext, useState } from 'react'
import Axios from 'axios';
import { Button, TextField } from '@mui/material';
import style from './AddPlaceForm.module.css';

import AuthContext from '../../shared/store/auth-context';
import FileUpload from '../../shared/UI/FileUpload/FileUpload';



function AddPlaceForm(props) {



    const userId = localStorage.getItem('UserId')
    const [ data, setData ] = useState({
        title: '',
        description: '',
        address: '',
        image: '',
        creator: userId

    })

    const ctx = useContext(AuthContext);

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [ input.name ]: input.value })
    }

    const fileUploadHandler = (pickedFile) => {
        setData((prevState) => {
           return  {...prevState, image: pickedFile}
        })
    }



    const submitHandler = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('Token')
        ctx.loadingHandler(true)
        try {
            const url = 'http://localhost:5000/api/places/'
            const formData = new FormData();
            formData.append('title', data.title)
            formData.append('description', data.description)
            formData.append('address', data.address)
            formData.append('image', data.image)
            formData.append('creator', data.creator)
            const { data: res } = await Axios.post(url, formData, {
                headers: {
                    'Authorization': 'Bearer '+ token
                }
            })
        } catch (error) {
            console.log(error.response.data)
        }
        props.closeForm()
        window.location.reload()
        ctx.loadingHandler(false);


    }

    return (
        <form onSubmit={submitHandler}>
            <div className={style[ 'form-control' ]}>
                <TextField
                    required
                    id="standard-required"
                    name='title'
                    label="Title"
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="standard-multiline-static"
                    name='description'
                    label="Description"
                    multiline
                    rows={4}
                    variant="standard"
                    onChange={handleChange}
                />
                <TextField
                    required
                    id="standard-required"
                    name='address'
                    label="Address"
                    variant="standard"
                    onChange={handleChange}
                />
                {/* <TextField
                                    required
                                    id="standard-required"
                                    name='image'
                                    label="Image"
                                    variant="standard"
                                    onChange={handleChange}
                                /> */}
                <FileUpload id='place-image' onInput={fileUploadHandler} />
            </div>
            <div className={style[ 'form-actions' ]}>
                <Button
                    type='submit'
                >
                    Add
                </Button>
                <Button
                    color='error'
                    onClick={props.closeForm}
                >
                    Close
                </Button>
            </div>
        </form>

    )
}

export default AddPlaceForm