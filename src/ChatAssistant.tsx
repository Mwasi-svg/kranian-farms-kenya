import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm Kranian 🌿 How can I help you today?" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const systemInstruction = `
You are Kranian, the friendly AI assistant for Kranian Farms (kranianfarms.com). 
You help customers choose the perfect flowers, herbs, fruits, or vegetables for their needs.

Always:
- Speak in a warm, casual tone like a helpful market vendor.
- Offer flower suggestions for events like weddings, birthdays, or sympathy.
- Guide users through availability, pricing, or delivery questions kindly.
- Ask follow-up questions if you're not sure what the customer wants.
- If unsure of an answer, suggest they contact support or visit the website.

Avoid:
- Technical jargon or robotic language.
- Giving health or medical advice.
- Making up info not found on the site.

Be friendly, helpful, and feel like a real team member at Kranian Farms.
`;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro-latest:generateContent?key=${
          import.meta.env.VITE_GEMINI_API_KEY
        }`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `${systemInstruction}\n\nUser: ${input}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await res.json();
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm not sure how to answer that right now 🌾";

      setMessages((prev) => [...prev, { sender: 'bot', text: reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: 'Oops! Something went wrong. 🌧️' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg"
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="bg-white shadow-xl rounded-lg p-4 mt-2 w-80 max-h-[500px] overflow-auto border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">💬 Kranian Assistant</h3>

          <div className="h-64 overflow-y-auto flex flex-col gap-2 mb-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`text-sm ${
                  msg.sender === 'user' ? 'text-right text-green-800' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-md ${
                    msg.sender === 'user' ? 'bg-green-100' : 'bg-gray-100'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && <div className="italic text-gray-400">Typing...</div>}
          </div>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full border rounded-md px-3 py-1 text-sm"
          />
          <button
            onClick={sendMessage}
            className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white py-1 rounded text-sm"
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
