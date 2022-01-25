export interface Account {
    account_id: string,
    balances: {
      current: number
    },
    // changing this value seems to still work...
    name: string
}

// potentially delete?
// export interface AccountsStateProp {
//     accounts: Account[],
//     setAccounts: React.Dispatch<React.SetStateAction<Account[]>>
// }

export interface AccessTokenObj {
    access_token: string,
    item_id: string,
    error: string | null
}

export interface SetAccessTokenObj {
  setAccessTokenObj: React.Dispatch<React.SetStateAction<AccessTokenObj>>
}

export interface Transaction {
    account_id: string,
    transaction_id: string,
    date: Date,
    merchant_name: string,
    name: string,
    category: Array<string>,
    // alternative way:
    // category: string[],
    amount: number
}

// export interface transactionsAndAccountsProp {
//     transactions: Transaction[],
//     accounts: Account[],
// }