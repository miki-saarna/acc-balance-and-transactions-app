import React, { useState, useEffect } from 'react';
import { getTransactions } from '../utils/api';
import { TransactionProp } from '../utils/types'

export default function GetTransactions({ accounts }): JSX.Element {

    const [transactionsData, setTransactionsData] = useState<TransactionProp[]>([]);
    
    // can I use Promise.resolve???
    // Promise.resolve()
    // .then(() => getTransactions())
    // getTransactions()
    //     .then(setTransactionsData)

    useEffect(() => {
          getTransactions()
            .then(setTransactionsData)
    }, []);
    
    
        
        const transactionsRows = transactionsData.map((transaction: TransactionProp) => {
            const {
                account_id,
                transaction_id,
                date,
                merchant_name,
                name,
                amount
            } = transaction;
            
            const accountFound = accounts.find((account: any) => {
                return account.account_id === account_id
            })
            
            return (
                <tr key={transaction_id}>
                    <td>{accountFound.name}</td>
                    <td>{date}</td>
                    <td>{merchant_name}</td>
                    <td>{name}</td>
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