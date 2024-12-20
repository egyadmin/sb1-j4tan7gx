import React, { useState } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Database, HardDrive, Upload, Download, RefreshCw, AlertCircle } from 'lucide-react';

const DataManagement = () => {
  const { t } = useTranslation();
  const [backupInProgress, setBackupInProgress] = useState(false);

  const stats = [
    {
      icon: Database,
      label: 'حجم قاعدة البيانات',
      value: '2.4 GB',
      change: '+120 MB',
      color: 'text-emerald-600'
    },
    {
      icon: HardDrive,
      label: 'المساحة المتاحة',
      value: '48.6 GB',
      change: '-2%',
      color: 'text-blue-600'
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">إدارة البيانات</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="mr-4 flex-1">
                <p className="text-sm text-gray-600">{stat.label}</p>
                <div className="flex items-center mt-1">
                  <h3 className="text-2xl font-bold">{stat.value}</h3>
                  <span className="text-sm text-emerald-600 mr-2">{stat.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-6">النسخ الاحتياطي والاستعادة</h2>
          <div className="space-y-4">
            <button
              onClick={() => setBackupInProgress(true)}
              disabled={backupInProgress}
              className="w-full flex items-center justify-center px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50"
            >
              {backupInProgress ? (
                <>
                  <RefreshCw className="h-5 w-5 ml-2 animate-spin" />
                  جاري النسخ الاحتياطي...
                </>
              ) : (
                <>
                  <Upload className="h-5 w-5 ml-2" />
                  إنشاء نسخة احتياطية
                </>
              )}
            </button>
            <button className="w-full flex items-center justify-center px-4 py-3 border border-emerald-600 text-emerald-600 rounded-lg hover:bg-emerald-50">
              <Download className="h-5 w-5 ml-2" />
              استعادة من نسخة احتياطية
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-6">تنظيف البيانات</h2>
          <div className="space-y-4">
            <div className="flex items-start p-4 bg-yellow-50 rounded-lg">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 ml-3" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">تنبيه</h3>
                <p className="mt-1 text-sm text-yellow-700">
                  سيؤدي تنظيف البيانات إلى حذف جميع السجلات القديمة والمؤقتة. يرجى التأكد من إنشاء نسخة احتياطية قبل المتابعة.
                </p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center px-4 py-3 border border-red-600 text-red-600 rounded-lg hover:bg-red-50">
              <RefreshCw className="h-5 w-5 ml-2" />
              تنظيف البيانات القديمة
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-6">سجل النسخ الاحتياطي</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Database className="h-5 w-5 text-gray-600 ml-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">نسخة احتياطية تلقائية</p>
                  <p className="text-sm text-gray-500">2024-03-{15 - index} 10:30 صباحاً</p>
                </div>
              </div>
              <button className="flex items-center text-blue-600 hover:text-blue-800">
                <Download className="h-4 w-4 ml-1" />
                <span className="text-sm">تحميل</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataManagement;