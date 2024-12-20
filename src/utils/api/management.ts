import { Course, BilingualContent } from '../../types/content';

export const deactivateCourse = async (courseId: string): Promise<void> => {
  const response = await fetch(`/api/courses/${courseId}/deactivate`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to deactivate course');
  }
};

export const updateCourseKeywords = async (courseId: string, keywords: BilingualContent[]): Promise<void> => {
  const response = await fetch(`/api/courses/${courseId}/keywords`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ keywords })
  });

  if (!response.ok) {
    throw new Error('Failed to update course keywords');
  }
};

export const deleteUserAccount = async (userId: string): Promise<void> => {
  const response = await fetch(`/api/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to delete user account');
  }
};