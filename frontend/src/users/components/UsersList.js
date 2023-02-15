import React from 'react';
import UserItem from './UserItem';

import style from './UsersList.module.css';


function UsersList(props) {

    if(props.users.length === 0){
        return <h1 className={style[ 'no-users' ]}>No Available Users</h1>;
    }

    return (
        <div className={style[ 'container' ]}>
            {props.users.map(user => {
                return <UserItem 
                    key={user._id}
                    id={user._id}
                    name={user.name}
                    placeCount={user.places.length}
                />
            })}

        </div>
    )
       
}

export default UsersList