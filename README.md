
# Account Balance and Transactions App (Plaid API)

### Table of Contents

- [Live Application](#live-application)
- [Description](#description)
- [Technologies](#technologies)
- [How To Use](#how-to-use)
- [API Paths](#api-paths)
- [Application Features](#application-features)
- [License](#license)
- [Author Info](#author-info)

## Live Application

This application can be viewed here: [restaurant-reservation-application.vercel.app](restaurant-reservation-application.vercel.app)

The backend API is currently running here: [restaurant-reservation-application-server.vercel.app](restaurant-reservation-application-server.vercel.app)

Both the client and server are hosted on [Vercel](https://vercel.com/) with the SQL Databases hosted by [ElephantSQL](https://www.elephantsql.com/)

## Description

This application is designed to become a transaction tracker and budgeting software to help users create financial goals. This application drew inspiration from [Mint's](https://mint.intuit.com/) budgeting and goal-setting features.

Current features are limited to:

- Connecting your bank account
- Viewing your account balances
- Viewing transactions from the last 30 days

> This application implements Plaid's API end points to connect to your bank account information. However, instructions are provided within the application to provide test login credentials to easily view the application's features.

## Technologies

This application's front-end is built on React and TypeScript and styling was added through Vanilla CSS. An API handles all promises necessary to interact with the back-end API database.

The application's back-end is built on Express.js and MongoDB servers utilizing RESTful APIs.

The Express CORS package is implemented for specified domains to access the back-end API.

- Backend API setup
- Creating RESTful APIs
- Using Express for middleware request and response handling
- Implementing MongoDB servers
- Frontend built on React with React router and hooks
- TypeScript implementing on the frontend
- Express CORS package implemented
- Project deployed on Vercel

## How To Use

> Create a free Plaid account to have access to your own `PLAID_CLIENT_ID` and `PLAID_SECRET`s. 

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
7. On line 12 of the `./server/src/app.js` file, alter the value(s) of the `allowedDomains` array to include the location(s) where you plan to run the client of the application
8. Run `npm install` to install project dependencies
9. Run `npm start` to start your client and server concurrently

Please reach out for assitance if you are having trouble getting the server to properly run.

## API Paths

| API Path | Function |
| -------- | -------- |
| `/link/token/create` | POST: create a link_token |
| `/item/public_token/exchange` | POST: exchange a public_token for an access_token |
| `/api/balance` | GET: retrieve accounts associated with linked bank account |
| `/transactions/get` | GET: retrieve the last 30 days of transactions from accounts associated with linked bank account |
| `/accessToken` | POST: create a new collection containing the access_token to the specified MongoDB database cluster |
| `/accessToken/:id` | GET: retrieve the collection corresponding to the specified collection `id` |
| `/accessToken/:id` | PATCH: update the collection corresponding to the specified collection `id` |
| `/accessToken/:id` | DELETE: delete the collection corresponding to the specified collection `id` |

## Application Features

The application contains a navigation menu containing 3 different pages:

- Home
- Account Balances
- View Transactions

![Dashboard of the restaurant reservation application](./images/dashboard.png)

### Home

The dashboard contains all tables as well as all reservations of a specified date (defaulted to current date). Arrows buttons are available to view reservations of the following or previous day(s). Clicking the "Today" button will return the date to the current date. 

Reservations may also contain buttons on seat assignment, editting, and cancellation. The seat button will direct the user to the seat assignment page. The edit button will direct the user to the edit reservation page. The cancel button allows the user to cancel the reservation and remove from view.

Tables with a "Finished" button are currently occupied. Clicking the finish button will free the table and remove its corresponding reservation from view. Tables that are unoccupied contain an "x" button on the top right that will delete the table. An occupied table cannot be deleted until it is finished.

---

![Search page](./images/search-page.png);

### Account Balances

The search page allows the user to search for a reservation by phone number. Upon finding the correct reservation, the user can choose to seat the reservation, edit the reservation, or cancel it. Reservations that have already finished or have been cancelled will also be retrieved by this search. This feature creates an optimized and very efficient experience for the user when a customer calls in to alter or cancel their reservation.

---

![Page with form to create a new reservation](./images/reservation-creation.png)

### View Transactions

This page includes a form element with required inputs for the new reservation. Each submission also includes multiple validators on both the front-end and back-end to ensure a valid reservation is created.

![One of the validation errors on reservation submission](./images/reservation-creation-validation.png)

A successful submission will redirect the user to the `/dashboard?date=YYYY-MM-DD` page, which displays all reservations corresponding to the `reservation_date` of the reservation that was just created. The cancel button will return the user to the previous page.

---

![Page that allow reservation to be editted](./images/edit-reservation.png)

## Edit Reservation

Clicking the "Edit" button found on reservations leads the user to the edit reservation page. This page uses the exact same file as the Create Reservation page due to having many similaries). Any and all fields can be editted, but upon submission, front-end and back-end validation will check for validity of the updated reservation and provide submission errors if any. 

Just like the reservation creation page, upon submission, the user will be redirected to `/dashboard?date=YYYY-MM-DD` corresponding to the `reservation_date` of the editted reservation. The cancel button returns the user to the previous page.

---

![Page with form to create a new table](./images/table-creation.png)

## Table Creation

This page contains a form that allows the user to create a new table. Both front-end and back-end validation check to ensure that the table name and capacity contain valid inputs.

![Validation error occuring upon submission of invalid table](./images/table-creation-validation.png)

A successful submission directs the user to the dashboard page, defaulted to the present date. The cancel button will direct the user to the previous page.

---

![Seat assignment page](./images/seat-assignment.png)

## Seat Assignment

Clicking the "Seat" button found on a "booked" reservation leads the user to the seat assignment page. A selector displays table options with each table's corresponding name followed by its capacity. Upon submission, both front-end and back-end validation check if the selected table's capacity can seat the reservation's size. 

![Validation error occuring on seat assignment page](./images/seat-assignment-validation.png)

The submit button directs the user to the dashboard, defaulted to the current date. The cancel button directs the user to the previous page.

![Reservation assigned to table](./images/reservation-assigned-to-table.png)

The status of a reservation changes to "seated" when it has been assigned to a table. The "Seat", "Edit", and "Cancel" buttons will no longer display on a seated reservation. The status of the corresponding table will change to "Occupied". A "Finish" button will now appear on the occupied table.

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

## Version 2.0

Mention future improvements to application

## Author Info


- GitHub: [miki-saarna](https://github.com/miki-saarna)
- LinkedIn: [Mikito Saarna](https://www.linkedin.com/in/mikito-saarna/)
- Website: [MikiSaarna.com](https://MikiSaarna.com)

[Back To The Top](#restaurant-reservation-application)
