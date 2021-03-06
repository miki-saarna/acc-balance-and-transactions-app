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
            
            // should always find account - is there a way to remove the undefined?
            const accountFound: Account | undefined = accounts.find((account: Account) => {
                return account.account_id === account_id
            })
            
            return (
                <tr key={transaction_id}>
                    <td>{accountFound ? accountFound.name : 'N/A'}</td>
                    <td className='no-wrap'>{date}</td>
                    <td>{merchant_name ? merchant_name : 'N/A'}</td>
                    <td>{name}</td>
                    <td>{category.join(', ')}</td>
                    <td className='no-wrap'>${amount.toFixed(2)}</td>
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