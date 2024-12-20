import React, { useState } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import ChatList from '../../components/chat/ChatList';
import ChatLayout from '../../components/chat/ChatLayout';

const Messages = () => {
  const { t } = useTranslation();
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('messages.title')}</h1>
      <ChatLayout />
    </div>
  );
};

export default Messages;