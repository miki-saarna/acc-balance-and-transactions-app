import React, { useState, useEffect } from 'react';
import { getBalance } from '../utils/api';
import { Account, AccountsProp } from '../utils/types';

export default function GetBalance({ accounts, setAccounts }: any): JSX.Element {

  // const [accounts, setAccounts] = useState<[] | Account[]>([]);

  useEffect(() => {
    // can this async/await be removed? Potentially only need the then
    const retrieveAccBalances = async (): Promise<void> => {
      await getBalance()
        .then(({ accounts }) => {
          setAccounts(accounts);
        });
    }
    retrieveAccBalances();
  }, []);
  
  const listAccountsAndBalances: JSX.Element[] = accounts.map(({ account_id, balances: { current }, name }: Account) => {
      return (
        <li key={account_id}>{name}: ${(Math.round(current * 100) / 100).toFixed(2)} and {account_id}</li>
      )
    })

    return (
        <ul>{listAccountsAndBalances}</ul>
    )
}