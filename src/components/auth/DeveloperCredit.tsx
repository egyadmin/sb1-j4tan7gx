import React from 'react';
import { Linkedin } from 'lucide-react';

const DeveloperCredit = () => {
  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">تم التطوير بواسطة</span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center">
        <a 
          href="https://www.linkedin.com/in/tamer-el-gohary-3a516570/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-gray-600 hover:text-emerald-600 transition-colors duration-200"
        >
          <Linkedin className="h-5 w-5 ml-2" />
          <span>Tamer EL Gohary</span>
        </a>
      </div>
    </div>
  );
};

export default DeveloperCredit;