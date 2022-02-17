import React, { ReactElement, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import TokenFunctions from '../tokens/TokenFunctions';
import AccessTokenDB from '../tokens/AccessTokenDB';
import DisplayBalances from '../money/DisplayBalances';
import DisplayTransactions from '../money/DisplayTransactions';
import { getBalance, getTransactions, storeAccessToken } from '../utils/api';
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
      console.log(accessTokenObj);
      const {
        access_token,
        item_id
      } = accessTokenObj;
      
      storeAccessToken(access_token, item_id, abortController.signal)

      Promise.all([getBalance(abortController.signal), getTransactions(abortController.signal)])
      // getBalance(abortController.signal)
      // getTransactions(abortController.signal)
        .then((response) => {
          console.log(response)
          setAccounts(response[0].accounts);
          setTransactions(response[1]);
          // setAccounts(response.accounts);
          // setTransactions(response);
        })
        .catch((error) => console.error(error))
  }

  return () => abortController.abort();
}, [accessTokenObj])

// useEffect(() => {
//   const abortController = new AbortController();
//   if (accounts.length) {
//     getTransactions(abortController.signal)
//       .then((response) => {
//         setTransactions(response)
//       })
//   }
//   return () => abortController.abort();
// }, [accounts])

  return (
    <main>
      <Routes>
        <Route path='/' element={<TokenFunctions setAccessTokenObj={setAccessTokenObj} /> }/>
        <Route path='/balances' element={accounts.length ? <DisplayBalances accounts={accounts} /> : null}/>
        <Route path='/transactions' element={transactions.length ? <DisplayTransactions transactions={transactions} accounts={accounts} /> : null}/>
      </Routes>
    </main>
  );
}

export default Routing;
