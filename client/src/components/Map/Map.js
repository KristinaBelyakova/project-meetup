import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  MarkerClusterer,
} from '@react-google-maps/api'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from "react-router-dom";

const containerStyle = {
  width: '47vw',
  height: '70vh',
  borderRadius: '4px',
}
const options = {
  disableDefaultUI: true,
  zoomControl: true,
  streetViewControl: true,
  navigation: true,
  fullscreenControl: true,
}

function Map({ visibility }) {

  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  const [selected, setSelected] = useState(null);

  const { coords, markers, id } = useSelector((store) => store.map)
  const store = useSelector((store) => store)

  // формирорвание markers
  // useEffect(() => {
  //   fetch('/users')
  //     .then(res => res.json())
  //     .then(users => dispatch({ type: 'INIT_VISIBLES_MARKS', payload: { users, id: user?._id } }))
  //   // (el) => (el.userId.visibility && !user._id) el.coords 
  // }, [])

  // console.log(coords);

  // console.log(!visibility, 'для делита');

  //удалить метку, если user невидим
  useEffect(() => {
    console.log('попал в на делит Map useEffect'); //???
    !visibility && coords?.user?._id != user._id &&

      (() => {
        fetch('/map/del-coords', {
          method: 'DELETE',
          headers: { 'Content-Type': 'Application/json' },
          body: JSON.stringify({
            id: coords?._id
          }),
        });
        console.log('удаление из базы');
      })()

    !visibility && coords?.user?._id != user._id && (() => {
      dispatch({ type: 'DEL_COORDS' });
      console.log("удаление из Store")
    })()
  }, [visibility]);


  // установка координат по клику и запись в store
  // Callback
  const changeMarker = (event) => {
    fetch('/map/edit-coords', {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({
        coords: {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        },
        id: coords._id,
      }),
    })
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: 'MY_COORDS', payload:
            // {
            data.editCoords
          //   lat: data.editCoords.coords.lat,
          //   lng: data.editCoords.coords.lng,
          //   id: data.editCoords._id
          // }
        })
      )
  }

  // установка ключа google
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return isLoaded ? (
    <>
      <GoogleMap
        zoom={13}
        mapContainerStyle={containerStyle}
        center={coords?.coords?.lat ? coords?.coords : { lat: 59.96, lng: 30.312481 }}
        options={options}
        onClick={visibility && changeMarker}
      >
        {visibility && <Marker
          position={coords?.coords}
          icon={{
            url: '/me.png',
            scaledSize: new window.google.maps.Size(30, 30), // масштабировать иконку
            anchor: new window.google.maps.Point(15, 15) // поставить в центр иконки
          }}
        />}

        {/* прорисовка всех юзеров, которые хотять meetUp */}
        {console.log(markers)}
        {visibility && markers.length != 0 ? markers.map((marker) =>
          <Marker
            key={performance.now()}
            position={
              { lat: marker.coords.lat, lng: marker.coords.lng } //coords
            }
            onClick={(event) => {
              // console.log(marker.user.name);
              setSelected(marker);
              console.log(marker);
            }}
          />) : null}

        {/* создаем информационное окно на каждый маркер */}
        {selected ? (
          <InfoWindow
            position={{ lat: selected.coords.lat, lng: selected.coords.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <p>
                <Link to="/profile">{selected.user.name}</Link>
              </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  ) : (
      <div></div>
    )
}

export default React.memo(Map)
