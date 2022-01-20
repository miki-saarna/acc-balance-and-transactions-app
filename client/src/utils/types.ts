export interface Props {
    token: string;
}

export interface account {
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