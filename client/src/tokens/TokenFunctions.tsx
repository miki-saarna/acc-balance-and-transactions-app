import React, { ReactElement, useState, useEffect, useCallback } from 'react';
import { generateLinkToken, exchangeForAccessToken } from '../utils/api';
import { SetAccessTokenObj} from '../utils/types';
import Instructions from '../layout/Instructions';
import * as $ from 'jquery';

import {
    usePlaidLink,
    PlaidLinkOptions,
    PlaidLinkOnSuccess,
    PlaidLinkOnSuccessMetadata,
    PlaidLinkError,
    PlaidLinkOnExitMetadata
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

    const PlaidLink: React.FC<{ token: string }> = ({ token }) => {
        
        const onSuccess = useCallback<PlaidLinkOnSuccess>(
            // const onSuccess = useCallback<PlaidLinkOnSuccess>(
            async (public_token: string, metadata: PlaidLinkOnSuccessMetadata): Promise<() => void> => {
              const abortController = new AbortController();
                await exchangeForAccessToken(public_token, abortController.signal)
                  .then(async (accessTokenObj) => {
                    console.log(accessTokenObj)
                    setAccessTokenObj(accessTokenObj);
                  })
                  .catch((error) => console.error(error))
              return () => abortController.abort();
            }, []);

        // const onExit = async (
        //   error: PlaidLinkError | null,
        //   metadata: PlaidLinkOnExitMetadata
        // ) => {
        //   // log and save error and metatdata
        //   logExit(error, metadata, props.userId);
        //   if (error != null && error.error_code === 'INVALID_LINK_TOKEN') {
        //     await generateLinkToken(props.userId, props.itemId);
        //   }
        //   if (error != null) {
        //     setError(error.error_code, error.display_message || error.error_message);
        //   }
        //   // to handle other error codes, see https://plaid.com/docs/errors/
        // };
          

        const config: PlaidLinkOptions = {
            onSuccess,
            // onExit,
            onExit: (err, metadata) => {},
            onEvent: (eventName, metadata) => {},
            // token: 'GENERATED_LINK_TOKEN',
            token: linkToken,
            //required for OAuth; if not using OAuth, set to null or omit:
            // receivedRedirectUri: window.location.href,
          };
      
          const { open, ready, error } = usePlaidLink(config);

          // reload page if button is disabled because usePlaidLink is not ready
          if ($('button').disable) {
            console.log('Button disabled. Reloading page...')
            window.location.reload();
          }

          return (
            <>
              <button id='follow' type='button' onClick={() => open()} disabled={!ready}>
                Connect a bank account
              </button>
              <Instructions />
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