import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../../utils/i18n/useTranslation';
import { login } from '../../utils/auth';

interface LoginActionsProps {
  formData: {
    email: string;
    password: string;
  };
  loading: boolean;
  error: string;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
}

const LoginActions = ({ formData, loading, error, setLoading, setError }: LoginActionsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err: any) {
      setError(t('auth.invalidCredentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded-md">
          {error}
        </div>
      )}

      <button
        onClick={handleLogin}
        disabled={loading || !formData.email || !formData.password}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 transition-all duration-200"
      >
        {loading ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {t('auth.signingIn')}
          </span>
        ) : (
          t('auth.login')
        )}
      </button>
    </div>
  );
};

export default LoginActions;