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

export interface SetAccessTokenObjProp {
  setAccessTokenObj: React.Dispatch<React.SetStateAction<AccessTokenObjProp>>
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

export interface AccessTokenProp {
    access_token: string,
}

export interface AccessTokenObjProp {
    access_token: string,
    item_id: string,
    error: string | null
}

export interface Empty {

}

export interface TransactionProp {
    transaction_id: string,
    date: Date,
    merchant_name: string,
    name: string,
    amount: number
}