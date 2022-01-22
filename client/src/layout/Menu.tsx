import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function Menu(): JSX.Element {
    return (
        <nav>
            <ul>
                <li>
                  <Link to="/home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/balances">
                    Account Balances
                  </Link>
                </li>
                <li>
                  <Link to="/transactions">
                    View Transactions
                  </Link>
                </li>
            </ul>
        </nav>
    )
}