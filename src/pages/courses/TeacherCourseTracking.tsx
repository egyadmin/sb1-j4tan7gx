import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import CourseCompletionStats from '../../components/courses/CourseCompletionStats';
import { Search } from 'lucide-react';

const TeacherCourseTracking = () => {
  const { t } = useTranslation();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('courses.courseTracking')}</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label htmlFor="courseSelect" className="block text-sm font-medium text-gray-700">
              {t('courses.selectCourse')}
            </label>
            <select
              id="courseSelect"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option value="">{t('courses.selectCoursePrompt')}</option>
              {/* Course options will be populated here */}
            </select>
          </div>

          <div className="flex-1">
            <label htmlFor="searchStudent" className="block text-sm font-medium text-gray-700">
              {t('courses.searchStudent')}
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                id="searchStudent"
                className="block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500"
                placeholder={t('courses.searchStudentPlaceholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {selectedCourse && (
          <div className="mt-6">
            <CourseCompletionStats
              courseId={selectedCourse}
              totalStudents={100}
              completedStudents={75}
              averageProgress={85}
            />

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">{t('courses.studentProgress')}</h3>
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('courses.studentName')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('courses.progress')}
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {t('courses.status')}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {students.map((student) => (
                      <tr key={student.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {student.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-indigo-600 h-2.5 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            student.completed
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {student.completed ? t('courses.completed') : t('courses.inProgress')}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherCourseTracking;