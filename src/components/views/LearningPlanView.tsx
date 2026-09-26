import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Award,
  Layers,
  Save,
  Check,
  Calendar,
  Sparkles,
  Info,
  ChevronLeft,
  ChevronRight,
  Users,
} from 'lucide-react';
import { NavTab, DecisionCategory } from '../../types/meridian';
import { MERIDIAN_EMPLOYEES, MACRO_SPLIT_DATA } from '../../data/meridianData';
import { getEmployeeById } from '../../data/workforceGenerator';
import { useToast } from '../../context/ToastContext';

interface LearningPlanViewProps {
  onNavigate: (tab: NavTab) => void;
  // Employee to open straight into the per-person editor (set only when a
  // caller — e.g. Employee Profile's "Buka Rencana Pembelajaran" CTA — knows
  // exactly who. Null/undefined means "just arrived generically" (Sidebar,
  // breadcrumbs, etc.), which should land on the eligibility list first
  // rather than guessing a person.
  focusEmployeeId?: string | null;
}

// Who actually needs a learning plan: only these two Decision Engine outcomes
// carry a reskilling curriculum. Redeploy needs none, Further Assessment is
// still pending a decision, and Voluntary Transition Review goes to VERS/
// facility stewardship instead of training.
const ELIGIBLE_CATEGORIES: DecisionCategory[] = ['Reskill', 'Reskill -> Redeploy'];

const getDecisionBadge = (decision: DecisionCategory) => {
  switch (decision) {
    case 'Reskill -> Redeploy':
      return (
        <span className="text-[10px] font-bold text-blue-800 bg-blue-100 border border-blue-300 px-2 py-0.5 rounded whitespace-nowrap">
          Reskill &rarr; Redeploy
        </span>
      );
    case 'Reskill':
      return (
        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded whitespace-nowrap">
          Reskill
        </span>
      );
    default:
      return null;
  }
};

export const LearningPlanView: React.FC<LearningPlanViewProps> = ({
  onNavigate,
  focusEmployeeId = null,
}) => {
  const { addToast } = useToast();

  // Which person's editor is open. Starts from focusEmployeeId (set by a
  // caller that already knows who) and null otherwise, which renders the
  // eligibility list instead of guessing a default person.
  const [viewEmployeeId, setViewEmployeeId] = useState<string | null>(focusEmployeeId);

  // Detail-state controls. Declared unconditionally (Rules of Hooks) even
  // though they're only rendered once an employee is selected below.
  const [targetStartDate, setTargetStartDate] = useState<string>('Q4 2026 (Batch 2)');
  const [learningHours, setLearningHours] = useState<number>(32);
  const [isSaving, setIsSaving] = useState(false);
  const [capabilityGaps, setCapabilityGaps] = useState([
    {
      id: 'gap-1',
      capability: 'Digital Monitoring & Telemetry',
      current: 1,
      required: 3,
      gap: '+2 Levels',
      learningPath: 'IoT & Smart Meter Systems (8 weeks)',
      status: 'Enrolled',
    },
    {
      id: 'gap-2',
      capability: 'Data Analysis & Anomaly Detection',
      current: 2,
      required: 3,
      gap: '+1 Level',
      learningPath: 'Data Analysis for Operations (6 weeks)',
      status: 'Upcoming',
    },
    {
      id: 'gap-3',
      capability: 'Field Operations & Safety K3',
      current: 4,
      required: 3,
      gap: 'Satisfied',
      learningPath: 'Prior Certified (BNSP / Operasi)',
      status: 'Verified',
    },
  ]);

  const eligibleEmployees = MERIDIAN_EMPLOYEES.filter((e) =>
    ELIGIBLE_CATEGORIES.includes(e.officialDecision)
  );
  const eligiblePilotCount =
    (MACRO_SPLIT_DATA.find((m) => m.category === 'Reskill')?.count || 0) +
    (MACRO_SPLIT_DATA.find((m) => m.category === 'Reskill -> Redeploy')?.count || 0);

  // ===========================================================================
  // LIST STATE — explain the module + who's in it, before opening anyone's plan
  // ===========================================================================
  if (!viewEmployeeId) {
    return (
      <div className="space-y-6 pb-12">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h2 className="text-sm font-bold text-slate-900">Learning Plan</h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                Kurikulum reskilling per orang, disusun dari gap kapabilitas antara peran lama dan peran
                target. Modul ini otomatis ditampilkan untuk staf dengan hasil Decision Engine{' '}
                <strong className="text-slate-800">Reskill</strong> atau{' '}
                <strong className="text-slate-800">Reskill &rarr; Redeploy</strong> — kategori Redeploy
                tidak butuh pelatihan, Further Assessment masih menunggu keputusan, dan Voluntary
                Transition Review masuk jalur VERS/pensiun, bukan jalur belajar.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
              <Users className="w-3.5 h-3.5 text-slate-500" />
              {eligibleEmployees.length} dari 24 sampel eligible
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full">
              &asymp; {eligiblePilotCount.toLocaleString('id-ID')} dari 6.000 populasi pilot
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-900">Pilih staf untuk dibuka rencana belajarnya</h3>
          </div>
          <div className="divide-y divide-slate-100">
            {eligibleEmployees.map((emp) => (
              <button
                key={emp.id}
                onClick={() => setViewEmployeeId(emp.id)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-blue-50/50 transition-colors group"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200 shrink-0">
                  {emp.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 truncate">{emp.name}</span>
                    <span className="font-mono text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-200 shrink-0">
                      {emp.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">
                    {emp.role} &middot; {emp.regionalUnit}
                  </p>
                </div>
                <div className="hidden sm:block shrink-0">{getDecisionBadge(emp.officialDecision)}</div>
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ===========================================================================
  // DETAIL STATE — per-person editor (unchanged content, now entered on purpose)
  // ===========================================================================
  const employee =
    getEmployeeById(viewEmployeeId) ||
    MERIDIAN_EMPLOYEES.find((e) => e.id === viewEmployeeId) ||
    MERIDIAN_EMPLOYEES[0];

  const handleUpdateGapStatus = (gapId: string, newStatus: string) => {
    setCapabilityGaps((prev) =>
      prev.map((g) => (g.id === gapId ? { ...g, status: newStatus } : g))
    );
    const item = capabilityGaps.find((g) => g.id === gapId);
    addToast({
      title: 'Module Status Updated',
      message: `${item?.capability || 'Module'} status set to "${newStatus}" for ${employee.name}.`,
      type: 'info',
    });
  };

  const handleSaveLearningPlan = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast({
        title: 'Learning Plan Saved',
        message: `Plan for ${employee.name} (${employee.id}) synchronized to LMS Moodle. Next checkpoint: ${targetStartDate}.`,
        type: 'success',
      });
    }, 400);
  };

  const learningPhases = [
    {
      phase: 1,
      title: 'Foundations',
      weeks: 'Week 1 - 3',
      course: 'IoT & Smart Meter Basics',
      topics: 'Pengenalan Gateway AMI, protokol RF Mesh, keselamatan tegangan rendah.',
      status: 'In Progress',
    },
    {
      phase: 2,
      title: 'Data & Analytics',
      weeks: 'Week 3 - 6',
      course: 'Data Analysis for Operations',
      topics: 'Pembacaan log telemetri, deteksi bypass arus, sinkronisasi cloud portal.',
      status: 'Scheduled',
    },
    {
      phase: 3,
      title: 'Application & Assessment',
      weeks: 'Week 7 - 8',
      course: 'Case Project & Assessment Gate',
      topics: 'Simulasi kalibrasi lapangan gardu distribusi, ujian sertifikasi fungsional BUMN.',
      status: 'Target Gate',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Back to eligibility list */}
      <button
        onClick={() => setViewEmployeeId(null)}
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Kembali ke daftar staf eligible</span>
      </button>

      {/* Header Profile Banner matching Screen 9 */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 font-bold text-lg flex items-center justify-center border-2 border-blue-200 shadow-2xs">
            {employee.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-bold text-base text-slate-900">{employee.name}</span>
              <span className="font-mono text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                {employee.id}
              </span>
            </div>
            <p className="text-xs text-slate-600">
              {employee.role} · {employee.regionalUnit}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-6">
          <div>
            <span className="text-[11px] text-slate-500 block">Target Future Role:</span>
            <span className="text-xs font-bold text-slate-900">
              {employee.futureRoleTarget || 'Digital Metering Technician'}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-500 block">Mobility Fit:</span>
            <span className="text-lg font-extrabold text-emerald-600 font-mono">
              {employee.fitRaw}
            </span>
          </div>

          <div className="pl-2">
            <button
              onClick={handleSaveLearningPlan}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Saving...' : 'Update Plan'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Learning Plan Settings & Control Card */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-blue-600" />
          <div>
            <h3 className="text-xs font-bold text-slate-900">Program Execution & LMS Dispatch</h3>
            <p className="text-[11px] text-slate-500">Configure schedule cohort and hours allocation for this worker</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-600 text-[11px]">Cohort:</span>
            <select
              value={targetStartDate}
              onChange={(e) => {
                setTargetStartDate(e.target.value);
                addToast({
                  title: 'Cohort Batch Updated',
                  message: `Scheduled cohort changed to ${e.target.value}.`,
                  type: 'info',
                });
              }}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value="Q3 2026 (Batch 1)">Q3 2026 (Batch 1)</option>
              <option value="Q4 2026 (Batch 2)">Q4 2026 (Batch 2)</option>
              <option value="Q1 2027 (Batch 3)">Q1 2027 (Batch 3)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-600 text-[11px]">Workload:</span>
            <select
              value={learningHours}
              onChange={(e) => {
                const hrs = Number(e.target.value);
                setLearningHours(hrs);
                addToast({
                  title: 'Learning Hours Adjusted',
                  message: `Weekly allocation set to ${hrs} hours/week for ${employee.name}.`,
                  type: 'info',
                });
              }}
              className="bg-transparent font-semibold text-slate-800 focus:outline-none cursor-pointer"
            >
              <option value={20}>20 hrs/week (Part-time)</option>
              <option value={32}>32 hrs/week (Standard)</option>
              <option value={40}>40 hrs/week (Intensive)</option>
            </select>
          </div>

          <button
            onClick={handleSaveLearningPlan}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-semibold text-xs transition-colors shadow-2xs"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400" />
            <span>Save Learning Plan</span>
          </button>
        </div>
      </div>

      {/* Capability Gaps Table matching Screen 9 */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">Capability Gaps Analysis</h2>
            <p className="text-xs text-slate-600">Identified skill differences between existing role and target role</p>
          </div>
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-1 rounded">
            Estimated Duration: 8 Weeks
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Capability</th>
                <th className="py-2.5 px-3 font-semibold text-center">Current</th>
                <th className="py-2.5 px-3 font-semibold text-center">Required</th>
                <th className="py-2.5 px-3 font-semibold text-center">Gap</th>
                <th className="py-2.5 px-3 font-semibold">Assigned Learning Path</th>
                <th className="py-2.5 px-3 font-semibold text-right">Status Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {capabilityGaps.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3 font-medium text-slate-900">{item.capability}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-700">{item.current}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-slate-700">{item.required}</td>
                  <td className="py-3 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold ${
                        item.gap === 'Satisfied'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {item.gap}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-blue-700 font-medium">{item.learningPath}</td>
                  <td className="py-3 px-3 text-right">
                    <select
                      value={item.status}
                      onChange={(e) => handleUpdateGapStatus(item.id, e.target.value)}
                      className="bg-white border border-slate-200 rounded px-2 py-1 text-[11px] font-semibold text-slate-700 hover:border-blue-400 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs"
                    >
                      <option value="Enrolled">Enrolled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Upcoming">Upcoming</option>
                      <option value="Completed">Completed</option>
                      <option value="Verified">Verified</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommended Learning Journey (8 weeks) matching Screen 9 */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-4">
        <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Recommended Learning Journey (8 Weeks)
            </h2>
            <p className="text-xs text-slate-600">
              Structured modular roadmap delivered via corporate LMS Moodle & regional practical centers
            </p>
          </div>
          <span className="text-xs font-mono font-semibold text-slate-600">
            Biaya per Kapita: ~Rp 8,5 - 10,0 Juta
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {learningPhases.map((phase) => (
            <div
              key={phase.phase}
              className="p-5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition-all space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center font-mono shadow-2xs">
                  {phase.phase}
                </span>
                <span className="text-[11px] font-mono font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {phase.weeks}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Phase {phase.phase}: {phase.title}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-0.5">{phase.course}</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {phase.topics}
              </p>

              <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Status:</span>
                <span className="font-semibold text-blue-700">{phase.status}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown Card: Dari mana angka Rp 8,5 - 10 Juta per kapita berasal? */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5 text-xs text-slate-600">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <Info className="w-4 h-4 text-blue-600" />
            <span>Transparansi Biaya Per Kapita Reskilling (Rp 8,5 – 10,0 Juta)</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Dihitung berdasarkan model keekonomian reskilling korporasi (PLN Corporate University / Pusdiklat Standard Benchmarking), jauh lebih hemat dibandingkan beban Pesangon Normatif UU Ketenagakerjaan (~Rp 19,0 Juta per kapita):
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-[11px]">
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
              <span className="font-semibold text-slate-800 block">1. Modul Teknis & Sertifikasi</span>
              <span className="font-mono font-bold text-blue-600 text-xs">~Rp 4,5 – 5,0 Juta</span>
              <p className="text-slate-500 text-[10px]">Sertifikasi BNSP, lisensi Smart Metering AMI & kalibrasi RF Mesh.</p>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
              <span className="font-semibold text-slate-800 block">2. Instruktur & Lab Praktik</span>
              <span className="font-mono font-bold text-blue-600 text-xs">~Rp 2,5 – 3,0 Juta</span>
              <p className="text-slate-500 text-[10px]">Sesi workshop fisik simulator gardu distribusi dan pelatihan lapangan.</p>
            </div>
            <div className="p-2.5 bg-white rounded-lg border border-slate-200 space-y-1">
              <span className="font-semibold text-slate-800 block">3. Pendampingan & Mentorship</span>
              <span className="font-mono font-bold text-blue-600 text-xs">~Rp 1,5 – 2,0 Juta</span>
              <p className="text-slate-500 text-[10px]">On-the-job coaching 60 hari oleh spesialis senior & evaluasi transisi.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
