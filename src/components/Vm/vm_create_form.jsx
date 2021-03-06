import React from 'react'
import { push } from 'connected-react-router'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import * as Config from '../../constants/config'
import { addAlert, clearAllAlerts } from '../../actions/alert'

class VmCreateForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      platform: undefined,
      network: undefined,
      memory: 4,
      cpu_cores: 2,
      os_disk: 32,
      name: undefined,
      vm_template: undefined
    }
  }

  handleSubmit = (e) => {
    const axios = require('axios')

    const user = this.props.user

    const dispatch = this.props.dispatch
    axios.post(Config.API_URL + Config.VM_PATH, this.state, {
      headers: {
        Authorization: 'JWT ' + user.token
      }
    }).then(function (response) {
      dispatch(addAlert('VM with ID ' + response.data.id + ' created!', 'success'))
      dispatch(push('/vm/' + response.data.id))
    }).catch(function (error) {
      dispatch(clearAllAlerts())
      for (const alert in error.response.data.errors) {
        window.scrollTo(0, 0)
        dispatch(addAlert('Error: ' + alert + ' ' + error.response.data.errors[alert], 'warning', false))
      }
    })
    e.preventDefault()
  }

  handleChange = (e) => {
    let value = e.target.value
    if (value === '') {
      value = undefined
    }
    if (!isNaN(value)) {
      value = parseInt(value)
    }
    this.setState({
      [e.target.name]: value
    })
  }

  nameForm = () => {
    if (this.state.platform === undefined) {
      return
    }
    const platform = this.props.platform.filter((platform) => { return platform.id === this.state.platform })[0]
    return (
    <Form.Group controlId="createVm.Name">
      <Form.Label>Name</Form.Label>
      <InputGroup className="mb-2 mr-sm-2">
        <Form.Control name="name" placeholder="Hostname" value={this.state.name || ''} onChange={(e) => this.handleChange(e)}/>
        <InputGroup.Append>
          <InputGroup.Text>.{platform.config.domain}</InputGroup.Text>
        </InputGroup.Append>
      </InputGroup>
    </Form.Group>)
  }

  networkForm = () => {
    if (this.state.platform === undefined) {
      return
    }
    const networks = this.props.network.filter((network) => { return network.platform.id === this.state.platform }).map((network) => <option key={network.id} value={network.id}>{network.name}</option>)
    return (<Form.Group controlId="createVm.Network">
      <Form.Label>Network</Form.Label>
      <Form.Control as="select" name="network" onChange={(e) => this.handleChange(e)}>
        <option hidden="hidden" key='0'>Select</option>
        {networks}
      </Form.Control>
    </Form.Group>)
  }

  vmTemplateForm = () => {
    if (this.state.platform === undefined) {
      return
    }
    const templates = this.props.vmTemplate.filter((template) => { return template.platform.id === this.state.platform }).map((template) => <option key={template.id} value={template.id}>{template.name}</option>)
    return (<Form.Group controlId="createVm.vmTemplate">
      <Form.Label>VM Template</Form.Label>
      <Form.Control as="select" name="vm_template" onChange={(e) => this.handleChange(e)}>
        <option hidden="hidden" key='0'>Select</option>
        {templates}
      </Form.Control>
    </Form.Group>)
  }

  hardwareForm = () => {
    if (this.state.vm_template === undefined) {
      return
    }
    return (<Form.Group controlId="createVm.Hardware">
      <Form.Label>Memory <small>GB</small></Form.Label>
      <InputGroup className="mb-2 mr-sm-2">
        <Form.Control name="memory" value={this.state.memory || ''} onChange={(e) => this.handleChange(e)}/>
      </InputGroup>
      <Form.Label>CPU Cores</Form.Label>
      <InputGroup className="mb-2 mr-sm-2">
        <Form.Control name="cpu_cores" value={this.state.cpu_cores || ''} onChange={(e) => this.handleChange(e)}/>
      </InputGroup>
      <Form.Label>OS Disk <small>GB</small></Form.Label>
      <InputGroup className="mb-2 mr-sm-2">
        <Form.Control name="os_disk" value={this.state.os_disk || ''} onChange={(e) => this.handleChange(e)}/>
      </InputGroup>
    </Form.Group>)
  }

  networkInfo = () => {
    if (this.state.network === undefined) {
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
    if (this.state.platform === undefined || this.state.network === undefined || this.state.name === undefined || this.state.vm_template === undefined) {
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
    const platforms = this.props.platform.map((platform) => <option key={platform.id} value={platform.id}>{platform.name}</option>)
    return (<Form onSubmit={this.handleSubmit}>
      <Form.Group controlId="createVm.Platform">
        <Form.Label>Platform</Form.Label>
        <Form.Control as="select" name="platform" onChange={(e) => this.handleChange(e)}>
          <option hidden="hidden" key='0'>Select</option>
          {platforms}
        </Form.Control>
      </Form.Group>
      {this.nameForm()}
      {this.networkForm()}
      {this.vmTemplateForm()}
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
