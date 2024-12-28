import { NextApiRequest, NextApiResponse } from 'next';
const client_id = 'f14bef2f-5284-4c84-b388-38c2e2c81d79';
//   const redirect_uri = 'http://localhost:3000/company/auth/login';
  const redirect_uri = 'https://staging.techraize.com/auth';
  const client_secret = '4d22cfd0-780d-46e3-9bac-0259a151e684';
  const tenant_id = 'ddbe2552-803e-4c95-875c-00fa5298dd67';
export default function handler(req:any, res:any) {
    const tenantId = 'common'; // Change to your tenant ID if needed
    const clientId = client_id;
    const redirectUri = encodeURIComponent(`${redirect_uri}`);
    const scope = encodeURIComponent('openid profile email');

    const authUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scope}`;

    res.redirect(authUrl);
}