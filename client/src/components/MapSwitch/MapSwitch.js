import React from 'react'
import './MapSwitch.css'

function MapSwitch(props) {
  return (
    <div class="switch">
      <input type="checkbox" checked id="switch-1" className="switch-check" />
      <label for="switch-1" className="switch-label">
        Option
        <span className="switch-slider switch-slider-on"></span>
        <span className="switch-slider switch-slider-off"></span>
      </label>
    </div>
  )
}

export default MapSwitch
