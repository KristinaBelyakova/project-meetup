import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

function UserAboutMe(props) {
  const user = useSelector(store => store.user.user)
  // console.log(user);

  return (
    <div className="box">
      <p>
        {user.about ? user.about : 'No description listed'}
      </p>
    </div>
  )
}

export default UserAboutMe
