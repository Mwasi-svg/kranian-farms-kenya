import React, { useState } from 'react';
import ChatAssistant from './ChatAssistant';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Welcome to Kranian Farms! How can I help you today?" },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      setInput('');
      // The chatbot functionality has been moved to ChatAssistant
    }
  };

  const handleTestMessage = async () => {
    const testMessage = 'What kind of flowers do you have for a wedding?';
    setMessages(prevMessages => [...prevMessages, { sender: 'user', text: testMessage }]);
    
    // Import ChatAssistant here to avoid issues
    const ChatAssistantComponent = (await import('./ChatAssistant')).default;
    const chatAssistant = ChatAssistantComponent(); // Get the component function
    
    // Since ChatAssistant is a functional component, we need to manually call handleSend
    // and pass a mock setMessages function to update the Chatbot's state.
    const mockSetMessages = (newMessages: { sender: string; text: string }[]) => {
      setMessages(newMessages);
    };

    // We need to simulate the state and props that ChatAssistant expects
    const mockState = {
      messages: [...messages, { sender: 'user', text: testMessage }], // Include the test message
      input: '',
      loading: false,
    };

    // We also need to mock the event for handleKeyDown
    const mockEvent = {
      key: 'Enter',
    };

    // Now we can call handleSend with the mocked setMessages and event
    // Note: We need to access the ChatAssistant component's internal logic differently
    // since it's a functional component.
    const handleSend = chatAssistant.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.props.children.props.handleSend;

    handleSend(mockState, mockSetMessages, mockEvent);
  };



  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md hover:bg-green-600 transition-colors"
      >
        {isOpen ? '✕' : 'Chat'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 bg-white rounded-lg shadow-lg flex flex-col h-96 overflow-hidden">
          <div className="bg-green-100 py-2 px-4 text-green-700 font-medium">Kranian Farms Support</div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${message.sender === 'user' ? 'bg-green-200 text-green-800 self-end' : 'bg-gray-100 text-gray-800 self-start'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="p-4 flex border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border rounded-md px-3 py-2 focus:outline-none focus:border-green-500"
            />
            <button
              onClick={handleSend}
              className="bg-green-500 text-white rounded-md px-4 py-2 ml-2 hover:bg-green-600 transition-colors"
            >
              Send
            </button>
          </div>
          {/* Temporary button for testing */}
          <div className="p-4">
            <button onClick={handleTestMessage} className="bg-blue-500 text-white rounded-md px-4 py-2">Send Test Message</button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;