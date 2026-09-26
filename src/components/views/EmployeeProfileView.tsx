import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import {
  Users,
  Search,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ChevronLeft,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Award,
  ArrowRight,
  Sparkles,
  Download,
  Database,
  Building2,
  Briefcase,
  Layers,
  FileCheck,
  Copy,
  Check,
  RotateCcw,
  SlidersHorizontal,
  ExternalLink,
  HelpCircle,
  X,
  Eye,
  Info,
  FileText,
  Scale,
} from 'lucide-react';
import { NavTab, EmployeeRecord, DecisionCategory, FitBucket, EvidenceLevel } from '../../types/meridian';
import { getWorkforce6000, DEPARTMENTS, JOB_FAMILIES } from '../../data/workforceGenerator';
import { useToast } from '../../context/ToastContext';
import { LaborRegulationModal } from '../LaborRegulationModal';

interface EmployeeProfileViewProps {
  onNavigate: (tab: NavTab) => void;
  selectedEmployeeId: string;
  setSelectedEmployeeId: (id: string) => void;
  onOpenLearningForEmployee: (employeeId: string) => void;
}

const ROW_HEIGHT = 58; // Constant row height in px for 60fps virtualization
const OVERSCAN = 18; // Number of buffer rows above and below visible window

export const EmployeeProfileView: React.FC<EmployeeProfileViewProps> = ({
  onNavigate,
  selectedEmployeeId,
  setSelectedEmployeeId,
  onOpenLearningForEmployee,
}) => {
  const { addToast } = useToast();

  // All 6,000 records from the workforce generator
  const allEmployees = useMemo(() => getWorkforce6000(), []);

  // View state: 'table' (Main 6,000 Data Table) or 'inspector' (Detailed Profile View)
  const [viewMode, setViewMode] = useState<'table' | 'inspector'>('table');
  const [activeInspectorTab, setActiveInspectorTab] = useState<
    'capabilities' | 'role-match' | 'learning' | 'reconciliation' | 'contracts'
  >('capabilities');

  // Quick Side Drawer for rapid preview without leaving table
  const [quickDrawerOpen, setQuickDrawerOpen] = useState(false);
  const [reconciliationModalOpen, setReconciliationModalOpen] = useState(false);
  const [laborModalOpen, setLaborModalOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [selectedJobFamily, setSelectedJobFamily] = useState<string>('all');
  const [selectedDecision, setSelectedDecision] = useState<DecisionCategory | 'all'>('all');
  const [selectedFitBucket, setSelectedFitBucket] = useState<FitBucket | 'all'>('all');
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceLevel | 'all'>('all');

  // Sorting - default sort by ID
  const [sortField, setSortField] = useState<
    'jobFamily' | 'department' | 'name' | 'id' | 'nik' | 'exposure' | 'fit' | 'decision'
  >('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Virtualized Scroll state
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(560);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // ResizeObserver to adapt container height dynamically
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height > 0) {
          setContainerHeight(entry.contentRect.height);
        }
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, [viewMode]);

  // Handle scroll events with RAF throttling for ultra-high 60fps performance
  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }, []);

  // Filter logic
  const filteredEmployees = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    return allEmployees.filter((emp) => {
      // Department filter
      if (selectedDepartment !== 'all' && emp.department !== selectedDepartment) {
        return false;
      }

      // Job Family filter
      if (selectedJobFamily !== 'all' && emp.jobFamily !== selectedJobFamily) {
        return false;
      }

      // Decision Category filter
      if (selectedDecision !== 'all' && emp.officialDecision !== selectedDecision) {
        return false;
      }

      // Fit Bucket filter
      if (selectedFitBucket !== 'all' && emp.fitBucket !== selectedFitBucket) {
        return false;
      }

      // Evidence filter
      if (selectedEvidence !== 'all' && emp.evidence !== selectedEvidence) {
        return false;
      }

      // Search query (matches NIK, ID, Enterprise ID, Name, Role, Target Role, Department)
      if (q) {
        const matchesNik = emp.nik && emp.nik.toLowerCase().includes(q);
        const matchesId = emp.id.toLowerCase().includes(q);
        const matchesEnt = emp.enterpriseId && emp.enterpriseId.toLowerCase().includes(q);
        const matchesName = emp.name.toLowerCase().includes(q);
        const matchesRole = emp.role.toLowerCase().includes(q);
        const matchesTarget = emp.futureRoleTarget && emp.futureRoleTarget.toLowerCase().includes(q);
        const matchesDept = emp.department && emp.department.toLowerCase().includes(q);
        if (!matchesNik && !matchesId && !matchesEnt && !matchesName && !matchesRole && !matchesTarget && !matchesDept) {
          return false;
        }
      }

      return true;
    });
  }, [allEmployees, searchQuery, selectedDepartment, selectedJobFamily, selectedDecision, selectedFitBucket, selectedEvidence]);

  // Sort logic
  const sortedEmployees = useMemo(() => {
    const list = [...filteredEmployees];

    list.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case 'jobFamily':
          comparison = (a.jobFamily || '').localeCompare(b.jobFamily || '');
          break;
        case 'department':
          comparison = (a.department || '').localeCompare(b.department || '');
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'id':
          comparison = a.id.localeCompare(b.id);
          break;
        case 'nik':
          comparison = (a.nik || '').localeCompare(b.nik || '');
          break;
        case 'exposure':
          comparison = a.exposure - b.exposure;
          break;
        case 'fit': {
          const fitA = a.fit ?? -1;
          const fitB = b.fit ?? -1;
          comparison = fitA - fitB;
          break;
        }
        case 'decision':
          comparison = a.officialDecision.localeCompare(b.officialDecision);
          break;
        default:
          comparison = 0;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return list;
  }, [filteredEmployees, sortField, sortDirection]);

  // Virtualization math
  const totalCount = sortedEmployees.length;
  const totalHeight = totalCount * ROW_HEIGHT;
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN);
  const endIndex = Math.min(totalCount, Math.ceil((scrollTop + containerHeight) / ROW_HEIGHT) + OVERSCAN);
  const visibleRows = sortedEmployees.slice(startIndex, endIndex);
  const topSpacerHeight = startIndex * ROW_HEIGHT;
  const bottomSpacerHeight = Math.max(0, (totalCount - endIndex) * ROW_HEIGHT);

  // Current selected employee record
  const currentSelectedEmployee = useMemo(() => {
    return allEmployees.find((e) => e.id === selectedEmployeeId) || allEmployees[0]!;
  }, [allEmployees, selectedEmployeeId]);

  // Index in current sorted list
  const currentFilteredIndex = useMemo(() => {
    return sortedEmployees.findIndex((e) => e.id === currentSelectedEmployee.id);
  }, [sortedEmployees, currentSelectedEmployee.id]);

  // Column header sort toggle
  const handleSort = (field: typeof sortField) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Inspect full profile
  const handleInspect = (employee: EmployeeRecord) => {
    setSelectedEmployeeId(employee.id);
    setViewMode('inspector');
  };

  // Quick select row in table
  const handleRowClick = (employee: EmployeeRecord) => {
    setSelectedEmployeeId(employee.id);
    setQuickDrawerOpen(true);
  };

  // Prev / Next in inspector
  const handlePrevEmployee = () => {
    if (currentFilteredIndex > 0) {
      setSelectedEmployeeId(sortedEmployees[currentFilteredIndex - 1]!.id);
    }
  };

  const handleNextEmployee = () => {
    if (currentFilteredIndex < sortedEmployees.length - 1) {
      setSelectedEmployeeId(sortedEmployees[currentFilteredIndex + 1]!.id);
    }
  };

  // Copy helper
  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    addToast({
      title: `${label} Disalin`,
      message: `${text} telah disalin ke clipboard.`,
      type: 'info',
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export filtered dataset to CSV
  const handleExportCSV = () => {
    const headers = [
      'Employee ID',
      'NIK (Kependudukan)',
      'Enterprise ID (UID)',
      'Nama Karyawan',
      'Peran Sekarang',
      'Job Family',
      'Departemen / UP3',
      'Regional Unit',
      'Corporate Grade',
      'AI Exposure (%)',
      'Fit Score (%)',
      'Feasibility',
      'Evidence Source',
      'Official Decision Triad',
      'Target Peran Baru',
      'Klaster Tujuan',
    ];

    const rows = sortedEmployees.map((e) => [
      `"${e.id}"`,
      `"'${e.nik || ''}"`,
      `"${e.enterpriseId || ''}"`,
      `"${e.name}"`,
      `"${e.role}"`,
      `"${e.jobFamily || ''}"`,
      `"${e.department || ''}"`,
      `"${e.regionalUnit}"`,
      `"${e.grade}"`,
      e.exposure,
      e.fit ?? 'Data Kosong',
      `"${e.feasibility}"`,
      `"${e.evidence}"`,
      `"${e.officialDecision}"`,
      `"${e.futureRoleTarget || 'Belum Ditugaskan'}"`,
      `"${e.destinationCluster}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Meridian_Workforce_6000_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      title: 'Export Berhasil',
      message: `${sortedEmployees.length.toLocaleString('id-ID')} data pegawai berhasil diexport ke file CSV.`,
      type: 'success',
    });
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedDepartment('all');
    setSelectedJobFamily('all');
    setSelectedDecision('all');
    setSelectedFitBucket('all');
    setSelectedEvidence('all');
    setSortField('id');
    setSortDirection('asc');
    addToast({
      title: 'Filter Direset',
      message: 'Semua filter telah dikembalikan ke kondisi default (6.000 Pegawai).',
      type: 'info',
    });
  };

  // Quick stat counts
  const highExposureCount = useMemo(
    () => allEmployees.filter((e) => e.exposure >= 70).length,
    [allEmployees]
  );
  const assessmentGateCount = useMemo(
    () => allEmployees.filter((e) => e.officialDecision === 'Further Assessment').length,
    [allEmployees]
  );
  const redeployCount = useMemo(
    () => allEmployees.filter((e) => e.officialDecision === 'Redeploy').length,
    [allEmployees]
  );

  return (
    <div className="space-y-5 pb-16">
      {/* Top Enterprise Workforce Header & Metrics */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center shrink-0">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base font-bold text-slate-900 tracking-tight">
                  Direktori Talenta & Profil Pegawai Operasional
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Virtual Engine: 6.000 Records
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                  Konsolidasi NIK & Multi-Platform HR
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Basis data terpadu 6.000 pegawai lintas 5 Job Family (mayoritas Field Metering & Manual Operations) dengan integrasi NIK Kependudukan & Single Employee ID lintas SAP HCM, Moodle LMS, dan Taleo ATS.
              </p>
            </div>
          </div>

          {/* View Mode & Reconcile Actions */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            <button
              onClick={() => setReconciliationModalOpen(true)}
              className="py-1.5 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Lihat status pemetaan NIK & Multi-Platform HR"
            >
              <Database className="w-3.5 h-3.5 text-blue-600" />
              <span>Audit NIK & Sistem HR</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="py-1.5 px-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              title="Download data terfilter ke CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Export CSV</span>
            </button>

            {/* Mode Switcher */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-md transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Direktori Tabel (6.000)
              </button>
              <button
                onClick={() => setViewMode('inspector')}
                className={`px-3 py-1 rounded-md transition-all flex items-center gap-1 ${
                  viewMode === 'inspector'
                    ? 'bg-white text-blue-700 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Detail Inspector</span>
              </button>
            </div>
          </div>
        </div>

        {/* Real-time KPI Ribbon for the Workforce */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-[11px] text-slate-500 block">Total Headcount Pilot</span>
            <span className="text-base font-bold text-slate-900 font-mono">
              6.000 <span className="text-[10px] text-slate-500 font-normal">Pegawai</span>
            </span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-[11px] text-slate-500 block">Terekspos Otomasi (≥70%)</span>
            <span className="text-base font-bold text-rose-600 font-mono">
              {highExposureCount.toLocaleString('id-ID')} <span className="text-[10px] text-slate-500 font-normal">(70%)</span>
            </span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-[11px] text-slate-500 block">Assessment Gate (Data Kosong)</span>
            <span className="text-base font-bold text-violet-600 font-mono">
              {assessmentGateCount.toLocaleString('id-ID')} <span className="text-[10px] text-slate-500 font-normal">(15%)</span>
            </span>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
            <span className="text-[11px] text-slate-500 block">Status Rekonsiliasi NIK</span>
            <span className="text-base font-bold text-emerald-600 font-mono flex items-center gap-1">
              100% <span className="text-[10px] text-slate-500 font-normal">(4 HR Silos Merged)</span>
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: DATA TABLE DIRECTORY WITH VIRTUALIZED SCROLLING                    */}
      {/* ========================================================================= */}
      {viewMode === 'table' && (
        <div className="space-y-4">
          {/* Controls Bar: Search, Department Filter, Job Family Filter, etc. */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-3">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari berdasarkan NIK 16 digit, ID Pegawai, UID, Nama, Role, atau UP3..."
                  className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:bg-white text-slate-900 transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Department Filter (Explicit Requirement) */}
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 rounded-lg px-2.5 py-2 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[200px]"
                >
                  <option value="all">Semua Departemen / UP3 ({allEmployees.length})</option>
                  {DEPARTMENTS.map((dept) => {
                    const count = allEmployees.filter((e) => e.department === dept).length;
                    return (
                      <option key={dept} value={dept}>
                        {dept} ({count})
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Job Family Filter (Explicit Requirement) */}
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-slate-400 shrink-0 hidden sm:block" />
                <select
                  value={selectedJobFamily}
                  onChange={(e) => setSelectedJobFamily(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 rounded-lg px-2.5 py-2 focus:outline-none focus:border-blue-500 cursor-pointer min-w-[190px]"
                >
                  <option value="all">Semua Job Family</option>
                  {JOB_FAMILIES.map((jf) => {
                    const count = allEmployees.filter((e) => e.jobFamily === jf).length;
                    return (
                      <option key={jf} value={jf}>
                        {jf} ({count})
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Secondary Filter Pills: Decision, Fit Bucket, Evidence */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100 flex-wrap">
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 uppercase tracking-wider">
                  <Filter className="w-3 h-3" />
                  Filter Cepat:
                </span>

                {/* Decision Category Filter */}
                <select
                  value={selectedDecision}
                  onChange={(e) => setSelectedDecision(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="all">Semua Rekomendasi Keputusan</option>
                  <option value="Redeploy">Redeploy (Langsung)</option>
                  <option value="Reskill -> Redeploy">Reskill -&gt; Redeploy (Akselerasi)</option>
                  <option value="Reskill">Reskill (Komprehensif)</option>
                  <option value="Further Assessment">Further Assessment (Audit Gate)</option>
                  <option value="Voluntary Transition Review">Voluntary Transition Review (VERS)</option>
                </select>

                {/* Fit Bucket Filter */}
                <select
                  value={selectedFitBucket}
                  onChange={(e) => setSelectedFitBucket(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="all">Semua Bucket Fit</option>
                  <option value="High">Fit High (≥ 75%)</option>
                  <option value="Medium">Fit Medium (45 - 74%)</option>
                  <option value="Low">Fit Low (&lt; 45%)</option>
                  <option value="Insufficient Data">Data Tidak Cukup / Kosong</option>
                </select>

                {/* Evidence Filter */}
                <select
                  value={selectedEvidence}
                  onChange={(e) => setSelectedEvidence(e.target.value as any)}
                  className="bg-slate-50 border border-slate-200 text-[11px] font-medium text-slate-700 rounded-md px-2 py-1 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  <option value="all">Semua Level Evidence</option>
                  <option value="High">High (Measured BNSP/Log)</option>
                  <option value="Medium">Medium (Inferred Proximity)</option>
                  <option value="Low">Low (Data Pre-2023)</option>
                  <option value="Unknown">Unknown (Skill Kosong)</option>
                </select>

                {(searchQuery ||
                  selectedDepartment !== 'all' ||
                  selectedJobFamily !== 'all' ||
                  selectedDecision !== 'all' ||
                  selectedFitBucket !== 'all' ||
                  selectedEvidence !== 'all') && (
                  <button
                    onClick={handleResetFilters}
                    className="text-[11px] text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 px-2 py-1 hover:bg-rose-50 rounded transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset Filter
                  </button>
                )}
              </div>

              {/* Result Count and Sort Indicator */}
              <div className="text-xs text-slate-600 font-medium">
                Menampilkan <strong className="text-blue-700 font-mono">{sortedEmployees.length.toLocaleString('id-ID')}</strong> dari{' '}
                <span className="font-mono text-slate-500">6.000</span> pegawai
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* THE VIRTUALIZED TABLE CONTAINER                                   */}
          {/* ================================================================= */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
            {/* Table Header with Sorting */}
            <div className="bg-slate-100/90 border-b border-slate-200 text-slate-700 text-xs font-bold select-none sticky top-0 z-10">
              <div className="grid grid-cols-12 px-4 py-3 items-center gap-2">
                {/* ID & NIK */}
                <div
                  onClick={() => handleSort('nik')}
                  className="col-span-2 flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition-colors"
                  title="Klik untuk sortir berdasarkan NIK / ID"
                >
                  <span>NIK & Unified ID</span>
                  {sortField === 'nik' ? (
                    sortDirection === 'asc' ? (
                      <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                  )}
                </div>

                {/* Nama & Role */}
                <div
                  onClick={() => handleSort('name')}
                  className="col-span-2 sm:col-span-3 flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition-colors"
                  title="Klik untuk sortir berdasarkan Nama"
                >
                  <span>Nama & Peran Saat Ini</span>
                  {sortField === 'name' ? (
                    sortDirection === 'asc' ? (
                      <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                  )}
                </div>

                {/* Job Family (Strict Requirement) */}
                <div
                  onClick={() => handleSort('jobFamily')}
                  className="col-span-2 hidden md:flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition-colors"
                  title="Klik untuk sortir berdasarkan Job Family"
                >
                  <span>Job Family</span>
                  {sortField === 'jobFamily' ? (
                    sortDirection === 'asc' ? (
                      <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                  )}
                </div>

                {/* Departemen / Regional Unit (Strict Requirement) */}
                <div
                  onClick={() => handleSort('department')}
                  className="col-span-2 hidden lg:flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition-colors"
                  title="Klik untuk sortir berdasarkan Departemen"
                >
                  <span>Departemen & UP3</span>
                  {sortField === 'department' ? (
                    sortDirection === 'asc' ? (
                      <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
                    ) : (
                      <ArrowDown className="w-3.5 h-3.5 text-blue-600" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 opacity-60" />
                  )}
                </div>

                {/* AI Exposure */}
                <div
                  onClick={() => handleSort('exposure')}
                  className="col-span-1 hidden sm:flex items-center justify-center gap-1 cursor-pointer hover:text-blue-600 transition-colors"
                  title="Klik untuk sortir berdasarkan AI Exposure"
                >
                  <span>AI Expos.</span>
                  {sortField === 'exposure' ? (
                    sortDirection === 'asc' ? (
                      <ArrowUp className="w-3 h-3 text-blue-600" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-blue-600" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-60" />
                  )}
                </div>

                {/* Fit Score */}
                <div
                  onClick={() => handleSort('fit')}
                  className="col-span-1 flex items-center justify-center gap-1 cursor-pointer hover:text-blue-600 transition-colors"
                  title="Klik untuk sortir berdasarkan Fit Score"
                >
                  <span>Fit %</span>
                  {sortField === 'fit' ? (
                    sortDirection === 'asc' ? (
                      <ArrowUp className="w-3 h-3 text-blue-600" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-blue-600" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-60" />
                  )}
                </div>

                {/* Official Decision */}
                <div
                  onClick={() => handleSort('decision')}
                  className="col-span-2 sm:col-span-2 flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors"
                  title="Klik untuk sortir berdasarkan Rekomendasi Keputusan"
                >
                  <span>Rekomendasi</span>
                  {sortField === 'decision' ? (
                    sortDirection === 'asc' ? (
                      <ArrowUp className="w-3 h-3 text-blue-600" />
                    ) : (
                      <ArrowDown className="w-3 h-3 text-blue-600" />
                    )
                  ) : (
                    <ArrowUpDown className="w-3 h-3 text-slate-400 opacity-60" />
                  )}
                </div>

                {/* Action / Inspect */}
                <div className="col-span-1 text-right font-medium text-slate-500">Aksi</div>
              </div>
            </div>

            {/* Virtualized Scrolling Viewport */}
            <div
              ref={scrollContainerRef}
              onScroll={onScroll}
              className="overflow-y-auto divide-y divide-slate-100 font-sans"
              style={{ height: '580px', position: 'relative' }}
            >
              {totalCount === 0 ? (
                <div className="py-20 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                    <Search className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">Tidak ada pegawai yang cocok</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Tidak ditemukan data pegawai untuk kriteria filter atau pencarian saat ini.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="py-1.5 px-3 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700"
                  >
                    Reset Filter
                  </button>
                </div>
              ) : (
                <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
                  {/* Top Spacer Div for Virtualization */}
                  <div style={{ height: `${topSpacerHeight}px` }} />

                  {/* Render only visible window rows (60fps performance) */}
                  {visibleRows.map((emp) => {
                    const isSelected = emp.id === selectedEmployeeId;

                    return (
                      <div
                        key={emp.id}
                        onClick={() => handleRowClick(emp)}
                        style={{ height: `${ROW_HEIGHT}px` }}
                        className={`grid grid-cols-12 px-4 items-center gap-2 text-xs transition-colors cursor-pointer border-b border-slate-100 ${
                          isSelected
                            ? 'bg-blue-50/90 font-medium'
                            : 'hover:bg-slate-50/80 bg-white'
                        }`}
                      >
                        {/* ID & NIK */}
                        <div className="col-span-2 truncate">
                          <div className="flex items-center gap-1.5">
                            <span className="font-mono font-bold text-slate-900 text-[11px]">
                              {emp.id}
                            </span>
                            <span className="text-[10px] px-1 py-0.2 bg-blue-50 text-blue-700 rounded font-mono border border-blue-100">
                              {emp.enterpriseId?.replace('UID-PLN-', '#')}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1 truncate" title={emp.nik}>
                            <span>NIK:</span>
                            <span className="truncate">{emp.nik?.slice(0, 6)}...{emp.nik?.slice(-4)}</span>
                          </div>
                        </div>

                        {/* Name & Current Role */}
                        <div className="col-span-2 sm:col-span-3 flex items-center gap-2 truncate">
                          <div
                            className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 border ${
                              emp.officialDecision === 'Redeploy'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                                : emp.officialDecision === 'Reskill -> Redeploy'
                                ? 'bg-sky-100 text-sky-800 border-sky-300'
                                : emp.officialDecision === 'Further Assessment'
                                ? 'bg-violet-100 text-violet-800 border-violet-300'
                                : emp.officialDecision === 'Voluntary Transition Review'
                                ? 'bg-rose-100 text-rose-800 border-rose-300'
                                : 'bg-amber-100 text-amber-800 border-amber-300'
                            }`}
                          >
                            {emp.name
                              .split(' ')
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join('')}
                          </div>
                          <div className="truncate">
                            <div className="font-bold text-slate-900 truncate flex items-center gap-1">
                              <span>{emp.name}</span>
                              {emp.tenureYears >= 20 && (
                                <span className="text-[9px] bg-slate-100 text-slate-600 px-1 py-0.2 rounded font-normal shrink-0">
                                  Senior
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate">{emp.role}</div>
                          </div>
                        </div>

                        {/* Job Family (Strict Requirement) */}
                        <div className="col-span-2 hidden md:block truncate">
                          <span
                            className="inline-block text-[11px] text-slate-700 truncate"
                            title={emp.jobFamily}
                          >
                            {emp.jobFamily || 'Field Metering & Manual Operations'}
                          </span>
                          <span className="block text-[10px] text-slate-400">
                            {emp.grade}
                          </span>
                        </div>

                        {/* Departemen / Regional Unit (Strict Requirement) */}
                        <div className="col-span-2 hidden lg:block truncate">
                          <span
                            className="text-[11px] font-medium text-slate-800 truncate block"
                            title={emp.department}
                          >
                            {emp.department || emp.regionalUnit}
                          </span>
                          <span className="text-[10px] text-slate-400 truncate block">
                            {emp.regionalUnit}
                          </span>
                        </div>

                        {/* AI Exposure % (Clean badge without bar) */}
                        <div className="col-span-1 hidden sm:flex items-center justify-center">
                          <span
                            className={`font-mono font-bold text-[11px] px-1.5 py-0.5 rounded border ${
                              emp.exposure >= 70
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : emp.exposure >= 40
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            {emp.exposure}%
                          </span>
                        </div>

                        {/* Fit Score */}
                        <div className="col-span-1 text-center font-mono">
                          {emp.fit !== null ? (
                            <span
                              className={`font-bold text-[11px] px-1.5 py-0.5 rounded ${
                                emp.fit >= 75
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : emp.fit >= 45
                                  ? 'bg-sky-50 text-sky-700'
                                  : 'bg-rose-50 text-rose-700'
                              }`}
                            >
                              {emp.fit}%
                            </span>
                          ) : (
                            <span
                              className="text-[10px] text-violet-600 font-semibold bg-violet-50 px-1 py-0.5 rounded border border-violet-100"
                              title="Data kompetensi kosong / Audit gate"
                            >
                              Gate
                            </span>
                          )}
                        </div>

                        {/* Official Decision Category */}
                        <div className="col-span-2 sm:col-span-2 truncate">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold border ${
                              emp.officialDecision === 'Redeploy'
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : emp.officialDecision === 'Reskill -> Redeploy'
                                ? 'bg-sky-50 text-sky-700 border-sky-200'
                                : emp.officialDecision === 'Further Assessment'
                                ? 'bg-violet-50 text-violet-700 border-violet-200'
                                : emp.officialDecision === 'Voluntary Transition Review'
                                ? 'bg-rose-50 text-rose-700 border-rose-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            <span className="truncate">{emp.officialDecision}</span>
                          </span>
                        </div>

                        {/* Action / Inspect */}
                        <div className="col-span-1 text-right flex items-center justify-end gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleInspect(emp);
                            }}
                            className="p-1 rounded text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                            title="Buka Detail Inspector Pegawai"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}

                  {/* Bottom Spacer Div for Virtualization */}
                  <div style={{ height: `${bottomSpacerHeight}px` }} />
                </div>
              )}
            </div>

            {/* Table Footer with Summary Status */}
            <div className="bg-slate-50 border-t border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                  Virtualized Windowing Active: 60 FPS
                </span>
                <span className="text-slate-400">|</span>
                <span className="text-slate-500 text-[11px]">
                  Tiap baris memuat integrasi NIK & SAP/Moodle UID secara transparan.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[11px]">
                  Terpilih:{' '}
                  <strong className="text-slate-900 font-mono">
                    {currentSelectedEmployee.name} ({currentSelectedEmployee.id})
                  </strong>
                </span>
                <button
                  onClick={() => handleInspect(currentSelectedEmployee)}
                  className="py-1 px-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded text-[11px] font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Buka Inspector</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Preview Drawer if an employee is selected from the table */}
          {quickDrawerOpen && (
            <div className="bg-white rounded-xl p-4 border border-blue-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex items-center justify-center border border-blue-200">
                  {currentSelectedEmployee.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {currentSelectedEmployee.name}
                    </h3>
                    <span className="font-mono text-xs px-2 py-0.5 bg-slate-100 text-slate-700 rounded font-semibold">
                      {currentSelectedEmployee.id}
                    </span>
                    <span className="font-mono text-xs px-2 py-0.5 bg-blue-50 text-blue-700 rounded font-semibold border border-blue-200">
                      {currentSelectedEmployee.enterpriseId}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {currentSelectedEmployee.role} • {currentSelectedEmployee.department} • NIK:{' '}
                    <span className="font-mono font-medium text-slate-700">
                      {currentSelectedEmployee.nik}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <div className="text-right mr-2 hidden sm:block">
                  <span className="text-[11px] text-slate-400 block">Rekomendasi Keputusan</span>
                  <span className="font-bold text-xs text-blue-600">
                    {currentSelectedEmployee.officialDecision} ({currentSelectedEmployee.ruleCode})
                  </span>
                </div>
                <button
                  onClick={() => handleInspect(currentSelectedEmployee)}
                  className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspeksi Lengkap Pegawai</span>
                </button>
                <button
                  onClick={() => setQuickDrawerOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: DETAILED PROFILE INSPECTOR                                         */}
      {/* ========================================================================= */}
      {viewMode === 'inspector' && (
        <div className="space-y-5 animate-in fade-in">
          {/* Top Inspector Navigation Bar */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode('table')}
                className="py-1.5 px-3 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Kembali ke Direktori Tabel (6.000 Pegawai)</span>
              </button>
              <div className="h-4 w-px bg-slate-200 hidden sm:block" />
              <span className="text-xs text-slate-500 hidden sm:inline">
                Posisi: <strong className="text-slate-900 font-mono">{currentFilteredIndex + 1}</strong> dari{' '}
                <span className="font-mono">{sortedEmployees.length.toLocaleString('id-ID')}</span> hasil filter
              </span>
            </div>

            {/* Prev / Next controls in filtered list */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevEmployee}
                disabled={currentFilteredIndex <= 0}
                className="py-1.5 px-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
                title="Pegawai Sebelumnya dalam filter"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>
              <button
                onClick={handleNextEmployee}
                disabled={currentFilteredIndex >= sortedEmployees.length - 1}
                className="py-1.5 px-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-medium disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
                title="Pegawai Berikutnya dalam filter"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Employee Hero Profile & Identity Banner */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xl flex items-center justify-center shadow-xs shrink-0">
                  {currentSelectedEmployee.name
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl font-bold text-slate-900">
                      {currentSelectedEmployee.name}
                    </h2>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">
                      {currentSelectedEmployee.id}
                    </span>
                    <span className="font-mono text-xs font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded border border-indigo-200">
                      {currentSelectedEmployee.enterpriseId}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-600">
                    <strong className="text-blue-600">{currentSelectedEmployee.role}</strong> •{' '}
                    <span>{currentSelectedEmployee.department}</span> •{' '}
                    <span className="text-slate-400">{currentSelectedEmployee.grade}</span>
                  </p>
                  <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500 flex-wrap">
                    <span className="flex items-center gap-1 font-mono">
                      <strong>NIK:</strong> {currentSelectedEmployee.nik}
                      <button
                        onClick={() => handleCopy(currentSelectedEmployee.nik || '', 'NIK')}
                        className="text-slate-400 hover:text-blue-600 ml-0.5"
                        title="Salin NIK"
                      >
                        {copiedId === currentSelectedEmployee.nik ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </span>
                    <span>•</span>
                    <span>Masa Kerja: <strong className="text-slate-800">{currentSelectedEmployee.tenureYears} Tahun</strong></span>
                    <span>•</span>
                    <span>Job Family: <strong className="text-slate-800">{currentSelectedEmployee.jobFamily}</strong></span>
                  </div>
                </div>
              </div>

              {/* Official Triad Decision Pill */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col items-start lg:items-end justify-center shrink-0">
                <span className="text-[11px] text-slate-500 font-medium">Status Rekomendasi Triad</span>
                <span
                  className={`text-sm font-bold mt-0.5 px-3 py-1 rounded-lg border ${
                    currentSelectedEmployee.officialDecision === 'Redeploy'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : currentSelectedEmployee.officialDecision === 'Reskill -> Redeploy'
                      ? 'bg-sky-50 text-sky-700 border-sky-300'
                      : currentSelectedEmployee.officialDecision === 'Further Assessment'
                      ? 'bg-violet-50 text-violet-700 border-violet-300'
                      : currentSelectedEmployee.officialDecision === 'Voluntary Transition Review'
                      ? 'bg-rose-50 text-rose-700 border-rose-300'
                      : 'bg-amber-50 text-amber-700 border-amber-300'
                  }`}
                >
                  {currentSelectedEmployee.officialDecision} ({currentSelectedEmployee.ruleCode})
                </span>
                <span className="text-[10px] text-slate-400 mt-1">
                  Confidence Evidence: <strong className="text-slate-700">{currentSelectedEmployee.evidence}</strong>
                </span>
              </div>
            </div>

            {/* 4 Inspector Sub-Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveInspectorTab('capabilities')}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  activeInspectorTab === 'capabilities'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Kapabilitas & Audit Evidence
              </button>
              <button
                onClick={() => setActiveInspectorTab('role-match')}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  activeInspectorTab === 'role-match'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pencocokan Peran Baru (Role Match)
              </button>
              <button
                onClick={() => setActiveInspectorTab('learning')}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  activeInspectorTab === 'learning'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Rencana Pembelajaran & Biaya
              </button>
              <button
                onClick={() => setActiveInspectorTab('reconciliation')}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap ${
                  activeInspectorTab === 'reconciliation'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Rekonsiliasi NIK & Multi-HR
              </button>
              <button
                onClick={() => setActiveInspectorTab('contracts')}
                className={`px-3 py-1.5 rounded-md transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeInspectorTab === 'contracts'
                    ? 'bg-white text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-amber-600" />
                <span>Dokumen Kontrak & Regulasi</span>
              </button>
            </div>

            {/* TAB CONTENT 1: Current Capability */}
            {activeInspectorTab === 'capabilities' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">AI Automation Exposure</span>
                    <span className="text-xl font-bold text-rose-600 font-mono">
                      {currentSelectedEmployee.exposure}%
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Pekerjaan rutin berisiko diotomatisasi oleh AMI Smart Meter & Telemetri.
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Fit Score Terkalkulasi</span>
                    <span className="text-xl font-bold text-blue-600 font-mono">
                      {currentSelectedEmployee.fitRaw}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Bucket Kesesuaian: <strong>{currentSelectedEmployee.fitBucket}</strong>
                    </p>
                  </div>

                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <span className="text-[11px] text-slate-500 block">Kelayakan Transisi (Feasibility)</span>
                    <span className="text-xl font-bold text-slate-800 font-mono">
                      {currentSelectedEmployee.feasibility}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-1">
                      Kesiapan mobilitas grade dan kelaikan regional.
                    </p>
                  </div>
                </div>

                {/* Skills Audit Table */}
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 text-xs font-bold text-slate-700">
                    Rincian Sinyal Kapabilitas & Sumber Bukti
                  </div>
                  <table className="w-full text-left text-xs">
                    <thead className="bg-white text-slate-500 border-b border-slate-100 text-[11px]">
                      <tr>
                        <th className="py-2.5 px-4 font-semibold">Kapabilitas</th>
                        <th className="py-2.5 px-4 font-semibold text-center">Tingkat Kemahiran</th>
                        <th className="py-2.5 px-4 font-semibold">Sumber Bukti Verifikasi</th>
                        <th className="py-2.5 px-4 font-semibold text-right">Tipe Sinyal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {currentSelectedEmployee.skills.map((skill, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60">
                          <td className="py-2.5 px-4 font-medium text-slate-900">{skill.name}</td>
                          <td className="py-2.5 px-4 text-center font-mono font-bold text-slate-700">
                            {skill.level} / 5
                          </td>
                          <td className="py-2.5 px-4 text-slate-600">{skill.source || 'Log Sistem'}</td>
                          <td className="py-2.5 px-4 text-right">
                            <span
                              className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${
                                skill.type === 'measured'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : 'bg-amber-50 text-amber-700 border-amber-200'
                              }`}
                            >
                              {skill.type === 'measured' ? 'High (Measured BNSP)' : 'Medium (Inferred AI)'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg text-xs text-blue-900 flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong>Audit Engine Protection:</strong> {currentSelectedEmployee.evidenceExplanation || 'Jika pegawai memiliki data skill kosong di SAP/HRIS, sistem tidak merekayasa skor fiktif melainkan mengalihkan ke Fast-Track Assessment Gate 14 hari.'}
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT 2: Role Match */}
            {activeInspectorTab === 'role-match' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-slate-500 block">Target Peran Baru Masa Depan</span>
                      <h4 className="text-base font-bold text-slate-900 mt-0.5">
                        {currentSelectedEmployee.futureRoleTarget || 'Tertunda (Menunggu Assessment Gate 14 Hari)'}
                      </h4>
                    </div>
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-lg">
                      Fit: {currentSelectedEmployee.fitRaw}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200/70 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 block">Klaster Penerima (Destination Cluster):</span>
                      <strong className="text-slate-800">{currentSelectedEmployee.destinationCluster}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Proteksi Corporate Grade:</span>
                      <strong className="text-slate-800">
                        {currentSelectedEmployee.grade} (Status Kesejahteraan Tetap Terjaga)
                      </strong>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                  <span className="font-bold text-slate-800">Penjelasan Aturan Mesin Keputusan:</span>
                  <p className="text-slate-600 leading-relaxed">
                    {currentSelectedEmployee.ruleExplanation}
                  </p>
                </div>
              </div>
            )}

            {/* TAB CONTENT 3: Learning Plan */}
            {activeInspectorTab === 'learning' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-blue-950 text-sm">
                        Jalur Reskilling Akselerasi PLN Academy
                      </h4>
                      <p className="text-[11px] text-slate-600">
                        Investasi pembelajaran korporat terakreditasi BNSP untuk transisi ke Smart Grid & Renewable Energy.
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      Model Keekonomian Per Kapita
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-white p-3.5 rounded-lg border border-blue-100 shadow-2xs">
                      <span className="text-slate-500 text-[11px] block">Estimasi Durasi Diklat</span>
                      <span className="text-lg font-bold text-slate-900 font-mono">
                        {currentSelectedEmployee.reskillingDurationWeeks || 12} Minggu
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Kurikulum modular blended learning lapangan
                      </span>
                    </div>

                    <div className="bg-white p-3.5 rounded-lg border border-blue-100 shadow-2xs">
                      <span className="text-slate-500 text-[11px] block">Biaya Per Kapita Korporat</span>
                      <span className="text-lg font-bold text-blue-600 font-mono">
                        ~Rp {currentSelectedEmployee.reskillingCostJt || 10.0} Juta
                      </span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Jauh lebih hemat vs Pesangon PHK (~Rp 19 Juta)
                      </span>
                    </div>
                  </div>

                  {/* Breakdown now derives from this employee's actual reskillingCostJt
                      instead of a static "8.5-10 Juta" range that ignored who was selected. */}
                  <div className="p-3 bg-white rounded-lg border border-blue-200 text-slate-600 space-y-1.5 text-[11px]">
                    <div className="font-semibold text-slate-900 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-blue-600" />
                      <span>
                        Rincian Komponen Biaya (~Rp {(currentSelectedEmployee.reskillingCostJt || 10.0).toFixed(1)} Juta per Kapita):
                      </span>
                    </div>
                    {(() => {
                      const total = currentSelectedEmployee.reskillingCostJt || 10.0;
                      const teknis = total * 0.514;
                      const instruktur = total * 0.297;
                      const mentorship = total * 0.189;
                      return (
                        <ul className="list-disc pl-4 space-y-0.5 text-slate-600">
                          <li><strong>Modul Teknis & Sertifikasi BNSP:</strong> Lisensi Smart Metering, kalibrasi RF Mesh gateway (~Rp {teknis.toFixed(1)} Juta).</li>
                          <li><strong>Instruktur Praktisi & Lab Simulator:</strong> Sesi praktik langsung di PLN Udiklat / workshop gardu (~Rp {instruktur.toFixed(1)} Juta).</li>
                          <li><strong>Manajemen Perubahan & Mentorship Lapangan:</strong> Pendampingan on-the-job oleh teknisi senior selama 60 hari (~Rp {mentorship.toFixed(1)} Juta).</li>
                        </ul>
                      );
                    })()}
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 4: NIK Reconciliation Log */}
            {activeInspectorTab === 'reconciliation' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        Pemetaan Identitas Lintas Platform HR
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Hasil audit rekonsiliasi ID heterogen dari 4 sistem eksisting yang disatukan ke Unified NIK & UID.
                      </p>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[11px] font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Status: 100% Reconciled
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <span className="text-[11px] text-slate-400 block">Unified NIK (Kependudukan RI)</span>
                      <span className="text-sm font-bold text-slate-900 font-mono">
                        {currentSelectedEmployee.nik}
                      </span>
                      <span className="text-[10px] text-emerald-600 block mt-0.5">
                        Primary Key / Single Source of Truth
                      </span>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <span className="text-[11px] text-slate-400 block">Enterprise Unified ID</span>
                      <span className="text-sm font-bold text-blue-600 font-mono">
                        {currentSelectedEmployee.enterpriseId}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        Standar ID Korporat Terpadu
                      </span>
                    </div>
                  </div>

                  {/* Legacy Systems Table */}
                  <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                    <div className="bg-slate-100/70 px-3 py-2 text-[11px] font-bold text-slate-700 border-b border-slate-200">
                      ID Lama di Sistem HR Sebelum Integrasi
                    </div>
                    <div className="divide-y divide-slate-100 text-xs">
                      <div className="px-3 py-2 flex items-center justify-between">
                        <span className="text-slate-600">SAP HCM (Sistem Kepegawaian Utama)</span>
                        <span className="font-mono font-bold text-slate-900">
                          {currentSelectedEmployee.legacyIds?.sapHcm || 'SAP-88120'}
                        </span>
                      </div>
                      <div className="px-3 py-2 flex items-center justify-between">
                        <span className="text-slate-600">Moodle LMS (Portal Diklat & Pelatihan)</span>
                        <span className="font-mono font-bold text-slate-900">
                          {currentSelectedEmployee.legacyIds?.moodleLms || 'MDL-3412'}
                        </span>
                      </div>
                      <div className="px-3 py-2 flex items-center justify-between">
                        <span className="text-slate-600">Taleo ATS (Rekrutmen & Mobilitas Internal)</span>
                        <span className="font-mono font-bold text-slate-900">
                          {currentSelectedEmployee.legacyIds?.taleoAts || 'TAL-5102'}
                        </span>
                      </div>
                      <div className="px-3 py-2 flex items-center justify-between">
                        <span className="text-slate-600">Logbook Presensi & Operasi Regional Unit</span>
                        <span className="font-mono font-bold text-slate-900">
                          {currentSelectedEmployee.legacyIds?.regionalLog || 'REG-UP3-09'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB CONTENT 5: Contract & Legal Status */}
            {activeInspectorTab === 'contracts' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                {/* Summary Header */}
                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-amber-950">
                          Perjanjian Kerja Waktu Tertentu (PKWT) Jasa Pelayanan Lapangan
                        </h4>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">
                          Aktif (Sisa 9 Bulan)
                        </span>
                      </div>
                      <p className="text-xs text-amber-800 mt-0.5">
                        Penyedia Jasa: <strong>PT Haleyora Power (Konsorsium Alih Daya Mitra PLN)</strong> • No. Registrasi: <code className="font-mono">PKWT-HLP/BDG/{currentSelectedEmployee.id}</code>
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setLaborModalOpen(true)}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>Rujukan Hukum (PP 35/2021)</span>
                  </button>
                </div>

                {/* Contract Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="text-[11px] text-slate-500 block">Masa Berlaku Kontrak</span>
                    <div className="font-bold text-slate-900 text-sm">
                      1 Jan 2024 s/d 31 Des 2026
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Jangka waktu 36 bulan (Periode Transisi Smart Meter Nasional).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                    <span className="text-[11px] text-slate-500 block">Akumulasi Masa Kerja (Tenure)</span>
                    <div className="font-bold text-slate-900 text-sm">
                      {currentSelectedEmployee.tenureYears} Tahun Terus Menerus
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Unit Penugasan: <strong>{currentSelectedEmployee.department}</strong>
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 space-y-1">
                    <span className="text-[11px] text-emerald-800 font-semibold block">Proyeksi Kompensasi PP 35/2021</span>
                    <div className="font-bold text-emerald-900 text-sm font-mono">
                      ~Rp 19,0 Juta
                    </div>
                    <p className="text-[10px] text-emerald-700">
                      Estimasi proxy benchmark grade (Pesangon Normatif), bukan formula per-tenure — lihat rincian di Economics/Impact.
                    </p>
                  </div>
                </div>

                {/* Key Clauses & Union Alignment */}
                <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                  <div className="bg-slate-50 px-4 py-2.5 border-b border-slate-200 font-bold text-slate-800 flex items-center justify-between">
                    <span>Klausul Penting Hubungan Ketenagakerjaan & Transisi Digital</span>
                    <span className="text-[11px] font-normal text-slate-500">Standar Bipartit SP PLN</span>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
                      <span className="font-bold text-slate-900 block">
                        Pasal 14 ayat (3) — Hak Alih Kompetensi (Reskilling Mandate):
                      </span>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        "Dalam rangka modernisasi sistem transmisi data pencatatan meter berbasis IoT / Smart Meter (AMI), Perusahaan Penyedia Jasa bersama Pengguna Jasa (PLN) berkewajiban memfasilitasi program pelatihan alih kompetensi teknis kepada Pekerja tanpa memotong upah pokok dan tunjangan tetap bulanan."
                      </p>
                    </div>

                    <div className="p-3 rounded-lg bg-blue-50/80 border border-blue-200 space-y-1">
                      <span className="font-bold text-blue-900 block">
                        Pasal 18 ayat (2) — Prioritas Penempatan Internal (Redeployment First):
                      </span>
                      <p className="text-blue-800 leading-relaxed text-[11px]">
                        "Tenaga kerja yang telah lulus asesmen kompetensi (Passing Grade &ge; 70%) berhak diprioritaskan mengisi formasi baru seperti <em>Teknisi Pemeliharaan Smart Grid, Operator Telemetri Gateway, atau Teknisi PLTS Atap</em> pada regional operasional yang bersangkutan."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Action Footer inside Inspector */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-[11px] text-slate-500">
                Lanjutkan audit keputusan atau rencana pembelajaran untuk pegawai ini:
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenLearningForEmployee(currentSelectedEmployee.id)}
                  className="py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Buka Rencana Pembelajaran</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onNavigate('decision')}
                  className="py-2 px-3.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Buka Decision Engine Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: NIK & MULTI-HR PLATFORM RECONCILIATION SUMMARY                      */}
      {/* ========================================================================= */}
      {reconciliationModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                  <Database className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">
                    Arsitektur Rekonsiliasi NIK & Multi-Platform HR
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Menyelesaikan masalah fragmentasi ID antar platform SDM BUMN
                  </p>
                </div>
              </div>
              <button
                onClick={() => setReconciliationModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl space-y-1 text-amber-900">
                <span className="font-bold block">Tantangan Heterogenitas ID Eksisting:</span>
                <p className="text-[11px] text-amber-800">
                  Sebelum integrasi ini, 1 orang pegawai yang sama memiliki 4 ID berbeda: ID SAP HCM (8 digit), ID Moodle LMS (username angka), ID Taleo ATS (string unik), dan nomor absensi spreadsheet regional. Akibatnya, riwayat pelatihan tidak pernah sinkron dengan evaluasi performa lapangan.
                </p>
              </div>

              <div className="space-y-2">
                <span className="font-bold text-slate-900 block">Solusi Konsolidasi Meridian:</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      1. Master Key: NIK 16 Digit
                    </span>
                    <p className="text-slate-500">
                      Menggunakan NIK Kependudukan nasional sebagai identitas mutlak yang tidak pernah berubah antar mutasi unit dan vendor.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                    <span className="font-bold text-slate-800 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      2. Unified Enterprise ID (UID)
                    </span>
                    <p className="text-slate-500">
                      Format terstandarisasi <code>UID-PLN-XXXXX</code> yang menghubungkan profile pegawai ke Decision Engine dan Learning Plan.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between text-emerald-900">
                <div>
                  <span className="font-bold block">Cakupan Data Terverifikasi:</span>
                  <span className="text-[11px] text-emerald-800">
                    6.000 dari 6.000 pegawai unit operasional lapangan telah terpetakan 100%.
                  </span>
                </div>
                <span className="font-mono text-base font-bold text-emerald-700 bg-white px-3 py-1 rounded-lg border border-emerald-300">
                  100% MATCH
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setReconciliationModalOpen(false)}
                className="py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs"
              >
                Tutup Ringkasan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Legal & Labor Regulation Modal */}
      <LaborRegulationModal
        isOpen={laborModalOpen}
        onClose={() => setLaborModalOpen(false)}
      />
    </div>
  );
};
