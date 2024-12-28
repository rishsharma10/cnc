// // pages/api/analyzeVideo.js

// import axios from 'axios';

// export default async function handler(req:any, res:any) {
//   if (req.method === 'POST') {
//     const { videoUrl } = req.body;
//     const apiKey = process.env.NEXT_PUBLIC_AZURE_VIDEO_INDEXER_API_KEY;
//     const endpoint = 'https://api.videoindexer.ai';
//     const accountId = process.env.NEXT_PUBLIC_AZURE_VIDEO_INDEXER_ACCOUNT_ID;


//     try {
//      console.log('accessToken-------------------------------');
     
//       const response = await axios.post(
//         `${endpoint}/auth/${accountId}/Accounts/${accountId}/AccessToken?allowEdit=true`,
//         {},
//         {
//           headers: {
//             'Ocp-Apim-Subscription-Key': apiKey,
//           },
//         }
//       );

//       const accessToken = response.data;
//       console.log(accessToken,'accesstokn');
      

//       // const analysisResponse = await axios.post(
//       //   `${endpoint}/v2.0/accounts/${accountId}/videos/upload?accessToken=${accessToken}&name=MyVideo&privacy=Private&videoUrl=${videoUrl}`,
//       //   {},
//       //   {
//       //     headers: {
//       //       'Content-Type': 'multipart/form-data',
//       //     },
//       //   }
//       // );

//       // const videoId = analysisResponse.data.id;

//       // Here you can fetch analysis results using videoId
//       // For example:
//       // const videoAnalysis = await axios.get(`${endpoint}/v2.0/accounts/${accountId}/videos/${videoId}/index?accessToken=${accessToken}`);

//       // Process the video analysis results

//       res.status(200).json({ success: true, message: 'Video analysis successful' });
//     } catch (error) {
//       console.error('Error analyzing video:', error);
//       res.status(500).json({ success: false, message: 'Failed to analyze video' });
//     }
//   } else {
//     res.status(405).json({ success: false, message: 'Method Not Allowed' });
//   }
// }
