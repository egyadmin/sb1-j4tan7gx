import React, { useState } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Users, MessageSquare, Plus, Search } from 'lucide-react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import CreateGroupModal from './CreateGroupModal';

const ChatLayout = () => {
  const { t } = useTranslation();
  const [selectedChat, setSelectedChat] = useState(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="h-[calc(100vh-8rem)] bg-white rounded-lg shadow-md overflow-hidden">
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-80 border-l border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">{t('chat.conversations')}</h2>
              <button
                onClick={() => setShowCreateGroup(true)}
                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-full"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder={t('chat.search')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10 py-2 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <ChatList
              selectedChat={selectedChat}
              onSelectChat={setSelectedChat}
              searchQuery={searchQuery}
            />
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1">
          {selectedChat ? (
            <ChatWindow chat={selectedChat} />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">{t('chat.selectConversation')}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCreateGroup && (
        <CreateGroupModal onClose={() => setShowCreateGroup(false)} />
      )}
    </div>
  );
};

export default ChatLayout;