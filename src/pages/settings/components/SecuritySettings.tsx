import React from 'react';
import { useTranslation } from '../../../utils/i18n/useTranslation';
import { Lock, Smartphone, Mail } from 'lucide-react';

const SecuritySettings = () => {
  const { t } = useTranslation();

  const settings = [
    {
      icon: Lock,
      title: 'تغيير كلمة المرور',
      description: 'قم بتحديث كلمة المرور الخاصة بك',
      action: 'تغيير'
    },
    {
      icon: Smartphone,
      title: 'المصادقة الثنائية',
      description: 'تفعيل المصادقة الثنائية لحماية إضافية',
      action: 'تفعيل'
    },
    {
      icon: Mail,
      title: 'تأكيد البريد الإلكتروني',
      description: 'تم التحقق من بريدك الإلكتروني',
      action: 'تم التحقق',
      disabled: true
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">إعدادات الأمان</h2>
        <div className="space-y-6">
          {settings.map((setting, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <setting.icon className="h-5 w-5 text-gray-500" />
                <div className="mr-4">
                  <h3 className="font-medium">{setting.title}</h3>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
              </div>
              <button
                className={`px-4 py-2 rounded-lg ${
                  setting.disabled
                    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                }`}
                disabled={setting.disabled}
              >
                {setting.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;