import { Button } from '@mui/material'
import React, { useState } from 'react'
import Modal from '../../shared/UI/Modal/Modal'

import AddPlaceForm from './AddPlaceForm'
import style from './AddPlace.module.css'
function AddPlace() {

  const [ showForm, setShowForm ] = useState(false)
  const [ showConfirm, setShowConfirm ] = useState(false)

  const openFormHandler = () => setShowForm(true)
  const closeFormHandler = () => {
    setShowConfirm(false)
    setShowForm(false)
  }
  const showConfirmHandler = () => setShowConfirm(true)
  const closeConfirmHandler = () => setShowConfirm(false)

  const footer = <>
    <Button onClick={closeConfirmHandler}>Cancel</Button>
    <Button color='error' onClick={closeFormHandler}>Confirm</Button>
  </>


  return (
    <>
      {!showForm && <Button
        onClick={openFormHandler}
      >
        Add Place
      </Button>}
      <Modal
        show={showForm}
        title='Add place'
        content={<AddPlaceForm closeForm={showConfirmHandler} />}
        form
      />
      <Modal
        show={showConfirm}
        title="Are you sure you want to close?"
        content="Changes will not be saved."
        className={style.card}
        footer={footer}
      />
    </>

  )
}

export default AddPlace