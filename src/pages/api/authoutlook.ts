// import axios from 'axios';
// const keyour = 'f14bef2f-5284-4c84-b388-38c2e2c81d79';
//   const key2msteamsuriour = 'https://staging.techraize.com/auth';
//   const key2msteamclient = '4d22cfd0-780d-46e3-9bac-0259a151e684';
// export default async function handler(req:any, res:any) {
//     console.log(req,"reqqqqqqqqqq");
    
//     if (req.method === 'POST') {
//         const { code } = req.body; // Get the authorization code from the request
//         try {
//             const response = await axios.post('https://login.microsoftonline.com/common/oauth2/v2.0/token', null, {
//                 params: {
//                     client_id: keyour,
//                     client_secret:key2msteamclient,
//                     code: code,
//                     redirect_uri: key2msteamsuriour,
//                     grant_type: 'authorization_code',
//                     scope: 'openid profile email',
//                 },
//             });
//             const { access_token } = response.data; // Extract access token from response
//             res.status(200).json({ access_token });
//         } catch (error:any) {
//             console.error('Error exchanging code for token:', error.response.data);
//             res.status(500).send('Authentication failed');
//         }
//     } else {
//         res.setHeader('Allow', ['POST']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }