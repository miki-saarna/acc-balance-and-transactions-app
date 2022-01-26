import React, { ReactElement, useEffect, useState } from 'react';
import { Link } from "react-router-dom";

export default function Menu(): ReactElement {
    return (
        <nav>
            <ul>
                <li>
                  <Link to="/">
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
                <li>
                  <Link to="/reconnect">
                    Reconnect
                  </Link>
                </li>
            </ul>
        </nav>
    )
}