import React, { useState, useMemo } from 'react';
import {
  BrainCircuit,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  ArrowRight,
  Sliders,
  ChevronLeft,
  ChevronRight,
  Info,
  Save,
  Check,
  Search,
  Filter,
  Users,
  Eye,
  Building,
  HelpCircle,
} from 'lucide-react';
import { NavTab, EmployeeRecord, FeasibilityLevel, EvidenceLevel, DecisionCategory } from '../../types/meridian';
import { getWorkforce6000, getEmployeeById } from '../../data/workforceGenerator';
import { evaluateDecision } from '../../utils/decisionEngine';
import { useToast } from '../../context/ToastContext';

interface DecisionEngineViewProps {
  onNavigate: (tab: NavTab) => void;
  selectedEmployeeId: string;
  setSelectedEmployeeId: (id: string) => void;
}

export const DecisionEngineView: React.FC<DecisionEngineViewProps> = ({
  onNavigate,
  selectedEmployeeId,
  setSelectedEmployeeId,
}) => {
  const { addToast } = useToast();

  // Mode: 'macro' (Macro 6.000 Triage Dashboard) vs 'individual' (Deep Single Employee Audit)
  const [engineMode, setEngineMode] = useState<'macro' | 'individual'>('macro');

  // Interactive Macro Sensitivity Sliders (Strategic Sandbox)
  const [exposureCutoff, setExposureCutoff] = useState(70);
  const [minFitThreshold, setMinFitThreshold] = useState(60);
  const [reskillPassRate, setReskillPassRate] = useState(78);

  // Search & Filter in Table
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<DecisionCategory | 'all'>('all');

  // 6,000 workforce sample and search
  const allEmployees = useMemo(() => getWorkforce6000(), []);

  // Macro Calculation: re-runs the REAL rules engine (evaluateDecision) across all 6,000
  // employees, with the fit-threshold slider applied as a uniform recalibration offset to
  // every employee's fit score. At baseline (minFitThreshold = 60, i.e. offset 0) this always
  // reconciles exactly with each employee's stored officialDecision and with the table below.
  const macroStats = useMemo(() => {
    const total = allEmployees.length;
    const fitOffset = minFitThreshold - 60;
    const tally: Record<DecisionCategory, number> = {
      'Redeploy': 0,
      'Reskill -> Redeploy': 0,
      'Reskill': 0,
      'Further Assessment': 0,
      'Voluntary Transition Review': 0,
    };

    allEmployees.forEach((emp) => {
      const adjustedFit = emp.fit !== null ? Math.max(0, Math.min(100, emp.fit + fitOffset)) : null;
      const result = evaluateDecision(adjustedFit, emp.feasibility, emp.evidence);
      tally[result.decision]++;
    });

    const pct = (n: number) => ((n / total) * 100).toFixed(1);

    return {
      total,
      redeploy: { count: tally['Redeploy'], percent: pct(tally['Redeploy']) },
      reskillRedeploy: { count: tally['Reskill -> Redeploy'], percent: pct(tally['Reskill -> Redeploy']) },
      reskill: { count: tally['Reskill'], percent: pct(tally['Reskill']) },
      assessment: { count: tally['Further Assessment'], percent: pct(tally['Further Assessment']) },
      voluntary: { count: tally['Voluntary Transition Review'], percent: pct(tally['Voluntary Transition Review']) },
    };
  }, [allEmployees, minFitThreshold]);

  // Selected employee for deep audit
  const activeEmployee = useMemo(() => {
    return getEmployeeById(selectedEmployeeId) || allEmployees[0]!;
  }, [allEmployees, selectedEmployeeId]);

  // Individual What-If simulation state
  const [isSimulating, setIsSimulating] = useState(false);
  const [simFit, setSimFit] = useState<number | null>(activeEmployee.fit);
  const [simFeasibility, setSimFeasibility] = useState<FeasibilityLevel>(activeEmployee.feasibility);
  const [simEvidence, setSimEvidence] = useState<EvidenceLevel>(activeEmployee.evidence);
  const [isSavingDecision, setIsSavingDecision] = useState(false);

  // Evaluate individual decision
  const activeFit = isSimulating ? simFit : activeEmployee.fit;
  const activeFeasibility = isSimulating ? simFeasibility : activeEmployee.feasibility;
  const activeEvidence = isSimulating ? simEvidence : activeEmployee.evidence;
  const currentResult = evaluateDecision(activeFit, activeFeasibility, activeEvidence);

  // Filtered employees table
  const filteredEmployees = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return allEmployees.filter((emp) => {
      if (selectedCategoryFilter !== 'all' && emp.officialDecision !== selectedCategoryFilter) {
        return false;
      }
      if (q) {
        return (
          emp.name.toLowerCase().includes(q) ||
          emp.id.toLowerCase().includes(q) ||
          (emp.nik && emp.nik.includes(q)) ||
          emp.role.toLowerCase().includes(q) ||
          emp.department?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allEmployees, searchQuery, selectedCategoryFilter]);

  const handleSelectForAudit = (emp: EmployeeRecord) => {
    setSelectedEmployeeId(emp.id);
    setSimFit(emp.fit);
    setSimFeasibility(emp.feasibility);
    setSimEvidence(emp.evidence);
    setIsSimulating(false);
    setEngineMode('individual');
  };

  const handleSaveDecision = () => {
    setIsSavingDecision(true);
    setTimeout(() => {
      setIsSavingDecision(false);
      addToast({
        title: 'Hasil Keputusan Tersimpan',
        message: `Keputusan [${currentResult.decision} (${currentResult.ruleCode})] tercatat untuk ${activeEmployee.name} (${activeEmployee.id}).`,
        type: 'success',
      });
    }, 450);
  };

  const handleResetMacroSliders = () => {
    setExposureCutoff(70);
    setMinFitThreshold(60);
    setReskillPassRate(78);
    addToast({
      title: 'Sensitivity Engine Direset',
      message: 'Parameter sensitivitas makro dikembalikan ke baseline standar dewan direksi.',
      type: 'info',
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header & Engine Mode Switcher */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-bold text-slate-900 tracking-tight">
              Workforce Decision Engine: Deterministic Triage (6.000 Staf Pilot)
            </h2>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200 whitespace-nowrap">
              Rule #1 s/d #5 Auditable
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Sistem inferensi aturan objektif untuk menentukan jalur transisi karir 6.000 tenaga kerja lapangan secara adil dan transparan.
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center w-full sm:w-auto bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold shrink-0">
          <button
            onClick={() => setEngineMode('macro')}
            className={`flex-1 sm:flex-initial min-h-9 px-3 py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              engineMode === 'macro'
                ? 'bg-white text-blue-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Triage Makro 6.000 Staf</span>
          </button>
          <button
            onClick={() => setEngineMode('individual')}
            className={`flex-1 sm:flex-initial min-h-9 px-3 py-1.5 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              engineMode === 'individual'
                ? 'bg-white text-blue-700 shadow-2xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Audit Individual Pegawai</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: MACRO TRIAGE & SENSITIVITY ENGINE (FULL 6,000 POPULATION)          */}
      {/* ========================================================================= */}
      {engineMode === 'macro' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Live Sensitivity Simulation Control Panel */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-2xl p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-amber-300" />
                <h3 className="text-sm font-bold">
                  Interactive Sensitivity Simulation Engine (Strategic What-If Sandbox)
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-300">
                  Geser "Minimum Fit Score Threshold" untuk melihat 5 kartu di bawah dihitung ulang live dari engine (Rule #1-#5) atas 6.000 staf. Exposure cutoff & reskill pass rate adalah asumsi perencanaan terpisah, belum memengaruhi triase ini.
                </span>
                <button
                  onClick={handleResetMacroSliders}
                  className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[10px] font-semibold flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Baseline</span>
                </button>
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
              {/* Slider 1: Exposure Cutoff */}
              <div className="space-y-2 bg-white/5 p-3.5 rounded-xl border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-200">AI Automation Exposure Cutoff:</span>
                  <span className="font-mono font-bold text-amber-300 text-sm">{exposureCutoff}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="90"
                  step="5"
                  value={exposureCutoff}
                  onChange={(e) => setExposureCutoff(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>50% (Longgar)</span>
                  <span>Baseline 70%</span>
                  <span>90% (Ketat)</span>
                </div>
              </div>

              {/* Slider 2: Fit Threshold */}
              <div className="space-y-2 bg-white/5 p-3.5 rounded-xl border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-200">Minimum Fit Score Threshold:</span>
                  <span className="font-mono font-bold text-sky-300 text-sm">{minFitThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="80"
                  step="5"
                  value={minFitThreshold}
                  onChange={(e) => setMinFitThreshold(Number(e.target.value))}
                  className="w-full accent-sky-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>40% (Toleran)</span>
                  <span>Baseline 60%</span>
                  <span>80% (Selektif)</span>
                </div>
              </div>

              {/* Slider 3: Reskilling Pass Rate */}
              <div className="space-y-2 bg-white/5 p-3.5 rounded-xl border border-white/10">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-200">Estimasi Reskill Pass Rate:</span>
                  <span className="font-mono font-bold text-emerald-300 text-sm">{reskillPassRate}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="2"
                  value={reskillPassRate}
                  onChange={(e) => setReskillPassRate(Number(e.target.value))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>50% (Pesimis)</span>
                  <span>Target 78%</span>
                  <span>95% (Optimis)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 5 Macro Decision Pathway Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* 1. Direct Redeploy */}
            <div className="bg-white rounded-xl p-4 border border-emerald-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                  Rule #2
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-emerald-950 block">Direct Redeploy</span>
                <div className="text-2xl font-extrabold text-emerald-700 font-mono mt-1">
                  {macroStats.redeploy.count.toLocaleString('id-ID')}
                </div>
                <span className="text-[11px] text-emerald-800 font-semibold">
                  {macroStats.redeploy.percent}% dari populasi
                </span>
              </div>
              <p className="text-[10px] text-slate-500 border-t border-slate-100 pt-1.5">
                Fit tinggi (&ge;70%) dengan bukti terukur. Langsung mengisi formasi baru.
              </p>
            </div>

            {/* 2. Reskill -> Redeploy */}
            <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                <span className="text-[10px] font-mono bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded">
                  Rule #4
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-blue-950 block">Reskill &rarr; Redeploy</span>
                <div className="text-2xl font-extrabold text-blue-700 font-mono mt-1">
                  {macroStats.reskillRedeploy.count.toLocaleString('id-ID')}
                </div>
                <span className="text-[11px] text-blue-800 font-semibold">
                  {macroStats.reskillRedeploy.percent}% dari populasi
                </span>
              </div>
              <p className="text-[10px] text-slate-500 border-t border-slate-100 pt-1.5">
                Pondasi baik dengan gap skill spesifik. Kurikulum 4-12 minggu BNSP.
              </p>
            </div>

            {/* 3. Reskill */}
            <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span className="text-[10px] font-mono bg-amber-100 text-amber-800 font-bold px-1.5 py-0.2 rounded">
                  Rule #5 (Default)
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-amber-950 block">Reskill</span>
                <div className="text-2xl font-extrabold text-amber-700 font-mono mt-1">
                  {macroStats.reskill.count.toLocaleString('id-ID')}
                </div>
                <span className="text-[11px] text-amber-800 font-semibold">
                  {macroStats.reskill.percent}% dari populasi
                </span>
              </div>
              <p className="text-[10px] text-slate-500 border-t border-slate-100 pt-1.5">
                Kombinasi fit/feasibility menengah, evidence terverifikasi. Program komprehensif 12-24 minggu.
              </p>
            </div>

            {/* 4. Further Assessment */}
            <div className="bg-white rounded-xl p-4 border border-purple-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                <span className="text-[10px] font-mono bg-purple-100 text-purple-800 font-bold px-1.5 py-0.2 rounded">
                  Rule #1 (Gate)
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-purple-950 block">Further Assessment</span>
                <div className="text-2xl font-extrabold text-purple-700 font-mono mt-1">
                  {macroStats.assessment.count.toLocaleString('id-ID')}
                </div>
                <span className="text-[11px] text-purple-800 font-semibold">
                  {macroStats.assessment.percent}% dari populasi
                </span>
              </div>
              <p className="text-[10px] text-slate-500 border-t border-slate-100 pt-1.5">
                Data kosong/usang. Dilindungi dari penalti, wajib asesmen ulang.
              </p>
            </div>

            {/* 5. Voluntary Transition */}
            <div className="bg-white rounded-xl p-4 border border-rose-200 shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span className="text-[10px] font-mono bg-rose-100 text-rose-800 font-bold px-1.5 py-0.2 rounded">
                  Rule #3
                </span>
              </div>
              <div>
                <span className="text-xs font-bold text-rose-950 block">Voluntary Transition</span>
                <div className="text-2xl font-extrabold text-rose-700 font-mono mt-1">
                  {macroStats.voluntary.count.toLocaleString('id-ID')}
                </div>
                <span className="text-[11px] text-rose-800 font-semibold">
                  {macroStats.voluntary.percent}% dari populasi
                </span>
              </div>
              <p className="text-[10px] text-slate-500 border-t border-slate-100 pt-1.5">
                Menolak relokasi / mendekati usia pensiun. Program outplacement.
              </p>
            </div>
          </div>

          {/* Triage Search & Table Container */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden space-y-3 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan Nama, NIK, atau Unit Regional..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800"
                />
              </div>

              {/* Pathway Category Filter */}
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Filter Jalur:</span>
                <select
                  value={selectedCategoryFilter}
                  onChange={(e) => setSelectedCategoryFilter(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1 text-slate-700 font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="all">Semua Keputusan (5 Jalur)</option>
                  <option value="Redeploy">Redeploy</option>
                  <option value="Reskill -> Redeploy">Reskill &rarr; Redeploy</option>
                  <option value="Reskill">Reskill</option>
                  <option value="Further Assessment">Further Assessment</option>
                  <option value="Voluntary Transition Review">Voluntary Transition</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-[11px]">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">NIK & ID Pegawai</th>
                    <th className="py-2.5 px-3 font-semibold">Nama & Jabatan Saat Ini</th>
                    <th className="py-2.5 px-3 font-semibold">Unit Penugasan</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Exposure</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Fit Score</th>
                    <th className="py-2.5 px-3 font-semibold">Rekomendasi Keputusan</th>
                    <th className="py-2.5 px-3 font-semibold text-center">Rule Fired</th>
                    <th className="py-2.5 px-3 font-semibold text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEmployees.slice(0, 30).map((emp) => (
                    <tr
                      key={emp.id}
                      onClick={() => handleSelectForAudit(emp)}
                      className="hover:bg-blue-50/60 cursor-pointer transition-colors"
                    >
                      <td className="py-2.5 px-3 font-mono">
                        <div className="font-bold text-slate-900">{emp.id}</div>
                        <div className="text-[10px] text-slate-400">{emp.nik}</div>
                      </td>
                      <td className="py-2.5 px-3">
                        <div className="font-bold text-slate-900">{emp.name}</div>
                        <div className="text-[11px] text-slate-500">{emp.role}</div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-600">
                        {emp.department || emp.regionalUnit}
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono">
                        <span className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                          emp.exposure >= 70 ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {emp.exposure}%
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-mono font-bold text-blue-700">
                        {emp.fitRaw}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${
                          emp.officialDecision === 'Redeploy'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : emp.officialDecision === 'Reskill -> Redeploy'
                            ? 'bg-sky-50 text-sky-700 border-sky-200'
                            : emp.officialDecision === 'Further Assessment'
                            ? 'bg-purple-50 text-purple-700 border-purple-200'
                            : emp.officialDecision === 'Voluntary Transition Review'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>
                          {emp.officialDecision}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700 font-bold">
                          {emp.ruleCode}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectForAudit(emp);
                          }}
                          className="text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded transition-colors"
                        >
                          Audit Rule &rarr;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>Menampilkan 30 dari {filteredEmployees.length.toLocaleString('id-ID')} staf terfilter</span>
              <button
                onClick={() => onNavigate('people')}
                className="text-left text-blue-600 hover:text-blue-800 font-semibold"
              >
                Buka Direktori Lengkap 6.000 Staf di Menu People &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: INDIVIDUAL AUDIT & PARAMETER SANDBOX                              */}
      {/* ========================================================================= */}
      {engineMode === 'individual' && (
        <div className="space-y-6 animate-in fade-in duration-150">
          {/* Top Employee Selector Banner */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center font-mono">
                {activeEmployee.id.replace('EMP-', '')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{activeEmployee.name}</span>
                  <span className="font-mono text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {activeEmployee.id}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    NIK: {activeEmployee.nik}
                  </span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  {activeEmployee.role} • {activeEmployee.department || activeEmployee.regionalUnit}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setEngineMode('macro')}
                className="py-1.5 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1"
              >
                &larr; Kembali ke Triage Makro 6.000 Staf
              </button>
            </div>
          </div>

          {/* Decision Outcome Card */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Hasil Inferensi Algoritma
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <span
                    className={`text-lg font-extrabold px-3 py-1 rounded-lg border ${
                      currentResult.decision === 'Redeploy'
                        ? 'bg-emerald-600 text-white border-emerald-700'
                        : currentResult.decision === 'Reskill -> Redeploy'
                        ? 'bg-blue-600 text-white border-blue-700'
                        : currentResult.decision === 'Further Assessment'
                        ? 'bg-purple-600 text-white border-purple-700'
                        : currentResult.decision === 'Voluntary Transition Review'
                        ? 'bg-rose-600 text-white border-rose-700'
                        : 'bg-amber-600 text-white border-amber-700'
                    }`}
                  >
                    {currentResult.decision}
                  </span>
                  {activeEmployee.futureRoleTarget && (
                    <div className="text-xs text-slate-700">
                      &rarr; Formasi Target: <strong className="font-bold text-slate-900">{activeEmployee.futureRoleTarget}</strong>
                    </div>
                  )}
                </div>
              </div>

              {/* 3 Parameter Badges */}
              <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Fit Score</span>
                  <span className="font-mono font-bold text-slate-900">
                    {activeFit !== null ? `${activeFit}%` : 'Data Kosong'}
                  </span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Feasibility</span>
                  <span className="font-bold text-slate-900">{activeFeasibility}</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">Evidence</span>
                  <span className="font-bold text-blue-700">{activeEvidence}</span>
                </div>
              </div>
            </div>

            {/* Rule Fired Narrative */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
                  {currentResult.ruleCode}
                </span>
                <span className="font-bold text-slate-900 text-xs">{currentResult.ruleTitle}</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentResult.ruleExplanation}
              </p>
            </div>
          </div>

          {/* Interactive What-If Sandbox for this Employee */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-600" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  What-If Simulation Sandbox untuk {activeEmployee.name}
                </h4>
              </div>
              {isSimulating && (
                <button
                  onClick={() => {
                    setIsSimulating(false);
                    setSimFit(activeEmployee.fit);
                    setSimFeasibility(activeEmployee.feasibility);
                    setSimEvidence(activeEmployee.evidence);
                  }}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold"
                >
                  Reset ke Nilai Asli
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg space-y-1.5">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-700">Simulasi Fit Score:</span>
                  <span className="font-mono font-bold text-blue-600">{simFit !== null ? `${simFit}%` : 'Kosong'}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={simFit || 50}
                  onChange={(e) => {
                    setIsSimulating(true);
                    setSimFit(Number(e.target.value));
                  }}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-lg space-y-1.5">
                <span className="font-semibold text-slate-700 block">Simulasi Feasibility:</span>
                <select
                  value={simFeasibility}
                  onChange={(e) => {
                    setIsSimulating(true);
                    setSimFeasibility(e.target.value as any);
                  }}
                  className="w-full bg-white border border-slate-200 rounded p-1 text-xs font-semibold cursor-pointer"
                >
                  <option value="High">High (Siap Mutasi & Sesuai Grade)</option>
                  <option value="Medium">Medium (Perlu Penyesuaian Regional)</option>
                  <option value="Low">Low (Kendala Geografis / Ikatan Dinas)</option>
                </select>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg space-y-1.5">
                <span className="font-semibold text-slate-700 block">Simulasi Tingkat Bukti:</span>
                <select
                  value={simEvidence}
                  onChange={(e) => {
                    setIsSimulating(true);
                    setSimEvidence(e.target.value as any);
                  }}
                  className="w-full bg-white border border-slate-200 rounded p-1 text-xs font-semibold cursor-pointer"
                >
                  <option value="High">High (Uji Praktik / BNSP Terverifikasi)</option>
                  <option value="Medium">Medium (LMS + Riwayat OJT)</option>
                  <option value="Low">Low (Klaim Diri / Self-Survey)</option>
                  <option value="Unknown">Unknown (Data Kosong / Pre-2023)</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleSaveDecision}
                disabled={isSavingDecision}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Simpan Hasil Rekomendasi</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
