import React, {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom'

import {useSelector, useDispatch} from 'react-redux';
import {getVM} from '../actions/vm';

import VmTable from '../components/vm_table';

function VmShow() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getVM()), []);
  const vm = useSelector(state => state.vm);

  let {id} = useParams();
  //console.log(vm);

  const selected_vm = vm.filter(obj => { return obj.id == id })[0];

  if(selected_vm === undefined) {
    return (<div></div>);
  }

  console.log(selected_vm);

  return (<div>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2">{selected_vm.name}</h1>
    </div>
    <table class="table">
  <tbody>
    <tr>
      <th scope="row">FQDN</th>
      <td>{selected_vm.fqdn}</td>
    </tr>
    <tr>
      <th scope="row">Environment</th>
      <td>{selected_vm.environment.name}</td>
    </tr>
    <tr>
      <th scope="row">Network</th>
      <td>{selected_vm.network.name} ({selected_vm.network.vid})</td>
    </tr>
    <tr>
      <th scope="row">IPv4</th>
      <td>{selected_vm.config.net.ipv4.ip}/{selected_vm.config.net.ipv4.prefixlen}</td>
    </tr>
    <tr>
      <th scope="row">IPv6</th>
      <td>{selected_vm.config.net.ipv6.ip}/{selected_vm.config.net.ipv6.prefixlen}</td>
    </tr>
    <tr>
      <th scope="row">Created</th>
      <td>{selected_vm.created}</td>
    </tr>
    <tr>
      <th scope="row">Last Updated</th>
      <td>{selected_vm.updated}</td>
    </tr>
  </tbody>
</table>
  </div>);
}

export default VmShow;
