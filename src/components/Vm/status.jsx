import React from 'react'
import Badge from 'react-bootstrap/Badge'

function statusHelper (props) {
  const status = props.status
  if (status === undefined) {
    return <Badge variant="info">Unknown</Badge>
  }
  if (status === 'provisioned') {
    return <Badge variant="success">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }
  if (status === 'provisioning') {
    return <Badge variant="info">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }
  if (status === 'error') {
    return <Badge variant="danger">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }
  if (status === 'destroying') {
    return <Badge variant="warning">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
  }
  return <Badge variant="info">{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
}

export default statusHelper
