import React, { useState, useMemo } from 'react';
import {
  Award,
  Search,
  Code,
  Briefcase,
  Users,
  Compass,
  Star,
  CheckCircle,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { NavTab } from '../../types/meridian';

interface CapabilityLibraryViewProps {
  onNavigate: (tab: NavTab) => void;
}

interface CapabilityItem {
  id: string;
  name: string;
  domainId: string;
  subDomain: string;
  description: string;
  proficiencyLadder: {
    level: number;
    title: string;
    subtitle: string;
    description: string;
  }[];
}

const CAPABILITY_CATALOG: CapabilityItem[] = [
  // 1. Technical & Digital
  {
    id: 'data-analysis',
    name: 'Analisis Data & Telemetri Digital',
    domainId: 'technical',
    subDomain: 'Digital & Technology',
    description: 'Kemampuan mengumpulkan, memverifikasi, dan menganalisis data telemetri konsumsi daya listrik serta log gateway IoT untuk mendeteksi anomali jaringan.',
    proficiencyLadder: [
      {
        level: 5,
        title: 'Tingkat 5: Pakar (Expert / Master)',
        subtitle: 'Otoritas korporat & perumus standar sistem',
        description: 'Merancang arsitektur telemetri nasional, memimpin audit big data susut jaringan, dan merumuskan standar integrasi data AMI ke SAP ERP.',
      },
      {
        level: 4,
        title: 'Tingkat 4: Mahir (Advanced)',
        subtitle: 'Bekerja mandiri pada kasus kompleks',
        description: 'Menganalisis anomali multidimensi pada feeder gardu distribusi, mengidentifikasi pola pencurian listrik tersembunyi via model prediktif.',
      },
      {
        level: 3,
        title: 'Tingkat 3: Kompeten (Proficient)',
        subtitle: 'Pelaksanaan operasional mandiri',
        description: 'Memvalidasi data sinyal telemetri harian dari smart meter, mengekstraksi laporan anomali daya reaktif, dan merekomendasikan inspeksi fisik.',
      },
      {
        level: 2,
        title: 'Tingkat 2: Berkembang (Developing)',
        subtitle: 'Mampu dengan supervisi berkala',
        description: 'Membaca dashboard visual telemetri, mengekspor laporan CSV, dan menandai pembacaan daya yang melebihi batas toleransi normal.',
      },
      {
        level: 1,
        title: 'Tingkat 1: Dasar (Foundational)',
        subtitle: 'Pemahaman konsep dasar',
        description: 'Mengenal istilah data Kwh, tegangan (Volt), dan arus (Ampere), serta mampu mengoperasikan aplikasi mobile pembacaan meter dasar.',
      },
    ],
  },
  {
    id: 'iot-gateway-troubleshooting',
    name: 'Diagnostik Gateway IoT & Smart Meter (AMI)',
    domainId: 'technical',
    subDomain: 'Smart Grid Infrastructure',
    description: 'Keahlian teknis dalam menginstalasi, mengonfigurasi, dan memperbaiki perangkat komunikasi nirkabel (RF Mesh, Cellular, PLC) pada meteran pintar.',
    proficiencyLadder: [
      {
        level: 5,
        title: 'Tingkat 5: Pakar (Expert / Master)',
        subtitle: 'Desain topologi jaringan AMI',
        description: 'Merancang topologi komunikasi RF Mesh regional, menyelesaikan kendala interferensi spektrum radio, dan menguji sertifikasi perangkat baru.',
      },
      {
        level: 4,
        title: 'Tingkat 4: Mahir (Advanced)',
        subtitle: 'Troubleshooting protokol komunikasi',
        description: 'Mendiagnosis packet loss pada gateway telemetri, mengonfigurasi repeater signal, dan menangani enkripsi protokol DLMS/COSEM.',
      },
      {
        level: 3,
        title: 'Tingkat 3: Kompeten (Proficient)',
        subtitle: 'Pemasangan & pairing perangkat mandiri',
        description: 'Melakukan instalasi gateway AMI, pairing modul meter pintar dengan concentrator, dan uji sinyal komunikasi lapangan.',
      },
      {
        level: 2,
        title: 'Tingkat 2: Berkembang (Developing)',
        subtitle: 'Instalasi hardware terbimbing',
        description: 'Memasang kabel antena dan modul komunikasi sesuai SOP vendor serta mencatat nomor seri modem.',
      },
      {
        level: 1,
        title: 'Tingkat 1: Dasar (Foundational)',
        subtitle: 'Pengenalan fisik komponen',
        description: 'Mengenali jenis-jenis meteran AMI, port komunikasi optik, dan indikator lampu LED status koneksi.',
      },
    ],
  },

  // 2. Business & Commercial
  {
    id: 'tariff-billing-settlement',
    name: 'Operasional Tarif & Rekonsiliasi Tagihan (Billing Settlement)',
    domainId: 'business',
    subDomain: 'Commercial Operations',
    description: 'Pemahaman tata kelola struktur tarif tenaga listrik (TTL), validasi tagihan bulanan pelanggan, dan penyelesaian piutang rekening listrik.',
    proficiencyLadder: [
      {
        level: 5,
        title: 'Tingkat 5: Pakar (Expert / Master)',
        subtitle: 'Kebijakan komersial & revenue assurance',
        description: 'Merumuskan strategi mitigasi piutang macet regional, mengevaluasi elastisitas tarif industri, dan memimpin audit revenue PLN.',
      },
      {
        level: 4,
        title: 'Tingkat 4: Mahir (Advanced)',
        subtitle: 'Penyelesaian sengketa komersial kompleks',
        description: 'Menangani koreksi rekening tagihan daya besar (kategori industri & bisnis), menghitung denda keterlambatan dan restitusi meter rusak.',
      },
      {
        level: 3,
        title: 'Tingkat 3: Kompeten (Proficient)',
        subtitle: 'Verifikasi tagihan & penagihan mandiri',
        description: 'Memvalidasi anomali lonjakan pemakaian Kwh pelanggan rumah tangga dan menerbitkan Berita Acara Rekonsiliasi Tagihan.',
      },
      {
        level: 2,
        title: 'Tingkat 2: Berkembang (Developing)',
        subtitle: 'Administrasi data rekening',
        description: 'Mencocokkan data stan meter dengan lembar tagihan rekening listrik di sistem billing kasir.',
      },
      {
        level: 1,
        title: 'Tingkat 1: Dasar (Foundational)',
        subtitle: 'Pemahaman golongan tarif',
        description: 'Mengetahui perbedaan tarif subsidi vs non-subsidi (R1, R2, B1, I1) serta siklus tanggal cetak tagihan bulanan.',
      },
    ],
  },
  {
    id: 'outsourced-contract-governance',
    name: 'Tata Kelola Kontrak Alih Daya & Kepatuhan PKWT',
    domainId: 'business',
    subDomain: 'Contract Administration',
    description: 'Pemahaman mendalam mengenai ketentuan kontrak kerja sama jasa penunjang (outsourcing) tenaga kerja lapangan sesuai PP 35/2021.',
    proficiencyLadder: [
      {
        level: 5,
        title: 'Tingkat 5: Pakar (Expert / Master)',
        subtitle: 'Penyusunan kerangka kerja sama (Framework)',
        description: 'Menyusun Service Level Agreement (SLA) vendor alih daya terstandarisasi, memastikan kepatuhan regulasi ketenagakerjaan nasional.',
      },
      {
        level: 4,
        title: 'Tingkat 4: Mahir (Advanced)',
        subtitle: 'Monitoring performa & audit vendor',
        description: 'Mengevaluasi pemenuhan hak upah, kepesertaan BPJS Ketenagakerjaan pekerja alih daya, dan realisasi program pelatihan reskilling vendor.',
      },
      {
        level: 3,
        title: 'Tingkat 3: Kompeten (Proficient)',
        subtitle: 'Pengawasan administrasi kontrak unit',
        description: 'Memeriksa berkas perpanjangan PKWT teknisi regional, menghitung sisa masa kontrak, dan memverifikasi data NIK master.',
      },
      {
        level: 2,
        title: 'Tingkat 2: Berkembang (Developing)',
        subtitle: 'Verifikasi berkas absensi & lembur',
        description: 'Merekap lembar kehadiran kerja teknisi alih daya dan mencocokkan laporan logbook harian.',
      },
      {
        level: 1,
        title: 'Tingkat 1: Dasar (Foundational)',
        subtitle: 'Pengenalan jenis perjanjian kerja',
        description: 'Memahami perbedaan mendasar antara status PKWT (Perjanjian Kerja Waktu Tertentu) dengan PKWTT.',
      },
    ],
  },

  // 3. People & Leadership
  {
    id: 'industrial-relations-union',
    name: 'Hubungan Industrial & Dialog Serikat Pekerja (SP PLN)',
    domainId: 'people',
    subDomain: 'Employee Relations',
    description: 'Kemampuan membangun komunikasi konstruktif, memfasilitasi dialog bipartit, dan menyelaraskan program transformasi dengan serikat pekerja.',
    proficiencyLadder: [
      {
        level: 5,
        title: 'Tingkat 5: Pakar (Expert / Master)',
        subtitle: 'Perundingan Perjanjian Kerja Bersama (PKB)',
        description: 'Memimpin negosiasi klausul PKB tingkat direksi, mengamankan dukungan serikat pekerja untuk program transformasi digital tanpa konflik.',
      },
      {
        level: 4,
        title: 'Tingkat 4: Mahir (Advanced)',
        subtitle: 'Mediasi perselisihan kepentingan',
        description: 'Menangani kekhawatiran serikat pekerja terkait otomatisasi Smart Meter, menyepakati formula transparansi kriteria alih tugas (Rule #1-#8).',
      },
      {
        level: 3,
        title: 'Tingkat 3: Kompeten (Proficient)',
        subtitle: 'Fasilitasi forum bipartit unit',
        description: 'Menyelenggarakan pertemuan rutin Lembaga Kerja Sama (LKS) Bipartit di tingkat Unit Pelaksana Pelayanan Pelanggan (UP3).',
      },
      {
        level: 2,
        title: 'Tingkat 2: Berkembang (Developing)',
        subtitle: 'Pencatatan aspirasi pekerja',
        description: 'Mendokumentasikan masukan dan keluhan teknisi lapangan serta mengeskalasikan ke bagian Sumber Daya Manusia.',
      },
      {
        level: 1,
        title: 'Tingkat 1: Dasar (Foundational)',
        subtitle: 'Pemahaman hak berorganisasi',
        description: 'Memahami hak-hak normatif pekerja dan tata tertib penyampaian pendapat di lingkungan korporasi BUMN.',
      },
    ],
  },
  {
    id: 'field-crew-mentorship',
    name: 'Supervisi Tim Lapangan & Mentorship OJT',
    domainId: 'people',
    subDomain: 'Leadership & Talent Development',
    description: 'Keterampilan dalam memimpin regu teknis lapangan, mengalokasikan beban tugas, dan mendampingi teknisi junior dalam program On-the-Job Training.',
    proficiencyLadder: [
      {
        level: 5,
        title: 'Tingkat 5: Pakar (Expert / Master)',
        subtitle: 'Pengembangan kurikulum mentoring nasional',
        description: 'Merancang program sertifikasi Master Trainer lapangan dan mengevaluasi efektivitas transfer pengetahuan antar-generasi teknisi.',
      },
      {
        level: 4,
        title: 'Tingkat 4: Mahir (Advanced)',
        subtitle: 'Lead Mentor & Supervisor Regional',
        description: 'Membimbing 10-15 teknisi magang dalam simulasi gardu listrik tegangan rendah, melakukan penilaian asesmen praktik berkala.',
      },
      {
        level: 3,
        title: 'Tingkat 3: Kompeten (Proficient)',
        subtitle: 'Mandor regu kerja mandiri',
        description: 'Memimpin briefing keselamatan harian (Toolbox Meeting) dan membagi rute kerja regu pemeliharaan lapangan.',
      },
      {
        level: 2,
        title: 'Tingkat 2: Berkembang (Developing)',
        subtitle: 'Rekan kerja pendamping (Peer buddy)',
        description: 'Mendampingi rekan kerja baru dalam mempelajari rute geografis dan penggunaan perangkat terminal baca meter.',
      },
      {
        level: 1,
        title: 'Tingkat 1: Dasar (Foundational)',
        subtitle: 'Kerja sama tim dasar',
        description: 'Mampu berkoordinasi secara aktif dengan rekan seregu dan mematuhi arahan pengawas lapangan.',
      },
    ],
  },

  // 4. Energy Domain Specific
  {
    id: 'solar-pv-der-integration',
    name: 'Sistem PLTS Atap & Pembangkit EBT Terdistribusi',
    domainId: 'domain',
    subDomain: 'Renewable Energy Systems',
    description: 'Kompetensi teknis dalam memasang, menyambungkan, dan menguji meteran ekspor-impor (Net Metering) untuk Pembangkit Listrik Tenaga Surya atap.',
    proficiencyLadder: [
      {
        level: 5,
        title: 'Tingkat 5: Pakar (Expert / Master)',
        subtitle: 'Grid Code & Stabilitas Interkoneksi',
        description: 'Menganalisis dampak injeksi daya PLTS terhadap profil tegangan jaringan distribusi dan merancang sistem proteksi anti-islanding.',
      },
      {
        level: 4,
        title: 'Tingkat 4: Mahir (Advanced)',
        subtitle: 'Komisioning & Uji Laik Operasi (SLO)',
        description: 'Memimpin uji komisioning inverter on-grid daya menengah (20-100 kWp) dan mengonfigurasi sinkronisasi frekuensi jaringan.',
      },
      {
        level: 3,
        title: 'Tingkat 3: Kompeten (Proficient)',
        subtitle: 'Pemasangan meter ekspor-impor mandiri',
        description: 'Memasang kWh meter ganda (ekspor-impor) untuk pelanggan residensial, memeriksa polaritas CT/PT dan setting relay batas daya.',
      },
      {
        level: 2,
        title: 'Tingkat 2: Berkembang (Developing)',
        subtitle: 'Inspeksi fisik panel surya',
        description: 'Melakukan pengecekan visual kabel DC dari panel ke inverter dan memastikan grounding terpasang baik.',
      },
      {
        level: 1,
        title: 'Tingkat 1: Dasar (Foundational)',
        subtitle: 'Konsep dasar energi terbarukan',
        description: 'Memahami prinsip konversi radiasi matahari menjadi listrik serta regulasi dasar Net Metering PLN.',
      },
    ],
  },

  // 5. Core Foundations & Safety
  {
    id: 'k3-electrical-safety',
    name: 'K3 Keselamatan & Kesehatan Kerja Ketenagalistrikan',
    domainId: 'core',
    subDomain: 'Occupational Health & Safety',
    description: 'Penerapan standar keselamatan kerja mutlak untuk mencegah sengatan listrik (arc flash), kecelakaan kerja tiang, dan kebakaran instalasi.',
    proficiencyLadder: [
      {
        level: 5,
        title: 'Tingkat 5: Pakar (Expert / Master)',
        subtitle: 'Auditor Utama SMK3 & Investigasi Insiden',
        description: 'Menyusun prosedur keselamatan sistem distribusi nasional, memimpin investigasi kecelakaan kerja kategori berat (Fatality/LTI).',
      },
      {
        level: 4,
        title: 'Tingkat 4: Mahir (Advanced)',
        subtitle: 'Pengawas K3 Lapangan Bersertifikat',
        description: 'Menerbitkan Izin Kerja Khusus (Working Permit), mengawasi pekerjaan bertegangan (PDKB) tegangan rendah, dan memastikan isolasi sumber energi (LOTO).',
      },
      {
        level: 3,
        title: 'Tingkat 3: Kompeten (Proficient)',
        subtitle: 'Penerapan SOP Keselamatan Mandiri',
        description: 'Menggunakan APD lengkap (helm tahan tegangan 20kV, sarung tangan dielektrik, safety harness) dan menguji tegangan sebelum menyentuh kabel.',
      },
      {
        level: 2,
        title: 'Tingkat 2: Berkembang (Developing)',
        subtitle: 'Pemeriksaan APD & P3K',
        description: 'Memeriksa masa berlaku kelayakan helm dan sarung tangan isolasi sebelum turun ke lapangan.',
      },
      {
        level: 1,
        title: 'Tingkat 1: Dasar (Foundational)',
        subtitle: 'Kesadaran bahaya listrik',
        description: 'Mengetahui tanda bahaya tegangan tinggi dan mematuhi batas jarak aman minimum di sekitar tiang gardu listrik.',
      },
    ],
  },
];

export const CapabilityLibraryView: React.FC<CapabilityLibraryViewProps> = ({ onNavigate }) => {
  const [selectedDomain, setSelectedDomain] = useState('technical');
  const [selectedCapabilityId, setSelectedCapabilityId] = useState('data-analysis');
  const [searchQuery, setSearchQuery] = useState('');

  const domains = [
    { id: 'technical', name: 'Technical & Digital', count: 48, icon: Code },
    { id: 'business', name: 'Business & Commercial', count: 32, icon: Briefcase },
    { id: 'people', name: 'People & Leadership', count: 26, icon: Users },
    { id: 'domain', name: 'Energy Domain Specific', count: 42, icon: Compass },
    { id: 'core', name: 'Core Foundations & Safety', count: 18, icon: Star },
  ];

  // Capabilities belonging to active domain (or filtered by search)
  const availableCapabilities = useMemo(() => {
    let list = CAPABILITY_CATALOG.filter((c) => c.domainId === selectedDomain);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = CAPABILITY_CATALOG.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.subDomain.toLowerCase().includes(q)
      );
    }
    return list;
  }, [selectedDomain, searchQuery]);

  // Active selected capability
  const activeCapability = useMemo(() => {
    const found = availableCapabilities.find((c) => c.id === selectedCapabilityId);
    if (found) return found;
    return availableCapabilities[0] || CAPABILITY_CATALOG[0];
  }, [availableCapabilities, selectedCapabilityId]);

  return (
    <div className="space-y-6 pb-12">
      {/* Search Header */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari definisi kapabilitas dari 5 domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 text-slate-800 placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>Diinspirasi struktur:</span>
          <span className="font-semibold text-slate-900">SFIA, O*NET, & SKKNI Ketenagalistrikan</span>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: 5 Domains & Capability List (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Domains Selector */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2">
            <div className="px-2 py-1 text-xs font-bold text-slate-900 border-b border-slate-100 pb-2">
              Domain Kapabilitas (5)
            </div>

            <div className="space-y-1">
              {domains.map((d) => {
                const Icon = d.icon;
                const isSelected = selectedDomain === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => {
                      setSelectedDomain(d.id);
                      const firstInDomain = CAPABILITY_CATALOG.find((c) => c.domainId === d.id);
                      if (firstInDomain) {
                        setSelectedCapabilityId(firstInDomain.id);
                      }
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-medium transition-all text-left ${
                      isSelected
                        ? 'bg-blue-50 text-blue-700 font-semibold border border-blue-200 shadow-2xs'
                        : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                      <span>{d.name}</span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500">
                      ({d.count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Capabilities List inside domain */}
          <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2">
            <div className="px-2 py-1 text-xs font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
              <span>Daftar Kapabilitas Terdefinisi</span>
              <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded">
                {availableCapabilities.length} Item
              </span>
            </div>

            <div className="space-y-1.5">
              {availableCapabilities.map((cap) => {
                const isSelected = activeCapability?.id === cap.id;
                return (
                  <button
                    key={cap.id}
                    onClick={() => setSelectedCapabilityId(cap.id)}
                    className={`w-full p-2.5 rounded-lg text-left text-xs transition-all border ${
                      isSelected
                        ? 'bg-blue-50 border-blue-300 font-semibold text-blue-900 shadow-2xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="truncate">{cap.name}</span>
                      <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{cap.subDomain}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Capability Detail & 5-Level Proficiency Ladder (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-5">
          {activeCapability && (
            <>
              {/* Header */}
              <div className="border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  <span>{activeCapability.subDomain}</span>
                  <span className="text-slate-300">·</span>
                  <span className="bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[11px] text-blue-800 font-bold">
                    Internal Capability Model
                  </span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 mt-1">
                  {activeCapability.name}
                </h2>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  {activeCapability.description}
                </p>
              </div>

              {/* 5-Level Proficiency Taxonomy */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>5-Level Proficiency Ladder (Tangga Kemahiran)</span>
                  </h3>
                  <span className="text-[11px] text-slate-500">
                    Standar evaluasi objektif berbasis bukti terukur
                  </span>
                </div>

                <div className="space-y-2.5">
                  {activeCapability.proficiencyLadder.map((step) => {
                    const isTop = step.level === 5;
                    const isMid = step.level === 3;
                    return (
                      <div
                        key={step.level}
                        className={`p-3.5 rounded-xl border transition-all ${
                          isTop
                            ? 'bg-blue-50/70 border-blue-200 ring-1 ring-blue-300/60'
                            : isMid
                            ? 'bg-emerald-50/60 border-emerald-200'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-6 h-6 rounded-full font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                                isTop
                                  ? 'bg-blue-600 text-white'
                                  : isMid
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              L{step.level}
                            </span>
                            <span className="font-bold text-xs text-slate-900">
                              {step.title}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500 italic pl-8 sm:pl-0">
                            {step.subtitle}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 mt-2 pl-8 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
