import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import AddPlace from '../components/AddPlace';
import PlacesList from '../../places/components/PlacesList';

import style from './MyPlace.module.css';

function MyPlaces() {

  const [ places, setPlaces ] = useState([])
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
    <div className={style.container}>
      <AddPlace />
      <PlacesList places={places} />
    </div>
  )
}

export default MyPlaces