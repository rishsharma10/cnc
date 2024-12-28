//   const webhookUrl = 'https://hooks.slack.com/services/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';
//   const webhookUrl = process.env.NEXT_PUBLIC_SLACK_WEBHOOK_URL;
const webhookUrl = "xoxb-7335369490836-7356201775362-d6E2ZeUt819Q42xJoW4qlzgW";
export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { message, recipient } = req.body;
    const token = webhookUrl;

    if (!token) {
      return res
        .status(500)
        .json({ message: "Slack bot token is not configured." });
    }

    try {
      const response = await fetch("https://slack.com/api/chat.postMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          channel: recipient,
          text: message,
        }),
      });

      const data = await response.json();

      if (!data.ok) {
        throw new Error(data.error);
      }

      res
        .status(200)
        .json({ message: "Message shared to Slack successfully!" });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: `Error sharing message to Slack: ${error.message}` });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
