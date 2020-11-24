import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { getVM } from '../../actions/vm'

import Button from 'react-bootstrap/Button'

import * as Config from '../../constants/config'

function VmShow () {
  const dispatch = useDispatch()
  useEffect(() => dispatch(getVM()), [])
  const vm = useSelector(state => state.vm)
  const user = useSelector(state => state.user)

  const axios = require('axios')

  const { id } = useParams()
  const SELECTED_VM = vm.filter(obj => { return obj.id === parseInt(id) })[0]

  const reboot = () => {
    console.log(SELECTED_VM.id)
  }

  const destroy = () => {
    return axios.delete(Config.API_URL + Config.VM_PATH + SELECTED_VM.id, {
      headers: {
        Authorization: 'JWT ' + user.token
      }
    }).then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
  }

  if (SELECTED_VM === undefined) {
    return (<div></div>)
  }

  const state = Object.keys(SELECTED_VM.state).map(key =>
    <div key={key}>
      <a className="list-group-item list-group-item-action" data-toggle="collapse" href={'#' + key } role="button" aria-expanded="false" aria-controls={ key }>
          <h5 className="mb-1">{ key + ' ' }
            <span className="badge badge-secondary"> { SELECTED_VM.state[key].status } </span>
          </h5>
        </a>
        <div id={ key } className="collapse" aria-labelledby={ key } data-parent="#state">
          <div className="card-body"> { JSON.stringify(SELECTED_VM.state[key], null, 2) } </div>
        </div>
    </div>
  )

  return (<div>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2">{SELECTED_VM.name}</h1>
    </div>
      <Button variant="outline-warning" onClick={reboot}> Reboot </Button>
      <Button variant="outline-danger" onClick={destroy} > Destroy </Button>

    <table className="table">
  <tbody>
    <tr>
      <th scope="row">FQDN</th>
      <td>{SELECTED_VM.fqdn}</td>
    </tr>
    <tr>
      <th scope="row">Environment</th>
      <td>{SELECTED_VM.environment.name}</td>
    </tr>
    <tr>
      <th scope="row">Network</th>
      <td>{SELECTED_VM.network.name} ({SELECTED_VM.network.vid})</td>
    </tr>
    <tr>
      <th scope="row">IPv4</th>
      <td>{SELECTED_VM.config.net.ipv4.ip}/{SELECTED_VM.config.net.ipv4.prefixlen}</td>
    </tr>
    <tr>
      <th scope="row">IPv6</th>
      <td>{SELECTED_VM.config.net.ipv6.ip}/{SELECTED_VM.config.net.ipv6.prefixlen}</td>
    </tr>
    <tr>
      <th scope="row">Created</th>
      <td>{SELECTED_VM.created}</td>
    </tr>
    <tr>
      <th scope="row">Last Updated</th>
      <td>{SELECTED_VM.updated}</td>
    </tr>
  </tbody>
</table>
<h4>State</h4>
<div className="list-group list-group-flush" id="state">
{ state }
</div>
  </div>)
}

export default VmShow
