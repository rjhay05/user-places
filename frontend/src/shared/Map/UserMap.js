import React, { useRef, useEffect } from 'react';

import {Feature, Map, View} from 'ol/index.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Point} from 'ol/geom.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {useGeographic} from 'ol/proj.js';

import style from './UserMap.module.css'



function UserMap(props) {
    const mapRef = useRef()

    useGeographic()



    useEffect(() => {
        const place = [props.center.lng, props.center.lat]
        const point = new Point(place)
        new Map({
            target: mapRef.current.id,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
                new VectorLayer({
                    source: new VectorSource({
                        features: [new Feature(point)]
                    }),
                    style: {
                        'circle-radius': 9,
                        'circle-fill-color': 'red',
                      },
                })
            ],
            view: new View({
                center: place,
                zoom: 18
            })
        })
    }, [props.center.lng, props.center.lat])



    return (
        <div id='map'
            className={style.map}
            ref={mapRef}
        >
        </div>
    )
}

export default UserMap;