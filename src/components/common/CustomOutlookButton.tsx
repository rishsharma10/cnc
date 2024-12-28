import { Button } from "antd/lib";
import React, { useContext, useEffect, useState } from "react";
import MicrosoftLogin from "react-microsoft-login";
import outlook from "@/assets/images/outlook.svg"

import { GlobalContext } from "@/context/Provider";
import { useRouter } from "next/router";

export default (props: any) => {
  const routerr = useRouter()
  const { loginWithSocial } = useContext(GlobalContext)
  const keyour = 'f14bef2f-5284-4c84-b388-38c2e2c81d79';
  const key2msteamsuriour = 'https://staging.techraize.com/company/auth/login';

  const str = '/auth#code=M.C529_SN1.2.U.ad3e33b0-1807-be5f-0b16-3480e54c3df2&client_info=eyJ2ZXIiOiIxLjAiLCJzdWIiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFGUGpfTmtnRzBzSlBsNHBiX1g4VDNFIiwibmFtZSI6IlJhaHVsIFJhbmEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJyYWh1bHJhbmE2MzgwQG91dGxvb2suY29tIiwib2lkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTIzZmItZTkwY2YwMjM1ODAwIiwidGlkIjoiOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkIiwiaG9tZV9vaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMjNmYi1lOTBjZjAyMzU4MDAiLCJ1aWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMjNmYi1lOTBjZjAyMzU4MDAiLCJ1dGlkIjoiOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkIn0&state=eyJpZCI6IjE4MGRjNmViLTk1MTktNDE0Yi1hOGUxLTdmMGZjYzRjMjY0MCIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicG9wdXAifX0%3d'
  // console.log(router.query.hash);

// console.log(router,'routerNextrouterNext');

const router = {
  "pathname": "/404",
  "route": "/404",
  "query": {},
  "asPath": "/auth#code=M.C529_BAY.2.U.8d01a08f-81d6-aa00-5623-97b34d78f05d&client_info=eyJ2ZXIiOiIxLjAiLCJzdWIiOiJBQUFBQUFBQUFBQUFBQUFBQUFBQUFGUGpfTmtnRzBzSlBsNHBiX1g4VDNFIiwibmFtZSI6IlJhaHVsIFJhbmEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJyYWh1bHJhbmE2MzgwQG91dGxvb2suY29tIiwib2lkIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTIzZmItZTkwY2YwMjM1ODAwIiwidGlkIjoiOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkIiwiaG9tZV9vaWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMjNmYi1lOTBjZjAyMzU4MDAiLCJ1aWQiOiIwMDAwMDAwMC0wMDAwLTAwMDAtMjNmYi1lOTBjZjAyMzU4MDAiLCJ1dGlkIjoiOTE4ODA0MGQtNmM2Ny00YzViLWIxMTItMzZhMzA0YjY2ZGFkIn0&state=eyJpZCI6ImZjOTA5OGRkLTllYzgtNDlhMy1hMTkxLWRkYTEyZjYzNTRiMiIsIm1ldGEiOnsiaW50ZXJhY3Rpb25UeXBlIjoicG9wdXAifX0%3d",
  "components": {
      "/404": {
          "initial": true,
          "props": {
              "user_info": {
                  "userType": "company"
              }
          }
      },
      "/_app": {
          "styleSheets": []
      }
  },
  "isFallback": false,
  "basePath": "",
  "isReady": true,
  "isPreview": false,
  "isLocaleDomain": false,
  "events": {}
}



  const [clientInfo, setClientInfo] = useState<any>(null);
  const key2msteamclient = '4d22cfd0-780d-46e3-9bac-0259a151e684';

  const initData = async (token:any) => {
    debugger
    try {
      let apiRes = await fetch(`/api/authoutlook/${token}`,)
      console.log(apiRes,"apiesssss");
      return apiRes
      // await loginWithSocial('Microsoft', token, "access_token");
    } catch (error) {
      
    }
  }

  useEffect(() => {
    debugger
    if (typeof window === 'undefined') return;
    const asPath = routerr.asPath;
    const hashIndex = asPath.indexOf('#');
    if (hashIndex !== -1) {
      const hash = asPath.substring(hashIndex + 1); // Extract the fragment part
      const params = new URLSearchParams(hash);
      const clientInfoBase64 = params.get('client_info');
      // if (clientInfoBase64) {
      //   // Decode Base64 to JSON
      //   const clientInfoJson = atob(clientInfoBase64);
      //   const clientInfoObject = JSON.parse(clientInfoJson);

      //   // Set the decoded client info into state
      // }
      // initData(clientInfoBase64)
      try {
        // let apiRes = initData()
        setClientInfo(clientInfoBase64);
        
      } catch (error) {
        
      }
    }
  }, [router.asPath]);
  
  
  const authHandler = (err: any, data: any) => {
    // if (err) {
    //   console.error("Login failed:", err);
    //   return;
    // }
  };
  React.useEffect(() => {
    if(clientInfo){
      loginWithSocial('Microsoft', clientInfo, "access_token");
    }
  },[clientInfo])

  return (
    <MicrosoftLogin
      clientId={keyour}
      authCallback={authHandler as any}
      redirectUri={key2msteamsuriour} graphScopes={[`User.Read`]} >

      <Button
        ghost
        style={{borderRadius:"30px"}}
        className="d-flex  justify-content-center align-items-center"
        size="large"
        htmlType="submit"
        block
        type="primary"

      // Disable button until MSAL is initialized
      >
        <span className="fw-semibold d-flex align-items-center justify-content-center fs-6">
          <img
            src={outlook.src}
            alt="outlook logo"
            style={{ width: '30px', marginRight: '14px' }}
            loading="lazy"
          />
          <span className='fw-semibold fs-6 text-center'>
            Continue with Outlook
          </span>
        </span>
      </Button>

    </MicrosoftLogin>
  );
};