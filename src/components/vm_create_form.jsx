import React from "react";
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'

import store from '../store';

class VmCreateForm extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
          environment: null,
          network: null,
          os_template: "debian10",
          memory: "4",
          cpu_cores: "2",
          os_disk: "32"
      }
  }

  handleSubmit = (e) => {
    const axios = require('axios');
    const base_url = 'http://localhost:8000/';
    const vm_path = 'vm/';
    const user = store.getState().user
    axios.post(base_url+vm_path, this.state, {headers: {'Authorization': 'JWT '+user.token}})
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      e.preventDefault();
  }

  handleChange = (e) => {
     this.setState({[e.target.name]: e.target.value})
  }

  name_form = () => {
    if(this.state.environment == null) {
      return;
    }
    let environment = this.props.environment.filter((environment) => { return environment.id == this.state.environment })[0];
    return (
      <Form.Group controlId="createVm.Name">
        <Form.Label>Name</Form.Label>
        <InputGroup className="mb-2 mr-sm-2">
          <Form.Control name="name" placeholder="Hostname" value={this.state.name} onChange={(e) => this.handleChange(e)} />
            <InputGroup.Append>
              <InputGroup.Text>.{environment.config.domain}</InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    )
  }

  network_form = () => {
    if(this.state.environment == null) {
      return;
    }
    const networks = this.props.network.filter((network) => { return network.environment_id == this.state.environment }).map((network) => <option key={network.id} value={network.id}>{network.name}</option> );
    return (
      <Form.Group controlId="createVm.Network">
        <Form.Label>Network</Form.Label>
        <Form.Control as="select" name="network" onChange={(e) => this.handleChange(e)}>
          <option hidden key='0'>Select</option>
          {networks}
        </Form.Control>
      </Form.Group>
    )
  }

  hardware_form = () => {
    if(this.state.environment == null) {
      return;
    }
    return (
      <Form.Group controlId="createVm.Hardware">
          <Form.Label>Memory <small>GB</small></Form.Label>
          <InputGroup className="mb-2 mr-sm-2">
            <Form.Control name="memory" value={this.state.memory} onChange={(e) => this.handleChange(e)} />
          </InputGroup>
          <Form.Label>CPU Cores</Form.Label>
          <InputGroup className="mb-2 mr-sm-2">
            <Form.Control name="cpu_cores" value={this.state.cpu_cores} onChange={(e) => this.handleChange(e)} />
          </InputGroup>
          <Form.Label>OS Disk <small>GB</small></Form.Label>
          <InputGroup className="mb-2 mr-sm-2">
            <Form.Control name="os_disk" value={this.state.os_disk} onChange={(e) => this.handleChange(e)} />
          </InputGroup>
      </Form.Group>
    )
  }

  network_info = () => {
    if(this.state.network == null) {
      return;
    }
    let network = this.props.network.filter((network) => { return network.id == this.state.network })[0];
    return (
      <div>
      <h4> Network Info </h4>
      Address available after creation <br />
      IPv4 Prefix: { network.prefixes4 } <br />
      IPv6 Prefix: { network.prefixes6 } <br />
      VLAN: { network.vid }
      </div>
    )
  }

  render() {
    const environments = this.props.environment.map((environment) => <option key={environment.id} value={environment.id}>{environment.name}</option> );

    var environment = {"config": {}};
    if(this.state.environment != null) {
      environment = this.props.environment.filter((environment) => { return environment.id == this.state.environment })[0];
    }

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group controlId="createVm.Environment">
          <Form.Label>Environment</Form.Label>
          <Form.Control as="select" name="environment" onChange={(e) => this.handleChange(e)}>
            <option hidden key='0'>Select</option>
            {environments}
          </Form.Control>
        </Form.Group>
        { this.name_form() }
        { this.network_form() }
        { this.hardware_form() }
        <Button variant="primary" type="submit">
          Create VM
        </Button>
        { this.network_info() }
      </Form>
    )
  }
};

export default VmCreateForm;
