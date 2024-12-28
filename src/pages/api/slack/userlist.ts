export default async function handler(req: any, res: any) {
  const token = 'xoxb-7335369490836-7356201775362-d6E2ZeUt819Q42xJoW4qlzgW';

  if (!token) {
    return res
      .status(500)
      .json({ message: "Slack bot token is not configured." });
  }

  try {
    const response = await fetch("https://slack.com/api/users.list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.error);
    }

    res.status(200).json({ users: data.members });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error fetching users from Slack: ${error.message}` });
  }
}
