import React, { useState } from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { BookOpen, Users, Clock, Plus } from 'lucide-react';
import AddCourseModal from '../../components/management/AddCourseModal';

const Courses = () => {
  const { t } = useTranslation();
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddCourse = async (courseData: any) => {
    try {
      // Implement course creation logic here
      console.log('Adding course:', courseData);
    } catch (error) {
      console.error('Failed to add course:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">الدورات التدريبية</h1>
        <button 
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
        >
          <Plus className="h-5 w-5 ml-2" />
          إضافة دورة جديدة
        </button>
      </div>

      {/* Rest of your existing code */}

      {showAddModal && (
        <AddCourseModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddCourse}
        />
      )}
    </div>
  );
};

export default Courses;