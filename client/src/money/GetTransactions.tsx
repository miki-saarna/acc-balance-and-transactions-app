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
            date,
            merchant_name,
            name,
            amount
        } = transaction;

        const validValues = ['date', 'merchant_name', 'name', 'transaction'];

        transactionsData.forEach((entry) => {
            if (validValues.includes(entry.toString())) {
                return <td>{entry}</td>
            }
        })

        return (
            <tr>
                <td>{date}</td>
                <td>{merchant_name}</td>
                <td>{name}</td>
                <td>{amount}</td>
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