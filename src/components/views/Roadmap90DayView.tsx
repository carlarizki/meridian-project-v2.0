import React from 'react';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Milestone,
  FileCheck,
  ArrowRight,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { NavTab } from '../../types/meridian';

interface Roadmap90DayViewProps {
  onNavigate: (tab: NavTab) => void;
}

export const Roadmap90DayView: React.FC<Roadmap90DayViewProps> = ({ onNavigate }) => {
  const phases = [
    {
      phase: 'Phase 1 (Day 1-30)',
      name: 'Foundation & Analysis',
      status: 'Completed',
      color: 'blue',
      items: [
        'Data integration layer (overlay on SAP/Moodle)',
        'Job family normalization (1,800+ titles to 14 families)',
        'AI exposure analysis across all 52,000 employees',
        'Field Metering workforce deep dive (6,000 headcount)',
      ],
      output: 'Output: AI Exposure Report',
    },
    {
      phase: 'Phase 2 (Day 31-60)',
      name: 'Pathway Design',
      status: 'Current Focus',
      color: 'indigo',
      items: [
        'Capability library finalization (5-level proficiency)',
        'Future roles & demand mapping (Smart Grid, Solar, CS)',
        'Mobility matching & decision rules validation',
        'Learning pathways design (8-16 weeks curriculum)',
      ],
      output: 'Output: Redeployment Plan (4,200)',
    },
    {
      phase: 'Phase 3 (Day 61-90)',
      name: 'Pilot & Business Case',
      status: 'Target Gate',
      color: 'emerald',
      items: [
        'Pilot implementation in 1 Regional Operating Unit',
        'Learning program launch & trainer enablement',
        'Impact measurement & cost avoidance validation',
        'Final business case & Board of Commissioners pack',
      ],
      output: 'Output: 90-Day Proof Point',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header Context matching Screen 12 */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            90-Day Implementation Plan
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Key milestones to deliver a board-ready proof of concept and secure Ministry approval.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
          <Clock className="w-3.5 h-3.5" />
          <span>Current Timeline: Day 30 Gate Cleared</span>
        </div>
      </div>

      {/* 3 Horizontal Phase Cards matching Screen 12 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {phases.map((p, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col justify-between space-y-5 relative overflow-hidden"
          >
            {/* Top Phase Header */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                  {p.phase}
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    p.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800'
                      : p.status === 'Current Focus'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {p.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-slate-900">
                {p.name}
              </h3>

              {/* Bullet list matching Screen 12 */}
              <ul className="space-y-2.5 pt-3 text-xs text-slate-700">
                {p.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Output Badge matching Screen 12 */}
            <div className="pt-4 border-t border-slate-100">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-800">
                <span>{p.output}</span>
                <FileCheck className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Governance & Stakeholder Alignment Summary */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-4">
        <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Strategi Penyelarasan Pemangku Kepentingan (Stakeholder Alignment)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Serikat Pekerja (SP): Dari Korban Menjadi Garda Transisi</span>
            </span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Keterlibatan proaktif pimpinan Serikat Pekerja dalam Workforce Future Council pada Hari ke-45.
              Menjamin kepastian non-PHK, perlindungan take-home pay, dan peningkatan nilai tawar pekerja lewat sertifikasi energi masa depan.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <span className="font-bold text-slate-900 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-blue-600" />
              <span>Kementerian BUMN & Dewan Komisaris</span>
            </span>
            <p className="text-slate-600 leading-relaxed text-[11px]">
              Penyelarasan mandat dewan dengan agenda Transisi Energi Nasional dan Digitalisasi Utilitas BUMN.
              Menghadirkan bukti efisiensi biaya nyata (Cost Avoidance Rp 58,2 Miliar) tanpa friksi sosial politik.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
