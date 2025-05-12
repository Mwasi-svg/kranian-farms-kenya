import React, { useState } from "react";

const Chatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chat, setChat] = useState<{ sender: string; message: string }[]>([]);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    // Show user message immediately
    setChat((prev) => [...prev, { sender: "user", message: userMessage }]);

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      setChat((prev) => [
        ...prev,
        { sender: "bot", message: data.reply || data.response || "🌿 Sorry, I didn’t get that." },
      ]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { sender: "bot", message: "⚠️ There was an error. Please try again later." },
      ]);
    }

    setUserMessage(""); // Clear input
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="p-4 border rounded-lg max-w-md mx-auto bg-white shadow">
      <div className="h-64 overflow-y-auto mb-4 space-y-2">
        {chat.map((entry, i) => (
          <div key={i} className={entry.sender === "user" ? "text-right" : "text-left"}>
            <span
              className={`inline-block px-3 py-2 rounded ${
                entry.sender === "user" ? "bg-green-200" : "bg-gray-100"
              }`}
            >
              {entry.message}
            </span>
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 border p-2 rounded-l"
          placeholder="Ask me anything 🌸"
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded-r hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
