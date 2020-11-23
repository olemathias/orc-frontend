import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { getEnvironment } from '../../actions/environment'

import EnvironmentTable from './environment_table'

function Environment () {
  const dispatch = useDispatch()
  useEffect(() => dispatch(getEnvironment()), [])
  const environment = useSelector(state => state.environment)

  return (<div>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2">Environments</h1>
    </div>
    <Link to="/environment/create">Create New</Link>
    <EnvironmentTable environment={environment}/>
  </div>)
}

export default Environment
