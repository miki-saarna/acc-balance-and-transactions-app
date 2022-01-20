import React, { useState, useEffect } from 'react';
import { getBalance } from '../utils/api';
import { account } from '../utils/types';

export default function GetBalance() {

  const [accounts, setAccounts] = useState<account[]>([]);

  useEffect(() => {
    const retrieveAccBalances = async () => {
      await getBalance()
        .then(({ accounts }) => {
          setAccounts(accounts);
        });
    }
    retrieveAccBalances();
  }, [])

  
  const listAccountsAndBalances:any = accounts.map(({ account_id, balances: { current }, name }:account) => {
    console.log(accounts);
      return (
        <li key={account_id}>{name}: ${(Math.round(current * 100) / 100).toFixed(2)}</li>
      )
    })

    return (
        <ul>{listAccountsAndBalances}</ul>
    )
}