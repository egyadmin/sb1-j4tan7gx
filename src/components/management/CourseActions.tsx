import React from 'react';
import { Trash2, Tag, Edit } from 'lucide-react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { Course } from '../../types/content';

interface CourseActionsProps {
  course: Course;
  onDelete: (courseId: string) => Promise<void>;
  onEdit: (course: Course) => void;
  onAddKeywords: (course: Course) => void;
}

const CourseActions = ({ course, onDelete, onEdit, onAddKeywords }: CourseActionsProps) => {
  const { t } = useTranslation();
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleDelete = async () => {
    if (window.confirm(t('management.confirmCourseDeactivate'))) {
      setIsDeleting(true);
      try {
        await onDelete(course.id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onEdit(course)}
        className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
        title={t('management.editCourse')}
      >
        <Edit className="h-5 w-5" />
      </button>
      <button
        onClick={() => onAddKeywords(course)}
        className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
        title={t('management.addKeywords')}
      >
        <Tag className="h-5 w-5" />
      </button>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
        title={t('management.deactivateCourse')}
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  );
};

export default CourseActions;