import React from 'react';
import { useTranslation } from '../../../utils/i18n/useTranslation';
import { Code, Terminal, Bug } from 'lucide-react';

const DeveloperOptions = () => {
  const { t } = useTranslation();

  const devOptions = [
    {
      icon: Terminal,
      title: 'وضع التطوير',
      enabled: false
    },
    {
      icon: Bug,
      title: 'تتبع الأخطاء',
      enabled: true
    },
    {
      icon: Code,
      title: 'واجهة API',
      enabled: false
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">خيارات المطور</h2>
        <div className="space-y-4">
          {devOptions.map((option, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <option.icon className="h-5 w-5 text-gray-500" />
                <span className="mr-3">{option.title}</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={option.enabled}
                  onChange={() => {}}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeveloperOptions;