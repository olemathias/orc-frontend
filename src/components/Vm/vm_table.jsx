import React from 'react'

import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

import StatusHelper from './status'

class VmTable extends React.Component {
  render (props) {
    const items = this.props.vm.map((vm) => <tr key={vm.id}>
      <td>
        <Link to={'/vm/' + vm.id}>
          {vm.id}
        </Link>
      </td>
      <td>{vm.name}</td>
      <td><StatusHelper status={vm.status} /></td>
    </tr>)
    return (<Table striped="striped" bordered="bordered" hover="hover" responsive="responsive">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>)
  }
}

export default VmTable
