# Recent Transactions App with Plaid API

### Note: the account balances feature of this application is currently under maintenance and is, therefore, unavailable. I am working diligently to return this feature as soon as possible. 

### Table of Contents

- [Live Application](#live-application)
- [Description](#description)
- [Technologies](#technologies)
- [How To Use](#how-to-use)
- [API Paths](#api-paths)
- [Application Features](#application-features)
- [Version 2.0 (future upgrade)](#version-20)
- [License](#license)
- [Author Info](#author-info)

## Live Application

This application can be viewed here: [acc-balance-and-transactions-application.vercel.app](https://acc-balance-and-transactions-application.vercel.app)

The backend API is currently running here: [acc-balance-and-transactions-app-server-2.vercel.app](https://acc-balance-and-transactions-app-server-2.vercel.app)

Both the client and server are hosted on [Vercel](https://vercel.com/) with the databases hosted by [MongoDB](https://www.mongodb.com)

## Description

This application is designed to become a transaction tracker and budgeting software to help users create financial goals. This application drew inspiration from [Mint's](https://mint.intuit.com/) budgeting and goal-setting features.

Current features include:

- Connecting your bank account
- Viewing transactions from the last 30 days

> This application implements Plaid's API end points to connect to your bank account information. However, sample login credentials are provided within the application's home page that allows users to easily view and use the application's features.

## Technologies

This application's front-end is built on React and TypeScript and Vanilla CSS. An API handles all promises necessary to interact with the back-end API database.

The application's back-end is built on Express.js and MongoDB servers utilizing RESTful APIs.

The Express CORS package is implemented for specified domains to access the back-end API. The CORS package is commented out for installation simplicity, but is ready to be used by uncommenting a few lines of code (Detailed instructions within [Installation](#installation) section below)

- Backend API setup
- Creating RESTful APIs
- Using Express for middleware request and response handling
- Implementing MongoDB servers
- Frontend built on React with React router and hooks
- TypeScript implemented on the frontend
- Express CORS package implemented
- Project deployed on Vercel

> The API calls to MongoDB servers are meant to assist in adopting a login system to this application, which will be built in the near future. Therefore, these API calls perform a frivolous task for the time-being.

## How To Use

> Create a free Plaid account [here](https://dashboard.plaid.com/signup?email=&referrer_url=) to have access to your own `PLAID_CLIENT_ID` and `PLAID_SECRET`s. 

### Installation:

1. Fork and clone this repository
2. `cd` into the newly created directory
3. Run `cp ./server/.env.sample ./server/.env`
4. Update the newly created `.env` file in the `./server` directory
    - Input the `PLAID_CLIENT_ID` assigned to your Plaid account
    - Depending on the environment, input the sandbox or development `PLAID_SECRET` assigned to your Plaid account
    - Alter the value of `PLAID_ENV` to `development` if you wish to use real banking information
    - Alter the value of `DATABASE_URL` with the connection URL to your MongoDB database cluster unless you wish to use a local database connection
5. Run `cp ./client/.env.sample ./client/.env`
6. The newly created `.env` file in the `./client` directory does not need to be editted, unless you wish to connect to the server at a location other than `http://localhost:5000`
8. Run `npm install` to install project dependencies
9. Run `npm start` to start your client and server concurrently

Other:

- Reconfigure lines 12 - 20 of the `./server/src/app.js` file to use the CORS package. Alter the value(s) of the `allowedDomains` array to include the location(s) where you plan to run the client of the application

Please reach out for assitance if you are having trouble getting the server to properly run.

## API Paths

| API Path | Function |
| -------- | -------- |
| `/link/token/create` | POST: create a link_token |
| `/item/public_token/exchange` | POST: exchange a public_token for an access_token |
| `/transactions/get` | GET: retrieve the last 30 days of transactions from accounts associated with linked bank account |
| `/accessToken` | POST: create a new collection containing the access_token to the specified MongoDB database cluster |
| `/accessToken/:id` | GET: retrieve the collection corresponding to the specified collection `id` |
| `/accessToken/:id` | PATCH: update the collection corresponding to the specified collection `id` |
| `/accessToken/:id` | DELETE: delete the collection corresponding to the specified collection `id` |

## Application Features

The application contains a navigation menu containing 2 different pages:

- Home
- View Transactions

### Home

![Search page](./docs/images/home-page.png)

The home page contains a button that will navigate the user to Plaid Quickstart, which is Plaid's own API that allows for safe and secure connection to use your bank institution's login credentials to access your accounts and transactions.

Additionally, simple instructions are provided (not pictured above) that contain the bank institution login credentials for the sandbox environment.

---

### View Transactions

![Page that displays all transactions from the last 30 days](./docs/images/transactions-page.png)

The transactions page allows the user to view all transactions from the associated account from the last 30 days. The following information is included for each transaction:

- Name of the account that the transaction belongs to
- Date of transaction
- Name of the merchant
- Name of the transaction
- Category data regarding the transaction
- Amount of the transaction

---

### Plaid Quickstart

![Plaid's Quickstart API to connect to a bank account](./docs/images/plaid-quickstart-login.png)

Per instructions provided on the [Home](#home) page, the Plaid Quickstart API allows the user to input credentials of a sample account to be used for experimentation with the application and to test its functionality while using the sandbox environment. If a development environment is being used, real and authentic login credentials can be used to view the application with real-time data.

You can learn more about Plaid Quickstart from their [documentation](https://plaid.com/docs/quickstart/).

## Version 2.0

In addition to optimizing the current code base and updating some of the TypeScript type annotations, there are a number of updates planned for the near future to give this application more functionalities. These include:

- Ability to create monthly budgets for different categories and track current progress for the current month
- Add a pie/donut chart to the transactions page that displays each category of transactions represented by their portion of total transaction amount. This will allow users to easily visual spending patterns
- User/login system that can save user's information instead of needing to input login credentials for institutions every time upon opening the application

Feel free to reach out to me if there are any other features not listed that you would like to request to be added.

## License

MIT License

Copyright (c) [2021] [Miki Saarna]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Author Info

- GitHub: [miki-saarna](https://github.com/miki-saarna)
- LinkedIn: [Mikito Saarna](https://www.linkedin.com/in/mikito-saarna/)
- Website: [MikiSaarna.com](https://MikiSaarna.com)

[Back To The Top](#recent-transactions-app-with-plaid-api)
