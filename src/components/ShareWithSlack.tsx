import React, { useState } from "react";

const ShareWithSlack = () => {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [channel, setChannel] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/slack", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, recipient }),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error sharing to Slack:", error);
    } finally {
      setLoading(false);
    }
  };

  const initUser = async () => {
    try {
      let apiRes = await fetch(`/api/slack/userlist`);
      console.log(apiRes, "initUser");
    } catch (error) {}
  };
  const initChannel = async () => {
    try {
      let apiRes = await fetch(`/api/slack/channellist`);
      console.log(apiRes, "initChannel");
    } catch (error) {}
  };
  React.useEffect(() => {
    initUser();
    initChannel();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Channel or @user"
          required
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sharing..." : "Share to Slack"}
        </button>
      </form>
      {response && <p>{response.message}</p>}
    </div>
  );
};

export default ShareWithSlack;
