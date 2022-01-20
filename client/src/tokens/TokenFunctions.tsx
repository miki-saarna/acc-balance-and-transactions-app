import React, { useState, useEffect, useCallback, FunctionComponent } from 'react';
import { generateLinkToken, exchangeForAccessToken, getBalance } from '../utils/api';
import { Props } from '../utils/types';

import {
    usePlaidLink,
    PlaidLinkOptions,
    PlaidLinkOnSuccess,
    PlaidLinkOnSuccessMetadata,
} from 'react-plaid-link';

export default function TokenFunctions({ setAccessToken }:any) {
    const [linkToken, setLinkToken] = useState('');
    // const [accessToken, setAccessToken] = useState('');
    
    useEffect(() => {
        const generateLinkTokenAPI = async () => {
            await generateLinkToken()
              .then((token: string) => {
                  setLinkToken(token);
              });
        }
        generateLinkTokenAPI();
    }, [])

    const PlaidLink: FunctionComponent<Props> = ({ token }) => {
        
        const onSuccess = useCallback<PlaidLinkOnSuccess>(
            // const onSuccess = useCallback<PlaidLinkOnSuccess>(
            async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
                await exchangeForAccessToken(public_token)
                  .then(async ({ access_token }) => {
                      setAccessToken(access_token);
                  })
            }, []);

        const config: PlaidLinkOptions = {
            onSuccess,
            onExit: (err, metadata) => {},
            onEvent: (eventName, metadata) => {},
            // token: 'GENERATED_LINK_TOKEN',
            token: linkToken,
            //required for OAuth; if not using OAuth, set to null or omit:
            // receivedRedirectUri: window.location.href,
          };
      
          const { open, ready, error } = usePlaidLink(config);
      
          return (
            <button onClick={() => open()} disabled={!ready}>
              Connect a bank account
            </button>
          );
    }
    return linkToken === null ? (
        // insert your loading animation here
        <div className="loader"></div>
      ) : (
        <PlaidLink token={linkToken} />
      );
}