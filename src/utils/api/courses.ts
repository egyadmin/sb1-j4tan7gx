import { Course } from '../../types/content';

export const updateCourse = async (courseId: string, data: Partial<Course>): Promise<Course> => {
  // API call implementation
  const response = await fetch(`/api/courses/${courseId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error('Failed to update course');
  }

  return response.json();
};

export const deleteCourse = async (courseId: string): Promise<void> => {
  const response = await fetch(`/api/courses/${courseId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete course');
  }
};

export const getEnrolledCourses = async (): Promise<Course[]> => {
  const response = await fetch('/api/courses/enrolled', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch enrolled courses');
  }

  return response.json();
};

export const getCompletedCourses = async (): Promise<Course[]> => {
  const response = await fetch('/api/courses/completed', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch completed courses');
  }

  return response.json();
};