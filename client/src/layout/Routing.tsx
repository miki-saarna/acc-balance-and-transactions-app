import React, { ReactElement, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TokenFunctions from '../tokens/TokenFunctions';
import AccessTokenDB from '../tokens/AccessTokenDB';
import GetBalance from '../money/GetBalance';
import GetTransactions from '../money/GetTransactions';
import { getBalance, getTransactions } from '../utils/api';
import { AccessTokenObj, Account, Transaction } from '../utils/types';

// function Routes() {
function Routing(): ReactElement {

  const [accessTokenObj, setAccessTokenObj] = useState<AccessTokenObj>({} as AccessTokenObj);
  const [accounts, setAccounts] = useState<[] | Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // saves access_token to database
  useEffect(() => {
    if (Object.entries(accessTokenObj).length) {
      const {
        access_token,
        item_id
      } = accessTokenObj;
      AccessTokenDB(access_token, item_id);
      getBalance()
        .then(({ accounts }) => setAccounts(accounts));
      getTransactions()
          .then(setTransactions)
    }
  }, [accessTokenObj])

  return (
    <>
      <Routes>
        <Route path='/' element={<TokenFunctions setAccessTokenObj={setAccessTokenObj} /> }/>
        <Route path='/balances' element={accessTokenObj ? <GetBalance accounts={accounts} setAccounts={setAccounts} /> : null}/>
        <Route path='/transactions' element={accessTokenObj ? <GetTransactions transactions={transactions} accounts={accounts} /> : null}/>
      </Routes>
    </>
  );
}

export default Routing;
