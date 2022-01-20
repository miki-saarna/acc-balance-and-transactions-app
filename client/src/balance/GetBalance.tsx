import React, { useState, useEffect } from 'react';
import { getBalance } from '../utils/api';

export default function GetBalance() {
  // export default async function GetBalance() {

    interface arrObj {
      account_id: string,
      balances: {
        current: number
      },
      name: string
    }
  

  const [accounts, setAccounts] = useState<arrObj[]>([]);

  useEffect(() => {
    const retrieveAccBalances = async () => {
      await getBalance()
        .then(({ accounts }) => {
          setAccounts(accounts);
        });
    }
    retrieveAccBalances();
  }, [])

  
  const listAccountsAndBalances = accounts.map(({ account_id, balances: { current }, name }:arrObj) => {
    console.log(accounts);
      return (
        <li key={account_id}>{name}: ${(Math.round(current * 100) / 100).toFixed(2)}</li>
      )
    })

    return (
        <ul>{listAccountsAndBalances}</ul>
    )
}