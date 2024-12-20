import React, { useState, useEffect } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import CourseActions from '../../components/management/CourseActions';
import KeywordsModal from '../../components/management/KeywordsModal';
import { Course } from '../../types/content';
import { deactivateCourse, updateCourseKeywords } from '../../utils/api/management';

const CourseManagement = () => {
  const { t, language } = useTranslation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showKeywordsModal, setShowKeywordsModal] = useState(false);

  const handleDeactivateCourse = async (courseId: string) => {
    try {
      await deactivateCourse(courseId);
      setCourses(courses.filter(course => course.id !== courseId));
    } catch (error) {
      console.error('Failed to deactivate course:', error);
    }
  };

  const handleUpdateKeywords = async (keywords: any[]) => {
    if (!selectedCourse) return;
    
    try {
      await updateCourseKeywords(selectedCourse.id, keywords);
      setCourses(courses.map(course => 
        course.id === selectedCourse.id 
          ? { ...course, keywords } 
          : course
      ));
    } catch (error) {
      console.error('Failed to update keywords:', error);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('management.courseManagement')}</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('management.courseName')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('management.instructor')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('management.enrolledStudents')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('management.keywords')}
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                {t('management.actions')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {course.title[language]}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {course.teacher.firstName} {course.teacher.lastName}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {course.enrolledStudents.length}
                </td>
                <td className="px-6 py-4">
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
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <CourseActions
                    course={course}
                    onDelete={handleDeactivateCourse}
                    onEdit={() => {}}
                    onAddKeywords={() => {
                      setSelectedCourse(course);
                      setShowKeywordsModal(true);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showKeywordsModal && selectedCourse && (
        <KeywordsModal
          course={selectedCourse}
          onClose={() => {
            setSelectedCourse(null);
            setShowKeywordsModal(false);
          }}
          onSave={handleUpdateKeywords}
        />
      )}
    </div>
  );
};

export default CourseManagement;