import React from 'react'

import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

class PlatformTable extends React.Component {
  render (props) {
    const items = this.props.platform.map((platform) => <tr key={platform.id}>
      <td>
        <Link to={'/platform/' + platform.id}>
          {platform.id}
        </Link>
      </td>
      <td>{platform.name}</td>
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

export default PlatformTable
