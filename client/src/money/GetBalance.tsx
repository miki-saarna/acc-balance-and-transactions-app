import React, { ReactElement, useState, useEffect } from 'react';
import { getBalance } from '../utils/api';
import { Account, AccountsStateProp } from '../utils/types';

export default function GetBalance({ accounts, setAccounts }: AccountsStateProp): ReactElement {

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
  
  const listAccountsAndBalances: React.ReactNode[] = accounts.map(({ account_id, balances: { current }, name }: Account) => {
      return (
        <li key={account_id}>{name}: ${(Math.round(current * 100) / 100).toFixed(2)} and {account_id}</li>
      )
    })

    return (
        <ul>{listAccountsAndBalances}</ul>
    )
}