import { tokenExchangeProp, AccountsProp } from "./types";
const API_BASE_URL: string = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const headers = new Headers();
headers.append("Content-Type", "application/json");

export const generateLinkToken = async (): Promise<string> => {
    
    const url: any = new URL(`${API_BASE_URL}/link/token/create`);
    // const url = new URL(`${API_BASE_URL}/api/create_link_token`);
    const response = await fetch(url, {
        method: "POST",
        headers,

    });
    const { link_token: linkToken } = await response.json();
    return linkToken;
}

// adjust to use api endpoint found within documentation...
export const exchangeForAccessToken = async (public_token: string): Promise<tokenExchangeProp> => {
    const url: any = new URL(`${API_BASE_URL}/item/public_token/exchange`);
    // const url: any = new URL(`${API_BASE_URL}/api/set_access_token`);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({public_token}),  
    })
    // console.log(JSON.stringify({data: public_token}))
    // what happens if await is removed?
    // return await response.json();
    return await response.json();
}

export const getBalance = async (): Promise<AccountsProp> => {
    // export const getBalance = async (access_token: string) => {
    const url: any = new URL(`${API_BASE_URL}/api/balance`);
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return await response.json();
}

export const storeAccessToken = async (access_token: string, item_id: string) => {
    const url: any = new URL(`${API_BASE_URL}/accessToken/storage`);
    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            access_token,
            item_id
        })
    })
    return await response.json();
}