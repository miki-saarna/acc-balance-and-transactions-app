import React, { useState, useEffect, useCallback, FunctionComponent } from 'react';
import { getBalance } from '../utils/api';

export default async function GetBalance() {
    await getBalance()
      .then(console.log);
      return (
        <h1>hello world</h1>
      )
}