import React from 'react'
import Alert from 'react-bootstrap/Alert'

import { useSelector, useDispatch } from 'react-redux'
import { clearAlert } from '../../actions/alert'

function AlertHelper () {
  const alerts = useSelector(state => state.alert)
  const dispatch = useDispatch()

  return alerts.map((alert, idx) => (<Alert key={idx} onClose={() => dispatch(clearAlert(idx))} dismissible={true} variant={alert.variant}> {alert.text} </Alert>))
}

export default AlertHelper
