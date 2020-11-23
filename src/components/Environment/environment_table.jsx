import React from 'react'

import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

class EnvironmentTable extends React.Component {
  render (props) {
    const items = this.props.environment.map((environment) => <tr key={environment.id}>
      <td>
        <Link to={'/environment/' + environment.id}>
          {environment.id}
        </Link>
      </td>
      <td>{environment.name}</td>
    </tr>)
    return (<Table striped="striped" bordered="bordered" hover="hover" responsive="responsive">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {items}
      </tbody>
    </Table>)
  }
}

export default EnvironmentTable
