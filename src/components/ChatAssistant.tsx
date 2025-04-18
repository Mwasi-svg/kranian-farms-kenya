import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! How can I help you today? 🌱' },
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

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
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
      const botResponse =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm not sure how to answer that right now 🌾";

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Something went wrong. Please try again later. 😢',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="relative">
      <button
        className="bg-green-600 hover:bg-green-700 text-white rounded-full p-3 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="absolute bottom-14 right-0 w-80 bg-white shadow-2xl rounded-lg p-4 border border-gray-200">
          <div className="text-lg font-semibold mb-2">💬 Kranian Assistant</div>
          <div className="h-48 overflow-y-auto text-sm text-gray-800 mb-2 flex flex-col gap-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${
                  msg.sender === 'user' ? 'text-right text-green-800' : 'text-left'
                }`}
              >
                <span
                  className={`inline-block px-2 py-1 rounded-md ${
                    msg.sender === 'user'
                      ? 'bg-green-100'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            {loading && (
              <div className="text-left text-gray-400 italic">Typing...</div>
            )}
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full border rounded-md px-2 py-1 text-sm"
          />
        </div>
      )}
    </div>
  );
};

export default ChatAssistant;
