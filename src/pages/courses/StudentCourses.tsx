import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import EnrolledCoursesList from '../../components/courses/EnrolledCoursesList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { getEnrolledCourses, getCompletedCourses } from '../../utils/api/courses';

const StudentCourses = () => {
  const { t } = useTranslation();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const [enrolled, completed] = await Promise.all([
          getEnrolledCourses(),
          getCompletedCourses()
        ]);
        setEnrolledCourses(enrolled);
        setCompletedCourses(completed);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="flex justify-center p-8">{t('common.loading')}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('courses.myCourses')}</h1>

      <Tabs defaultValue="enrolled">
        <TabsList>
          <TabsTrigger value="enrolled">
            {t('courses.enrolled')} ({enrolledCourses.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            {t('courses.completed')} ({completedCourses.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled">
          <EnrolledCoursesList courses={enrolledCourses} />
        </TabsContent>

        <TabsContent value="completed">
          <EnrolledCoursesList 
            courses={completedCourses} 
            showProgress={false} 
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentCourses;