import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../utils/i18n/useTranslation';
import LoginHeader from './LoginHeader';
import LoginInputs from './LoginInputs';
import LoginActions from './LoginActions';
import DeveloperCredit from './DeveloperCredit';
import LanguageToggle from '../common/LanguageToggle';

const LoginForm = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop')`
      }}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="absolute top-4 right-4">
        <LanguageToggle language={language} toggleLanguage={() => {}} />
      </div>

      <LoginHeader />

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/95 backdrop-blur-sm py-8 px-4 shadow-2xl rounded-lg sm:px-10 border border-white/20">
          <LoginInputs 
            formData={formData}
            onInputChange={handleInputChange}
          />
          <LoginActions 
            formData={formData}
            loading={loading}
            error={error}
            setLoading={setLoading}
            setError={setError}
          />
          <DeveloperCredit />
        </div>
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-200">
          هل نسيت كلمة المرور؟{' '}
          <button className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-200">
            اضغط هنا
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;