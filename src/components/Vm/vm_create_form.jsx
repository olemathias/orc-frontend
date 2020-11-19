import React from 'react'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import store from '../../store'

import * as Config from '../../constants/config'

class VmCreateForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      environment: null,
      network: null,
      os_template: 'debian10',
      memory: 4,
      cpu_cores: 2,
      os_disk: 32,
      name: null
    }
  }

  handleSubmit = (e) => {
    const axios = require('axios')

    const user = store.getState().user
    axios.post(Config.API_URL + Config.VM_PATH, this.state, {
      headers: {
        Authorization: 'JWT ' + user.token
      }
    }).then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.log(error)
    })
    e.preventDefault()
  }

  handleChange = (e) => {
    let value = e.target.value
    if (value === '') {
      value = null
    }
    if (!isNaN(value)) {
      value = parseInt(value)
    }
    this.setState({
      [e.target.name]: value
    })
  }

  nameForm = () => {
    if (this.state.environment === null) {
      return
    }
    const environment = this.props.environment.filter((environment) => { return environment.id === this.state.environment })[0]
    return (
    <Form.Group controlId="createVm.Name">
      <Form.Label>Name</Form.Label>
      <InputGroup className="mb-2 mr-sm-2">
        <Form.Control name="name" placeholder="Hostname" value={this.state.name} onChange={(e) => this.handleChange(e)}/>
        <InputGroup.Append>
          <InputGroup.Text>.{environment.config.domain}</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>)
  }

  networkForm = () => {
    if (this.state.environment === null) {
      return
    }
    const networks = this.props.network.filter((network) => { return network.environment.id === this.state.environment }).map((network) => <option key={network.id} value={network.id}>{network.name}</option>)
    return (<Form.Group controlId="createVm.Network">
      <Form.Label>Network</Form.Label>
      <Form.Control as="select" name="network" onChange={(e) => this.handleChange(e)}>
        <option hidden="hidden" key='0'>Select</option>
        {networks}
      </Form.Control>
    </Form.Group>)
  }

  hardwareForm = () => {
    if (this.state.environment == null) {
      return
    }
    return (<Form.Group controlId="createVm.Hardware">
      <Form.Label>Memory <small>GB</small></Form.Label>
      <InputGroup className="mb-2 mr-sm-2">
        <Form.Control name="memory" value={this.state.memory} onChange={(e) => this.handleChange(e)}/>
      </InputGroup>
      <Form.Label>CPU Cores</Form.Label>
      <InputGroup className="mb-2 mr-sm-2">
        <Form.Control name="cpu_cores" value={this.state.cpu_cores} onChange={(e) => this.handleChange(e)}/>
      </InputGroup>
      <Form.Label>OS Disk <small>GB</small></Form.Label>
      <InputGroup className="mb-2 mr-sm-2">
        <Form.Control name="os_disk" value={this.state.os_disk} onChange={(e) => this.handleChange(e)}/>
      </InputGroup>
    </Form.Group>)
  }

  networkInfo = () => {
    if (this.state.network == null) {
      return
    }
    const network = this.props.network.filter((network) => { return network.id === this.state.network })[0]
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Network Info</h5>
            <b>Address available after creation </b> <br/>
            IPv4 Prefix: {network.prefixes4} <br/>
            IPv6 Prefix: {network.prefixes6} <br/>
            VLAN: {network.vid}
        </div>
      </div>
    )
  }

  submitButton = () => {
    if (this.state.environment === null || this.state.network === null || this.state.name === null) {
      return (
        <Button variant="primary" type="submit" disabled>
              Create VM
        </Button>
      )
    }
    return (
      <Button variant="primary" type="submit">
            Create VM
      </Button>
    )
  }

  render () {
    const environments = this.props.environment.map((environment) => <option key={environment.id} value={environment.id}>{environment.name}</option>)
    return (<Form onSubmit={this.handleSubmit}>
      <Form.Group controlId="createVm.Environment">
        <Form.Label>Environment</Form.Label>
        <Form.Control as="select" name="environment" onChange={(e) => this.handleChange(e)}>
          <option hidden="hidden" key='0'>Select</option>
          {environments}
        </Form.Control>
      </Form.Group>
      {this.nameForm()}
      {this.networkForm()}
      {this.hardwareForm()}
      {this.submitButton()}
      {this.networkInfo()}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Raw request</h5>
          <pre><code>{JSON.stringify(this.state, null, 2) }</code></pre>
        </div>
      </div>
    </Form>)
  }
};

export default VmCreateForm
