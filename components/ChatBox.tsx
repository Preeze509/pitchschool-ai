"use client";

import { useState } from "react";

export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([]);

 const sendMessage = async () => {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    setChat([...chat, { user: message, bot: data.reply }]);
    setMessage("");
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="p-4">
      <div className="space-y-4">
        {chat.map((c, i) => (
          <div key={i} className="border p-2 rounded">
            <p><b>Ou:</b> {c.user}</p>
            <p><b>IA:</b> {c.bot}</p>
          </div>
        ))}
      </div>

      <input
        className="border p-2 w-full mt-4"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ekri mesaj ou..."
      />

      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2 mt-2"
      >
        Voye
      </button>
    </div>
  );
}