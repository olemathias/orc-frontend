import React from "react";
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table'

class VmTable extends React.Component {
  render(props) {
    const items = this.props.vm.map((vm) =>
    <tr key={vm.id}>
      <td><Link to={"/vm/"+vm.id}> {vm.id} </Link> </td>
      <td>{vm.name}</td>
    </tr>
    );
    return (
      <Table striped bordered hover responsive>
  <thead>
    <tr>
      <th>#</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
  {items}
  </tbody>
</Table>
    );
  }
}

export default VmTable;
