import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Users, User, CheckCircle } from 'lucide-react';

interface ChatListProps {
  selectedChat: any;
  onSelectChat: (chat: any) => void;
  searchQuery: string;
}

const ChatList = ({ selectedChat, onSelectChat, searchQuery }: ChatListProps) => {
  const { t } = useTranslation();

  // Mock data - replace with actual data from your backend
  const chats = [
    {
      id: '1',
      type: 'group',
      name: 'مجموعة الرياضيات',
      lastMessage: 'هل لديكم أي أسئلة حول الواجب؟',
      timestamp: '10:30',
      unread: 3
    },
    {
      id: '2',
      type: 'private',
      name: 'أحمد محمد',
      lastMessage: 'شكراً جزيلاً',
      timestamp: '09:15',
      unread: 0,
      online: true
    }
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-1">
      {filteredChats.map(chat => (
        <button
          key={chat.id}
          onClick={() => onSelectChat(chat)}
          className={`w-full px-4 py-3 flex items-center hover:bg-gray-50 ${
            selectedChat?.id === chat.id ? 'bg-emerald-50' : ''
          }`}
        >
          <div className="relative">
            {chat.type === 'group' ? (
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>
            ) : (
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
            )}
            {chat.online && (
              <span className="absolute bottom-0 left-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
            )}
          </div>
          <div className="mr-3 flex-1 text-right">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">{chat.name}</span>
              <span className="text-xs text-gray-500">{chat.timestamp}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
              {chat.unread > 0 && (
                <span className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {chat.unread}
                </span>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ChatList;