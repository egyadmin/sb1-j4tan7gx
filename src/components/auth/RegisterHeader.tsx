import React from 'react';
import { UserPlus } from 'lucide-react';
import { useTranslation } from '../../utils/i18n/useTranslation';

const RegisterHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <div className="flex justify-center">
        <div className="p-4 bg-emerald-500/20 backdrop-blur-sm rounded-full border-2 border-emerald-500/50">
          <UserPlus className="h-12 w-12 text-emerald-400" />
        </div>
      </div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
        إنشاء حساب جديد
      </h2>
      <p className="mt-2 text-center text-sm text-gray-300">
        انضم إلى نظام إدارة المدرسة وابدأ رحلة التعلم
      </p>
    </div>
  );
};

export default RegisterHeader;