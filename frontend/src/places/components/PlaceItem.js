import React, { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import style from './PlaceItem.module.css';
import Modal from '../../shared/UI/Modal/Modal';
import EditForm from '../../user-account/components/EditForm';

import Axios from 'axios';
import AuthContext from '../../shared/store/auth-context';


export default function PlaceItem(props) {

  const [ openMap, setOpenMap ] = useState(false);
  const [ showConfirm, setShowConfirm ] = useState(false)
  const [ showEdit, setShowEdit ] = useState(false)
  const [ editShowConfirm, setEditShowConfirm ] = useState(false)

  const openMapHandler = () => setOpenMap(true)
  const closeMapHandler = () => setOpenMap(false)

  const openConfirmHandler = () => setShowConfirm(true)
  const closeConfirmHandler = () => setShowConfirm(false)

  const openEditHandler = () => setShowEdit(true)
  const closeEditHandler = () => {
    setShowEdit(false)
    setEditShowConfirm(false)
  }

  const showEditConfirmHandler = () => setShowConfirm(true)
  const closeEditConfirmHandler  = () => setShowConfirm(false)

  const ctx = useContext(AuthContext);

  const localUserId = localStorage.getItem('UserId')

  const deleteHandler = async () => {

    const url = `http://localhost:5000/api/places/${props.id}`
    ctx.loadingHandler(true)
    const token = localStorage.getItem('Token')
    try {
        await Axios.delete(url, {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      })
    } catch (error) {
      console.log(error.response)
    }
    window.location.reload()
    ctx.loadingHandler(false)
  }

  const footer = <>
    <Button onClick={closeEditConfirmHandler}>Cancel</Button>
    <Button color='error' onClick={closeEditHandler}>Confirm</Button>
  </>


  return (
    <>
      <Modal
        title='Delete place'
        show={showConfirm}
        content='Are you sure you want to delete this?'
        onClose={closeConfirmHandler}
        footer={
          <>
            <Button onClick={closeConfirmHandler}>Cancel</Button>
            <Button onClick={deleteHandler} color='error'>Confirm</Button>
          </>
        }
      />

      <Modal
        title='Map'
        onClose={closeMapHandler}
        content=<h3>Map is not available at the moment.</h3>
        footer={<Button color='error' onClick={closeMapHandler}>Close</Button>}
        show={openMap}
      />

      <Modal
        title='Edit place'
        content={<EditForm
          closeForm={showEditConfirmHandler}
          title={props.title}
          description={props.description}
          address={props.address}
          image={props.image}
          id={props.id}
        />}
        form
        show={showEdit}
      />

      <Modal
        show={editShowConfirm}
        title="Are you sure you want to close?"
        content="Changes will not be saved."
        className={style.card}
        footer={footer}
      />

      <Card className={style.card}>
        <CardMedia
          sx={{ height: 300 }}
          image={`http://localhost:5000/${props.image}`}
          title={props.title}
          component="img"
        />
        <CardContent>
          <Typography gutterBottom component="div">
            <h1>{props.title}</h1>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <b>Location: </b>{props.address}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={openMapHandler}>
            View in map
          </Button>
          {props.creator === localUserId ?
            <>
              <Button
                onClick={openEditHandler}
              >
                Edit
              </Button>
              <Button color='error'
                onClick={openConfirmHandler}
              >
                Delete</Button>
            </>
            :
            ''
          }
        </CardActions>
      </Card>
    </>
  );
}