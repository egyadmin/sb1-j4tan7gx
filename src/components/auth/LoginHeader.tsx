import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { useTranslation } from '../../utils/i18n/useTranslation';

const LoginHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <div className="flex justify-center">
        <div className="p-4 bg-emerald-500/20 backdrop-blur-sm rounded-full border-2 border-emerald-500/50">
          <GraduationCap className="h-12 w-12 text-emerald-400" />
        </div>
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
        {t('dashboard.schoolSystem')}
      </h2>
      <p className="mt-2 text-center text-sm text-gray-300">
        مرحباً بك في نظام إدارة المدرسة{' '}
        <button 
          onClick={() => navigate('/register')}
          className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
        >
          سجل حساب جديد
        </button>
      </p>
    </div>
  );
};

export default LoginHeader;