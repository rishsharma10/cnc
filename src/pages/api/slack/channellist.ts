export default async function handler(req:any, res:any) {
    const token = 'xoxb-7335369490836-7356201775362-d6E2ZeUt819Q42xJoW4qlzgW';
  
    if (!token) {
      return res.status(500).json({ message: 'Slack bot token is not configured.' });
    }
  
    const fetchChannels = async (cursor:any) => {
      try {
        const response = await fetch(`https://slack.com/api/conversations.list?cursor=${cursor || ''}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
  
        const data = await response.json();
        if (!data.ok) {
          throw new Error(data.error);
        }
        return data;
      } catch (error:any) {
        throw new Error(`Error fetching channels from Slack: ${error.message}`);
      }
    };
  
    let channels:any = [];
    let cursor = '';
    let hasMore = true;
  
    try {
      while (hasMore) {
        const data = await fetchChannels(cursor);
        channels = channels.concat(data.channels);
        cursor = data.response_metadata?.next_cursor || '';
        hasMore = Boolean(cursor);
      }
      res.status(200).json({ channels });
    } catch (error:any) {
      res.status(500).json({ message: error.message });
    }
  }
  