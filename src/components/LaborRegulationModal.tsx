import React from 'react';
import {
  X,
  Scale,
  BookOpen,
  ShieldAlert,
  CheckCircle2,
  FileText,
  AlertTriangle,
  ExternalLink,
  Users,
  ArrowRight,
} from 'lucide-react';

interface LaborRegulationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LaborRegulationModal: React.FC<LaborRegulationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-slate-900/60 p-0 backdrop-blur-xs sm:items-center sm:p-6">
      <div className="relative flex h-dvh w-full max-w-3xl flex-col overflow-hidden bg-white shadow-2xl animate-in fade-in duration-150 sm:my-auto sm:h-auto sm:max-h-[90vh] sm:rounded-2xl sm:border sm:border-slate-200">
        {/* Header */}
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 px-4 py-4 text-white sm:px-6">
          <div className="flex min-w-0 items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-300">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
                <h3 className="text-base font-bold">Rujukan Hukum & Regulasi Ketenagakerjaan</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950">
                  PP 35/2021 & UU Cipta Kerja
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Landasan hukum bagi transisi 6.000 tenaga kerja alih daya (Field Metering) & perlindungan hak pekerja
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
        <div className="flex-1 space-y-5 overflow-y-auto p-4 text-xs leading-relaxed text-slate-700 sm:p-6">
          {/* Executive Summary Card */}
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4 text-amber-700" />
              <span>Prinsip Kepatuhan Regulasi (Compliance Mandate)</span>
            </div>
            <p className="text-xs text-amber-950">
              Dalam melakukan otomasi tenaga pencatat meter ke sistem Smart Meter (AMI), Perusahaan (BUMN & Mitra Alih Daya) wajib memenuhi ketentuan perundang-undangan ketenagakerjaan Republik Indonesia untuk menghindari sengketa hubungan industrial (PHK sepihak) dan sanksi hukum ketenagakerjaan.
            </p>
          </div>

          {/* Key Regulations */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>5 Pilar Regulasi Kunci yang Wajib Dipahami Saat Presentasi</span>
            </h4>

            {/* Pillar 1 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-bold text-slate-900 text-xs">
                  1. PP No. 35 Tahun 2021 · Pasal 15 s/d Pasal 17 (Uang Kompensasi PKWT)
                </span>
                <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-semibold">
                  Kompensasi Berakhir Kontrak
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Pengusaha (mitra vendor alih daya) wajib memberikan uang kompensasi kepada pekerja PKWT yang telah mempunyai masa kerja minimal 1 bulan secara terus-menerus.
              </p>
              <div className="p-2.5 bg-white rounded-lg border border-slate-200 font-mono text-[11px] text-slate-800">
                <strong>Rumus Resmi:</strong> (Masa Kerja / 12) x 1 Bulan Upah Pokok + Tunjangan Tetap.
                <br />
                <span className="text-slate-500 font-sans text-[10px]">
                  *Untuk masa kerja 5 tahun = 5 x Rp 4,5 Jt = Rp 22,5 Juta per orang kompensasi wajib jika kontrak diputus tanpa reskilling.
                </span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-bold text-slate-900 text-xs">
                  2. PP No. 35 Tahun 2021 · Pasal 43 ayat (1) (Efisiensi & Transformasi Teknologi)
                </span>
                <span className="text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-semibold">
                  Klausul Otomasi
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Dalam hal pemutusan hubungan kerja dilakukan karena alasan efisiensi yang disebabkan adanya perubahan teknologi/digitalisasi, pekerja berhak atas:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-700 pl-1">
                <li>Uang pesangon sebesar 1 (satu) kali ketentuan Pasal 40 ayat (2);</li>
                <li>Uang penghargaan masa kerja (UPMK) sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);</li>
                <li>Uang penggantian hak sesuai Pasal 40 ayat (4).</li>
              </ul>
              <div className="text-[11px] text-blue-700 font-medium bg-blue-50 p-2 rounded border border-blue-200 space-y-1">
                <div>
                  💡 <strong>Keunggulan Solusi Meridian:</strong> Dengan melakukan Reskilling & Redeployment (biaya Rp 9,0 Jt/orang), perusahaan <strong>menghindari beban pesangon efisiensi sebesar rata-rata Rp 48 Juta/orang</strong> dan terhindar dari sengketa Pengadilan Hubungan Industrial (PHI).
                </div>
                <div className="text-[10px] text-blue-500 italic font-normal">
                  Kedua angka adalah estimasi (formula PP 35/2021 & benchmark vendor), bukan data payroll aktual — Legal mengonfirmasi akses Payroll off-limits.
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-bold text-slate-900 text-xs">
                  3. UU No. 13/2003 jo. UU No. 6/2023 (UU Cipta Kerja) · Pelatihan Vokasi & Alih Daya
                </span>
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                  Kewajiban Pelatihan
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Pasal 9 s/d Pasal 12 menegaskan hak setiap tenaga kerja untuk memperoleh dan/atau meningkatkan serta mengembangkan kompetensi kerja sesuai dengan bakat, minat, dan kemampuannya melalui pelatihan kerja berstandar SKKNI / BNSP.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-bold text-slate-900 text-xs">
                  4. Peraturan Menteri ESDM & Standar Keselamatan K3 Ketenagalistrikan
                </span>
                <span className="text-[10px] font-mono bg-purple-100 text-purple-800 px-2 py-0.5 rounded font-semibold">
                  Standar K3 ESDM
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Setiap tenaga teknik ketenagalistrikan (termasuk teknisi gardu, smart meter, dan instalasi tegangan rendah) <strong>wajib memiliki Sertifikat Kompetensi Tenaga Teknik Ketenagalistrikan (SKTTK)</strong>. Penempatan tanpa sertifikasi terukur melanggar UU Ketenagalistrikan No. 30/2009.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-bold text-slate-900 text-xs">
                  5. UU No. 13/2003 Pasal 1 & Pasal 55 (Perubahan Jabatan = Perubahan Syarat Kerja)
                </span>
                <span className="text-[10px] font-mono bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">
                  Adendum Kontrak Wajib
                </span>
              </div>
              <p className="text-xs text-slate-600">
                Title/jabatan tercantum eksplisit sebagai syarat kerja di PKWT/PKWTT karyawan. Redeployment ke role baru dengan title berbeda <strong>bukan sekadar pembaruan field di HRIS</strong> — secara hukum ini perubahan syarat kerja yang wajib melalui adendum kontrak tertulis & persetujuan karyawan, bukan mutasi sepihak oleh HC.
              </p>

              {/* Compliance gate stepper */}
              <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2 md:grid-cols-5">
                {[
                  { n: 1, t: 'Title Change Terdeteksi', d: 'Engine rekomendasikan target role dgn title ≠ kontrak existing.', gate: false },
                  { n: 2, t: 'Gate: Adendum Kontrak', d: 'Perubahan syarat kerja → wajib adendum PKWT/PKWTT tertulis.', gate: true },
                  { n: 3, t: 'Persetujuan Karyawan', d: 'Adendum ditandatangani sukarela, bukan mutasi sepihak.', gate: false },
                  { n: 4, t: 'Notifikasi SP (jika berlaku)', d: 'Perubahan skala besar dilaporkan sesuai PKB.', gate: false },
                  { n: 5, t: 'Efektif di HRIS', d: 'Title baru aktif di SAP HCM setelah adendum, bukan sebelum.', gate: false },
                ].map((s, i, arr) => (
                  <React.Fragment key={s.n}>
                    <div
                      className={`flex-1 rounded-lg p-2 ${
                        s.gate
                          ? 'bg-amber-50 border border-dashed border-amber-300'
                          : 'bg-white border border-slate-200'
                      }`}
                    >
                      <div
                        className={`w-4.5 h-4.5 rounded-full flex items-center justify-center text-[9px] font-bold mb-1 ${
                          s.gate ? 'bg-amber-400 text-amber-950' : 'bg-slate-800 text-white'
                        }`}
                      >
                        {s.n}
                      </div>
                      <div className="text-[10.5px] font-bold text-slate-900 leading-tight">{s.t}</div>
                      <div className="text-[9.5px] text-slate-500 leading-snug mt-0.5">{s.d}</div>
                    </div>
                    {i < arr.length - 1 && <ArrowRight className="hidden" />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end border-t border-slate-200 bg-slate-50 px-4 py-3 sm:justify-between sm:px-6">
          <span className="hidden text-[11px] text-slate-500 sm:block">
            Disusun untuk Komite Audit, Dewan Direksi, dan Diskusi dengan Serikat Pekerja (SP PLN)
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Tutup Rujukan Hukum
          </button>
        </div>
      </div>
    </div>
  );
};
