import React, { useEffect, useState } from 'react';
import TokenFunctions from './tokens/TokenFunctions';
import AccessTokenDB from './tokens/AccessTokenDB';
import GetBalance from './balance/GetBalance';
import { AccessTokenObjProp, Empty } from './utils/types';

function App(): JSX.Element {

  const [accessTokenObj, setAccessTokenObj] = useState<AccessTokenObjProp | any>('');

  

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
    </>
  );
}

export default App;
