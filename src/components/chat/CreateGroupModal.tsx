import React, { useState } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { X, Search, Check } from 'lucide-react';

interface CreateGroupModalProps {
  onClose: () => void;
}

const CreateGroupModal = ({ onClose }: CreateGroupModalProps) => {
  const { t } = useTranslation();
  const [groupName, setGroupName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Mock users - replace with actual data
  const users = [
    { id: '1', name: 'أحمد محمد', role: 'طالب' },
    { id: '2', name: 'سارة أحمد', role: 'طالب' },
    { id: '3', name: 'محمد علي', role: 'معلم' }
  ];

  const toggleUser = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleCreate = () => {
    // Add group creation logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold">{t('chat.createGroup')}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('chat.groupName')}
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder={t('chat.enterGroupName')}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('chat.addMembers')}
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder={t('chat.searchMembers')}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {users.map(user => (
              <button
                key={user.id}
                onClick={() => toggleUser(user.id)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                    <span className="text-emerald-600 font-medium">
                      {user.name.charAt(0)}
                    </span>
                  </div>
                  <div className="mr-3 text-right">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border ${
                  selectedUsers.includes(user.id)
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-gray-300'
                } flex items-center justify-center`}>
                  {selectedUsers.includes(user.id) && (
                    <Check className="h-3 w-3 text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200">
          <button
            onClick={handleCreate}
            disabled={!groupName || selectedUsers.length === 0}
            className="w-full py-2 px-4 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 disabled:opacity-50"
          >
            {t('chat.createGroup')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;