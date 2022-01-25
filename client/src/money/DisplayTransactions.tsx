import React, { ReactElement, useState, useEffect } from 'react';
// import { getTransactions } from '../utils/api';
import { Transaction, Account } from '../utils/types';

interface Prop {
    transactions: Transaction[],
    accounts: Account[],
}

export default function DisplayTransactions({ transactions, accounts }: Prop): ReactElement {

    // const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
    
    // can I use Promise.resolve???
    // Promise.resolve()
    // .then(() => getTransactions())
    // getTransactions()
    //     .then(setTransactionsData)

    // useEffect(() => {
    //       getTransactions()
    //         .then(setTransactionsData)
    // }, []);
    
    // const [transactionsRow, setTransactionsRow] = useState([]);
        const transactionsRows = transactions.map((transaction: Transaction) => {
            const {
                account_id,
                transaction_id,
                date,
                merchant_name,
                name,
                category,
                amount
            } = transaction;
            
            const accountFound: any = accounts.find((account: Account) => {
                return account.account_id === account_id
            })
            
            
            return (
                <tr key={transaction_id}>
                    <td>{accountFound.name}</td>
                    <td>{date}</td>
                    <td>{merchant_name}</td>
                    <td>{name}</td>
                    <td>{category.join(', ')}</td>
                <td>${amount.toFixed(2)}</td>
            </tr>
        )
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        account name
                    </th>
                    <th>
                        date
                    </th>
                    <th>
                        merchant_name
                    </th>
                    <th>
                        name
                    </th>
                    <th>
                        category
                    </th>
                    <th>
                        amount
                    </th>
                </tr>
            </thead>
            <tbody>
                {transactionsRows}
            </tbody>
        </table>
    )
}