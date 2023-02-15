import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import PlacesList from '../components/PlacesList'

import style from './UserPlaces.module.css';

function UserPlaces() {

    const [ places, setPlaces ] = useState([]);

    const userId = useParams().userId;
    const url = `http://localhost:5000/api/places/user/${userId}`

    useEffect(() => {

        const sendRequest = async () => {
            try {
                const res = await Axios.get(url)
                const data = res.data;
                setPlaces(data)
            } catch (error) {
                console.log(error.response)
            }
        }
        sendRequest()
    }, [url])

    return (
        <div className={style[ 'user-places' ]}>
            <PlacesList places={places} />
        </div>
    )
}

export default UserPlaces