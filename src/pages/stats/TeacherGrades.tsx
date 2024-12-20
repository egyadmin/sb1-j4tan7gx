import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import GradeAnalytics from '../../components/stats/GradeAnalytics';

const TeacherGrades = () => {
  const { t } = useTranslation();
  const [selectedCourse, setSelectedCourse] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    averageGrade: 0,
    highestGrade: 0,
    totalAssessments: 0,
    gradeDistribution: []
  });

  useEffect(() => {
    if (selectedCourse) {
      // Fetch course grades statistics
      setLoading(false);
    }
  }, [selectedCourse]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('stats.courseGrades')}</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="max-w-md">
          <label htmlFor="courseSelect" className="block text-sm font-medium text-gray-700">
            {t('courses.selectCourse')}
          </label>
          <select
            id="courseSelect"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">{t('courses.selectCoursePrompt')}</option>
            {/* Course options will be populated here */}
          </select>
        </div>

        {selectedCourse && !loading && (
          <div className="mt-6">
            <GradeAnalytics {...stats} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherGrades;