import React from 'react';
import { useTranslation } from '../../../utils/i18n/useTranslation';
import { Settings, Database, Cloud, Bell } from 'lucide-react';

const AdvancedSettings = () => {
  const { t } = useTranslation();

  const settings = [
    {
      icon: Database,
      title: 'تخزين مؤقت للبيانات',
      description: 'إدارة التخزين المؤقت للتطبيق',
      value: '2.4 GB'
    },
    {
      icon: Cloud,
      title: 'مزامنة البيانات',
      description: 'تكرار المزامنة مع السحابة',
      value: 'كل 15 دقيقة'
    },
    {
      icon: Bell,
      title: 'إشعارات متقدمة',
      description: 'إعدادات الإشعارات المتقدمة',
      value: 'مفعل'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">إعدادات متقدمة</h2>
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
              <span className="text-sm text-gray-600">{setting.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettings;