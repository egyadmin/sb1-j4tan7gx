import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';

const Notifications = () => {
  const { t } = useTranslation();

  const notifications = [
    {
      id: 1,
      type: 'info',
      message: 'تم إضافة واجب جديد في مادة الرياضيات',
      time: 'منذ 5 دقائق',
      read: false
    },
    {
      id: 2,
      type: 'success',
      message: 'تم تصحيح الاختبار القصير',
      time: 'منذ ساعة',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      message: 'موعد تسليم المشروع يقترب',
      time: 'منذ 3 ساعات',
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">الإشعارات</h1>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start p-4 rounded-lg ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50'
                }`}
              >
                <div className="flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="mr-4 flex-1">
                  <p className={`text-gray-900 ${!notification.read && 'font-medium'}`}>
                    {notification.message}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{notification.time}</p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;