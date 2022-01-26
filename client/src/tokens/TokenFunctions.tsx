import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import { generateLinkToken, exchangeForAccessToken, reconnect } from '../utils/api';
import { SetAccessTokenObj} from '../utils/types';

import {
    usePlaidLink,
    PlaidLinkOptions,
    PlaidLinkOnSuccess,
    PlaidLinkOnSuccessMetadata,
} from 'react-plaid-link';


export default function TokenFunctions({ setAccessTokenObj }: SetAccessTokenObj): ReactElement {
    const [linkToken, setLinkToken] = useState<string>('');
    
    useEffect(() => {
      const abortController = new AbortController();
        generateLinkToken(abortController.signal)
          .then((token: string) => {
              setLinkToken(token);
          })
          .catch((error) => console.error(error))
        return () => abortController.abort();
    }, [])

    const handleReconnect = (event) => {
      event.preventDefault();
        reconnect()
            .then(setLinkToken)
            .catch(console.error);
    }

    const PlaidLink: React.FC<{ token: string }> = ({ token }) => {
        
        const onSuccess = useCallback<PlaidLinkOnSuccess>(
            // const onSuccess = useCallback<PlaidLinkOnSuccess>(
            async (public_token: string, metadata: PlaidLinkOnSuccessMetadata): Promise<() => void> => {
              const abortController = new AbortController();
                await exchangeForAccessToken(public_token, abortController.signal)
                  .then(async (accessTokenObj) => {
                    // console.log(access_token)
                      setAccessTokenObj(accessTokenObj);
                  })
                  .catch((error) => console.error(error))
              return () => abortController.abort();
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
              <button onClick={handleReconnect}>
                Reconnect Now!
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