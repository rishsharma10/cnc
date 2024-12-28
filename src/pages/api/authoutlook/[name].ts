// pages/api/auth/callback.js
import axios from 'axios';
const client_id = 'f14bef2f-5284-4c84-b388-38c2e2c81d79';
  const redirect_uri = 'https://staging.techraize.com/auth';
  const client_secret = '4d22cfd0-780d-46e3-9bac-0259a151e684';
  const tenant_id = 'ddbe2552-803e-4c95-875c-00fa5298dd67';
export default async function handler(req:any, res:any) {
    try {
        const response = await fetch('https://login.microsoftonline.com/common/oauth2/v2.0/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
              client_id: 'f14bef2f-5284-4c84-b388-38c2e2c81d79',  // Replace with your client ID
              client_secret: '4d22cfd0-780d-46e3-9bac-0259a151e684',  // Replace with your client secret
              code: req.query.name,  // Pass the token from your request
              redirect_uri: 'https://staging.techraize.com/auth',  // Replace with your redirect URI
              grant_type: 'authorization_code',
            }),
          });
          console.log(response,'responseeeee......');
          return response

        // const accessToken = response.data.access_token;
        // const idToken = response.data.id_token; // Optional, if you want to decode user info

        // Optionally, you can fetch user info using Microsoft Graph API
        // const userInfoResponse = await axios.get('https://graph.microsoft.com/v1.0/me', {
        //     headers: {
        //         Authorization: `Bearer ${accessToken}`,
        //     },
        // });

        // Do something with the user info (e.g., create a session, store in database)
        // res.status(200).json({ accessToken, userInfo: userInfoResponse.data });
    } catch (error) {
        console.error('Error exchanging code for token:', error);
        res.status(500).json({ error: 'Token exchange failed' });
    }
}
