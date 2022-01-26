import React, { ReactElement, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TokenFunctions from '../tokens/TokenFunctions';
import AccessTokenDB from '../tokens/AccessTokenDB';
import DisplayBalances from '../money/DisplayBalances';
import DisplayTransactions from '../money/DisplayTransactions';
import { getBalance, getTransactions } from '../utils/api';
import { AccessTokenObj, Account, Transaction } from '../utils/types';

// function Routes() {
function Routing(): ReactElement {

  const [accessTokenObj, setAccessTokenObj] = useState<AccessTokenObj>({} as AccessTokenObj);
  const [accounts, setAccounts] = useState<[] | Account[]>([]);
  const [transactions, setTransactions] = useState<[] | Transaction[]>([]);

  // saves access_token to database
  useEffect(() => {
    const abortController = new AbortController();
    if (Object.entries(accessTokenObj).length) {
      const {
        access_token,
        item_id
      } = accessTokenObj;
      // consider removing the additional file and just making API call here
      AccessTokenDB(access_token, item_id, abortController.signal);
      // Promise.all([getBalance(abortController.signal), getTransactions(abortController.signal)])
        // .then((response) => {
          // setAccounts(response[0].accounts);
          // setTransactions(response[1]);
        // })
      getBalance(abortController.signal)
        .then(({ accounts }) => setAccounts(accounts))
        .catch((error) => console.error(error))
      // getTransactions(abortController.signal)
      //   .then(setTransactions)
  }
  return () => abortController.abort();
}, [accessTokenObj])

// unsure why, but getTransactions function needs its own useEffect to successfully retrieve transactions
useEffect(() => {
  const abortController = new AbortController();
  if (accounts.length) {
    getTransactions(abortController.signal)
      .then(setTransactions)
      .catch((error) => console.error(error))
  }
  return () => abortController.abort();
}, [accounts])

  return (
    <>
      <Routes>
        <Route path='/' element={<TokenFunctions setAccessTokenObj={setAccessTokenObj} /> }/>
        <Route path='/balances' element={accounts.length ? <DisplayBalances accounts={accounts} /> : null}/>
        <Route path='/transactions' element={transactions.length ? <DisplayTransactions transactions={transactions} accounts={accounts} /> : null}/>
      </Routes>
    </>
  );
}

export default Routing;
