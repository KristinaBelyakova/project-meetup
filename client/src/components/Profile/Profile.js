import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import Navbar from '../Navbar/Navbar'
import CardUser from '../CardUser/CardUser'

function Profile(props) {
  return (
    <>
      <Header />
      <div id="main">
        <section className="post">
          <div className="row">
            <div className="col-3 col-12-small">
               <CardUser />
            </div>
            <div className="col-9 col-12-small">
              <Navbar />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Profile
