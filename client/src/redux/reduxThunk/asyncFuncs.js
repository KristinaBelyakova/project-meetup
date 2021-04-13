import { initUserAC, initTravelsAC, addTravelsAC, delTravelsAC, editTravelsAC } from "../../redux/actionCreators/actionCreators"

export const fetchInitUser = () => {
  const token = window.localStorage.getItem('token')
  return (dispatch) => {
      fetch('http://localhost:4000/profile', {
          method: "GET",
          headers: {  "Content-Type": "Application/json", 'Authorization': `Bearer ${token}` },
      })
          .then(res => res.json())
          .then(data => {
            console.log(data)})
            // dispatch(initUserAC(data.auth))})
  }
}

export const fetchInitTravels = () => {
    const token = window.localStorage.getItem('token')
    return (dispatch) => {
        fetch('http://localhost:4000/travels', {
            method: "GET",
            headers: {  "Content-Type": "Application/json", 'Authorization': `Bearer ${token}` },
        })
            .then(res => res.json())
            .then(data => dispatch(initTravelsAC(data.travels)))
    }
}

export const fetchDelTravels = (id) => {
    const token = window.localStorage.getItem('token')
    return (dispatch) => {
        fetch('http://localhost:4000/travels', {
            method: "delete",
            headers: {  "Content-Type": "Application/json", 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ id })
        }).then(res => res.json())
          .then(data => dispatch(delTravelsAC(data.id)))
    }
}

export const fetchEditTravels = (
    id,
    title,
    description,
    country,
    city,
    startDate,
    finishDate,
    number
     ) => {
    const token = window.localStorage.getItem('token')
    return (dispatch) => {
        fetch(`http://localhost:4000/travels/${id}`, {
            method: "PUT",
            headers: {  "Content-Type": "Application/json", 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ 
                id,
                title,
                description,
                country,
                city,
                startDate,
                finishDate,
                number
            })
        }).then(res => res.json())
          .then(data => dispatch(editTravelsAC(data.travel)))
    }
}
