import React, { useState, useEffect } from 'react';

import { useParams } from "react-router-dom";

import { componentDidMount } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEnvironment } from '../actions/environment';
import { getNetwork } from '../actions/network';

import VmCreateForm from '../components/vm_create_form';

function Vm() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnvironment());
    dispatch(getNetwork());
  }, [])

  const environment = useSelector(state => state.environment);
  const network = useSelector(state => state.network);

  return (
    <div>
  <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <h2 className="h2">Create Virtual Machine</h2>
  </div>
  <VmCreateForm environment={environment} network={network} />
  </div>
  );
}


export default Vm;
