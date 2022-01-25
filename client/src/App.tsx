import React, { ReactElement } from 'react';
import Menu from './layout/Menu';
import Routing from './layout/Routing';

function App(): ReactElement {
  return (
    <>
      <Menu />
      <Routing />
    </>
  );
}

export default App;
