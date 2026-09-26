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
  Presentation,
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
}

interface NavItem {
  id: NavTab;
  label: string;
  icon: React.ElementType;
  screenNum: number;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'workforce', label: 'Workforce', icon: Users, screenNum: 1 },
  { id: 'exposure', label: 'AI Exposure', icon: Cpu, screenNum: 2 },
  { id: 'jobs', label: 'Job Model', icon: Layers, screenNum: 3 },
  { id: 'capabilities', label: 'Capabilities', icon: Award, screenNum: 4 },
  { id: 'people', label: 'Directory', icon: UserCheck, screenNum: 5 },
  { id: 'future-roles', label: 'Future Roles', icon: Compass, screenNum: 6 },
  { id: 'redeployment', label: 'Mobility', icon: GitMerge, screenNum: 7 },
  { id: 'learning', label: 'Learning', icon: GraduationCap, screenNum: 8 },
  { id: 'decision', label: 'Decision', icon: BrainCircuit, screenNum: 9 },
  { id: 'impact', label: 'Impact', icon: TrendingUp, screenNum: 10 },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  onOpenBriefing,
  onOpenRoadmap,
  onOpenLegal,
}) => {
  return (
    <aside className="w-60 bg-[#0B1220] border-r border-slate-800/60 flex flex-col shrink-0 h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-slate-800/60">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
          M
        </div>
        <div className="flex flex-col">
          <span className="font-semibold text-white tracking-tight text-sm leading-none">
            Meridian
          </span>
          <span className="text-[10px] text-slate-400 font-medium mt-1">
            Workforce Intelligence
          </span>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5 scrollbar-thin">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors text-left ${
                isActive
                  ? 'bg-slate-800/80 text-white'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
              }`}
            >
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  isActive ? 'text-cyan-400' : 'text-slate-500'
                }`}
              />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        <div className="pt-4 pb-1 px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
          Resources
        </div>

        <button
          onClick={() => setActiveTab('deck')}
          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors text-left ${
            activeTab === 'deck'
              ? 'bg-slate-800/80 text-white'
              : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/40'
          }`}
        >
          <Presentation className={`w-4 h-4 shrink-0 ${activeTab === 'deck' ? 'text-cyan-400' : 'text-slate-500'}`} />
          <span className="truncate">Executive Deck</span>
        </button>

        <button
          onClick={onOpenBriefing}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 transition-colors text-left"
        >
          <FileText className="w-4 h-4 text-slate-500 shrink-0" />
          <span className="truncate">Briefing & PRD</span>
        </button>

        <button
          onClick={onOpenRoadmap}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 transition-colors text-left"
        >
          <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
          <span className="truncate">90-Day Plan</span>
        </button>

        <button
          onClick={onOpenLegal}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-slate-400 hover:text-slate-100 hover:bg-slate-800/40 transition-colors text-left"
        >
          <Scale className="w-4 h-4 text-slate-500 shrink-0" />
          <span className="truncate">Regulasi (PP 35/2021)</span>
        </button>
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800/60">
        <div className="text-[11px] text-slate-500 flex items-center justify-between">
          <span>Pilot Field Metering</span>
          <span className="font-medium text-slate-300">6.000 staf</span>
        </div>
      </div>
    </aside>
  );
};
