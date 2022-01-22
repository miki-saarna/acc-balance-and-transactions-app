import React, { useState, useEffect, useCallback } from 'react';
import { generateLinkToken, exchangeForAccessToken } from '../utils/api';
import { Props, SetAccessTokenObjProp} from '../utils/types';

import {
    usePlaidLink,
    PlaidLinkOptions,
    PlaidLinkOnSuccess,
    PlaidLinkOnSuccessMetadata,
} from 'react-plaid-link';


export default function TokenFunctions({ setAccessTokenObj }: SetAccessTokenObjProp): JSX.Element {
    const [linkToken, setLinkToken] = useState<string>('');
    // const [accessToken, setAccessToken] = useState('');
    
    useEffect(() => {
        const generateLinkTokenAPI = async (): Promise<void> => {
            await generateLinkToken()
              .then((token: string) => {
                  setLinkToken(token);
              });
        }
        generateLinkTokenAPI();
    }, [])

    const PlaidLink: React.FC<Props> = ({ token }) => {
        
        const onSuccess = useCallback<PlaidLinkOnSuccess>(
            // const onSuccess = useCallback<PlaidLinkOnSuccess>(
            async (public_token: string, metadata: PlaidLinkOnSuccessMetadata): Promise<void> => {
                await exchangeForAccessToken(public_token)
                  .then(async (accessTokenObj) => {
                    // console.log(access_token)
                      setAccessTokenObj(accessTokenObj);
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
            <>
              <button onClick={() => open()} disabled={!ready}>
                Connect a bank account
              </button>
            </>
          );
    }
    return linkToken === null ? (
        // insert your loading animation here
        <div className="loader"></div>
      ) : (
        <PlaidLink token={linkToken} />
      );
}