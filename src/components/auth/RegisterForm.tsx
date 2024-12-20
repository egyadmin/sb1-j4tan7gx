import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../utils/i18n/useTranslation';
import RegisterHeader from './RegisterHeader';
import RegisterInputs from './RegisterInputs';
import RegisterActions from './RegisterActions';
import DeveloperCredit from './DeveloperCredit';
import LanguageToggle from '../common/LanguageToggle';

const RegisterForm = () => {
  const { t, language } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
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
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop')`
      }}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="absolute top-4 right-4">
        <LanguageToggle language={language} toggleLanguage={() => {}} />
      </div>

      <RegisterHeader />

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/95 backdrop-blur-sm py-8 px-4 shadow-2xl rounded-lg sm:px-10 border border-white/20">
          <RegisterInputs 
            formData={formData}
            onInputChange={handleInputChange}
          />
          <RegisterActions 
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
          لديك حساب بالفعل؟{' '}
          <button 
            onClick={() => navigate('/login')}
            className="font-medium text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
          >
            تسجيل الدخول
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;