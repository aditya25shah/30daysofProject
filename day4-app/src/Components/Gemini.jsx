import React, { useState } from "react";

export default function Gemini() {
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const api_key = "\\";

  const sendMessages = async () => {
    if (!content.trim()) return;

    const newMessage = { role: "user", content };
    setMessages((prev) => [...prev, newMessage]);

    const requestBody = {
      contents: [
        ...messages.map((m) => ({
          role: m.role,
          parts: [{ text: m.content }],
        })),
        { role: "user", parts: [{ text: content }] },
      ],
    };

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${api_key}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await res.json();
      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
      setContent("");
    } catch (error) {
      alert("API error: " + error.message);
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, i) => (
          <p key={i}>
            <strong>{msg.role}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type something..."
      />
      <button onClick={sendMessages}>Send</button>
    </div>
  );
}
