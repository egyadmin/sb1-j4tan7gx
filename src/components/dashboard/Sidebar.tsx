import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  FileText,
  BarChart2,
  MessageSquare,
  Settings,
  Shield,
  Bell,
  Search,
  Award,
  Brain,
  Database,
  LineChart,
  UserCog,
  Workflow,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  Rocket,
  GraduationCap
} from 'lucide-react';
import { useTranslation } from '../../utils/i18n/useTranslation';
import SidebarGroup from './SidebarGroup';
import SidebarItem from './SidebarItem';

interface SidebarProps {
  onItemClick?: () => void;
}

const Sidebar = ({ onItemClick }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = React.useState(false);

  const handleItemClick = (path: string) => {
    navigate(path);
    onItemClick?.();
  };

  const menuGroups = [
    {
      title: 'الرئيسية',
      items: [
        { icon: LayoutDashboard, label: 'نظرة عامة', path: '/dashboard', badge: 3 },
        { icon: Database, label: 'إدارة البيانات', path: '/dashboard/data' },
        { icon: UserCog, label: 'إدارة المستخدمين', path: '/dashboard/users' }
      ]
    },
    {
      title: 'الأكاديمية',
      items: [
        { icon: GraduationCap, label: 'الدورات التدريبية', path: '/dashboard/courses', badge: 2 },
        { icon: Brain, label: 'التعلم', path: '/dashboard/learning' },
        { icon: Award, label: 'التقييم', path: '/dashboard/assessment' }
      ]
    },
    {
      title: 'التحليلات',
      items: [
        { icon: BarChart2, label: 'الأداء', path: '/dashboard/performance' },
        { icon: LineChart, label: 'التقارير', path: '/dashboard/reports' },
        { icon: Workflow, label: 'التقدم', path: '/dashboard/progress' }
      ]
    },
    {
      title: 'التواصل',
      items: [
        { icon: MessageSquare, label: 'الرسائل', path: '/dashboard/messages', badge: 5 },
        { icon: Bell, label: 'الإشعارات', path: '/dashboard/notifications', badge: 3 }
      ]
    },
    {
      title: 'الأدوات',
      items: [
        { icon: Search, label: 'البحث', path: '/dashboard/search' },
        { icon: Shield, label: 'الأمان', path: '/dashboard/security' },
        { icon: Rocket, label: 'متقدم', path: '/dashboard/advanced' }
      ]
    }
  ];

  return (
    <aside 
      className={`h-full transition-all duration-300 relative border-l border-gray-200
        ${collapsed ? 'w-20' : 'w-full'}`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -left-3 top-20 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50 transition-colors duration-200 border border-gray-200 hidden lg:block"
      >
        {collapsed ? 
          <ChevronLeft className="h-4 w-4 text-emerald-600" /> : 
          <ChevronRight className="h-4 w-4 text-emerald-600" />
        }
      </button>

      <div className="py-6 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-200 hover:scrollbar-thumb-gray-300">
        {menuGroups.map((group, index) => (
          <SidebarGroup key={index} title={collapsed ? '' : group.title}>
            {group.items.map((item, itemIndex) => (
              <SidebarItem
                key={itemIndex}
                icon={item.icon}
                label={collapsed ? '' : item.label}
                path={item.path}
                active={location.pathname === item.path}
                onClick={() => handleItemClick(item.path)}
                badge={item.badge}
              />
            ))}
          </SidebarGroup>
        ))}

        <div className="px-3 mt-6">
          <div className="h-px bg-gray-200 my-6"></div>
          <SidebarItem
            icon={Settings}
            label={collapsed ? '' : 'الإعدادات'}
            path="/dashboard/settings"
            active={location.pathname === '/dashboard/settings'}
            onClick={() => handleItemClick('/dashboard/settings')}
          />
          <SidebarItem
            icon={HelpCircle}
            label={collapsed ? '' : 'المساعدة'}
            path="/dashboard/help"
            active={location.pathname === '/dashboard/help'}
            onClick={() => handleItemClick('/dashboard/help')}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;