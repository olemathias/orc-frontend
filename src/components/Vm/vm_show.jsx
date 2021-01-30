import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { push } from 'connected-react-router'

import { useSelector, useDispatch } from 'react-redux'
import { getVM } from '../../actions/vm'
import StatusHelper from './status'
import DateTimeHelper from '../Base/datetime'

import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Tab from 'react-bootstrap/Tab'

import * as Config from '../../constants/config'
import { addAlert } from '../../actions/alert'

function VmShow () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getVM())
    const interval = setInterval(() => {
      dispatch(getVM())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const vm = useSelector(state => state.vm)
  const user = useSelector(state => state.user)

  const axios = require('axios')

  const { id } = useParams()
  const SELECTED_VM = vm.filter(obj => { return obj.id === id })[0]

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
      dispatch(addAlert('Trigged destruction!', 'info'))
      dispatch(push('/vm/'))
    }).catch(function (error) {
      dispatch(addAlert('Failed to trigger destroy!', 'danger', false))
      console.log(error)
    })
  }

  if (SELECTED_VM === undefined) {
    return (<h4> 404 - VM not found </h4>)
  }

  const state = Object.keys(SELECTED_VM.state).map(key =>
    <div key={key}>
      <ListGroup.Item action href={'#' + key } >
        <h5 className="mb-1">{ key + ' ' }
          <StatusHelper status={SELECTED_VM.state[key].status} />
        </h5>
      </ListGroup.Item>
      <Tab.Content>
        <Tab.Pane eventKey={'#' + key }>
          <div className="card-body"> { JSON.stringify(SELECTED_VM.state[key], null, 2) } </div>
        </Tab.Pane>
      </Tab.Content>
    </div>
  )

  return (
  <div>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h2 className="h2">{SELECTED_VM.name} <StatusHelper status={SELECTED_VM.status} /></h2>
    </div>
    <Button variant="outline-warning" onClick={reboot}> Reboot </Button>
    <Button variant="outline-danger" onClick={destroy} > Destroy </Button>

    <table className="table">
      <tbody>
        <tr>
          <th scope="row">UUID</th>
          <td>{SELECTED_VM.id}</td>
        </tr>
        <tr>
          <th scope="row">FQDN</th>
          <td>{SELECTED_VM.fqdn}</td>
        </tr>
        <tr>
          <th scope="row">Platform</th>
          <td>{SELECTED_VM.platform.name}</td>
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
          <td><DateTimeHelper datetime={SELECTED_VM.created}/></td>
        </tr>
        <tr>
          <th scope="row">Last Updated</th>
          <td><DateTimeHelper datetime={SELECTED_VM.updated}/></td>
        </tr>
      </tbody>
    </table>
    <h4>State</h4>
    <Tab.Container id="list-group-tabs-state">
      <ListGroup>
        { state }
      </ListGroup>
    </Tab.Container>
  </div>
  )
}

export default VmShow
