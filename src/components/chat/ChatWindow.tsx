import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Send, Paperclip, MoreVertical, Users } from 'lucide-react';

interface ChatWindowProps {
  chat: any;
}

const ChatWindow = ({ chat }: ChatWindowProps) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock messages - replace with actual data
  const messages = [
    {
      id: 1,
      sender: 'أحمد محمد',
      content: 'مرحباً بالجميع',
      timestamp: '10:30',
      isSender: false
    },
    {
      id: 2,
      sender: 'أنت',
      content: 'مرحباً أحمد، كيف حالك؟',
      timestamp: '10:31',
      isSender: true
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (message.trim()) {
      // Add message sending logic here
      setMessage('');
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          {chat.type === 'group' ? (
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-emerald-600" />
            </div>
          ) : (
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium">
                {chat.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="mr-3">
            <h3 className="font-medium">{chat.name}</h3>
            {chat.type === 'group' && (
              <p className="text-sm text-gray-500">25 عضو</p>
            )}
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreVertical className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.isSender ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                msg.isSender
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              {!msg.isSender && (
                <p className="text-sm font-medium mb-1">{msg.sender}</p>
              )}
              <p>{msg.content}</p>
              <p className={`text-xs mt-1 ${
                msg.isSender ? 'text-emerald-100' : 'text-gray-500'
              }`}>
                {msg.timestamp}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('chat.typeMessage')}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2 text-white bg-emerald-500 rounded-full hover:bg-emerald-600 disabled:opacity-50"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;