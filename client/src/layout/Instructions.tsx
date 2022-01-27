import React, { ReactElement } from 'react';

export default function Instructions(): ReactElement {
    return (
        <div className='instructions'>
            <p>Current Plaid environment: <span className='green-text'>sandbox</span></p> 
            <h3>Instructions:</h3>
            <p>Clicking the button above, will redirect you to <i className='green-text'>Plaid Quickstart</i>. When prompted to select a bank account, it is highly recommended to use <i>Chime</i> as no additional authentication will be required after inputting login credentials.</p>
            <p>Use the following login credentials:</p>
            <ul>
                <li>Email address: <span className='green-text'>"user_good"</span></li>
                <li>Password: <span className='green-text'>"pass_good"</span></li>
            </ul>
            <p>After successful login, API calls will be made automatically to retrieve the bank accounts and transactions. It may take about 5-10 seconds until the accounts and transactions pages populate with data.</p>
            <p>*Refer to instructions within the GitHub repository's README file to implement a development environment and use real login credentials and real account and transaction data.</p>
        </div>
    )
}