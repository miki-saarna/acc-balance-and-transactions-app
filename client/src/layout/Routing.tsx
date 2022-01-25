import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import TokenFunctions from '../tokens/TokenFunctions';
import AccessTokenDB from '../tokens/AccessTokenDB';
import GetBalance from '../money/GetBalance';
import GetTransactions from '../money/GetTransactions';
import Menu from './Menu';
import { AccessTokenObjProp } from '../utils/types';

// function Routes() {
function Routing(): JSX.Element {

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
      <Routes>
        <Route path='/' element={<TokenFunctions setAccessTokenObj={setAccessTokenObj} /> }/>
        <Route path='/balances' element={accessTokenObj ? <GetBalance /> : null}/>
        <Route path='/transactions' element={accessTokenObj ? <GetTransactions /> : null}/>
      </Routes>
    </>
  );
}

export default Routing;
