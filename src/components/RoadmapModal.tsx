import React from 'react';
import {
  X,
  Calendar,
  CheckCircle2,
  Users,
  Building,
  ShieldCheck,
  TrendingUp,
  FileText,
} from 'lucide-react';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-slate-900/60 p-0 backdrop-blur-xs sm:items-center sm:p-6">
      <div className="relative flex h-dvh w-full max-w-4xl flex-col overflow-hidden bg-white shadow-2xl animate-in fade-in duration-150 sm:my-auto sm:h-auto sm:max-h-[92vh] sm:rounded-2xl sm:border sm:border-slate-200">
        {/* Header */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 bg-gradient-to-r from-blue-700 via-indigo-800 to-slate-900 px-4 py-4 text-white sm:px-6">
          <div className="flex min-w-0 items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-200">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
                <h3 className="text-base font-bold">90-Day Implementation Playbook (Rencana Eksekusi 12 Minggu)</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white">
                  3 Phased Gates
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Jadwal kerja terstruktur melibatkan Serikat Pekerja (SP PLN), Pilot UP3 Bandung, dan Scaling Nasional
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 shrink-0 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Tutup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-6 overflow-y-auto p-4 text-xs leading-relaxed text-slate-700 sm:p-6">
          {/* 3 Sprints Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Sprint 1 */}
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-200 text-blue-900">
                  HARI 1 - 30
                </span>
                <span className="font-mono text-[10px] text-blue-700 font-semibold">Sprint 1</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Data Mesh & Union Alignment</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Pembersihan data identitas dan penandatanganan Piagam Kesepahaman Bersama Serikat Pekerja (SP PLN).
                </p>
              </div>
              <div className="border-t border-blue-200/80 pt-2 space-y-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Integrasi NIK Resolver lintas 4 legacy HR system</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Workshop sosialisasi bersama pimpinan Serikat Pekerja</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>Penetapan baseline asesmen keterampilan lapangan</span>
                </div>
              </div>
            </div>

            {/* Sprint 2 */}
            <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-200 text-indigo-900">
                  HARI 31 - 60
                </span>
                <span className="font-mono text-[10px] text-indigo-700 font-semibold">Sprint 2</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Pilot UP3 Bandung (350 Staf)</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Uji coba lapangan model reskilling terakreditasi BNSP dengan bench simulator smart meter.
                </p>
              </div>
              <div className="border-t border-indigo-200/80 pt-2 space-y-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Aktivasi Lab Hardware Simulator & kurikulum 8-12 mgg</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Onboarding Certified Lead Assessor sertifikasi SKKNI</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  <span>Evaluasi Gate 2: Pass Rate & Kesiapan Mobilitas</span>
                </div>
              </div>
            </div>

            {/* Sprint 3 */}
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/70 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-200 text-emerald-900">
                  HARI 61 - 90
                </span>
                <span className="font-mono text-[10px] text-emerald-700 font-semibold">Sprint 3</span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-slate-900">Enterprise Scaling (6.000 Staf)</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Pelaporan kepada Dewan Direksi & peluncuran keputusan alih tugas nasional di 12 UID/UP3.
                </p>
              </div>
              <div className="border-t border-emerald-200/80 pt-2 space-y-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Presentasi hasil audit pilot kepada Komite Audit Direksi</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Penerbitan SK Penempatan ke peran Energi Baru (EBT/AMI)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Realisasi penghematan kas operasional Rp 84,6 Miliar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Key Success Metrics Table */}
          <div className="p-4 border border-slate-200 rounded-xl space-y-2 bg-slate-50">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Kriteria Keberhasilan per Gate (Gate Exit Criteria)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-blue-800 block">Gate 1 (Hari 30):</span>
                <span className="text-slate-600">99.4% NIK tersinkronisasi, 0 keberatan dari Dewan SP PLN regional.</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-indigo-800 block">Gate 2 (Hari 60):</span>
                <span className="text-slate-600">&ge; 78% kelulusan ujian praktik smart meter & zero accident K3 selama pilot.</span>
              </div>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <span className="font-bold text-emerald-800 block">Gate 3 (Hari 90):</span>
                <span className="text-slate-600">Persetujuan RUPS / SK Direksi untuk anggaran reskilling nasional Rp 54 M.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-200 bg-slate-50 px-4 py-3 sm:justify-between sm:px-6">
          <span className="hidden text-[11px] text-slate-500 sm:block">
            Jadwal Operasional Eksekusi Terakreditasi
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Tutup Jadwal
          </button>
        </div>
      </div>
    </div>
  );
};
