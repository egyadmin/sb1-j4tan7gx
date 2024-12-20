import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import Overview from './Overview';
import DataManagement from '../management/DataManagement';
import UserManagement from '../management/UserManagement';
import Courses from '../courses/Courses';
import Learning from '../learning/Learning';
import Assessment from '../assessment/Assessment';
import Performance from '../performance/Performance';
import Reports from '../reports/Reports';
import Progress from '../progress/Progress';
import Messages from '../communication/Messages';
import Notifications from '../communication/Notifications';
import Search from '../search/Search';
import Security from '../settings/Security';
import Advanced from '../settings/Advanced';
import Settings from '../settings/Settings';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/data" element={<DataManagement />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/courses/*" element={<Courses />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/search" element={<Search />} />
        <Route path="/security" element={<Security />} />
        <Route path="/advanced" element={<Advanced />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </DashboardLayout>
  );
};

export default Dashboard;