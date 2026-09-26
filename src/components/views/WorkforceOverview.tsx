import React, { useState, useEffect } from 'react';
import {
  Users,
  Briefcase,
  Building,
  ArrowRight,
  Info,
  HelpCircle,
  Database,
  CheckCircle2,
  Activity,
  GitMerge,
  Sparkles,
  MapPin,
  Clock,
  Radio,
  Compass,
  Layers,
  Award,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { NavTab } from '../../types/meridian';

interface WorkforceOverviewProps {
  onNavigate: (tab: NavTab) => void;
}

interface ActivityEvent {
  id: string;
  time: string;
  unit: string;
  message: string;
  category: 'Redeploy' | 'Reskill' | 'Assessment' | 'Data Mesh' | 'Certification';
}

export const WorkforceOverview: React.FC<WorkforceOverviewProps> = ({ onNavigate }) => {
  const [activeSubTab, setActiveSubTab] = useState<'regional' | 'exposure' | 'process' | 'activity'>('regional');
  const [showMethodology, setShowMethodology] = useState(false);
  const [meterCounter, setMeterCounter] = useState(14820);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Live');

  // Interactive tooltip state for real-time pulse metrics
  const [activeTooltip, setActiveTooltip] = useState<'meter' | 'route' | 'training' | 'retention' | null>(null);

  // Subtle real-time increment for smart meter rollout simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMeterCounter((prev) => prev + Math.floor(Math.random() * 3) + 1);
      const now = new Date();
      setLastSyncTime(
        `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`
      );
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // 5 Transition Pathways for the 6,000 workforce
  const statusPathways = [
    {
      id: 'redeploy',
      category: 'Direct Redeploy',
      count: 1200,
      percent: 20.0,
      dotColor: 'bg-emerald-500',
      bgColor: 'bg-emerald-50/60 hover:bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-800',
      description: 'Fit ≥75%, feasibility High (Rule #2). Siap mutasi langsung.',
      targetRole: 'Teknisi Smart Grid & Gardu',
      actionTab: 'redeployment' as NavTab,
    },
    {
      id: 'reskill-redeploy',
      category: 'Reskill → Redeploy',
      count: 1800,
      percent: 30.0,
      dotColor: 'bg-sky-500',
      bgColor: 'bg-sky-50/60 hover:bg-sky-50',
      borderColor: 'border-sky-200',
      textColor: 'text-sky-800',
      description: 'Gap terukur (Rule #4). Pelatihan intensif 8-12 minggu.',
      targetRole: 'Operator Gateway IoT & PLTS',
      actionTab: 'learning' as NavTab,
    },
    {
      id: 'reskill',
      category: 'Reskill',
      count: 1500,
      percent: 25.0,
      dotColor: 'bg-amber-500',
      bgColor: 'bg-amber-50/60 hover:bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-800',
      description: 'Fit/feasibility menengah (Rule #5). Pelatihan 12-24 minggu.',
      targetRole: 'Inspektur Sambungan & K3',
      actionTab: 'jobs' as NavTab,
    },
    {
      id: 'assessment',
      category: 'Further Assessment',
      count: 900,
      percent: 15.0,
      dotColor: 'bg-purple-500',
      bgColor: 'bg-purple-50/60 hover:bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800',
      description: 'Evidence Low/Unknown (Rule #1). Data belum lengkap, re-assessment cepat.',
      targetRole: 'Asesmen Ulang SKTTK',
      actionTab: 'capabilities' as NavTab,
    },
    {
      id: 'voluntary',
      category: 'Voluntary Transition',
      count: 600,
      percent: 10.0,
      dotColor: 'bg-rose-500',
      bgColor: 'bg-rose-50/60 hover:bg-rose-50',
      borderColor: 'border-rose-200',
      textColor: 'text-rose-800',
      description: 'Fit & feasibility rendah (Rule #3). Transisi sukarela, PP 35/2021.',
      targetRole: 'Konseling & Outplacement Pensiun',
      actionTab: 'impact' as NavTab,
    },
  ];

  // Regional Unit Distribution for the 6,000 workforce
  const regionalDistribution = [
    { unit: 'Regional 3 (Jawa Barat / UP3 Bandung)', count: 1450, redeploy: 310, reskill: 640, upskill: 190, other: 310 },
    { unit: 'Regional 4 (Jawa Timur & Bali)', count: 1250, redeploy: 270, reskill: 550, upskill: 160, other: 270 },
    { unit: 'Regional 2 (Jawa Tengah & DIY)', count: 1100, redeploy: 230, reskill: 490, upskill: 140, other: 240 },
    { unit: 'Regional 1 (Sumatera Bagian Utara)', count: 950, redeploy: 190, reskill: 410, upskill: 120, other: 230 },
    { unit: 'Regional 5 (Kalimantan)', count: 650, redeploy: 140, reskill: 290, upskill: 90, other: 130 },
    { unit: 'Regional 6 (Sulawesi, Maluku, Papua)', count: 600, redeploy: 120, reskill: 260, upskill: 80, other: 140 },
  ];

  // Destination Roles for the 6,000 workforce
  const targetRoles = [
    { role: 'Teknisi Jaringan Cerdas & Smart Grid', count: 2450, percent: 40.8, status: '78% On Track', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { role: 'Operator Gateway Telemetri IoT & Sensor', count: 1350, percent: 22.5, status: '82% On Track', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
    { role: 'Teknisi Lapangan PLTS Atap & EBT', count: 1200, percent: 20.0, status: '74% On Track', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { role: 'Analis Rekonsiliasi Tagihan & Revenue Recovery', count: 520, percent: 8.7, status: '85% On Track', color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { role: 'Transisi Sukarela / Program Pensiun', count: 480, percent: 8.0, status: 'Mitigasi PP 35', color: 'bg-rose-50 text-rose-700 border-rose-200' },
  ];

  // Live real-time operational workforce events
  const liveEvents: ActivityEvent[] = [
    {
      id: 'ev-1',
      time: '11:12 WIB',
      unit: 'UP3 Bandung (Jawa Barat)',
      message: '18 Teknisi Catat Meter menyelesaikan Uji Praktik Lapangan BNSP Smart Grid (Tingkat Kelulusan 100%).',
      category: 'Certification',
    },
    {
      id: 'ev-2',
      time: '10:45 WIB',
      unit: 'UID Jawa Timur (Surabaya)',
      message: 'Sinkronisasi 42 data NIK KTP berhasil memvalidasi sertifikat K3, memindahkan status ke "Reskill → Redeploy".',
      category: 'Data Mesh',
    },
    {
      id: 'ev-3',
      time: '10:18 WIB',
      unit: 'UP3 Cimahi (Jawa Barat)',
      message: 'Batch #2 (35 Staf Lapangan) memulai modul "IoT Gateway & Smart Meter Diagnostics" di portal Moodle.',
      category: 'Reskill',
    },
    {
      id: 'ev-4',
      time: '09:30 WIB',
      unit: 'UID Jawa Tengah (Semarang)',
      message: '24 Petugas Catat Meter resmi menerima SK Penugasan Baru ke peran Teknisi Pemeliharaan Gardu Cerdas.',
      category: 'Redeploy',
    },
    {
      id: 'ev-5',
      time: '08:50 WIB',
      unit: 'UP3 Medan (Sumatera Utara)',
      message: 'Sosialisasi Bipartit bersama Serikat Pekerja (SP PLN) menyepakati jadwal pilot asesmen 120 teknisi.',
      category: 'Assessment',
    },
  ];

  const jobFamilies = [
    { name: 'Operations', count: 12400, percent: 24, isPilot: true },
    { name: 'Engineering', count: 8600, percent: 17, isPilot: false },
    { name: 'Corporate Services', count: 7800, percent: 15, isPilot: false },
    { name: 'Commercial', count: 6200, percent: 12, isPilot: false },
    { name: 'Human Capital', count: 5400, percent: 10, isPilot: false },
    { name: 'Finance', count: 4800, percent: 9, isPilot: false },
    { name: 'IT & Digital', count: 3200, percent: 6, isPilot: false },
    { name: 'Renewable Generation', count: 2000, percent: 4, isPilot: false },
    { name: 'Health, Safety & Environment', count: 1600, percent: 3, isPilot: false },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* ========================================================================= */}
      {/* 1. REFINED REAL-TIME OPERATIONAL PULSE BAR WITH HOVER TOOLTIPS           */}
      {/* ========================================================================= */}
      <div className="bg-navy text-white rounded-xl p-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left Title & Status */}
          <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-200 tracking-wide uppercase">
                  Live Operational Pulse
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  · {lastSyncTime}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Progres digitalisasi meteran & transisi 6.000 staf pencatat meter.
              </p>
            </div>
          </div>

          {/* Right: 3 Metric Counters with Interactive Hover Tooltips */}
          <div className="flex items-center gap-2 sm:gap-3 text-xs shrink-0 flex-wrap sm:flex-nowrap">
            {/* Metric 1: Smart Meter Terpasang */}
            <div
              className="relative group bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 cursor-pointer transition-colors"
              onMouseEnter={() => setActiveTooltip('meter')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase font-medium">
                <span>Smart Meter Terpasang</span>
                <HelpCircle className="w-3 h-3 text-slate-400 group-hover:text-amber-400 transition-colors" />
              </div>
              <div className="text-sm font-bold text-amber-300 font-mono mt-0.5">
                {meterCounter.toLocaleString('id-ID')}{' '}
                <span className="text-[10px] text-slate-400 font-normal">Unit</span>
              </div>

              {/* Tooltip Card */}
              {activeTooltip === 'meter' && (
                <div className="absolute right-0 sm:right-auto sm:left-0 top-full mt-2 w-72 bg-white text-slate-800 p-3 rounded-xl shadow-xl border border-slate-200 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Smart Meter Terpasang</span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
                    Unit AMI (IoT) aktif yang mengirim data kWh pelanggan secara nirkabel.
                  </p>
                  <div className="mt-2 bg-amber-50 border border-amber-200/60 rounded-md p-1.5 text-[10px] text-amber-900 font-medium">
                    Menggantikan pencatatan manual dari rumah ke rumah.
                  </div>
                </div>
              )}
            </div>

            {/* Metric 2: Rute Manual Teralihkan */}
            <div
              className="relative group bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 cursor-pointer transition-colors"
              onMouseEnter={() => setActiveTooltip('route')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase font-medium">
                <span>Rute Manual Teralihkan</span>
                <HelpCircle className="w-3 h-3 text-slate-400 group-hover:text-emerald-400 transition-colors" />
              </div>
              <div className="text-sm font-bold text-emerald-300 font-mono mt-0.5">
                94 Rute <span className="text-[10px] text-slate-400 font-normal">/ 12 UID</span>
              </div>

              {/* Tooltip Card */}
              {activeTooltip === 'route' && (
                <div className="absolute right-0 sm:right-auto sm:left-0 top-full mt-2 w-72 bg-white text-slate-800 p-3 rounded-xl shadow-xl border border-slate-200 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Rute Manual Teralihkan</span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
                    Rute patroli fisik bulanan yang kini 100% dipantau digital.
                  </p>
                  <div className="mt-2 bg-emerald-50 border border-emerald-200/60 rounded-md p-1.5 text-[10px] text-emerald-900 font-medium">
                    Tenaga kerjanya dialihkan ke program reskilling.
                  </div>
                </div>
              )}
            </div>

            {/* Metric 3: Total Output Pelatihan */}
            <div
              className="relative group bg-white/5 hover:bg-white/10 rounded-lg px-3 py-2 cursor-pointer transition-colors"
              onMouseEnter={() => setActiveTooltip('training')}
              onMouseLeave={() => setActiveTooltip(null)}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 uppercase font-medium">
                <span>Total Output Pelatihan</span>
                <HelpCircle className="w-3 h-3 text-slate-400 group-hover:text-sky-400 transition-colors" />
              </div>
              <div className="text-sm font-bold text-sky-300 font-mono mt-0.5">
                78% On-Track
              </div>

              {/* Tooltip Card */}
              {activeTooltip === 'training' && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-white text-slate-800 p-3 rounded-xl shadow-xl border border-slate-200 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                    <span>Total Output Pelatihan</span>
                  </div>
                  <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
                    Kelulusan modul reskilling & sertifikasi teknis sesuai target 12 minggu.
                  </p>
                  <div className="mt-2 bg-sky-50 border border-sky-200/60 rounded-md p-1.5 text-[10px] text-sky-900 font-medium">
                    78% staf on-track menuju formasi baru.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. 4 CLEAN HIGH-LEVEL METRICS (CLEAR & LIGHT, NO JARGON)                 */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
        {/* Metric 1: Total Tenaga Kerja */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Total Tenaga Kerja</span>
          </div>
          <div className="text-3xl font-semibold text-slate-900 tracking-tight mt-1.5">
            52.000
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Lintas 6 Regional Operating Unit
          </p>
        </div>

        {/* Metric 2: Populasi Pilot Fokus */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <Building className="w-3.5 h-3.5 text-blue-600" />
            <span>Populasi Pilot Fokus</span>
          </div>
          <div className="text-3xl font-semibold text-slate-900 tracking-tight mt-1.5">
            6.000 <span className="text-sm text-slate-400 font-normal">staf</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Petugas catat meter terdampak AMI
          </p>
        </div>

        {/* Metric 3: Retensi Karyawan (Tanpa PHK) */}
        <div
          className="relative p-5 cursor-pointer group"
          onMouseEnter={() => setActiveTooltip('retention')}
          onMouseLeave={() => setActiveTooltip(null)}
        >
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pekerja Lolos Alih Tugas</span>
            <HelpCircle className="w-3 h-3 text-slate-400" />
          </div>
          <div className="text-3xl font-semibold text-emerald-600 tracking-tight mt-1.5">
            75,0%
          </div>
          <p className="text-xs text-slate-500 mt-1">
            4.500 staf tetap bekerja, tanpa PHK
          </p>

          {/* Explainer Tooltip for Retensi Modal Insani */}
          {activeTooltip === 'retention' && (
            <div className="absolute left-0 top-full mt-2 w-80 bg-white text-slate-800 p-3.5 rounded-xl shadow-xl border border-slate-200 z-50 text-xs animate-in fade-in zoom-in-95 duration-150">
              <div className="font-bold text-slate-900 flex items-center gap-1.5 border-b border-slate-100 pb-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Rincian Retensi (75%)</span>
              </div>
              <p className="mt-2 text-[11px] text-slate-600 leading-relaxed">
                Dari 6.000 staf yang tugasnya diotomasi Smart Meter:
              </p>
              <div className="mt-2 space-y-1 text-[11px]">
                <div className="flex justify-between py-0.5 text-emerald-800 font-medium bg-emerald-50 px-2 rounded">
                  <span>• 1.200 Staf (20%)</span>
                  <span>Langsung Mutasi (Redeploy)</span>
                </div>
                <div className="flex justify-between py-0.5 text-sky-800 font-medium bg-sky-50 px-2 rounded">
                  <span>• 1.800 Staf (30%)</span>
                  <span>Reskill lalu Pindah Peran</span>
                </div>
                <div className="flex justify-between py-0.5 text-amber-800 font-medium bg-amber-50 px-2 rounded">
                  <span>• 1.500 Staf (25%)</span>
                  <span>Reskill di Posisi Sekarang</span>
                </div>
              </div>
              <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 leading-tight">
                <strong>Total 4.500 staf (75%)</strong> tetap bekerja tanpa PHK.
              </div>
            </div>
          )}
        </div>

        {/* Metric 4: Keluarga Jabatan */}
        <div className="p-5">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            <span>Keluarga Jabatan</span>
          </div>
          <div className="text-3xl font-semibold text-slate-900 tracking-tight mt-1.5">
            9 <span className="text-sm text-slate-400 font-normal">families</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standardisasi dari 1.800+ gelar jabatan
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. TRANSITION STATUS SUMMARY (CLEAN PIPELINE BAR + 5 CARDS)               */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <GitMerge className="w-4 h-4 text-blue-600" />
              <span>Status Transisi 6.000 Staf Pilot Lapangan</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Hasil pemetaan kapabilitas & keputusan jalur alih tugas deterministik:
            </p>
          </div>

          <button
            onClick={() => onNavigate('decision')}
            className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Buka Decision Engine Triage</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Unified Pipeline Visual Stacked Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-3 rounded-lg overflow-hidden flex bg-slate-100 shadow-inner">
            <div style={{ width: '20.0%' }} className="bg-emerald-500" title="Direct Redeploy: 1.200 Staf (20%)" />
            <div style={{ width: '30.0%' }} className="bg-sky-500" title="Reskill → Redeploy: 1.800 Staf (30%)" />
            <div style={{ width: '25.0%' }} className="bg-amber-500" title="Reskill: 1.500 Staf (25%)" />
            <div style={{ width: '15.0%' }} className="bg-purple-500" title="Further Assessment: 900 Staf (15%)" />
            <div style={{ width: '10.0%' }} className="bg-rose-500" title="Voluntary Transition: 600 Staf (10%)" />
          </div>
        </div>

        {/* 5 Status Pathway Cards - Clean & Crisp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {statusPathways.map((path) => (
            <div
              key={path.id}
              onClick={() => onNavigate(path.actionTab)}
              className={`p-3 rounded-lg border ${path.borderColor} ${path.bgColor} transition-all cursor-pointer flex flex-col justify-between space-y-2 group`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
                    <span className={`w-2 h-2 rounded-full ${path.dotColor}`}></span>
                    <span>{path.category}</span>
                  </span>
                  <span className="font-mono text-xs font-bold text-slate-600">
                    {path.percent}%
                  </span>
                </div>
                <div className="text-lg font-extrabold text-slate-900 font-mono mt-1">
                  {path.count.toLocaleString('id-ID')}{' '}
                  <span className="text-[10px] text-slate-500 font-normal">Staf</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug line-clamp-2">
                  {path.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-[9px] text-slate-400 block uppercase font-semibold">Tujuan Alih Tugas:</span>
                <span className="text-[11px] font-semibold text-slate-800 group-hover:text-blue-600 truncate block">
                  {path.targetRole}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CLEAN TABBED DEEP-DIVE (AVOIDS HEAVY WALL OF DATA)                     */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-4 pt-2 gap-2 text-xs">
          <button
            onClick={() => setActiveSubTab('regional')}
            className={`pb-2.5 px-3 font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
              activeSubTab === 'regional'
                ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Peta 6 Regional & Formasi Peran Baru</span>
          </button>

          <button
            onClick={() => setActiveSubTab('exposure')}
            className={`pb-2.5 px-3 font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
              activeSubTab === 'exposure'
                ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>AI Exposure & 9 Job Families</span>
          </button>

          <button
            onClick={() => setActiveSubTab('process')}
            className={`pb-2.5 px-3 font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
              activeSubTab === 'process'
                ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <GitMerge className="w-3.5 h-3.5" />
            <span>Proses Bisnis: Sebelum vs Sesudah</span>
          </button>

          <button
            onClick={() => setActiveSubTab('activity')}
            className={`pb-2.5 px-3 font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
              activeSubTab === 'activity'
                ? 'border-blue-600 text-blue-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Log Aktivitas Lapangan Real-Time</span>
          </button>
        </div>

        {/* Tab 1: Regional & Target Roles */}
        {activeSubTab === 'regional' && (
          <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 animate-in fade-in duration-150">
            {/* Left: 6 Regional Operating Units */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Distribusi 6.000 Staf per Regional Operating Unit
                  </h3>
                  <p className="text-xs text-slate-500">Peta kesiapan alih tugas di 6 wilayah PLN</p>
                </div>
                <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                  Total: 6.000 Staf
                </span>
              </div>

              <div className="space-y-2">
                {regionalDistribution.map((reg) => (
                  <div key={reg.unit} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-800">{reg.unit}</span>
                      <span className="font-mono font-bold text-slate-900">{reg.count.toLocaleString('id-ID')} Staf</span>
                    </div>

                    <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-200">
                      <div style={{ width: `${(reg.redeploy / reg.count) * 100}%` }} className="bg-emerald-500" title={`Redeploy: ${reg.redeploy}`} />
                      <div style={{ width: `${(reg.reskill / reg.count) * 100}%` }} className="bg-sky-500" title={`Reskill: ${reg.reskill}`} />
                      <div style={{ width: `${(reg.upskill / reg.count) * 100}%` }} className="bg-amber-500" title={`Upskill: ${reg.upskill}`} />
                      <div style={{ width: `${(reg.other / reg.count) * 100}%` }} className="bg-slate-400" title={`Asesmen/Sukarela: ${reg.other}`} />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span className="text-emerald-700 font-medium">Redeploy: {reg.redeploy}</span>
                      <span className="text-sky-700 font-medium">Reskill: {reg.reskill}</span>
                      <span className="text-amber-700 font-medium">Upskill: {reg.upskill}</span>
                      <span className="text-slate-600">Asesmen/Lainnya: {reg.other}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Target Roles Cluster */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Klaster Formasi Peran Baru
                  </h3>
                  <p className="text-xs text-slate-500">Tujuan penyerapan tenaga kerja</p>
                </div>
                <button
                  onClick={() => onNavigate('future-roles')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-0.5"
                >
                  <span>Detail</span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2">
                {targetRoles.map((role) => (
                  <div key={role.role} className="p-2.5 rounded-lg border border-slate-200 bg-white space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-900">{role.role}</span>
                      <span className="font-mono font-bold text-slate-800">{role.count.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>Porsi: {role.percent}%</span>
                      <span className={`px-1.5 py-0.2 rounded border font-medium ${role.color}`}>
                        {role.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: AI Exposure & Job Families */}
        {activeSubTab === 'exposure' && (
          <div className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 animate-in fade-in duration-150">
            {/* Left: Job Families */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Distribusi 52.000 Karyawan per Job Family
                  </h3>
                  <p className="text-xs text-slate-500">Konsolidasi 9 rumpun jabatan korporasi</p>
                </div>
                <button
                  onClick={() => onNavigate('jobs')}
                  className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                >
                  Arsitektur Jabatan &rarr;
                </button>
              </div>

              <div className="space-y-2">
                {jobFamilies.map((fam) => (
                  <div key={fam.name} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700 flex items-center gap-1.5">
                        {fam.name}
                        {fam.isPilot && (
                          <span className="text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded">
                            Fokus Pilot (6.000)
                          </span>
                        )}
                      </span>
                      <span className="font-mono text-slate-600 text-xs">
                        {fam.count.toLocaleString('id-ID')} ({fam.percent}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          fam.isPilot ? 'bg-blue-600' : 'bg-slate-400'
                        }`}
                        style={{ width: `${(fam.count / 12400) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: AI Exposure Distribution */}
            <div className="lg:col-span-6 space-y-3">
              <div className="flex items-center justify-between pb-1">
                <div>
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Tingkat AI Exposure Populasi Tenaga Kerja
                  </h3>
                  <p className="text-xs text-slate-500">Indeks otomasi tugas dari 52.000 karyawan</p>
                </div>
                <button
                  onClick={() => setShowMethodology(!showMethodology)}
                  className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded"
                >
                  <HelpCircle className="w-3 h-3" />
                  <span>Sumber Data?</span>
                </button>
              </div>

              {showMethodology && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs space-y-1 text-blue-900">
                  <div className="font-bold flex items-center gap-1">
                    <Database className="w-3.5 h-3.5 text-blue-700" />
                    <span>Metodologi AI Exposure</span>
                  </div>
                  <p className="text-[11px] text-blue-950 leading-relaxed">
                    % waktu tugas rutin yang bisa digantikan sensor AMI & telemetri digital.
                  </p>
                </div>
              )}

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-rose-50/70 border border-rose-100">
                  <span className="flex items-center gap-2 font-medium text-rose-800">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>High Exposure (≥70%) — Termasuk 6.000 Staf Pilot</span>
                  </span>
                  <span className="font-mono font-bold text-rose-700">25% (13.000 Staf)</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50/70 border border-amber-100">
                  <span className="flex items-center gap-2 font-medium text-amber-800">
                    <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>Medium Exposure (40-69%)</span>
                  </span>
                  <span className="font-mono font-bold text-amber-700">40% (20.800 Staf)</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50/70 border border-emerald-100">
                  <span className="flex items-center gap-2 font-medium text-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Low Exposure (&lt;40%)</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-700">35% (18.200 Staf)</span>
                </div>
              </div>

              <button
                onClick={() => onNavigate('exposure')}
                className="w-full mt-2 py-2 px-3 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Analisis Detail AI Exposure by Job Family</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Business Process Before / After */}
        {activeSubTab === 'process' && (
          <div className="p-5 space-y-4 animate-in fade-in duration-150">
            <div className="pb-1 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Proses Pencatatan & Rekonsiliasi Meter Pelanggan
              </h3>
              <p className="text-xs text-slate-500">
                Satu proses bisnis konkret dari pilot Field Metering — langkah demi langkah, bukan cuma angka hasil akhir.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-stretch">
              {/* Before */}
              <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Sebelum · Manual (Status Quo)
                </span>
                <div className="divide-y divide-dashed divide-slate-200 mt-2">
                  {[
                    { t: 'Teknisi kunjungan fisik per rumah', d: '1 teknisi ~350 pelanggan/bulan, jalan kaki/motor.' },
                    { t: 'Catat angka meter di kertas', d: 'Rawan salah baca & data hilang di lapangan.' },
                    { t: 'Input manual ke Excel UP3', d: 'Double entry, tanpa validasi real-time.' },
                    { t: 'Rekonsiliasi billing 3-5 hari', d: 'Sebelum tagihan bisa terbit ke pelanggan.' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-2.5 py-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 shrink-0"></span>
                      <div>
                        <div className="text-xs font-semibold text-slate-800">{s.t}</div>
                        <div className="text-[11px] text-slate-500">{s.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="lg:col-span-2 flex items-center justify-center">
                <ArrowRight className="w-6 h-6 text-blue-500 rotate-90 lg:rotate-0" />
              </div>

              {/* After */}
              <div className="lg:col-span-5 rounded-xl border border-blue-200 bg-blue-50/60 p-4 space-y-1">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                  Sesudah · Smart Meter (AMI)
                </span>
                <div className="divide-y divide-dashed divide-blue-200/70 mt-2">
                  {[
                    { t: 'Meter kirim data otomatis tiap jam', d: 'Tanpa kunjungan fisik rutin.' },
                    { t: 'Sistem AMI validasi & agregasi', d: 'Deteksi anomali otomatis (kebocoran, tamper).' },
                    { t: 'Billing rekonsiliasi same-day', d: 'Tanpa input manual.' },
                    { t: 'Teknisi fokus exception handling', d: 'Hanya <5% kasus anomali/gangguan fisik.' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-start gap-2.5 py-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></span>
                      <div>
                        <div className="text-xs font-semibold text-slate-800">{s.t}</div>
                        <div className="text-[11px] text-slate-500">{s.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
                <div className="text-base font-extrabold text-slate-900 font-mono">
                  5 Hari <span className="text-emerald-600">→</span> Same-Day
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">Siklus Billing</div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
                <div className="text-base font-extrabold text-slate-900 font-mono">
                  350/bln <span className="text-emerald-600">→</span> 0
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">Kunjungan Fisik / Teknisi</div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
                <div className="text-base font-extrabold text-slate-900 font-mono">
                  4.200 <span className="text-emerald-600">→</span> ~210
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide mt-0.5">Teknisi Dibutuhkan utk Proses Ini</div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Real-Time Field Activity Stream */}
        {activeSubTab === 'activity' && (
          <div className="p-5 space-y-3 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <div>
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Aliran Peristiwa Lapangan & Pembaruan Sertifikasi
                </h3>
                <p className="text-xs text-slate-500">Catatan sinkronisasi data NIK, kelulusan modul, dan SK penugasan</p>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                ● Live Event Feed
              </span>
            </div>

            <div className="divide-y divide-slate-100 text-xs">
              {liveEvents.map((evt) => (
                <div key={evt.id} className="py-2.5 flex items-start gap-3 hover:bg-slate-50 rounded-lg px-2 transition-colors">
                  <span className="font-mono font-bold text-slate-400 text-[11px] shrink-0 mt-0.5">
                    {evt.time}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{evt.unit}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${
                        evt.category === 'Certification'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : evt.category === 'Redeploy'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : evt.category === 'Reskill'
                          ? 'bg-sky-50 text-sky-700 border-sky-200'
                          : 'bg-purple-50 text-purple-700 border-purple-200'
                      }`}>
                        {evt.category}
                      </span>
                    </div>
                    <p className="text-slate-600 mt-0.5 text-[11px]">
                      {evt.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
