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
    const url: any = new URL(`${API_BASE_URL}/accessToken`);
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

export const getTransactions = async () => {
    // const url: string = `${API_BASE_URL}/transactions/get`
    const url: any = new URL(`${API_BASE_URL}/transactions/get`);
    const options = {
        method: "GET",
        headers,
        body: null
    }
    const response = await fetch(url, options);
    return response.json();
}

// bvb3kBJ3ZZClEXRXqwbnHxblpNLgDVCVovj3l
// mdlLRQkLvvFNopGpWPXdi6ZGeMqB5VfL43NAo
// yLP3NGe3wwtGE4a4KlqPHPwV1bn5QWuyKvmD3
// 9QbV1qAVJJtk74v4KdwVUA8p6517wdfRqJ1E8
// vZa5dEP5vvCm1x5xWLkNHbQwmnAqDetWv7mXm
// Rv7VdW5VqqCBK9v9Xga3s5l4DnavWgiRP1yGE
// 6jAmQR8mppuebWmWgNrLUb5wPvM6AZtg1AZxq
// XvL17y51xxCjA9z9oynNi6WvzkjyNpfd1lZxM
// DAlRbP5RJJIDWq9qGyBZFvwLMQxJBKcv4pDXm
