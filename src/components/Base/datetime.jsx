import React from 'react'

import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

function DateTimeHelper (props) {
  const date = new Date(props.datetime)
  const CurrentDate = new Date()
  const diff = (CurrentDate.getTime() - date.getTime()) / 1000

  let DateString = date.toDateString() + ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2) + ':' + ('0' + date.getSeconds()).slice(-2)

  if (diff <= 3 * 60) {
    DateString = Math.round((diff)) + ' seconds ago'
  } else if (diff <= 60 * 30) {
    DateString = Math.round((diff / 60)) + ' minutes ago'
  }
  return (
    <OverlayTrigger overlay={<Tooltip id="tooltip-datetime">{date.toString()}</Tooltip>}>
      <span className="d-inline-block">
        { DateString }
      </span>
    </OverlayTrigger>
  )
}

export default DateTimeHelper
