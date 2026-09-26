import React, { useState } from 'react';
import {
  Search,
  Layers,
  ChevronRight,
  Briefcase,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  X,
  Info,
  ShieldCheck,
  Cpu,
} from 'lucide-react';
import { NavTab } from '../../types/meridian';

interface JobArchitectureViewProps {
  onNavigate: (tab: NavTab) => void;
}

interface TaskItem {
  id: number;
  task: string;
  frequency: 'High' | 'Medium' | 'Low';
  aiApplicability: 'High' | 'Medium' | 'Low';
  humanCriticality: 'High' | 'Medium' | 'Low';
  aiExposurePercent: number;
  whyAi: string;
  whyHuman: string;
  timeShare: string;
}

export const JobArchitectureView: React.FC<JobArchitectureViewProps> = ({ onNavigate }) => {
  const [selectedFamilyId, setSelectedFamilyId] = useState('operations');
  const [activeJobTab, setActiveJobTab] = useState<'tasks' | 'overview' | 'capabilities'>('tasks');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaskDetail, setSelectedTaskDetail] = useState<TaskItem | null>(null);

  const jobFamiliesList = [
    { id: 'operations', name: 'Operations (Pilot)', count: 142, isPilot: true },
    { id: 'engineering', name: 'Engineering', count: 128 },
    { id: 'corporate', name: 'Corporate Services', count: 120 },
    { id: 'commercial', name: 'Commercial', count: 98 },
    { id: 'hc', name: 'Human Capital', count: 96 },
    { id: 'finance', name: 'Finance', count: 82 },
    { id: 'it', name: 'IT & Digital', count: 76 },
    { id: 'renewables', name: 'Renewable Generation', count: 64 },
    { id: 'safety', name: 'Health, Safety & Environment', count: 58 },
  ];

  const meteringTasks: TaskItem[] = [
    {
      id: 1,
      task: 'Pencatatan angka meter Kwh pelanggan secara manual di lapangan',
      frequency: 'High',
      aiApplicability: 'High',
      humanCriticality: 'Low',
      aiExposurePercent: 92,
      whyAi: 'Otomatisasi 100% via Smart Meter (AMI) dan sensor IoT yang mentransmisikan data angka Kwh secara nirkabel real-time tanpa perlu petugas mendatangi rumah.',
      whyHuman: 'Hampir tidak membutuhkan diskresi manusia, hanya mencatat angka meter fisik ke formulir/ponsel.',
      timeShare: '42% dari total jam kerja harian',
    },
    {
      id: 2,
      task: 'Deteksi & analisis gangguan arus bocor serta anomali sambungan liar',
      frequency: 'High',
      aiApplicability: 'High',
      humanCriticality: 'Medium',
      aiExposurePercent: 84,
      whyAi: 'Algoritma machine learning telemetri gardu mampu membandingkan total output feeder vs konsumsi pelanggan untuk mendeteksi lokasi susut non-teknis secara presisi.',
      whyHuman: 'Verifikasi fisik di tiang/sambungan pelanggan tetap memerlukan intervensi teknis.',
      timeShare: '22% dari total jam kerja harian',
    },
    {
      id: 3,
      task: 'Troubleshooting kabel instalasi & perbaikan fisik meteran rusak',
      frequency: 'Medium',
      aiApplicability: 'Medium',
      humanCriticality: 'High',
      aiExposurePercent: 48,
      whyAi: 'AI membantu memandu langkah perbaikan dan wiring diagram via kamera aplikasi mobile, namun perbaikan fisik kabel tetap dilakukan tangan teknisi.',
      whyHuman: 'Keahlian motorik halus dan kepatuhan keselamatan tegangan rendah tidak bisa digantikan mesin.',
      timeShare: '18% dari total jam kerja harian',
    },
    {
      id: 4,
      task: 'Input dan rekapitulasi data Berita Acara Pemeriksaan (BAP) ke SAP',
      frequency: 'Medium',
      aiApplicability: 'High',
      humanCriticality: 'Low',
      aiExposurePercent: 88,
      whyAi: 'Optical Character Recognition (OCR) dan integrasi API otomatis langsung meng-update SAP ERP tanpa ketik manual.',
      whyHuman: 'Hanya perlu tanda tangan digital (e-sign) oleh supervisor.',
      timeShare: '10% dari total jam kerja harian',
    },
    {
      id: 5,
      task: 'Mediasi sengketa tagihan & edukasi pelanggan mengenai efisiensi energi',
      frequency: 'Low',
      aiApplicability: 'Low',
      humanCriticality: 'High',
      aiExposurePercent: 18,
      whyAi: 'Mesin tidak memiliki kecerdasan emosional untuk meredakan komplain kemarahan pelanggan di lokasi rumah.',
      whyHuman: 'Memerlukan empati interpersonal, negosiasi cicilan tunggakan, dan pemahaman psikologis.',
      timeShare: '8% dari total jam kerja harian',
    },
  ];

  const getBadgeColor = (val: string, type: 'freq' | 'ai' | 'crit') => {
    if (type === 'ai') {
      if (val === 'High') return 'bg-rose-50 text-rose-700 border-rose-200';
      if (val === 'Medium') return 'bg-amber-50 text-amber-700 border-amber-200';
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (type === 'crit') {
      if (val === 'High') return 'bg-indigo-50 text-indigo-700 border-indigo-200';
      if (val === 'Medium') return 'bg-slate-100 text-slate-700 border-slate-200';
      return 'bg-slate-50 text-slate-600 border-slate-200';
    }
    if (val === 'High') return 'bg-blue-50 text-blue-700 border-blue-200';
    if (val === 'Medium') return 'bg-slate-100 text-slate-700 border-slate-200';
    return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Search Header */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari keluarga jabatan, tugas, atau nama kapabilitas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>Struktur Arsitektur:</span>
          <span className="font-semibold text-slate-900">
            9 Job Families · 42 Sub-Families · 120+ Jabatan Spesifik
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Column: Job Families (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2">
          <div className="px-2 py-1 text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
            Level 1: Job Families (9)
          </div>

          <div className="space-y-1">
            {jobFamiliesList.map((fam) => {
              const isSelected = selectedFamilyId === fam.id;
              return (
                <button
                  key={fam.id}
                  onClick={() => setSelectedFamilyId(fam.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-medium transition-all text-left ${
                    isSelected
                      ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{fam.name}</span>
                    {fam.isPilot && (
                      <span className="text-[9px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.2 rounded">
                        Pilot 6.000
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-[11px] text-slate-500">
                    ({fam.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Role Details & Tasks (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-5">
          {/* Hierarchical Breadcrumb Clarifying L1, L2, L3 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              {/* Hierarchy tags */}
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-1">
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">
                  L1: Operations Family
                </span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded">
                  L2 Sub-Family: Field Metering & Inspection
                </span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                  L3 Role: Grade 2-3 (Pelaksana)
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900 mt-1">
                Petugas Lapangan (Field Metering & Manual Operations)
              </h2>
              <p className="text-xs text-slate-600">
                Fokus Pilot Transformasi: 6.000 tenaga kerja yang menghadapi rata-rata 78% otomasi tugas oleh Smart Meter (AMI)
              </p>
            </div>

            {/* View Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-lg text-xs shrink-0">
              <button
                onClick={() => setActiveJobTab('tasks')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeJobTab === 'tasks' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600'
                }`}
              >
                Tugas & Alasan AI ({meteringTasks.length})
              </button>
              <button
                onClick={() => setActiveJobTab('overview')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeJobTab === 'overview' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600'
                }`}
              >
                Deskripsi Jabatan
              </button>
              <button
                onClick={() => setActiveJobTab('capabilities')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeJobTab === 'capabilities' ? 'bg-white text-slate-900 font-semibold shadow-2xs' : 'text-slate-600'
                }`}
              >
                Kebutuhan Kapabilitas & Gap
              </button>
            </div>
          </div>

          {/* Tasks Table with Clickable Reason Explainer */}
          {activeJobTab === 'tasks' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-600" />
                  <span><strong>Klik baris tugas mana pun</strong> untuk melihat alasan kenapa dilabeli High/Medium/Low AI Exposure & Human Criticality.</span>
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3 font-semibold w-10">#</th>
                      <th className="py-2.5 px-3 font-semibold">Uraian Tugas Lapangan</th>
                      <th className="py-2.5 px-3 font-semibold text-center">AI Applicability</th>
                      <th className="py-2.5 px-3 font-semibold text-center">Human Criticality</th>
                      <th className="py-2.5 px-3 font-semibold text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {meteringTasks.map((t) => (
                      <tr
                        key={t.id}
                        onClick={() => setSelectedTaskDetail(t)}
                        className={`hover:bg-blue-50/50 cursor-pointer transition-colors ${
                          selectedTaskDetail?.id === t.id ? 'bg-blue-50/70 ring-1 ring-blue-300' : ''
                        }`}
                      >
                        <td className="py-3 px-3 font-mono text-slate-500">{t.id}</td>
                        <td className="py-3 px-3 font-medium text-slate-800">
                          <div>{t.task}</div>
                          <div className="text-[10px] text-slate-500">{t.timeShare}</div>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${getBadgeColor(t.aiApplicability, 'ai')}`}>
                            {t.aiApplicability} ({t.aiExposurePercent}%)
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold border ${getBadgeColor(t.humanCriticality, 'crit')}`}>
                            {t.humanCriticality}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedTaskDetail(t);
                            }}
                            className="text-[11px] text-blue-600 hover:text-blue-800 font-semibold underline"
                          >
                            Kenapa {t.aiApplicability}?
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Task Detail Explainer Box (Shows when a task is selected) */}
              {selectedTaskDetail && (
                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/80 space-y-3 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between border-b border-blue-200/80 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-blue-200 text-blue-900">
                        Tugas #{selectedTaskDetail.id}
                      </span>
                      <h4 className="font-bold text-xs text-blue-950">
                        {selectedTaskDetail.task}
                      </h4>
                    </div>
                    <button
                      onClick={() => setSelectedTaskDetail(null)}
                      className="text-slate-400 hover:text-slate-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                    <div className="p-3 bg-white rounded-lg border border-rose-200 space-y-1">
                      <span className="font-bold text-rose-800 flex items-center gap-1.5">
                        <Cpu className="w-3.5 h-3.5 text-rose-600" />
                        <span>Kenapa AI Applicability: {selectedTaskDetail.aiApplicability} ({selectedTaskDetail.aiExposurePercent}%)?</span>
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {selectedTaskDetail.whyAi}
                      </p>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-indigo-200 space-y-1">
                      <span className="font-bold text-indigo-800 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Kenapa Human Criticality: {selectedTaskDetail.humanCriticality}?</span>
                      </span>
                      <p className="text-slate-700 leading-relaxed">
                        {selectedTaskDetail.whyHuman}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeJobTab === 'overview' && (
            <div className="space-y-4 text-xs text-slate-700 leading-relaxed">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="font-bold text-slate-900 text-xs">Definisi Peran & Lingkup Tanggung Jawab:</h4>
                <p>
                  Tenaga kerja lapangan pencatat meter bertugas membaca angka kwh secara berkala ke rumah-rumah pelanggan, memverifikasi segel fisik gardu, dan mencatat anomali instalasi.
                </p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 space-y-2">
                <div className="font-bold flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Dampak Disrupsi Smart Meter (AMI - Advanced Metering Infrastructure):</span>
                </div>
                <p>
                  Dengan dipasangnya jutaan meteran listrik pintar (AMI), pembacaan angka manual berkurang lebih dari 80%. Kebutuhan tenaga kerja bergeser dari pencatat angka menjadi <strong>Teknisi Pemeliharaan Smart Grid, Operator Gateway IoT, dan Teknisi Sistem Pembangkit Listrik Tenaga Surya (PLTS Atap)</strong>.
                </p>
              </div>
            </div>
          )}

          {activeJobTab === 'capabilities' && (
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs space-y-1 text-blue-900">
                <span className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-700" />
                  <span>Asal & Metodologi Standar Kapabilitas:</span>
                </span>
                <p className="text-[11px] text-blue-950">
                  Data requirement kapabilitas di bawah ini bersumber langsung dari <strong>Standar Kompetensi Jabatan (SKJ) PLN Bidang Distribusi</strong> serta sertifikasi resmi <strong>K3 Ketenagalistrikan Kementerian ESDM</strong>.
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">Keselamatan Kerja Lapangan & K3 Ketenagalistrikan</div>
                  <div className="text-[11px] text-slate-500">Sumber: Sertifikasi SKTTK / BNSP K3 ESDM</div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    Level 4/5 (Required)
                  </span>
                  <div className="text-[10px] text-slate-500 mt-0.5">Mandatori untuk semua teknisi lapangan</div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">Digital Telemetry & IoT Gateway Diagnostics</div>
                  <div className="text-[11px] text-slate-500">Sumber: Baseline asesmen keterampilan digital 6.000 staf</div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded">
                    Gap: +2 Levels (Saat ini Lvl 2 &rarr; Butuh Lvl 4)
                  </span>
                  <div className="text-[10px] text-rose-600 mt-0.5">Perlu reskilling 8 minggu</div>
                </div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-slate-900">Komunikasi & Negosiasi Pelanggan Lapangan</div>
                  <div className="text-[11px] text-slate-500">Sumber: SOP Pelayanan Pelanggan PLN</div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                    Level 3/5 (Required)
                  </span>
                  <div className="text-[10px] text-slate-500 mt-0.5">Untuk peran teknisi layanan kelistrikan</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
