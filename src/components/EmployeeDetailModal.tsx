import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Briefcase,
  Layers,
  ArrowRight,
  TrendingUp,
  Sparkles,
  HelpCircle,
  Clock,
  RefreshCw,
  Award,
  Save,
} from 'lucide-react';
import { EmployeeRecord, EvidenceLevel, FeasibilityLevel } from '../types/meridian';
import { evaluateDecision, EVIDENCE_TYPE_BASELINE_CONFIDENCE } from '../utils/decisionEngine';
import { useToast } from '../context/ToastContext';

interface EmployeeDetailModalProps {
  employee: EmployeeRecord | null;
  onClose: () => void;
  onSelectAnother: (id: string) => void;
  allEmployees: EmployeeRecord[];
}

export const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({
  employee,
  onClose,
  onSelectAnother,
  allEmployees,
}) => {
  if (!employee) return null;

  const { addToast } = useToast();

  // Simulator state for What-If testing
  const [isSimulating, setIsSimulating] = useState(false);
  const [simFit, setSimFit] = useState<number | null>(employee.fit);
  const [simFeasibility, setSimFeasibility] = useState<FeasibilityLevel>(employee.feasibility);
  const [simEvidence, setSimEvidence] = useState<EvidenceLevel>(employee.evidence);
  const [isSaving, setIsSaving] = useState(false);

  const activeFit = isSimulating ? simFit : employee.fit;
  const activeFeasibility = isSimulating ? simFeasibility : employee.feasibility;
  const activeEvidence = isSimulating ? simEvidence : employee.evidence;

  const currentResult = evaluateDecision(activeFit, activeFeasibility, activeEvidence);

  const resetSimulation = () => {
    setIsSimulating(false);
    setSimFit(employee.fit);
    setSimFeasibility(employee.feasibility);
    setSimEvidence(employee.evidence);
    addToast({
      title: 'Simulator Parameters Reset',
      message: `Reset to baseline evaluation for ${employee.name}.`,
      type: 'info',
    });
  };

  const handleSaveDecision = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      addToast({
        title: 'Decision Engine Outcome Saved',
        message: `Decision "${currentResult.decision} (${currentResult.ruleCode})" saved for ${employee.name}. Assigned to ${employee.futureRoleTarget || 'Target Pathway'}.`,
        type: 'success',
      });
    }, 400);
  };

  const currentIndex = allEmployees.findIndex((e) => e.id === employee.id);
  const prevEmployee = currentIndex > 0 ? allEmployees[currentIndex - 1] : null;
  const nextEmployee = currentIndex < allEmployees.length - 1 ? allEmployees[currentIndex + 1] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-slate-900/60 p-0 backdrop-blur-xs sm:items-center sm:p-6">
      <div
        className="relative flex h-dvh w-full max-w-4xl flex-col overflow-hidden bg-white shadow-xl sm:my-auto sm:h-auto sm:max-h-[92vh] sm:rounded-2xl sm:border sm:border-slate-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Top Bar */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 border-b border-slate-100 bg-slate-50/80 px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-blue-50 border border-blue-200 text-blue-700">
              {employee.id}
            </span>
            <div className="flex min-w-0 items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="truncate text-slate-900 font-bold">{employee.name}</span>
              <span aria-hidden="true">·</span>
              <span className="hidden truncate sm:inline">{employee.role}</span>
              <span aria-hidden="true">·</span>
              <span className="hidden truncate md:inline">{employee.regionalUnit}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {prevEmployee && (
              <button
                onClick={() => onSelectAnother(prevEmployee.id)}
                className="text-xs text-slate-700 hover:text-slate-900 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors font-medium"
              >
                &larr; Prev
              </button>
            )}
            {nextEmployee && (
              <button
                onClick={() => onSelectAnother(nextEmployee.id)}
                className="text-xs text-slate-700 hover:text-slate-900 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors font-medium"
              >
                Next &rarr;
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/60 transition-colors"
              aria-label="Tutup Detail"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 space-y-5 overflow-y-auto p-3 text-xs sm:p-6">
          {/* AHA MOMENT HERO BANNER (UC-10: <10 seconds scan) */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Decision Engine Recommendation
                </span>
                <div className="flex flex-col items-start gap-2 mt-1 sm:flex-row sm:items-center sm:gap-3">
                  <div
                    className={`text-base sm:text-lg font-extrabold px-3 py-1 rounded-xl shadow-xs border ${
                      currentResult.decision === 'Redeploy'
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : currentResult.decision === 'Reskill -> Redeploy'
                        ? 'bg-blue-600 text-white border-blue-700'
                        : currentResult.decision === 'Reskill'
                        ? 'bg-amber-600 text-white border-amber-700'
                        : currentResult.decision === 'Further Assessment'
                        ? 'bg-purple-600 text-white border-purple-700'
                        : 'bg-rose-600 text-white border-rose-700'
                    }`}
                  >
                    {currentResult.decision}
                  </div>
                  {employee.futureRoleTarget && (
                    <div className="flex items-center gap-1.5 text-xs text-slate-700">
                      <span className="text-slate-400">&rarr; Target:</span>
                      <strong className="text-slate-900 font-bold">
                        {employee.futureRoleTarget}
                      </strong>
                    </div>
                  )}
                </div>
              </div>

              {/* AHA 3-Box Fast Scan */}
              <div className="grid w-full grid-cols-3 gap-2 text-center text-[11px] sm:w-auto">
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Fit Score</span>
                  <span className="font-mono font-bold text-slate-900">
                    {activeFit !== null ? `${activeFit}%` : 'Data Kosong'}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Feasibility</span>
                  <span className="font-bold text-slate-900">
                    {activeFeasibility}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Evidence</span>
                  <span
                    className={`font-bold ${
                      activeEvidence === 'High'
                        ? 'text-emerald-700'
                        : activeEvidence === 'Medium'
                        ? 'text-blue-700'
                        : activeEvidence === 'Low'
                        ? 'text-amber-700'
                        : 'text-rose-700'
                    }`}
                  >
                    {activeEvidence}
                  </span>
                </div>
              </div>
            </div>

            {/* Rule Fired */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
                  {currentResult.ruleCode}
                </span>
                <span className="font-bold text-slate-900 text-xs">
                  {currentResult.ruleTitle}
                </span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentResult.ruleExplanation}
              </p>
            </div>

            {/* Evidence Signal Traceability */}
            <div className="p-3 rounded-xl bg-white border border-slate-200 text-[11px] space-y-1">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>Audit Trail Bukti Kapabilitas (Dual-Signal):</span>
              </span>
              <p className="text-slate-600 leading-relaxed">
                {currentResult.evidenceNote}
              </p>
            </div>
          </div>

          {/* Triad Model Architecture */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span>1. Legal Corporate Grade</span>
              </div>
              <div className="text-sm font-bold text-slate-900">
                {employee.grade}
              </div>
              <p className="text-[11px] text-slate-500">
                Grade tetap terlindungi tanpa revisi Perjanjian Kerja Bersama (PKB).
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                <Briefcase className="w-3.5 h-3.5 text-emerald-600" />
                <span>2. Functional Destination</span>
              </div>
              <div className="text-sm font-bold text-slate-900">
                {employee.destinationCluster}
              </div>
              <p className="text-[11px] text-slate-500">
                Klaster energi masa depan yang kekurangan tenaga lapangan.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-1.5">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-semibold">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span>3. Transisi & Keekonomian</span>
              </div>
              <div className="text-sm font-bold text-slate-900 font-mono">
                {employee.reskillingDurationWeeks ?? 0} Minggu Pelatihan
              </div>
              <p className="text-[11px] text-slate-500">
                Est. Biaya: ~Rp {employee.reskillingCostJt ?? 0} Jt vs Layoff ~Rp 25 Jt.
              </p>
            </div>
          </div>

          {/* Portofolio Kapabilitas & Audit Bukti */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900">
                Portofolio Kapabilitas & Audit Sinyal Keahlian
              </h4>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Measured Signal</span>
                </span>
                <span className="flex items-center gap-1 text-amber-700 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span>Inferred Signal</span>
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-1">
              {employee.skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/80"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          skill.type === 'measured' ? 'bg-emerald-500' : 'bg-amber-500'
                        }`}
                      ></span>
                      <span className="font-bold text-slate-900">{skill.name}</span>
                    </div>
                    {skill.source && (
                      <span className="text-[10px] text-slate-500 block pl-3.5">
                        Sumber: {skill.source}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    {skill.confidence !== undefined && (
                      <span className="font-mono text-[10px] text-slate-500" title="Baseline = prior kebijakan per Type (Measured 90% / Inferred 65%); nilai di sini adalah hasil kalibrasi aktual per skill (disesuaikan recency & kualitas sumber).">
                        Confidence: {skill.confidence}%{' '}
                        <span className="text-slate-400">
                          (baseline {EVIDENCE_TYPE_BASELINE_CONFIDENCE[skill.type]}%)
                        </span>
                      </span>
                    )}
                    <span className="font-mono text-xs font-bold text-slate-800 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs">
                      Level {skill.level}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span className="hidden text-[11px] text-slate-500 sm:block">
            Sistem mematuhi Zero Mass Layoffs dan aturan Triad Architecture BUMN.
          </span>

          <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:items-center">
            <button
              onClick={handleSaveDecision}
              disabled={isSaving}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-2xs disabled:opacity-50"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'Menyimpan...' : 'Save Decision Outcome'}</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors shadow-2xs"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
