import React, { useState, useEffect } from 'react';
// const { getTransactions } = require('../utils/api');
import { getTransactions } from '../utils/api';
import { TransactionProp } from '../utils/types'

export default function GetTransactions(): JSX.Element {

    const [transactionsData, setTransactionsData] = useState<TransactionProp[]>([]);
    
    // can I use Promise.resolve???
    getTransactions()
        .then(setTransactionsData)

    const transactionsRows = transactionsData.map((transaction: TransactionProp) => {
        const {
            transaction_id,
            date,
            merchant_name,
            name,
            amount
        } = transaction;


        return (
            <tr key={transaction_id}>
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