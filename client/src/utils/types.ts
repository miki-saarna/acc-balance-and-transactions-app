export interface Props {
    token: string;
}

export interface Account {
    account_id: string,
    balances: {
      current: number
    },
    // changing this value seems to still work...
    name: string
}

export interface SetAccessTokenProp {
    setAccessToken: React.Dispatch<React.SetStateAction<string>>
  }

export interface tokenExchangeProp {
    access_token: string,
    // should it be void?
    error: null,
    item_id: string
}

export interface AccountsProp {
    accounts: Account[]
}