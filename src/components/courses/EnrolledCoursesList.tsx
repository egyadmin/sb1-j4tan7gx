import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Course } from '../../types/content';
import { BookOpen, CheckCircle, Clock } from 'lucide-react';

interface EnrolledCoursesListProps {
  courses: Course[];
  showProgress?: boolean;
}

const EnrolledCoursesList = ({ courses, showProgress = true }: EnrolledCoursesListProps) => {
  const { t, language } = useTranslation();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {course.title[language]}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  {course.description[language]}
                </p>
              </div>
              <BookOpen className="h-6 w-6 text-indigo-600" />
            </div>

            {showProgress && (
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{t('courses.progress')}</span>
                  <span className="font-medium">{course.progress}%</span>
                </div>
                <div className="mt-2 relative pt-1">
                  <div className="overflow-hidden h-2 text-xs flex rounded bg-indigo-100">
                    <div
                      style={{ width: `${course.progress}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-1" />
                <span>{course.duration} {t('courses.hours')}</span>
              </div>
              {course.completed && (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  <span>{t('courses.completed')}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EnrolledCoursesList;