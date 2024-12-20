import React from 'react';
import { useTranslation } from '../../../utils/i18n/useTranslation';
import { Monitor, Smartphone, AlertCircle } from 'lucide-react';

const LoginHistory = () => {
  const { t } = useTranslation();

  const loginHistory = [
    {
      device: 'Desktop - Chrome',
      location: 'الرياض، المملكة العربية السعودية',
      time: 'الآن',
      status: 'current',
      icon: Monitor
    },
    {
      device: 'iPhone 13',
      location: 'الرياض، المملكة العربية السعودية',
      time: 'قبل ساعة',
      status: 'success',
      icon: Smartphone
    },
    {
      device: 'Unknown Device',
      location: 'لندن، المملكة المتحدة',
      time: 'قبل يومين',
      status: 'suspicious',
      icon: AlertCircle
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">سجل تسجيل الدخول</h2>
        <div className="space-y-4">
          {loginHistory.map((login, index) => (
            <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
              <login.icon className={`h-5 w-5 ${
                login.status === 'current' ? 'text-emerald-600' :
                login.status === 'success' ? 'text-blue-600' :
                'text-red-600'
              }`} />
              <div className="mr-4 flex-1">
                <h3 className="font-medium">{login.device}</h3>
                <p className="text-sm text-gray-500">{login.location}</p>
                <p className="text-sm text-gray-500">{login.time}</p>
              </div>
              {login.status === 'suspicious' && (
                <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-600 rounded-full">
                  مشبوه
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginHistory;