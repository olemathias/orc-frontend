import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import { useParams } from "react-router-dom";

import { componentDidMount } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getVM } from '../actions/vm';

import VmTable from '../components/vm_table';

function Vm() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getVM()), [])
  const vm = useSelector(state => state.vm);

  let { id } = useParams();
  console.log(vm);

  let selected_vm = vm.filter(obj => {
    return obj.id == id
  })

  console.log(selected_vm);

  return (
    <div>
  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h1 className="h2">Virtual Machines</h1>
  </div>
  <Link to="/vm/create">Create New</Link>
    <VmTable vm={vm} />
  </div>
  );
}


export default Vm;
