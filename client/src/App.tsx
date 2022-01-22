import React, { useEffect, useState } from 'react';
import TokenFunctions from './tokens/TokenFunctions';
import AccessTokenDB from './tokens/AccessTokenDB';
import GetBalance from './money/GetBalance';
import GetTransactions from './money/GetTransactions';
import { AccessTokenObjProp } from './utils/types';

function App(): JSX.Element {

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
      <TokenFunctions setAccessTokenObj={setAccessTokenObj} /> 
      {accessTokenObj ? <GetBalance /> : null}
      {accessTokenObj ? <GetTransactions /> : null}
    </>
  );
}

export default App;
