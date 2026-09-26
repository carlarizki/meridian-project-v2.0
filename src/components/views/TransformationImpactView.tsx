import React, { useState } from 'react';
import {
  TrendingUp,
  Coins,
  ShieldCheck,
  Building2,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Info,
  Sliders,
  DollarSign,
  PieChart,
} from 'lucide-react';
import { NavTab } from '../../types/meridian';

interface TransformationImpactViewProps {
  onNavigate: (tab: NavTab) => void;
}

interface ScenarioData {
  name: string;
  badge: string;
  description: string;
  statusQuoCostMiliar: number;
  meridianCostMiliar: number;
  netBenefitMiliar: number;
  savingsPercent: number;
  paybackMonths: number;
  costPerCapitaJt: number;
  retentionPercent: number;
  outcomes: {
    redeploy: { count: number; percent: number };
    reskillRedeploy: { count: number; percent: number };
    upskill: { count: number; percent: number };
    assessment: { count: number; percent: number };
    voluntary: { count: number; percent: number };
  };
  costBreakdown: {
    hardwareLab: { nominalM: number; percent: number };
    assessorBnsp: { nominalM: number; percent: number };
    lmsContent: { nominalM: number; percent: number };
    ojtMentorship: { nominalM: number; percent: number };
    safetyContingency: { nominalM: number; percent: number };
  };
}

// Aligned to ECONOMICS_DATA in meridianData.ts (the PRD's reference numbers,
// also asserted by UC-09's autoCheck: layoff=108.6, redeployment=50.4,
// savings=53.6%). This view previously had its own unrelated numbers
// (224.6/54.0/76.0%) that never reconciled with the rest of the app.
const SCENARIOS: Record<'base' | 'conservative' | 'aggressive', ScenarioData> = {
  base: {
    name: 'Base Case (Rencana Realistis: 78% Retensi & Adopsi AMI Bertahap)',
    badge: 'Rekomendasi Utama',
    description: 'Adopsi smart meter 3 tahun dengan kurikulum 8-12 minggu. Payback cepat dan nol konflik hubungan industrial.',
    statusQuoCostMiliar: 108.6,
    meridianCostMiliar: 50.4,
    netBenefitMiliar: 58.2,
    savingsPercent: 53.6,
    paybackMonths: 11.4,
    costPerCapitaJt: 12.0,
    retentionPercent: 75.0,
    outcomes: {
      redeploy: { count: 1200, percent: 20 },
      reskillRedeploy: { count: 1800, percent: 30 },
      upskill: { count: 1500, percent: 25 },
      assessment: { count: 900, percent: 15 },
      voluntary: { count: 600, percent: 10 },
    },
    costBreakdown: {
      hardwareLab: { nominalM: 17.9, percent: 35.6 },
      assessorBnsp: { nominalM: 15.7, percent: 31.1 },
      lmsContent: { nominalM: 6.7, percent: 13.3 },
      ojtMentorship: { nominalM: 7.3, percent: 14.4 },
      safetyContingency: { nominalM: 2.8, percent: 5.6 },
    },
  },
  conservative: {
    name: 'Conservative Case (Hambatan Serikat & Tambahan Kelas Remediasi)',
    badge: 'Mitigasi Risiko Tinggi',
    description: 'Perundingan bipartit lebih panjang dan diperlukan kelas remedial tambahan bagi teknisi senior, biaya membengkak ke Rp 14,9 Jt/kapita.',
    statusQuoCostMiliar: 115.1,
    meridianCostMiliar: 62.7,
    netBenefitMiliar: 52.4,
    savingsPercent: 45.5,
    paybackMonths: 16.8,
    costPerCapitaJt: 14.9,
    retentionPercent: 68.0,
    outcomes: {
      redeploy: { count: 960, percent: 16 },
      reskillRedeploy: { count: 2220, percent: 37 },
      upskill: { count: 900, percent: 15 },
      assessment: { count: 1200, percent: 20 },
      voluntary: { count: 720, percent: 12 },
    },
    costBreakdown: {
      hardwareLab: { nominalM: 21.9, percent: 35.0 },
      assessorBnsp: { nominalM: 20.7, percent: 33.0 },
      lmsContent: { nominalM: 7.5, percent: 12.0 },
      ojtMentorship: { nominalM: 8.8, percent: 14.0 },
      safetyContingency: { nominalM: 3.8, percent: 6.0 },
    },
  },
  aggressive: {
    name: 'Fast-Track Case (Akselerasi AMI Cepat & Efisiensi Skala 18 Bulan)',
    badge: 'Akselerasi Agresif',
    description: 'Pemasangan massal Smart Meter dalam 18 bulan dengan diskon vendor volume besar (Rp 10,8 Jt/kapita).',
    statusQuoCostMiliar: 104.0,
    meridianCostMiliar: 45.4,
    netBenefitMiliar: 58.6,
    savingsPercent: 56.3,
    paybackMonths: 8.2,
    costPerCapitaJt: 10.8,
    retentionPercent: 88.0,
    outcomes: {
      redeploy: { count: 1560, percent: 26 },
      reskillRedeploy: { count: 3120, percent: 52 },
      upskill: { count: 600, percent: 10 },
      assessment: { count: 480, percent: 8 },
      voluntary: { count: 240, percent: 4 },
    },
    costBreakdown: {
      hardwareLab: { nominalM: 15.9, percent: 35.0 },
      assessorBnsp: { nominalM: 14.1, percent: 31.0 },
      lmsContent: { nominalM: 6.4, percent: 14.0 },
      ojtMentorship: { nominalM: 6.8, percent: 15.0 },
      safetyContingency: { nominalM: 2.2, percent: 5.0 },
    },
  },
};

export const TransformationImpactView: React.FC<TransformationImpactViewProps> = ({ onNavigate }) => {
  const [selectedScenarioKey, setSelectedScenarioKey] = useState<'base' | 'conservative' | 'aggressive'>('base');
  const scenario = SCENARIOS[selectedScenarioKey];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Context & Scenario Dropdown */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Kalkulasi Finansial & Business Case: 6.000 Staf Pilot
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              {scenario.badge}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {scenario.description}
          </p>
        </div>

        {/* Reactive Scenario Selector */}
        <div className="flex items-center gap-2 text-xs shrink-0">
          <span className="text-slate-500 font-semibold">Pilih Skenario:</span>
          <select
            value={selectedScenarioKey}
            onChange={(e) => setSelectedScenarioKey(e.target.value as any)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 font-bold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
          >
            <option value="base">Base Case (Realistis - Payback 11,4 Bln)</option>
            <option value="conservative">Conservative Case (Remedial & Union Friction)</option>
            <option value="aggressive">Fast-Track Accelerated (Akselerasi 18 Bln)</option>
          </select>
        </div>
      </div>

      {/* 3 Main Economic Cards (Fully Reactive) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Status Quo Cost */}
        <div className="bg-white rounded-xl p-5 border border-rose-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
              Biaya Pesangon Status Quo
            </span>
            <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded font-bold">
              Worst Case
            </span>
          </div>
          <div className="text-2xl font-extrabold text-rose-600 font-mono tracking-tight">
            Rp {scenario.statusQuoCostMiliar.toFixed(1)} M
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Pesangon PP 35/2021 rata-rata Rp 48 Jt/orang + Biaya rekrutmen talenta baru + Risiko mogok serikat pekerja.
          </p>
          <p className="text-[10px] text-slate-400 italic leading-snug pt-0.5 border-t border-slate-100">
            Estimasi formula PP 35/2021 × rata-rata masa kerja, bukan data payroll aktual (Payroll off-limits per Legal).
          </p>
        </div>

        {/* Meridian Reskill Cost */}
        <div className="bg-white rounded-xl p-5 border border-blue-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Investasi Reskilling Meridian
            </span>
            <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded font-bold">
              Rp {scenario.costPerCapitaJt.toFixed(1)} Jt / Kapita
            </span>
          </div>
          <div className="text-2xl font-extrabold text-blue-600 font-mono tracking-tight">
            Rp {scenario.meridianCostMiliar.toFixed(1)} M
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            5 komponen biaya terinci (Lab simulator, assessor BNSP, LMS, OJT, APD keselamatan kerja).
          </p>
          <p className="text-[10px] text-slate-400 italic leading-snug pt-0.5 border-t border-slate-100">
            Estimasi benchmark vendor & rate BNSP, bukan data payroll aktual (Payroll off-limits per Legal).
          </p>
        </div>

        {/* Net Economic Benefit */}
        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-300 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900 uppercase tracking-wider">
              Penghematan Bersih (Net Value)
            </span>
            <span className="text-[10px] font-mono bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded font-extrabold">
              {scenario.savingsPercent}% Efisiensi
            </span>
          </div>
          <div className="text-2xl font-extrabold text-emerald-700 font-mono tracking-tight">
            +Rp {scenario.netBenefitMiliar.toFixed(1)} M
          </div>
          <div className="flex items-center gap-2 pt-1 text-[11px] text-emerald-800 font-semibold">
            <span>Payback Period: <strong>{scenario.paybackMonths} Bulan</strong></span>
            <span>•</span>
            <span>Retensi Karyawan: <strong>{scenario.retentionPercent}%</strong></span>
          </div>
        </div>
      </div>

      {/* Main Grid: Reactive Workforce Outcomes on Left, Itemized Cost Breakdown on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Workforce Outcomes (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Distribusi Hasil Transisi 6.000 Staf</h3>
              <p className="text-xs text-slate-500">Proyeksi jalur alih tugas pada skenario terpilih</p>
            </div>
            <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              {scenario.name.split(' ')[0]}
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {/* Redeploy */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="flex items-center gap-2 font-semibold text-emerald-900">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                <span>Direct Redeploy (Langsung Penugasan Baru)</span>
              </span>
              <span className="font-mono font-bold text-emerald-800">
                {scenario.outcomes.redeploy.count.toLocaleString('id-ID')} ({scenario.outcomes.redeploy.percent}%)
              </span>
            </div>

            {/* Reskill -> Redeploy */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-50 border border-blue-200">
              <span className="flex items-center gap-2 font-semibold text-blue-900">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                <span>Reskill &rarr; Redeploy (Pelatihan 8-12 Minggu)</span>
              </span>
              <span className="font-mono font-bold text-blue-800">
                {scenario.outcomes.reskillRedeploy.count.toLocaleString('id-ID')} ({scenario.outcomes.reskillRedeploy.percent}%)
              </span>
            </div>

            {/* Upskill */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-amber-50 border border-amber-200">
              <span className="flex items-center gap-2 font-semibold text-amber-900">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-600"></span>
                <span>Reskill (Rule #5, Program Komprehensif)</span>
              </span>
              <span className="font-mono font-bold text-amber-800">
                {scenario.outcomes.upskill.count.toLocaleString('id-ID')} ({scenario.outcomes.upskill.percent}%)
              </span>
            </div>

            {/* Assessment Gate */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-50 border border-purple-200">
              <span className="flex items-center gap-2 font-semibold text-purple-900">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                <span>Further Assessment (Data Kosong / Stale)</span>
              </span>
              <span className="font-mono font-bold text-purple-800">
                {scenario.outcomes.assessment.count.toLocaleString('id-ID')} ({scenario.outcomes.assessment.percent}%)
              </span>
            </div>

            {/* Voluntary Transition */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-rose-50 border border-rose-200">
              <span className="flex items-center gap-2 font-semibold text-rose-900">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                <span>Voluntary Transition / Outplacement</span>
              </span>
              <span className="font-mono font-bold text-rose-800">
                {scenario.outcomes.voluntary.count.toLocaleString('id-ID')} ({scenario.outcomes.voluntary.percent}%)
              </span>
            </div>
          </div>
        </div>

        {/* Right: Itemized Cost Architecture (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Rincian 5 Komponen Biaya Reskilling</h3>
              <p className="text-xs text-slate-500">Total Anggaran: Rp {scenario.meridianCostMiliar.toFixed(1)} Miliar (Lolos Standar Audit BPK)</p>
            </div>
            <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              Auditable Rate
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">1. Hardware Lab & Hands-on Simulator Bench</div>
                <div className="text-[11px] text-slate-500">Sewa bench uji smart meter, inverter PLTS, dan proteksi gardu</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-slate-900">Rp {scenario.costBreakdown.hardwareLab.nominalM.toFixed(1)} M</div>
                <div className="text-[10px] text-slate-500 font-semibold">{scenario.costBreakdown.hardwareLab.percent}%</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">2. Certified Lead Assessor Honorarium</div>
                <div className="text-[11px] text-slate-500">Uji kompetensi resmi sertifikasi BNSP / SKKNI Kementerian ESDM</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-slate-900">Rp {scenario.costBreakdown.assessorBnsp.nominalM.toFixed(1)} M</div>
                <div className="text-[10px] text-slate-500 font-semibold">{scenario.costBreakdown.assessorBnsp.percent}%</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">3. Enterprise LMS & Interactive Content</div>
                <div className="text-[11px] text-slate-500">Lisensi kurikulum digital adaptif dan simulasi virtual reality</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-slate-900">Rp {scenario.costBreakdown.lmsContent.nominalM.toFixed(1)} M</div>
                <div className="text-[10px] text-slate-500 font-semibold">{scenario.costBreakdown.lmsContent.percent}%</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">4. On-the-Job Mentorship (OJT)</div>
                <div className="text-[11px] text-slate-500">Alokasi jam kerja mentor senior teknisi distribusi UP3</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-slate-900">Rp {scenario.costBreakdown.ojtMentorship.nominalM.toFixed(1)} M</div>
                <div className="text-[10px] text-slate-500 font-semibold">{scenario.costBreakdown.ojtMentorship.percent}%</div>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-900">5. Safety Gear & Incident Contingency</div>
                <div className="text-[11px] text-slate-500">Alat Pelindung Diri (APD) 20kV & asuransi keselamatan pelatihan</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-bold text-slate-900">Rp {scenario.costBreakdown.safetyContingency.nominalM.toFixed(1)} M</div>
                <div className="text-[10px] text-slate-500 font-semibold">{scenario.costBreakdown.safetyContingency.percent}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
