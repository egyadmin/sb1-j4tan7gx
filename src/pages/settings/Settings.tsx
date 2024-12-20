import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Settings as SettingsIcon, Globe, Moon, Volume2 } from 'lucide-react';

const Settings = () => {
  const { t } = useTranslation();

  const generalSettings = [
    {
      icon: Globe,
      title: 'اللغة',
      value: 'العربية',
      options: ['العربية', 'English']
    },
    {
      icon: Moon,
      title: 'المظهر',
      value: 'فاتح',
      options: ['فاتح', 'داكن', 'تلقائي']
    },
    {
      icon: Volume2,
      title: 'الصوت',
      value: 'مفعل',
      options: ['مفعل', 'صامت']
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">الإعدادات</h1>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <SettingsIcon className="h-6 w-6 text-gray-500 ml-2" />
            <h2 className="text-lg font-semibold">إعدادات عامة</h2>
          </div>

          <div className="space-y-6">
            {generalSettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <setting.icon className="h-5 w-5 text-gray-500" />
                  <span className="mr-3 font-medium">{setting.title}</span>
                </div>
                <select
                  value={setting.value}
                  onChange={() => {}}
                  className="block w-32 rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                >
                  {setting.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">إعدادات الإشعارات</h2>
          <div className="space-y-4">
            {['البريد الإلكتروني', 'إشعارات التطبيق', 'الرسائل النصية'].map((notificationType, index) => (
              <div key={index} className="flex items-center justify-between">
                <span>{notificationType}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked={index !== 2}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;