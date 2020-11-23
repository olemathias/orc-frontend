import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { getVM } from '../../actions/vm'

import VmTable from './vm_table'

function Vm () {
  const dispatch = useDispatch()
  useEffect(() => dispatch(getVM()), [])
  const vm = useSelector(state => state.vm)

  return (<div>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2">Virtual Machines</h1>
    </div>
    <Link to="/vm/create">Create New</Link>
    <VmTable vm={vm}/>
  </div>)
}

export default Vm
