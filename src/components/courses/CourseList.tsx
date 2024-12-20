import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Course } from '../../types/content';

interface CourseListProps {
  courses: Course[];
  onCourseSelect: (course: Course) => void;
}

const CourseList = ({ courses, onCourseSelect }: CourseListProps) => {
  const { t, language } = useTranslation();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <div
          key={course.id}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => onCourseSelect(course)}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">
              {course.title[language]}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {course.description[language]}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {t(`courses.difficulty${course.difficulty.charAt(0).toUpperCase() + course.difficulty.slice(1)}`)}
              </span>
              <div className="flex flex-wrap gap-2">
                {course.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {keyword[language]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CourseList;