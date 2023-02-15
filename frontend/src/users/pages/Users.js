import  Axios from 'axios'
import React, { useEffect, useState } from 'react'
import UsersList from '../components/UsersList'

import style from './Users.module.css'

function Users() {

  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const sendRequest = async () => {
      const url = 'http://localhost:5000/api/users/'
  
      try {
          const res = await Axios.get(url)
          const data = res.data
          setUsers(data)
      } catch (error) {
          console.log(error.response)
      }
    }
    sendRequest()
  }, [])


  return (
    <div className={style.users}>
        <UsersList users={users}/>
    </div>
  )
}

export default Users