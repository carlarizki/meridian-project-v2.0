import React from 'react';
import { ChevronRight, Layers, Sparkles } from 'lucide-react';
import { NavTab } from '../types/meridian';

interface TopHeaderProps {
  activeTab: NavTab;
  setActiveTab?: (tab: NavTab) => void;
}

const TAB_TITLES: Record<
  NavTab,
  { title: string; subtitle: string; category: string; screenNum: number }
> = {
  overview: {
    category: 'Ringkasan',
    title: 'Overview',
    subtitle: 'From work insights to people outcomes.',
    screenNum: 0,
  },
  deck: {
    category: 'Presentasi',
    title: 'Executive Deck',
    subtitle: 'Gap dokumen klien vs. solusi Project Meridian.',
    screenNum: 0,
  },
  workforce: {
    category: 'Populasi',
    title: 'Workforce',
    subtitle: '52.000 karyawan, 9 job family, pilot 6.000 staf lapangan.',
    screenNum: 1,
  },
  exposure: {
    category: 'Otomasi',
    title: 'AI Exposure',
    subtitle: 'Tingkat otomasi tugas akibat Smart Meter & IoT.',
    screenNum: 2,
  },
  jobs: {
    category: 'Taksonomi',
    title: 'Job Architecture',
    subtitle: 'Job family, sub-family, hingga role & task.',
    screenNum: 3,
  },
  capabilities: {
    category: 'Kompetensi',
    title: 'Capability Library',
    subtitle: '5 domain kapabilitas, 5-level proficiency ladder.',
    screenNum: 4,
  },
  people: {
    category: 'Direktori',
    title: 'Employee Directory',
    subtitle: 'Direktori 6.000 staf, skill radar, kontrak PKWT.',
    screenNum: 5,
  },
  'future-roles': {
    category: 'Transisi',
    title: 'Future Roles',
    subtitle: 'Peran baru di energi terbarukan & smart grid.',
    screenNum: 6,
  },
  redeployment: {
    category: 'Mobilitas',
    title: 'Mobility & Redeployment',
    subtitle: 'Pencocokan karyawan ke peran baru berdasarkan fit.',
    screenNum: 7,
  },
  learning: {
    category: 'Skill',
    title: 'Learning Plan',
    subtitle: 'Kurikulum terakreditasi 4-12 minggu, Rp9,0jt/kapita.',
    screenNum: 8,
  },
  decision: {
    category: 'Keputusan',
    title: 'Decision Engine',
    subtitle: 'Triage 6.000 karyawan ke 5 jalur transisi (Rule #1-#5).',
    screenNum: 9,
  },
  impact: {
    category: 'Finansial',
    title: 'Impact & ROI',
    subtitle: 'ROI, pesangon dihindari, saving bersih Rp170,6M.',
    screenNum: 10,
  },
  roadmap: {
    category: 'Implementasi',
    title: '90-Day Plan',
    subtitle: '12 minggu: dialog SP PLN dan pilot regional.',
    screenNum: 11,
  },
};

export const TopHeader: React.FC<TopHeaderProps> = ({ activeTab }) => {
  const current = TAB_TITLES[activeTab] || TAB_TITLES.workforce;

  return (
    <header className="sticky top-0 z-20 bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
          <span>Project Meridian</span>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-500">{current.title}</span>
        </div>
        <h1 className="text-2xl font-semibold text-slate-900 tracking-tight">
          {current.title}
        </h1>
        <p className="text-sm text-slate-500 line-clamp-1">
          {current.subtitle}
        </p>
      </div>

      {/* Subtle indicator tag */}
      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 border border-slate-200 rounded-full text-[11px] text-slate-500 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Executive Prototype</span>
        </div>
      </div>
    </header>
  );
};
