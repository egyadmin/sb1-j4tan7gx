import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Search,
  User,
  Bell,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { logout } from '../../utils/auth';
import { useTranslation } from '../../utils/i18n/useTranslation';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'auto';
  };

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Top Navigation */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-600 to-emerald-900 sticky top-0 z-50">
        {/* Upper Banner - Hide on mobile */}
        <div className="bg-emerald-900 bg-opacity-40 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between text-emerald-100 text-sm">
              <div className="flex items-center space-x-4">
                <span>{new Date().toLocaleDateString('ar-SA')}</span>
                <span>•</span>
                <span>{t('dashboard.welcomeMessage')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <button
                className="lg:hidden p-2 rounded-md text-emerald-100 hover:bg-emerald-600"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <div className="flex items-center space-x-3">
                <GraduationCap className="h-8 w-8 text-white" />
                <span className="text-white text-xl font-bold tracking-wide hidden md:block">
                  {t('dashboard.schoolSystem')}
                </span>
              </div>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center space-x-4">
              {/* Search - Hide on mobile */}
              <div className="hidden md:flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t('dashboard.search')}
                    className="w-64 px-4 py-1 pr-8 rounded-full bg-emerald-700 bg-opacity-50 border border-emerald-500 text-white placeholder-emerald-300 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <Search className="absolute left-3 top-1.5 h-4 w-4 text-emerald-300" />
                </div>
              </div>

              {/* Notifications */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-full text-emerald-100 hover:bg-emerald-600"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-emerald-600"></span>
              </button>

              {/* User Menu */}
              <div className="flex items-center">
                <button
                  onClick={() => navigate('/dashboard/profile')}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-emerald-600"
                >
                  <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-white">{user.firstName}</p>
                    <p className="text-xs text-emerald-200">{t(`dashboard.role.${user.role}`)}</p>
                  </div>
                </button>

                <button
                  onClick={logout}
                  className="flex items-center space-x-2 p-2 rounded-lg text-emerald-100 hover:bg-emerald-600"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="hidden md:inline">{t('dashboard.logout')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div 
          className={`fixed inset-y-0 right-0 transform ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:relative lg:translate-x-0 transition duration-200 ease-in-out z-40 w-64 lg:w-72 bg-white shadow-lg`}
        >
          <Sidebar onItemClick={() => isMobile && setMobileMenuOpen(false)} />
        </div>

        {/* Mobile Overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-30"
            onClick={toggleMobileMenu}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;