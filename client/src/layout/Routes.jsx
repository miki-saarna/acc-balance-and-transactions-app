import React, { useEffect, useState } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import TokenFunctions from './tokens/TokenFunctions';
import AccessTokenDB from './tokens/AccessTokenDB';
import GetBalance from './money/GetBalance';
import GetTransactions from './money/GetTransactions';
import Menu from './layout/Menu';
import { AccessTokenObjProp } from './utils/types';

// function Routes() {
function Routes() {

  const [accessTokenObj, setAccessTokenObj] = useState<AccessTokenObjProp | any>('');

  useEffect(() => {

  }, [])

  // saves access_token to database
  useEffect(() => {
    if (accessTokenObj) {
      const {
        access_token,
        item_id
      } = accessTokenObj;
      AccessTokenDB(access_token, item_id);
    }
  }, [accessTokenObj])

  return (
    <>
      <Menu />
      <TokenFunctions setAccessTokenObj={setAccessTokenObj} /> 
      {accessTokenObj ? <GetBalance /> : null}
      {accessTokenObj ? <GetTransactions /> : null}
    </>
  );
}

export default Routes;
