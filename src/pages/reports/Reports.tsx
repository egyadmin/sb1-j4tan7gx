import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { FileText, Download, Filter } from 'lucide-react';

const Reports = () => {
  const { t } = useTranslation();

  const reports = [
    {
      title: 'تقرير الأداء الشهري',
      date: '2024-03-15',
      type: 'PDF',
      size: '2.4 MB'
    },
    {
      title: 'تقرير الحضور',
      date: '2024-03-14',
      type: 'Excel',
      size: '1.8 MB'
    },
    {
      title: 'تقرير التقدم الدراسي',
      date: '2024-03-13',
      type: 'PDF',
      size: '3.1 MB'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">التقارير</h1>
        <button className="flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
          <Filter className="h-5 w-5 ml-2" />
          تصفية التقارير
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 text-emerald-600" />
                  <div className="mr-4">
                    <h3 className="font-medium">{report.title}</h3>
                    <p className="text-sm text-gray-500">
                      {report.date} • {report.size} • {report.type}
                    </p>
                  </div>
                </div>
                <button className="flex items-center px-3 py-2 text-emerald-600 hover:bg-emerald-50 rounded-lg">
                  <Download className="h-5 w-5 ml-2" />
                  تحميل
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;