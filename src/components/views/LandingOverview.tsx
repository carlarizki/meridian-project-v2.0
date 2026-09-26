import React from 'react';
import {
  Users,
  Briefcase,
  AlertTriangle,
  ShieldCheck,
  Cpu,
  Layers,
  GitMerge,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Info,
  Calendar,
  Building2,
  Presentation,
} from 'lucide-react';
import { NavTab } from '../../types/meridian';
import { PILOT_METRICS, ECONOMICS_DATA } from '../../data/meridianData';

interface LandingOverviewProps {
  onNavigate: (tab: NavTab) => void;
}

export const LandingOverview: React.FC<LandingOverviewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Hero Welcome Banner matching Screen 1 */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-sky-900 text-white p-7 sm:p-9 shadow-sm border border-blue-800">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
            <circle cx="200" cy="200" r="160" stroke="white" strokeWidth="2" strokeDasharray="6 6" />
            <circle cx="200" cy="200" r="110" stroke="white" strokeWidth="2" />
            <path d="M50 350 L200 120 L350 350 Z" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
            <path d="M120 350 L200 190 L280 350 Z" stroke="white" strokeWidth="1.5" fill="none" opacity="0.3" />
          </svg>
        </div>

        <div className="max-w-2xl space-y-3 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/80 border border-blue-600/60 text-xs font-semibold text-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            <span>Project Meridian · Executive Workforce Intelligence</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Welcome to Meridian
          </h1>
          <p className="text-base sm:text-lg font-medium text-blue-100">
            From Work Insights to People Outcomes
          </p>

          <p className="text-xs sm:text-sm text-blue-200 leading-relaxed max-w-xl">
            Understand how work is changing, identify future role requirements, and create the best pathway for every employee across energy transition and automation.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('deck')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition-all shadow-md"
            >
              <Presentation className="w-4 h-4 text-slate-950" />
              <span>Buka Executive Deck (Analisis Gap Dokumen Klien)</span>
              <span className="text-[10px] bg-slate-900 text-amber-300 px-1.5 py-0.5 rounded font-mono">
                SLIDES
              </span>
            </button>
            <button
              onClick={() => onNavigate('workforce')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-blue-900 font-semibold text-xs hover:bg-blue-50 transition-all shadow-sm"
            >
              <span>Explore Workforce</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => onNavigate('redeployment')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-800/80 hover:bg-blue-700/80 text-white font-medium text-xs border border-blue-600/80 transition-all"
            >
              <span>Field Metering Pilot (6.000 Staf)</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards matching Screen 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: 52,000 Total Employees */}
        <div
          onClick={() => onNavigate('workforce')}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs hover:border-blue-300 transition-all cursor-pointer flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
              52,000
            </div>
            <div className="text-xs font-semibold text-slate-600">Total Employees</div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              Pilot: 6,000 Field Metering Staf
            </div>
          </div>
        </div>

        {/* Card 2: 1,800+ Job Titles */}
        <div
          onClick={() => onNavigate('jobs')}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs hover:border-amber-300 transition-all cursor-pointer flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-slate-900 tracking-tight font-mono">
              1,800+
            </div>
            <div className="text-xs font-semibold text-slate-600">Job Titles</div>
            <div className="text-[11px] text-slate-600 mt-0.5">
              (Normalized to 14 families)
            </div>
          </div>
        </div>

        {/* Card 3: 4,200 At High Risk */}
        <div
          onClick={() => onNavigate('exposure')}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs hover:border-rose-300 transition-all cursor-pointer flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-rose-600 tracking-tight font-mono">
              4,200
            </div>
            <div className="text-xs font-semibold text-slate-600">At High Risk</div>
            <div className="text-[11px] text-rose-500 font-medium mt-0.5">
              (Metering & Manual Ops: 70%)
            </div>
          </div>
        </div>

        {/* Card 4: 0 Mass Layoffs */}
        <div
          onClick={() => onNavigate('redeployment')}
          className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs hover:border-emerald-300 transition-all cursor-pointer flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-emerald-600 tracking-tight font-mono">
              0
            </div>
            <div className="text-xs font-semibold text-slate-600">Mass Layoffs</div>
            <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
              Our BUMN commitment
            </div>
          </div>
        </div>
      </div>

      {/* Key Outcomes (Target 90 Days) matching Screen 1 */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Key Outcomes (Target 90 Days)
            </h2>
            <p className="text-xs text-slate-600">
              Transformational deliverables for Board of Directors & Ministry of SOE (Kementerian BUMN).
            </p>
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100">
            Day 30 Gate Cleared
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Outcome 1 */}
          <div
            onClick={() => onNavigate('exposure')}
            className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-300 transition-all cursor-pointer space-y-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              AI Exposure Mapping
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono">100%</div>
            <p className="text-[11px] text-slate-600">employees assessed across 14 job families</p>
          </div>

          {/* Outcome 2 */}
          <div
            onClick={() => onNavigate('jobs')}
            className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-amber-300 transition-all cursor-pointer space-y-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
              Capability Architecture
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono">14</div>
            <p className="text-[11px] text-slate-600">standardized job families & 5 capability bands</p>
          </div>

          {/* Outcome 3 */}
          <div
            onClick={() => onNavigate('redeployment')}
            className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all cursor-pointer space-y-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <GitMerge className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
              Redeployment Pathways
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono">4,200</div>
            <p className="text-[11px] text-slate-600">employees mapped into 3 growth energy clusters</p>
          </div>

          {/* Outcome 4 */}
          <div
            onClick={() => onNavigate('impact')}
            className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-indigo-300 transition-all cursor-pointer space-y-2 group"
          >
            <div className="w-9 h-9 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
              Business Case ROI
            </div>
            <div className="text-xl font-bold text-indigo-600 font-mono">Rp 58,2 M</div>
            <p className="text-[11px] text-slate-600">net cost avoidance (53.6% cost reduction vs layoff)</p>
          </div>
        </div>
      </div>

      {/* Scope Verification Notice */}
      <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2.5 text-blue-900">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            <strong>Ruang Lingkup Pilot Resmi BUMN:</strong> Fokus utama pada unit percontohan{' '}
            <span className="font-semibold underline">Field Metering & Manual Operations (6.000 Staf)</span>{' '}
            dengan 24 sampel rekam jejak untuk pengujian Decision Engine & pakta non-PHK Serikat Pekerja.
          </span>
        </div>
        <button
          onClick={() => onNavigate('redeployment')}
          className="text-blue-700 hover:text-blue-900 font-semibold underline underline-offset-2 shrink-0 ml-4"
        >
          Buka Roster &rarr;
        </button>
      </div>
    </div>
  );
};
