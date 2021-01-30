import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPlatform } from '../../actions/platform'
import { getNetwork } from '../../actions/network'
import { getVMTemplate } from '../../actions/vmTemplate'

import VmCreateForm from './vm_create_form'

function Vm () {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getPlatform())
    dispatch(getNetwork())
    dispatch(getVMTemplate())
  }, [])

  const user = useSelector(state => state.user)
  const platform = useSelector(state => state.platform)
  const network = useSelector(state => state.network)
  const vmTemplate = useSelector(state => state.vmTemplate)

  return (<div>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h2 className="h2">Create Virtual Machine</h2>
    </div>
    <VmCreateForm platform={platform} network={network} vmTemplate={vmTemplate} user={user} dispatch={dispatch}/>
  </div>)
}

export default Vm
