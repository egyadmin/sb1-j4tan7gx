import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import GradeAnalytics from '../../components/stats/GradeAnalytics';

const StudentGrades = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    averageGrade: 0,
    highestGrade: 0,
    totalAssessments: 0,
    gradeDistribution: []
  });

  useEffect(() => {
    // Fetch student grades statistics
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8">{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('stats.myGrades')}</h1>
      <GradeAnalytics {...stats} />
    </div>
  );
};

export default StudentGrades;