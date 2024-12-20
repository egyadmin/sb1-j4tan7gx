import React from 'react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import SecurityOverview from './components/SecurityOverview';
import LoginHistory from './components/LoginHistory';
import SecuritySettings from './components/SecuritySettings';

const Security = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('security.title')}</h1>
      <SecurityOverview />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SecuritySettings />
        <LoginHistory />
      </div>
    </div>
  );
};

export default Security;