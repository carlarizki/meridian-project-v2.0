import React from 'react';
import {
  X,
  FileText,
  Target,
  Users,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';
import { NavTab } from '../types/meridian';

interface StrategicBriefingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavTab) => void;
}

export const StrategicBriefingModal: React.FC<StrategicBriefingModalProps> = ({
  isOpen,
  onClose,
  onNavigate,
}) => {
  if (!isOpen) return null;

  const handleNavigate = (tab: NavTab) => {
    onClose();
    onNavigate(tab);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-slate-900/60 p-0 backdrop-blur-xs sm:items-center sm:p-6">
      <div className="relative flex h-dvh w-full max-w-4xl flex-col overflow-hidden bg-white shadow-2xl animate-in fade-in duration-150 sm:my-auto sm:h-auto sm:max-h-[92vh] sm:rounded-2xl sm:border sm:border-slate-200">
        {/* Header */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 px-4 py-4 text-white sm:px-6">
          <div className="flex min-w-0 items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
                <h3 className="text-base font-bold">Ringkasan Eksekutif & Konteks Project Meridian</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/40 text-blue-100">
                  Project Brief & PRD
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Sistem Intelijen Tenaga Kerja & Keputusan Alih Kompetensi Pilot Lapangan (Field Metering & Manual Ops)
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

        {/* Body */}
        <div className="flex-1 space-y-6 overflow-y-auto p-4 text-xs leading-relaxed text-slate-700 sm:p-6">
          {/* Core Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-1.5">
              <div className="flex items-center gap-2 text-blue-900 font-bold">
                <Target className="w-4 h-4 text-blue-600" />
                <span>Mandat Pilot Transformasi</span>
              </div>
              <p className="text-[11px] text-blue-950">
                Fokus pilot pada <strong>6.000 tenaga kerja pencatat meter & operasional lapangan</strong> yang menghadapi disrupsi otomatisasi Smart Meter (AMI) dan sensor IoT.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-900 font-bold">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>5 Keputusan Deterministik</span>
              </div>
              <p className="text-[11px] text-emerald-950">
                Mengalihkan karyawan secara objektif ke 5 jalur transisi: <strong>Redeploy, Reskill &rarr; Redeploy, Upskill, Asesmen Lanjutan, dan Transisi Sukarela</strong> berbasis Rule #1-#8.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-1.5">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <TrendingUp className="w-4 h-4 text-amber-600" />
                <span>Nilai Finansial Bersih</span>
              </div>
              <p className="text-[11px] text-amber-950">
                Menghindari biaya pesangon & rekrutmen baru Rp 224,6 M, menghasilkan <strong>penghematan bersih Rp 84,6 Miliar</strong> dengan payback period <strong>11,4 bulan</strong>.
              </p>
            </div>
          </div>

          {/* Quick Module Jump Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-200 pb-2">
              Akses Cepat Modul Utama Meridian
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
              <button
                onClick={() => handleNavigate('workforce')}
                className="p-3 text-left rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex flex-col justify-between space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span className="text-[10px] font-mono text-slate-400">Modul 1</span>
                </div>
                <div>
                  <div className="font-bold text-slate-800 group-hover:text-blue-700">Workforce Overview</div>
                  <div className="text-[11px] text-slate-500">52.000 Staf & Distribusi AI Exposure</div>
                </div>
              </button>

              <button
                onClick={() => handleNavigate('people')}
                className="p-3 text-left rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex flex-col justify-between space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <Layers className="w-4 h-4 text-indigo-600" />
                  <span className="text-[10px] font-mono text-slate-400">Modul 2</span>
                </div>
                <div>
                  <div className="font-bold text-slate-800 group-hover:text-indigo-700">People Directory (6.000)</div>
                  <div className="text-[11px] text-slate-500">Virtual Grid, NIK Resolver, Kontrak PKWT</div>
                </div>
              </button>

              <button
                onClick={() => handleNavigate('decision')}
                className="p-3 text-left rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex flex-col justify-between space-y-2 group"
              >
                <div className="flex items-center justify-between">
                  <Cpu className="w-4 h-4 text-purple-600" />
                  <span className="text-[10px] font-mono text-slate-400">Modul 3</span>
                </div>
                <div>
                  <div className="font-bold text-slate-800 group-hover:text-purple-700">Decision Engine</div>
                  <div className="text-[11px] text-slate-500">Triage Makro 6.000 & Sensitivity Sliders</div>
                </div>
              </button>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-200 bg-slate-50 px-4 py-3 sm:justify-between sm:px-6">
          <span className="hidden text-[11px] text-slate-500 sm:block">
            Project Meridian · Dokumen Konteks & Strategi
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Tutup Ringkasan
          </button>
        </div>
      </div>
    </div>
  );
};
