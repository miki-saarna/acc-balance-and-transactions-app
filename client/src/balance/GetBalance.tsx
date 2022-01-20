import React, { useState, useEffect, useCallback } from 'react';
import { getBalance } from '../utils/api';

export default function GetBalance() {
  // export default async function GetBalance() {

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const retrieveAccBalances = async () => {
      await getBalance()
        .then(({ accounts }) => {
          setAccounts(accounts);
        });
    }
    retrieveAccBalances();
  }, [])

  const listAccountsAndBalances = accounts.map(({ account_id, balances: { current }, name }) => {
      return (
        <li key={account_id}>{name}: ${(Math.round(current * 100) / 100).toFixed(2)}</li>
      )
    })

    return (
        <ul>{listAccountsAndBalances}</ul>
    )
}