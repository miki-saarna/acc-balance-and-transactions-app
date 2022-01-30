import { AccessTokenObj, Account, Transaction } from "./types";
const API_BASE_URL: string = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const headers = new Headers();
headers.append("Content-Type", "application/json");

export const generateLinkToken = async (signal): Promise<string> => {
    // deployed Vercel application cannot properly calculate timezone offset from server
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const url: any = new URL(`${API_BASE_URL}/link/token/create`);
    // const url = new URL(`${API_BASE_URL}/api/create_link_token`);
    const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify({ timezoneOffset }),
        signal
    });
    const { link_token: linkToken } = await response.json();
    return linkToken;
}

// adjust to use api endpoint found within documentation...
export const exchangeForAccessToken = async (public_token: string, signal): Promise<AccessTokenObj> => {
    const url: any = new URL(`${API_BASE_URL}/item/public_token/exchange`);
    // const url: any = new URL(`${API_BASE_URL}/api/set_access_token`);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({public_token}),
        signal
    })
    // console.log(JSON.stringify({data: public_token}))
    // what happens if await is removed?
    // return await response.json();
    return await response.json();
}

export const getBalance = async (signal): Promise<{accounts: Account[]}> => {
    // export const getBalance = async (access_token: string) => {
    const url: any = new URL(`${API_BASE_URL}/api/balance`);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        signal
    })
    return await response.json();
}

export const storeAccessToken = async (access_token: string, item_id: string, signal) => {
    const url: any = new URL(`${API_BASE_URL}/accessToken`);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            access_token,
            item_id
        }),
        signal
    })
    return await response.json();
}

export const getTransactions = async (signal): Promise<Transaction[]> => {
    const url: any = new URL(`${API_BASE_URL}/transactions/get`);
    const options = {
        method: "GET",
        headers,
        body: null,
        signal
    }
    const response = await fetch(url, options);
    return response.json();
}