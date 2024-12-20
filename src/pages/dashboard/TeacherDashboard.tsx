import React from 'react';
import { Users, BookOpen, TrendingUp } from 'lucide-react';

const TeacherDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Teacher Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-10 w-10 text-indigo-600" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Total Students</h2>
              <p className="text-3xl font-bold text-gray-900">150</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <BookOpen className="h-10 w-10 text-green-600" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Active Courses</h2>
              <p className="text-3xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <TrendingUp className="h-10 w-10 text-blue-600" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">Average Performance</h2>
              <p className="text-3xl font-bold text-gray-900">78%</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Recent Submissions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <p className="ml-4 text-gray-600">John Doe submitted Quiz 3</p>
                  <span className="ml-auto text-sm text-gray-500">1 hour ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b">
            <h2 className="text-lg font-semibold">Course Updates</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  <p className="ml-4 text-gray-600">Updated Mathematics Course content</p>
                  <span className="ml-auto text-sm text-gray-500">2 days ago</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;