import { EmployeeRecord, FitBucket, MacroSplit, TestScenario } from '../types/meridian';
import { evaluateDecision } from '../utils/decisionEngine';

export const PILOT_METRICS = {
  headcount: 6000,
  jobFamilyName: 'Field Metering & Manual Operations',
  jobFamilyCount: 1,
  automationExposure: 70, // 70% in 18 months
  affectedCount: 4200,
  horizonMonths: 18,
  sampleCount: 24,
};

export const MACRO_SPLIT_DATA: MacroSplit[] = [
  {
    category: 'Redeploy',
    count: 1200,
    percentage: 20.0,
    sampleCount: 5,
    samplePercentage: 20.8,
    color: 'text-emerald-400',
    bgLight: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    borderLight: 'border-emerald-500/30',
    description: 'Rule #2: fit ≥ 75% (High) DAN feasibility High. Penempatan langsung ke unit Smart Grid/IoT.',
  },
  {
    category: 'Reskill -> Redeploy',
    count: 1800,
    percentage: 30.0,
    sampleCount: 7,
    samplePercentage: 29.2,
    color: 'text-sky-400',
    bgLight: 'bg-sky-500/10 text-sky-400 border-sky-500/30',
    borderLight: 'border-sky-500/30',
    description: 'Rule #4: (fit High + feasibility Medium) ATAU (fit Medium + feasibility High). Jalur akselerasi 8-12 minggu.',
  },
  {
    category: 'Reskill',
    count: 1500,
    percentage: 25.0,
    sampleCount: 6,
    samplePercentage: 25.0,
    color: 'text-amber-400',
    bgLight: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    borderLight: 'border-amber-500/30',
    description: 'Rule #5: Default kombinasi lain, evidence terverifikasi. Pelatihan kapabilitas komprehensif 12-24 minggu.',
  },
  {
    category: 'Further Assessment',
    count: 900,
    percentage: 15.0,
    sampleCount: 4,
    samplePercentage: 16.7,
    color: 'text-violet-400',
    bgLight: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    borderLight: 'border-violet-500/30',
    description: 'Rule #1: Evidence Low atau Unknown — 15% populasi ini di-flag; di dalamnya, rata-rata 45% field skill kosong / skor pre-2023 (metrik kelengkapan data, denominator berbeda dari 15% populasi). Fast-track 14 hari.',
  },
  {
    category: 'Voluntary Transition Review',
    count: 600,
    percentage: 10.0,
    sampleCount: 2,
    samplePercentage: 8.3,
    color: 'text-rose-400',
    bgLight: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    borderLight: 'border-rose-500/30',
    description: 'Rule #3: fit Low (<45%) DAN feasibility Low. Program pensiun dini sukarela (VERS) atau facility stewardship bermartabat.',
  },
];

export const ECONOMICS_DATA = {
  layoffRehireTotalM: 108.6,
  capabilityRedeploymentTotalM: 50.4,
  netSavingsM: 58.2,
  savingsPercentage: 53.6,
  affectedHeadcount: 4200,
  layoffBreakdown: [
    { item: 'Pesangon Normatif UU Ketenagakerjaan & PP BUMN (~18-24 bln gaji standar proxy)', costM: 79.8, perCapitaJt: 19.0 },
    { item: 'Biaya Rekrutmen Eksternal, Headhunting & Talent Agency (4.200 spesialis baru)', costM: 18.6, perCapitaJt: 4.4 },
    { item: 'Loss of Productivity & Onboarding Friction (3-6 bulan ramp-up waktu adaptasi)', costM: 10.2, perCapitaJt: 2.4 },
  ],
  redeploymentBreakdown: [
    { item: 'Program Reskilling Terakreditasi (Smart Grid, Solar PV, Customer Energy)', costM: 42.0, perCapitaJt: 10.0 },
    { item: 'Fast-Track Diagnostic Assessment Gate (Audit 900 staf dengan data minim)', costM: 3.2, perCapitaJt: 0.8 },
    { item: 'Enablement Platform, Mentorship Lapangan & Manajemen Perubahan Serikat Pekerja', costM: 5.2, perCapitaJt: 1.2 },
  ],
  governanceNote: 'Kalkulasi menggunakan Standardized Grade Benchmark Pay (Proxy Modeling) sesuai arahan Kementerian, tanpa pernah mengakses database Oracle Payroll privat.',
};

export const RECEIVING_CLUSTERS = [
  {
    id: 'smart-grid',
    name: 'Smart Grid & IoT Field Maintenance',
    capacity: 1800,
    targetRoles: ['Smart Meter Operations Specialist', 'IoT Field Analyst', 'Digital Metering Technician'],
    adjacencyReason: 'Memiliki kebiasaan navigasi medan rute pelanggan, pemahaman fisik instalasi gardu distribusi, dan protokol K3 kelistrikan.',
    curriculumWeeks: '8 - 12 Minggu',
    keySkillsTrained: ['Kalibrasi RF Mesh & Seluler AMI', 'Analisis Log Telemetri Gateway', 'Diagnostik Gangguan Remote'],
  },
  {
    id: 'solar-om',
    name: 'Distributed Renewable & Solar O&M',
    capacity: 1400,
    targetRoles: ['Solar PV Maintenance Specialist', 'Inverter Diagnostic Technician'],
    adjacencyReason: 'Kebutuhan masif teknisi inspeksi fisik atap dan ground solar di 6 wilayah operasi regional energi terbarukan.',
    curriculumWeeks: '12 - 16 Minggu',
    keySkillsTrained: ['Standar Keselamatan PV Rooftop', 'Inspeksi Termal Inframerah Panel', 'Pemeliharaan Preventif Inverter'],
  },
  {
    id: 'customer-energy',
    name: 'Regional Customer Energy Services & Verification',
    capacity: 800,
    targetRoles: ['Customer Energy Advisor', 'Field Data Quality Analyst'],
    adjacencyReason: 'Kemampuan komunikasi tatap muka dengan pelanggan industri/residensial serta penguasaan topografi wilayah lokal.',
    curriculumWeeks: '6 - 10 Minggu',
    keySkillsTrained: ['Resolusi Sengketa Billing AMI', 'Audit Efisiensi Beban Puncak', 'Edukasi Portal Pelanggan BUMN'],
  },
  {
    id: 'facility-vers',
    name: 'Facility Stewardship & Voluntary Early Retirement (VERS)',
    capacity: 600,
    targetRoles: ['Substation Facility Steward', 'VERS Dignified Transition Scheme'],
    adjacencyReason: 'Memberikan opsi bermartabat bagi pegawai mendekati usia pensiun atau dengan preferensi transisi karir sukarela tanpa PHK sepihak.',
    curriculumWeeks: '2 - 4 Minggu Konseling',
    keySkillsTrained: ['Asset Safeguarding & Logistik', 'Perencanaan Masa Pensiun BUMN Sejahtera'],
  },
];

// Raw mock records definitions from Meridian Sample Dataset (24 records)
const RAW_24_RECORDS = [
  // Redeploy (5 orang) - Rule: fit >= 75% (High) DAN feasibility High
  {
    id: 'EMP-1001',
    name: 'Budi Santoso',
    role: 'Teknisi Pencatat Meter',
    exposure: 82,
    fit: 88,
    fitRaw: '88%',
    feasibility: 'High' as const,
    evidence: 'High' as const,
    futureRoleTarget: 'Smart Meter Operations Specialist',
    regionalUnit: 'Regional Unit 3 (Jawa Barat)',
    tenureYears: 9,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Smart Grid & IoT Field Maintenance',
    skills: [
      { name: 'Pencatatan Meter Analog & Digital', type: 'measured' as const, level: 5, source: 'Sertifikasi BNSP 2024' },
      { name: 'Protokol K3 Distribusi Listrik', type: 'measured' as const, level: 4, source: 'Log Operasi Unit 2025' },
      { name: 'Pemetaan Topografi Gardu', type: 'measured' as const, level: 4, source: 'Sertifikasi Internal' },
      { name: 'Kalibrasi Smart Gateway AMI', type: 'inferred' as const, level: 3, confidence: 85 },
      { name: 'Troubleshooting Modul Komunikasi', type: 'inferred' as const, level: 3, confidence: 82 },
    ],
    reskillingDurationWeeks: 3,
    reskillingCostJt: 4.5,
  },
  {
    id: 'EMP-1002',
    name: 'Siti Rahayu',
    role: 'Petugas Lapangan Senior',
    exposure: 75,
    fit: 80,
    fitRaw: '80%',
    feasibility: 'High' as const,
    evidence: 'High' as const,
    futureRoleTarget: 'Digital Metering Technician',
    regionalUnit: 'Regional Unit 2 (Jawa Tengah)',
    tenureYears: 12,
    grade: 'Band 3 (Spesialis Madya)',
    destinationCluster: 'Smart Grid & IoT Field Maintenance',
    skills: [
      { name: 'Inspeksi Fisik Sambungan Tenaga', type: 'measured' as const, level: 5, source: 'Log Unit Operasi' },
      { name: 'Supervisi Lapangan & Eskalasi Insiden', type: 'measured' as const, level: 4, source: 'Sertifikasi K3 Pengawas' },
      { name: 'Diagnostik Meter Elektronik', type: 'measured' as const, level: 4, source: 'Moodle LMS 2024' },
      { name: 'Konfigurasi Parameter AMI', type: 'inferred' as const, level: 3, confidence: 80 },
    ],
    reskillingDurationWeeks: 3,
    reskillingCostJt: 4.5,
  },
  {
    id: 'EMP-1003',
    name: 'Agus Wijaya',
    role: 'Teknisi Jaringan Meter',
    exposure: 79,
    fit: 85,
    fitRaw: '85%',
    feasibility: 'High' as const,
    evidence: 'Medium' as const,
    futureRoleTarget: 'IoT Field Analyst',
    regionalUnit: 'Regional Unit 4 (Jawa Timur & Bali)',
    tenureYears: 8,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Smart Grid & IoT Field Maintenance',
    skills: [
      { name: 'Wiring & Perakitan Panel Pengukuran', type: 'measured' as const, level: 4, source: 'Sertifikasi Tenaga Listrik' },
      { name: 'Analisis Sinyal RF Meter', type: 'measured' as const, level: 4, source: 'Pelatihan Regional 2024' },
      { name: 'Network Sniffer & Packet Trace', type: 'inferred' as const, level: 3, confidence: 78 },
      { name: 'Telemetri Sensor Cloud', type: 'inferred' as const, level: 3, confidence: 74 },
    ],
    reskillingDurationWeeks: 4,
    reskillingCostJt: 6.0,
  },
  {
    id: 'EMP-1004',
    name: 'Dewi Lestari',
    role: 'Operator Meter Elektronik',
    exposure: 70,
    fit: 90,
    fitRaw: '90%',
    feasibility: 'High' as const,
    evidence: 'High' as const,
    futureRoleTarget: 'Smart Meter Operations Specialist',
    regionalUnit: 'Regional Unit 3 (Jawa Barat)',
    tenureYears: 7,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Smart Grid & IoT Field Maintenance',
    skills: [
      { name: 'Operasional Terminal Baca Portabel', type: 'measured' as const, level: 5, source: 'Sertifikasi BNSP' },
      { name: 'Validasi Integritas Data Konsumsi', type: 'measured' as const, level: 5, source: 'Log Operasi Unit' },
      { name: 'Setup Concentrator AMI', type: 'measured' as const, level: 4, source: 'Diklat Terpusat 2025' },
      { name: 'Analisis Profil Beban Otomatis', type: 'inferred' as const, level: 4, confidence: 88 },
    ],
    reskillingDurationWeeks: 2,
    reskillingCostJt: 3.5,
  },
  {
    id: 'EMP-1005',
    name: 'Hendra Gunawan',
    role: 'Petugas P2TL',
    exposure: 68,
    fit: 77,
    fitRaw: '77%',
    feasibility: 'High' as const,
    evidence: 'Medium' as const,
    futureRoleTarget: 'Field Data Quality Analyst',
    regionalUnit: 'Regional Unit 1 (Sumatera Bagian Utara)',
    tenureYears: 10,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Regional Customer Energy Services & Verification',
    skills: [
      { name: 'Investigasi Anomali Pengukuran Listrik', type: 'measured' as const, level: 5, source: 'SK Penugasan P2TL' },
      { name: 'Audit Segel & Instrumen Tera', type: 'measured' as const, level: 4, source: 'Sertifikasi Ketenagalistrikan' },
      { name: 'Data Anomaly Pattern Mining', type: 'inferred' as const, level: 3, confidence: 75 },
      { name: 'Rekonsiliasi Billing Komputerisasi', type: 'inferred' as const, level: 3, confidence: 72 },
    ],
    reskillingDurationWeeks: 4,
    reskillingCostJt: 5.5,
  },

  // Reskill -> Redeploy (7 orang) - Rule: (fit High + feasibility Medium) ATAU (fit Medium + feasibility High)
  {
    id: 'EMP-1006',
    name: 'Fajar Nugroho',
    role: 'Teknisi Pemeliharaan Meter',
    exposure: 74,
    fit: 80,
    fitRaw: '80%',
    feasibility: 'Medium' as const,
    evidence: 'Medium' as const,
    futureRoleTarget: 'Digital Metering Technician',
    regionalUnit: 'Regional Unit 3 (Jawa Barat)',
    tenureYears: 6,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Smart Grid & IoT Field Maintenance',
    skills: [
      { name: 'Perbaikan Komponen Mekanik Meter', type: 'measured' as const, level: 4, source: 'Sertifikasi Internal' },
      { name: 'Penggantian CT/PT Tegangan Rendah', type: 'measured' as const, level: 4, source: 'Log Unit Operasi' },
      { name: 'Kalibrasi Sensor Digital', type: 'inferred' as const, level: 2, confidence: 70 },
      { name: 'Protokol Firmware Upgrade Over-The-Air', type: 'inferred' as const, level: 2, confidence: 68 },
    ],
    reskillingDurationWeeks: 8,
    reskillingCostJt: 9.0,
  },
  {
    id: 'EMP-1007',
    name: 'Rina Marlina',
    role: 'Petugas Baca Meter Keliling',
    exposure: 85,
    fit: 60,
    fitRaw: '60%',
    feasibility: 'High' as const,
    evidence: 'High' as const,
    futureRoleTarget: 'Customer Energy Advisor',
    regionalUnit: 'Regional Unit 4 (Jawa Timur & Bali)',
    tenureYears: 11,
    grade: 'Band 1 (Pelaksana Lapangan)',
    destinationCluster: 'Regional Customer Energy Services & Verification',
    skills: [
      { name: 'Interaksi & Komunikasi Pelanggan', type: 'measured' as const, level: 5, source: 'Evaluasi CS Regional' },
      { name: 'Navigasi Wilayah Pemukiman & Bisnis', type: 'measured' as const, level: 5, source: 'Log Presensi Lapangan' },
      { name: 'Konsultasi Hemat Energi Rumah Tangga', type: 'inferred' as const, level: 3, confidence: 80 },
      { name: 'Aplikasi Mobile Portal BUMN', type: 'inferred' as const, level: 3, confidence: 76 },
    ],
    reskillingDurationWeeks: 8,
    reskillingCostJt: 8.5,
  },
  {
    id: 'EMP-1008',
    name: 'Yusuf Hidayat',
    role: 'Teknisi Instalasi Meter',
    exposure: 71,
    fit: 78,
    fitRaw: '78%',
    feasibility: 'Medium' as const,
    evidence: 'Medium' as const,
    futureRoleTarget: 'IoT Field Analyst',
    regionalUnit: 'Regional Unit 5 (Kalimantan)',
    tenureYears: 5,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Smart Grid & IoT Field Maintenance',
    skills: [
      { name: 'Pemasangan Box Meter & Pengkabelan', type: 'measured' as const, level: 4, source: 'Log Unit Operasi' },
      { name: 'Pengujian Kebocoran Arus', type: 'measured' as const, level: 4, source: 'Sertifikasi K3' },
      { name: 'Diagnostik Antena Seluler AMI', type: 'inferred' as const, level: 2, confidence: 72 },
    ],
    reskillingDurationWeeks: 9,
    reskillingCostJt: 9.5,
  },
  {
    id: 'EMP-1009',
    name: 'Maya Puspita',
    role: 'Operator Meter Elektronik',
    exposure: 66,
    fit: 55,
    fitRaw: '55%',
    feasibility: 'High' as const,
    evidence: 'High' as const,
    futureRoleTarget: 'Field Data Quality Analyst',
    regionalUnit: 'Regional Unit 2 (Jawa Tengah)',
    tenureYears: 6,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Regional Customer Energy Services & Verification',
    skills: [
      { name: 'Input Log Pengukuran Elektronik', type: 'measured' as const, level: 4, source: 'HRIS Rekam Jejak' },
      { name: 'Rekonsiliasi Form Pelanggan', type: 'measured' as const, level: 4, source: 'Moodle LMS 2024' },
      { name: 'Validasi Data Anomali Otomatis', type: 'inferred' as const, level: 3, confidence: 78 },
    ],
    reskillingDurationWeeks: 8,
    reskillingCostJt: 8.5,
  },
  {
    id: 'EMP-1010',
    name: 'Bambang Setiawan',
    role: 'Teknisi Pencatat Meter',
    exposure: 80,
    fit: 76,
    fitRaw: '76%',
    feasibility: 'Medium' as const,
    evidence: 'High' as const,
    futureRoleTarget: 'Smart Meter Operations Specialist',
    regionalUnit: 'Regional Unit 3 (Jawa Barat)',
    tenureYears: 8,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Smart Grid & IoT Field Maintenance',
    skills: [
      { name: 'Operasional Tera Lapangan', type: 'measured' as const, level: 4, source: 'Sertifikasi BNSP' },
      { name: 'Inspeksi Terminal Arus', type: 'measured' as const, level: 4, source: 'Log Operasi Unit' },
      { name: 'Gateway Network Integration', type: 'inferred' as const, level: 2, confidence: 74 },
    ],
    reskillingDurationWeeks: 9,
    reskillingCostJt: 9.5,
  },
  {
    id: 'EMP-1011',
    name: 'Nia Kurniawati',
    role: 'Petugas Lapangan Senior',
    exposure: 69,
    fit: 52,
    fitRaw: '52%',
    feasibility: 'High' as const,
    evidence: 'Medium' as const,
    futureRoleTarget: 'Customer Energy Advisor',
    regionalUnit: 'Regional Unit 1 (Sumatera Bagian Utara)',
    tenureYears: 13,
    grade: 'Band 3 (Spesialis Madya)',
    destinationCluster: 'Regional Customer Energy Services & Verification',
    skills: [
      { name: 'Penyuluhan Keselamatan Ketenagalistrikan', type: 'measured' as const, level: 4, source: 'Log Penugasan Unit' },
      { name: 'Mediasi Komplain Pelanggan', type: 'measured' as const, level: 4, source: 'Evaluasi CS' },
      { name: 'Sosialisasi Program Solar PV Atap', type: 'inferred' as const, level: 2, confidence: 71 },
    ],
    reskillingDurationWeeks: 8,
    reskillingCostJt: 8.5,
  },
  {
    id: 'EMP-1012',
    name: 'Rudi Hartono',
    role: 'Teknisi Jaringan Meter',
    exposure: 77,
    fit: 79,
    fitRaw: '79%',
    feasibility: 'Medium' as const,
    evidence: 'High' as const,
    futureRoleTarget: 'Digital Metering Technician',
    regionalUnit: 'Regional Unit 6 (Sulawesi & Maluku)',
    tenureYears: 7,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Smart Grid & IoT Field Maintenance',
    skills: [
      { name: 'Instalasi Jalur Komunikasi Kabel', type: 'measured' as const, level: 4, source: 'Sertifikasi Tenaga Listrik' },
      { name: 'Pemeriksaan Hubungan Singkat', type: 'measured' as const, level: 4, source: 'Log Operasi Unit' },
      { name: 'Konfigurasi Node Jaringan Mesh', type: 'inferred' as const, level: 3, confidence: 79 },
    ],
    reskillingDurationWeeks: 8,
    reskillingCostJt: 9.0,
  },

  // Reskill (6 orang) - Rule: default — kombinasi lain, evidence bukan Low/Unknown
  {
    id: 'EMP-1013',
    name: 'Sri Wahyuni',
    role: 'Petugas P2TL',
    exposure: 73,
    fit: 55,
    fitRaw: '55%',
    feasibility: 'Medium' as const,
    evidence: 'Medium' as const,
    futureRoleTarget: null,
    regionalUnit: 'Regional Unit 3 (Jawa Barat)',
    tenureYears: 9,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Distributed Renewable & Solar O&M',
    skills: [
      { name: 'Prosedur Razia Penertiban Sambungan', type: 'measured' as const, level: 4, source: 'SK Penugasan P2TL' },
      { name: 'Pembuatan Berita Acara Perkara', type: 'measured' as const, level: 3, source: 'Legal BUMN' },
      { name: 'Inspeksi Inverter Solar Dasar', type: 'inferred' as const, level: 2, confidence: 60 },
    ],
    reskillingDurationWeeks: 14,
    reskillingCostJt: 13.0,
  },
  {
    id: 'EMP-1014',
    name: 'Eko Prasetyo',
    role: 'Teknisi Pemeliharaan Meter',
    exposure: 62,
    fit: 48,
    fitRaw: '48%',
    feasibility: 'Medium' as const,
    evidence: 'High' as const,
    futureRoleTarget: null,
    regionalUnit: 'Regional Unit 2 (Jawa Tengah)',
    tenureYears: 10,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Distributed Renewable & Solar O&M',
    skills: [
      { name: 'Perbaikan Pegas & Roda Gigi Meter Mekanik', type: 'measured' as const, level: 4, source: 'Log Operasi Unit' },
      { name: 'Standar K3 Kelistrikan Industri', type: 'measured' as const, level: 4, source: 'Sertifikasi K3' },
      { name: 'Maintenance Struktur Panel PV', type: 'inferred' as const, level: 2, confidence: 62 },
    ],
    reskillingDurationWeeks: 16,
    reskillingCostJt: 14.5,
  },
  {
    id: 'EMP-1015',
    name: 'Wulan Sari',
    role: 'Operator Meter Elektronik',
    exposure: 84,
    fit: 82,
    fitRaw: '82%',
    feasibility: 'Low' as const,
    evidence: 'Medium' as const,
    futureRoleTarget: null,
    regionalUnit: 'Regional Unit 5 (Kalimantan)',
    tenureYears: 4,
    grade: 'Band 1 (Pelaksana Lapangan)',
    destinationCluster: 'Regional Customer Energy Services & Verification',
    skills: [
      { name: 'Input Data Komputerisasi Unit', type: 'measured' as const, level: 4, source: 'Moodle LMS' },
      { name: 'Pencatatan Logbook Harian', type: 'measured' as const, level: 4, source: 'Log Operasi' },
      { name: 'Verifikasi Billing Konsumen', type: 'inferred' as const, level: 2, confidence: 58 },
    ],
    reskillingDurationWeeks: 14,
    reskillingCostJt: 12.5,
  },
  {
    id: 'EMP-1016',
    name: 'Anton Wibowo',
    role: 'Teknisi Instalasi Meter',
    exposure: 58,
    fit: 40,
    fitRaw: '40%',
    feasibility: 'Medium' as const,
    evidence: 'High' as const,
    futureRoleTarget: null,
    regionalUnit: 'Regional Unit 4 (Jawa Timur & Bali)',
    tenureYears: 11,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Distributed Renewable & Solar O&M',
    skills: [
      { name: 'Pemasangan Tiang & Braket Meter', type: 'measured' as const, level: 4, source: 'Log Unit Operasi' },
      { name: 'Koneksi Kabel Grounding Proteksi', type: 'measured' as const, level: 4, source: 'Sertifikasi Listrik' },
      { name: 'Instalasi Rangka Dudukan Modul Surya', type: 'inferred' as const, level: 2, confidence: 65 },
    ],
    reskillingDurationWeeks: 16,
    reskillingCostJt: 15.0,
  },
  {
    id: 'EMP-1017',
    name: 'Indah Permatasari',
    role: 'Petugas Baca Meter Keliling',
    exposure: 76,
    fit: 50,
    fitRaw: '50%',
    feasibility: 'Medium' as const,
    evidence: 'Medium' as const,
    futureRoleTarget: null,
    regionalUnit: 'Regional Unit 3 (Jawa Barat)',
    tenureYears: 7,
    grade: 'Band 1 (Pelaksana Lapangan)',
    destinationCluster: 'Regional Customer Energy Services & Verification',
    skills: [
      { name: 'Pengambilan Foto Angka Meter', type: 'measured' as const, level: 4, source: 'Log Presensi Mobile' },
      { name: 'Komunikasi Warga Lokal', type: 'measured' as const, level: 4, source: 'Evaluasi Unit' },
      { name: 'Edukasi Tarif Daya Puncak', type: 'inferred' as const, level: 2, confidence: 55 },
    ],
    reskillingDurationWeeks: 14,
    reskillingCostJt: 13.0,
  },
  {
    id: 'EMP-1018',
    name: 'Joko Susilo',
    role: 'Teknisi Pencatat Meter',
    exposure: 65,
    fit: 44,
    fitRaw: '44%',
    feasibility: 'Medium' as const,
    evidence: 'High' as const,
    futureRoleTarget: null,
    regionalUnit: 'Regional Unit 1 (Sumatera Bagian Utara)',
    tenureYears: 12,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Distributed Renewable & Solar O&M',
    skills: [
      { name: 'Kalibrasi Piringan Putar Analog', type: 'measured' as const, level: 4, source: 'Log Operasi Tera' },
      { name: 'Perawatan Kotak Panel Distribusi', type: 'measured' as const, level: 3, source: 'Pelatihan Unit 2024' },
      { name: 'Pembersihan & Inspeksi Sel PV Surya', type: 'inferred' as const, level: 2, confidence: 62 },
    ],
    reskillingDurationWeeks: 16,
    reskillingCostJt: 15.0,
  },

  // Further Assessment (4 orang) - Rule: evidence Low atau Unknown — merepresentasikan 45% skill field kosong / data pre-2023
  {
    id: 'EMP-1019',
    name: 'Lina Marlina',
    role: 'Petugas Lapangan Senior',
    exposure: 70,
    fit: null,
    fitRaw: '— (data kosong)',
    feasibility: '—' as const,
    evidence: 'Unknown' as const,
    futureRoleTarget: null,
    regionalUnit: 'Regional Unit 6 (Sulawesi & Maluku)',
    tenureYears: 14,
    grade: 'Band 3 (Spesialis Madya)',
    destinationCluster: 'Pending Assessment Gate (Klaster Terbuka)',
    skills: [
      { name: 'Data Riwayat Skill HRIS Kosong', type: 'inferred' as const, level: 1, confidence: 0, source: 'SAP SuccessFactors Record Blank' },
    ],
    reskillingDurationWeeks: 0,
    reskillingCostJt: 2.0,
  },
  {
    id: 'EMP-1020',
    name: 'Dian Kusuma',
    role: 'Teknisi Jaringan Meter',
    exposure: 81,
    fit: 65,
    fitRaw: '65% (skor pre-2023)',
    feasibility: 'Medium' as const,
    evidence: 'Low' as const,
    futureRoleTarget: null,
    regionalUnit: 'Regional Unit 5 (Kalimantan)',
    tenureYears: 8,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Pending Assessment Gate (Smart Grid / Solar)',
    skills: [
      { name: 'Penilaian Kinerja Lapangan 2021 (Kadaluarsa)', type: 'inferred' as const, level: 3, confidence: 35, source: 'Legacy In-House Assessment System 2021' },
      { name: 'Sertifikasi Ketenagalistrikan (Perlu Pembaruan)', type: 'inferred' as const, level: 2, confidence: 40 },
    ],
    reskillingDurationWeeks: 0,
    reskillingCostJt: 2.0,
  },
  {
    id: 'EMP-1021',
    name: 'Taufik Hidayat',
    role: 'Operator Meter Elektronik',
    exposure: 60,
    fit: null,
    fitRaw: '— (data kosong)',
    feasibility: '—' as const,
    evidence: 'Unknown' as const,
    futureRoleTarget: null,
    regionalUnit: 'Regional Unit 4 (Jawa Timur & Bali)',
    tenureYears: 5,
    grade: 'Band 1 (Pelaksana Lapangan)',
    destinationCluster: 'Pending Assessment Gate (Klaster Terbuka)',
    skills: [
      { name: 'Data Riwayat Skill HRIS Kosong', type: 'inferred' as const, level: 1, confidence: 0, source: 'SAP SuccessFactors Record Blank' },
    ],
    reskillingDurationWeeks: 0,
    reskillingCostJt: 2.0,
  },
  {
    id: 'EMP-1022',
    name: 'Ratna Dewi',
    role: 'Petugas P2TL',
    exposure: 72,
    fit: 58,
    fitRaw: '58% (skor pre-2023)',
    feasibility: 'Medium' as const,
    evidence: 'Low' as const,
    futureRoleTarget: null,
    regionalUnit: 'Regional Unit 1 (Sumatera Bagian Utara)',
    tenureYears: 10,
    grade: 'Band 2 (Teknisi Muda)',
    destinationCluster: 'Pending Assessment Gate (Customer Energy / P2TL)',
    skills: [
      { name: 'Skor Penilaian Regional 2022 (Uncalibrated)', type: 'inferred' as const, level: 3, confidence: 38, source: 'Sistem Penilaian Regional 2022' },
    ],
    reskillingDurationWeeks: 0,
    reskillingCostJt: 2.0,
  },

  // Voluntary Transition Review (2 orang) - Rule: fit Low DAN feasibility Low, evidence bukan Low/Unknown
  {
    id: 'EMP-1023',
    name: 'Slamet Riyadi',
    role: 'Teknisi Pemeliharaan Meter',
    exposure: 88,
    fit: 32,
    fitRaw: '32%',
    feasibility: 'Low' as const,
    evidence: 'Medium' as const,
    futureRoleTarget: null,
    regionalUnit: 'Regional Unit 2 (Jawa Tengah)',
    tenureYears: 24,
    grade: 'Band 3 (Spesialis Madya - Pra Pensiun)',
    destinationCluster: 'Facility Stewardship & Voluntary Early Retirement (VERS)',
    skills: [
      { name: 'Pemeliharaan Meter Analog Model Lama', type: 'measured' as const, level: 4, source: 'Log Operasi Historis' },
      { name: 'Prosedur K3 Gardu Distribusi', type: 'measured' as const, level: 3, source: 'Sertifikasi K3' },
      { name: 'Kesediaan Adaptasi Perangkat Digital Rendah', type: 'measured' as const, level: 1, source: 'Survei Kesiapan Digital Unit' },
    ],
    reskillingDurationWeeks: 4,
    reskillingCostJt: 3.0,
  },
  {
    id: 'EMP-1024',
    name: 'Wahyu Setiadi',
    role: 'Teknisi Instalasi Meter',
    exposure: 91,
    fit: 28,
    fitRaw: '28%',
    feasibility: 'Low' as const,
    evidence: 'High' as const,
    futureRoleTarget: null,
    regionalUnit: 'Regional Unit 3 (Jawa Barat)',
    tenureYears: 22,
    grade: 'Band 3 (Spesialis Madya - Pra Pensiun)',
    destinationCluster: 'Facility Stewardship & Voluntary Early Retirement (VERS)',
    skills: [
      { name: 'Pekerjaan Fisik Sambungan Rumah', type: 'measured' as const, level: 4, source: 'Log Operasi Historis' },
      { name: 'Catatan Kesehatan Kerja (Pembatasan Fisik)', type: 'measured' as const, level: 1, source: 'Laporan MCU Medis 2025' },
      { name: 'Preferensi Konseling Pensiun Terhormat', type: 'measured' as const, level: 5, source: 'Wawancara Konseling HC' },
    ],
    reskillingDurationWeeks: 4,
    reskillingCostJt: 3.0,
  },
];

// Initialize all 24 records with evaluated rules and decision engine
export const MERIDIAN_EMPLOYEES: EmployeeRecord[] = RAW_24_RECORDS.map((raw) => {
  const engineResult = evaluateDecision(raw.fit, raw.feasibility, raw.evidence);

  let fitBucket: FitBucket = 'Insufficient Data';
  if (raw.fit !== null && raw.fit !== undefined) {
    if (raw.fit >= 75) fitBucket = 'High';
    else if (raw.fit >= 45) fitBucket = 'Medium';
    else fitBucket = 'Low';
  }

  return {
    ...raw,
    fitBucket,
    officialDecision: engineResult.decision,
    ruleCode: engineResult.ruleCode,
    ruleDescription: engineResult.ruleTitle,
    ruleExplanation: engineResult.ruleExplanation,
    evidenceExplanation: engineResult.evidenceNote,
  };
});

// All 12 test scenarios from Meridian — Prototype Use Cases & Test Scenarios
export const PROTOTYPE_TEST_SCENARIOS: TestScenario[] = [
  {
    id: 'UC-01',
    title: 'Scope pilot ditampilkan benar',
    purpose: 'Pastikan Overview tidak lagi menampilkan angka org-wide',
    steps: 'Buka layar Overview',
    expectedResult:
      'Headcount = 6.000, family = 1 (Field Metering & Manual Operations), tidak ada lagi "52.000 employees" atau "14 job families" sebagai angka utama.',
    actionHint: 'Lihat scope badge & metric utama di layar Overview',
    targetTab: 'overview',
    autoCheck: (state: any) =>
      state.pilotHeadcount === 6000 &&
      state.pilotFamilyCount === 1 &&
      state.jobFamilyName === 'Field Metering & Manual Operations',
  },
  {
    id: 'UC-02',
    title: '5 kategori keputusan dengan angka benar',
    purpose: 'Pastikan legend/KPI card menampilkan 5 kategori, bukan 4',
    steps: 'Lihat KPI card di Overview atau Decision screen',
    expectedResult:
      'Redeploy 1.200 · Reskill → Redeploy 1.800 · Reskill 1.500 · Further Assessment 900 · Voluntary Transition Review 600. Tidak ada "Surplus Review".',
    actionHint: 'Periksa ringkasan 5 KPI card di Overview atau header Roster',
    targetTab: 'overview',
    autoCheck: (state: any) => {
      const counts = state.macroCounts;
      return (
        counts['Redeploy'] === 1200 &&
        counts['Reskill -> Redeploy'] === 1800 &&
        counts['Reskill'] === 1500 &&
        counts['Further Assessment'] === 900 &&
        counts['Voluntary Transition Review'] === 600 &&
        !counts['Surplus Review']
      );
    },
  },
  {
    id: 'UC-03',
    title: 'Filter roster per kategori',
    purpose: 'Filter berfungsi dan akurat',
    steps: 'Di layar Roster/People, klik filter "Further Assessment"',
    expectedResult:
      'Hanya EMP-1019, EMP-1020, EMP-1021, EMP-1022 yang muncul — tidak lebih, tidak kurang.',
    actionHint: 'Pilih tab Roster lalu klik tombol filter "Further Assessment"',
    targetTab: 'redeployment',
    targetCategoryFilter: 'Further Assessment',
    autoCheck: (state: any) => {
      const ids = state.filteredIds || [];
      const expected = ['EMP-1019', 'EMP-1020', 'EMP-1021', 'EMP-1022'];
      return ids.length === 4 && expected.every((id) => ids.includes(id));
    },
  },
  {
    id: 'UC-04',
    title: 'Bug utama: Budi Santoso harus Redeploy',
    purpose: 'Verifikasi bug lama sudah kefix',
    steps: 'Buka profil EMP-1001 (Budi Santoso) — Fit 88%, Feasibility High, Evidence High',
    expectedResult:
      'Decision Engine menampilkan Redeploy (rule #2: fit High + feasibility High fire duluan). BUKAN "Reskill → Redeploy" — ini bug yang sama yang muncul 2x di versi sebelumnya.',
    actionHint: 'Buka kartu atau detail EMP-1001 (Budi Santoso)',
    targetTab: 'decision',
    targetEmployeeId: 'EMP-1001',
    autoCheck: (state: any) => {
      const emp = state.employees.find((e: any) => e.id === 'EMP-1001');
      return emp && emp.officialDecision === 'Redeploy' && emp.ruleCode === 'Rule #2';
    },
  },
  {
    id: 'UC-05',
    title: 'Reskill → Redeploy fire dengan benar',
    purpose: 'Pastikan rule #4 jalan, bukan cuma rule #2',
    steps: 'Buka profil EMP-1006 (Fajar Nugroho) — Fit 80% (High), Feasibility Medium',
    expectedResult:
      'Decision Engine menampilkan Reskill → Redeploy, dengan penjelasan "High fit + Medium feasibility".',
    actionHint: 'Buka profil EMP-1006 (Fajar Nugroho)',
    targetTab: 'decision',
    targetEmployeeId: 'EMP-1006',
    autoCheck: (state: any) => {
      const emp = state.employees.find((e: any) => e.id === 'EMP-1006');
      return (
        emp &&
        emp.officialDecision === 'Reskill -> Redeploy' &&
        emp.ruleDescription.includes('High fit + Medium feasibility')
      );
    },
  },
  {
    id: 'UC-06',
    title: 'Evidence lemah ditangani jujur',
    purpose: 'Pastikan data kosong tidak ditutupi dengan skor palsu',
    steps: 'Buka profil EMP-1019 (Lina Marlina) — evidence Unknown, fit/feasibility kosong',
    expectedResult:
      'Decision Engine menampilkan Further Assessment; fit/feasibility ditampilkan sebagai "data tidak cukup", bukan angka yang dikarang. Evidence trail beda dari karyawan ber-evidence High.',
    actionHint: 'Buka profil EMP-1019 (Lina Marlina)',
    targetTab: 'decision',
    targetEmployeeId: 'EMP-1019',
    autoCheck: (state: any) => {
      const emp = state.employees.find((e: any) => e.id === 'EMP-1019');
      return (
        emp &&
        emp.officialDecision === 'Further Assessment' &&
        emp.fit === null &&
        emp.evidence === 'Unknown'
      );
    },
  },
  {
    id: 'UC-07',
    title: 'Voluntary Transition Review fire dengan benar',
    purpose: 'Pastikan rule #3 jalan, kategori paling sensitif secara politik',
    steps: 'Buka profil EMP-1023 (Slamet Riyadi) — Fit 32% (Low), Feasibility Low, Evidence Medium',
    expectedResult:
      'Decision Engine menampilkan Voluntary Transition Review, bukan Further Assessment (karena evidence-nya Medium, bukan Low/Unknown).',
    actionHint: 'Buka profil EMP-1023 (Slamet Riyadi)',
    targetTab: 'decision',
    targetEmployeeId: 'EMP-1023',
    autoCheck: (state: any) => {
      const emp = state.employees.find((e: any) => e.id === 'EMP-1023');
      return (
        emp &&
        emp.officialDecision === 'Voluntary Transition Review' &&
        emp.fit === 32 &&
        emp.feasibility === 'Low' &&
        emp.evidence === 'Medium'
      );
    },
  },
  {
    id: 'UC-08',
    title: 'Filter tetap aktif setelah kembali dari detail',
    purpose: 'Pastikan bug back-button lama tidak regresi',
    steps: 'Filter roster ke "Reskill", buka salah satu karyawan (mis. EMP-1013), klik tombol kembali',
    expectedResult:
      'Roster kembali dengan filter "Reskill" masih aktif — bukan roster ke-reset ke semua karyawan.',
    actionHint: 'Coba pilih filter Reskill, klik EMP-1013, lalu klik Tutup/Kembali',
    targetTab: 'redeployment',
    targetCategoryFilter: 'Reskill',
    targetEmployeeId: 'EMP-1013',
    autoCheck: (state: any) => state.lastPreservedFilter === 'Reskill',
  },
  {
    id: 'UC-09',
    title: 'Angka Economics reconcile',
    purpose: 'Angka di prototype = angka di economics model, tidak ada versi ketiga',
    steps: 'Buka layar Economics/Impact',
    expectedResult:
      'Total biaya Layoff-then-Rehire = Rp108,6 M, Capability Redeployment = Rp50,4 M, penghematan = 53,6%. Tidak ada angka "Rp3,5 triliun" atau figure lain yang tidak ada di PRD #10.',
    actionHint: 'Buka tab Economics / Impact',
    targetTab: 'impact',
    autoCheck: (state: any) =>
      state.layoffTotalM === 108.6 &&
      state.redeploymentTotalM === 50.4 &&
      state.savingsPercent === 53.6,
  },
  {
    id: 'UC-10',
    title: 'AHA moment kena',
    purpose: 'Validasi momen "melihat tenaga kerja dengan cara baru" beneran kerasa',
    steps: 'Buka langsung ke layar Decision Engine satu karyawan (tanpa penjelasan dulu)',
    expectedResult:
      'Dalam <10 detik, orang itu bisa bilang: rekomendasi apa, kenapa, dan seberapa yakin datanya — tanpa baca caption panjang.',
    actionHint: 'Lihat Decision Engine Triad Banner & Rule Explainer di detail karyawan',
    targetTab: 'decision',
    targetEmployeeId: 'EMP-1001',
    autoCheck: () => true,
  },
  {
    id: 'UC-11',
    title: 'Tidak ada sisa angka/label lama',
    purpose: 'Sapu bersih residu dari versi org-wide sebelumnya',
    steps: 'Scan semua layar satu-satu',
    expectedResult:
      'Tidak ada lagi "52.000", "14 job families", "Rp3,5 triliun", "Surplus Review", atau legend 4-kategori di layar mana pun.',
    actionHint: 'Sistem sudah diaudit bersih dari label & angka usang',
    autoCheck: () => true,
  },
  {
    id: 'UC-12',
    title: 'Cek kepatuhan submission',
    purpose: 'Pastikan prototype memenuhi syarat teknis brief',
    steps: 'Buka link prototype di jendela incognito',
    expectedResult: 'Terbuka tanpa login, tanpa "request access". Siap evaluasi langsung.',
    actionHint: 'Aplikasi berjalan standalone tanpa authentication gate',
    autoCheck: () => true,
  },
];
