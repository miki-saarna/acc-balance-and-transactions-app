import React, { useState } from 'react';
import TokenFunctions from './tokens/TokenFunctions';
import GetBalance from './balance/GetBalance';

function App() {

  const [accessToken, setAccessToken] = useState('');

  return (
    <>
      <TokenFunctions setAccessToken={setAccessToken} />
      {accessToken ? <GetBalance /> : null}
    </>
  );
}

export default App;
