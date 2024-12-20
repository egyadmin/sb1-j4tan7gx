import React from 'react';
import { useTranslation } from '../../../utils/i18n/useTranslation';
import { Server, Cpu, HardDrive } from 'lucide-react';

const SystemInfo = () => {
  const { t } = useTranslation();

  const systemStats = [
    {
      icon: Server,
      label: 'إصدار النظام',
      value: '2.5.0'
    },
    {
      icon: Cpu,
      label: 'استخدام المعالج',
      value: '45%'
    },
    {
      icon: HardDrive,
      label: 'الذاكرة المستخدمة',
      value: '2.8 GB'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">معلومات النظام</h2>
        <div className="space-y-4">
          {systemStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <stat.icon className="h-5 w-5 text-gray-500" />
                <span className="mr-3 text-gray-600">{stat.label}</span>
              </div>
              <span className="font-medium">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemInfo;