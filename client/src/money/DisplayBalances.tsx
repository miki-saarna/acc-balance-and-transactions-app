import React, { ReactElement, useState, useEffect } from 'react';
import { Account } from '../utils/types';

export default function DisplayBalances({ accounts }: { accounts: Account[] }): ReactElement {

  // useEffect(() => {
  //   // immediately invoked function expression (IIFE)
  //   // (async () => await getBalance()
  //   //     .then(({ accounts }) => 
  //   //       setAccounts(accounts)
  //   //     )
  //   // )()
  //   getBalance()
  //     .then(({ accounts }) => {
  //       setAccounts(accounts)
  //     })
  // }, []);
  // console.log(accounts.length)
  
  const listAccountsAndBalances: React.ReactNode[] = accounts.map(({ account_id, balances: { current }, name }: Account) => {
      return (
        // <li key={account_id}>{name}: ${(Math.round(current * 100) / 100).toFixed(2)}</li>
        <tr key={account_id}>
          <td>{name}</td>
          <td>{(Math.round(current * 100) / 100).toFixed(2)}</td>
        </tr>
      )
    })

  // const test_data = accounts.map((account, index) => {
  //   return (
  //     <p key={index}>{account}</p>
  //   )
  // })

    return (
      // <>
      //   {test_data}
      // </>
        <table className='short-table'>
          <thead>
            <tr>
              <th>
                account name
              </th>
              <th>
                balance
              </th>
            </tr>
          </thead>
          <tbody>
            {listAccountsAndBalances}
          </tbody>
        </table>
        // <ul>{listAccountsAndBalances}</ul>
    )
}