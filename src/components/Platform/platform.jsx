import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
import { getPlatform } from '../../actions/platform'

import PlatformTable from './platform_table'

function Platform () {
  const dispatch = useDispatch()
  useEffect(() => dispatch(getPlatform()), [])
  const platform = useSelector(state => state.platform)

  return (<div>
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 className="h2">Platforms</h1>
    </div>
    <Link to="/platform/create">Create New</Link>
    <PlatformTable platform={platform}/>
  </div>)
}

export default Platform
