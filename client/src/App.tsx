import React, { useState } from 'react';
import TokenFunctions from './tokens/TokenFunctions';
import GetBalance from './balance/GetBalance';

function App(): JSX.Element {

  const [accessToken, setAccessToken] = useState<string>('');

  return (
    <>
      <TokenFunctions setAccessToken={setAccessToken} />
      {accessToken ? <GetBalance /> : null}
    </>
  );
}

export default App;
