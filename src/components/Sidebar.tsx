import React from 'react';
import {
  Users,
  Cpu,
  Layers,
  Award,
  UserCheck,
  Compass,
  GitMerge,
  GraduationCap,
  BrainCircuit,
  TrendingUp,
  FileText,
  Calendar,
  Scale,
} from 'lucide-react';
import { NavTab } from '../types/meridian';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenBriefing: () => void;
  onOpenRoadmap: () => void;
  onOpenLegal: () => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ElementType;
}

// Flat list — kept simple on purpose. No phase grouping, no step numbers.
const NAV_ITEMS: NavItem[] = [
  { id: 'workforce', label: 'Workforce', icon: Users },
  { id: 'exposure', label: 'AI Exposure', icon: Cpu },
  { id: 'jobs', label: 'Job Model', icon: Layers },
  { id: 'capabilities', label: 'Capabilities', icon: Award },
  { id: 'people', label: 'Directory', icon: UserCheck },
  { id: 'future-roles', label: 'Future Roles', icon: Compass },
  { id: 'redeployment', label: 'Mobility', icon: GitMerge },
  { id: 'learning', label: 'Learning', icon: GraduationCap },
  { id: 'decision', label: 'Decision', icon: BrainCircuit },
  { id: 'impact', label: 'Impact', icon: TrendingUp },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBriefing,
  onOpenRoadmap,
  onOpenLegal,
  isMobileOpen = false,
  onMobileClose,
}) => {
  return (
    <aside
      id="primary-navigation"
      className={`fixed inset-y-0 left-0 z-50 flex h-dvh w-64 shrink-0 flex-col border-r border-navy-light/70 bg-navy shadow-2xl transition-transform duration-200 md:sticky md:top-0 md:z-30 md:h-screen md:w-60 md:translate-x-0 md:shadow-none ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-navy-light/70">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
          M
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white tracking-tight text-sm leading-none">
            Meridian
          </span>
          <span className="text-[10px] text-sidebar-text-muted font-medium mt-1">
            Workforce Intelligence
          </span>
        </div>
      </div>

      {/* Nav List — flat, no phase grouping or step numbers. */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 scrollbar-thin">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); onMobileClose?.(); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors text-left ${
                isActive
                  ? 'bg-navy-light text-white'
                  : 'text-sidebar-text-muted hover:text-sidebar-text hover:bg-navy-light/60'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-primary' : 'text-sidebar-text-muted'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        <div className="pt-3 pb-1 px-3 text-[10px] font-semibold text-sidebar-text-muted uppercase tracking-wider">
          Resources
        </div>

        <button
          onClick={() => { onOpenBriefing(); onMobileClose?.(); }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-sidebar-text-muted hover:text-sidebar-text hover:bg-navy-light/60 transition-colors text-left"
        >
          <FileText className="w-4 h-4 text-sidebar-text-muted shrink-0" />
          <span className="truncate">Briefing & PRD</span>
        </button>

        <button
          onClick={() => { onOpenRoadmap(); onMobileClose?.(); }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-sidebar-text-muted hover:text-sidebar-text hover:bg-navy-light/60 transition-colors text-left"
        >
          <Calendar className="w-4 h-4 text-sidebar-text-muted shrink-0" />
          <span className="truncate">90-Day Plan</span>
        </button>

        <button
          onClick={() => { onOpenLegal(); onMobileClose?.(); }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-sidebar-text-muted hover:text-sidebar-text hover:bg-navy-light/60 transition-colors text-left"
        >
          <Scale className="w-4 h-4 text-sidebar-text-muted shrink-0" />
          <span className="truncate">Regulasi (PP 35/2021)</span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-navy-light/70">
        <div className="text-[11px] text-sidebar-text-muted flex items-center justify-between">
          <span>Pilot Field Metering</span>
          <span className="font-medium text-sidebar-text">6.000 staf</span>
        </div>
      </div>
    </aside>
  );
};
