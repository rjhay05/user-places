import React from 'react'
import PlaceItem from './PlaceItem'

import style from './PlaceList.module.css';

function PlacesList(props) {

    if(props.places.length === 0){
        return <h1 className={style[ 'no-places' ]}>No Places Found</h1>
    }

  return (
    <>
        {props.places.map(place => {
            return (
                <PlaceItem 
                    key={place._id}
                    id={place._id}
                    title={place.title}
                    address={place.address}
                    description={place.description}
                    location={place.location}
                    image={place.image}
                    userid={place.userId}
                    creator={place.creator}
                />
            )
        })}
    </>
  )
}

export default PlacesList