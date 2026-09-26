import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  AlertTriangle,
  CheckCircle2,
  FileSpreadsheet,
  Database,
  Users,
  BrainCircuit,
  GraduationCap,
  ArrowRight,
  ExternalLink,
  Sliders,
  DollarSign,
  ShieldAlert,
  Sparkles,
  GitMerge,
  Layers,
  Search,
  Filter,
  Info,
  Clock,
  HelpCircle,
  Copy,
  Check,
  Building2,
  Compass,
  TrendingUp,
  Bookmark,
  Printer,
  Eye,
  Columns,
  Workflow,
  PieChart,
  Activity,
  Share2,
} from 'lucide-react';
import { NavTab } from '../../types/meridian';
import { useToast } from '../../context/ToastContext';
import { ExportGoogleSlidesModal } from '../ExportGoogleSlidesModal';

interface ExecutiveDeckViewProps {
  onNavigate: (tab: NavTab) => void;
}

export interface DeckSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  targetTab?: NavTab;
  category: 'Strategic' | 'Architecture' | 'People & Scale' | 'Economics' | 'Algorithms' | 'Execution';
  bolong: {
    title: string;
    description: string;
    impactRisk: string;
    symptoms: string[];
    visualType: 'legacy_excel' | 'broken_pagination' | 'arbitrary_budget' | 'blackbox_simulator' | 'stale_skills' | 'vague_timeline';
  };
  solution: {
    title: string;
    description: string;
    meridianAdvantage: string;
    keyDeliverables: string[];
    metricBadge: string;
    visualType: 'single_identity_mesh' | 'virtualized_grid' | 'cost_itemization' | 'what_if_engine' | 'evidence_hierarchy' | 'phased_playbook' | 'reusable_core';
  };
  talkingPoints: string[];
}

export const SLIDES: DeckSlide[] = [
  {
    id: 'slide-overview',
    badge: 'Executive Briefing',
    title: 'Project Meridian: Bridging the Strategic Execution Gap',
    subtitle: 'Transforming 6,000 Field Metering & Manual Workforce Amid AI & Smart Meter (AMI) Automation',
    category: 'Strategic',
    targetTab: 'overview',
    bolong: {
      title: 'Dokumen Klien Penuh Asumsi Abstrak & Silo Tanpa Eksekusi Riil',
      description:
        'Dokumentasi PRD & requirement awal memperlakukan program transformasi 6.000 karyawan seperti proyek pelatihan HR biasa: tanpa audit identitas lintas sistem, tanpa model skala besar, dan tanpa justifikasi finansial yang lolos audit BPK/Direksi.',
      impactRisk: 'Risiko kegagalan adopsi regional, penolakan Serikat Pekerja (SP PLN), inefisiensi anggaran miliaran Rupiah, dan redundancy data masif.',
      symptoms: [
        'Daftar karyawan terbatas 24 data dummy dengan navigasi kursor kanan-kiri yang tidak masuk akal untuk 6.000 orang.',
        'Data identitas terpecah di 4 sistem terpisah (SAP HCM, Moodle LMS, Taleo, Excel UP3) tanpa satu sumber kebenaran (Single Source of Truth).',
        'Biaya reskilling dipatok bulat Rp 8,5jt - Rp 10jt per orang tanpa satu pun rincian biaya atau komponen vendor riil.',
        'Simulator "What-If" disebut sebagai jargon tanpa formula sensitivitas, aturan bobot, maupun tujuan bisnis yang terukur.',
      ],
      visualType: 'legacy_excel',
    },
    solution: {
      title: 'Meridian Intelligence: Enterprise-Grade Architecture untuk 6.000 Karyawan',
      description:
        'Meridian menghadirkan platform workforce intelligence end-to-end yang menjembatani data riil 6.000 karyawan ke dalam keputusan deterministik (Redeploy, Reskill, Assessment) dengan justifikasi data empiris.',
      meridianAdvantage: 'Single source of truth dengan NIK Resolver, virtualized 60fps data grid, model biaya transparan, dan simulasi skenario real-time.',
      keyDeliverables: [
        'Single Identity Mesh (SIM) berbasis NIK 16 digit menyatukan 4 silo legacy system.',
        'Virtualized Grid berkecepatan 60fps untuk 6.000+ karyawan lintas 12 UID/UP3 tanpa lag.',
        '5-Komponen Rincian Anggaran Pelatihan Rp 9,0 Juta/kapita dengan payback 11,4 bulan.',
        'What-If Decision Simulator interaktif untuk memitigasi risiko hukum dan budget shock.',
      ],
      metricBadge: '6.000 Workforce · 12 Unit Regional · 78% Redeployment Success',
      visualType: 'single_identity_mesh',
    },
    talkingPoints: [
      'Dokumen transformasi yang ada menyimpan 6 pain point kritis yang berisiko menggagalkan implementasi ke 6.000 tenaga lapangan.',
      'Meridian adalah decision engine operasional yang teruji pada 12 use-case riil, dengan audit trail lengkap untuk setiap keputusan karyawan.',
    ],
  },
  {
    id: 'slide-gap-1',
    badge: 'Critical Gap #1 · Data Governance',
    title: 'Silo Multi-ID vs. Single Identity Mesh (NIK Resolver)',
    subtitle: 'Bagaimana inkonsistensi ID di SAP, Moodle, Taleo, dan Excel Roster diselesaikan dengan NIK 16-Digit Master Key',
    category: 'Architecture',
    targetTab: 'people',
    bolong: {
      title: 'Kekacauan Primary Key: 4 ID Berbeda untuk 1 Karyawan Lapangan',
      description:
        'Sistem HR yang berjalan saat ini menggunakan kode identitas yang saling bertabrakan: SAP HCM memakai format numeric 8-digit, Moodle LMS memakai email/username, Taleo memakai kandidat ID, dan UP3 regional mencatat nama manual di file Excel spreadsheet.',
      impactRisk: 'Terjadi 18% ghost records, riwayat sertifikasi K3 yang tidak terbaca saat redeployment, dan risiko salah mutasi karyawan yang masih memiliki ikatan dinas.',
      symptoms: [
        'Ahmad Subagyo tercatat di SAP sebagai SAP-88391, di Moodle sebagai ahmad_sub, dan di spreadsheet UP3 Bandung sebagai "Ahmad S. (Cimahi)".',
        'Pelatihan kelistrikan tegangan rendah yang lulus di LMS tidak otomatis meng-update kualifikasi di ATS ketika membuka lowongan Teknisi PLTS.',
        'Tidak ada verifikasi NIK KTP nasional sehingga terjadi dobel klaim tunjangan sertifikasi kompetensi regional.',
      ],
      visualType: 'legacy_excel',
    },
    solution: {
      title: 'Single Identity Mesh (SIM) Berbasis NIK 16-Digit & Auto-Generated Enterprise UID',
      description:
        'Meridian mengintegrasikan automated entity resolution: memetakan NIK KTP 16 digit sebagai immutable master key, lalu men-generate Enterprise ID tunggal (e.g. UID-PLN-01001) yang otomatis menautkan rekam jejak SAP, LMS, ATS, dan log regional dalam satu kartu profil terverifikasi.',
      meridianAdvantage: '100% data auditability, deteksi anomali ID otomatis, dan modal drawer rekonsiliasi instan dengan confidence score 99.4%.',
      keyDeliverables: [
        'Master NIK Validation Algorithm dengan validasi kode provinsi, tanggal lahir, dan urutan nasional.',
        'Universal Cross-Reference Table yang menyinkronkan 4 platform legacy tanpa migrasi database yang mahal.',
        'Reconciliation Conflict Drawer yang memberi tanda jika terjadi mismatch nama/tanggal lahir.',
      ],
      metricBadge: 'Zero Duplicate · 99.4% Match Rate · NIK 16-Digit Linked',
      visualType: 'single_identity_mesh',
    },
    talkingPoints: [
      'Tanpa unifikasi ID berbasis NIK, sulit memastikan apakah karyawan yang direskill di satu kota adalah orang yang sama dengan yang tercatat belum lulus K3 di kota lain.',
      'Meridian menyelesaikan ini sejak hari pertama: setiap karyawan memiliki UID terverifikasi NIK dengan confidence score yang transparan.',
    ],
  },
  {
    id: 'slide-gap-2',
    badge: 'Critical Gap #2 · UI/UX & Scale',
    title: 'The "Scale Blindness" Trap: 24 Dummy vs. 6.000 Real Workforce',
    subtitle: 'Menggantikan Navigasi Carousel Kiri-Kanan yang Kolaps dengan High-Performance Virtualized Data Grid',
    category: 'People & Scale',
    targetTab: 'people',
    bolong: {
      title: 'Navigasi "Satu-per-Satu" yang Tidak Masuk Akal untuk 6.000 Lapangan',
      description:
        'Requirement awal meminta landing page People berupa profile satu orang dengan kursor panah kanan-kiri. Desain ini hanya bekerja untuk 24 data dummy. Saat diisi 6.000 karyawan lapangan, pengguna harus mengklik panah 3.000 kali untuk mencari orang di tengah daftar.',
      impactRisk: 'Browser freeze/crash karena me-render ribuan DOM elements bersamaan, UX yang tidak layak operasional, dan HR Generalist tidak dapat melakukan bulk triage atau perbandingan antar Job Family.',
      symptoms: [
        'Tidak ada kemampuan sorting dinamis berdasarkan Nama, NIK, Job Family, atau Skor AI Exposure.',
        'Menu "People" dan "List Employee" dipisah secara artifisial, membingungkan pengguna antara melihat direktori dan melihat profil.',
        'Pencarian nama membutuhkan reload lambat dan tidak mendukung multi-filter regional UP3.',
      ],
      visualType: 'broken_pagination',
    },
    solution: {
      title: '60fps Virtualized Data Grid: Merged Directory + Instant Side-Sheet Inspector',
      description:
        'Meridian menyatukan menu People & Directory ke dalam satu dashboard virtualized data grid berkinerja tinggi. Hanya merender row yang terlihat di layar (windowing buffer) sehingga 6.000+ data berjalan mulus tanpa lag, lengkap dengan sorting instan by Job Family, multi-filter department, dan NIK search.',
      meridianAdvantage: 'Zero latency pada 6.000 data, sorting multi-kolom dalam <2ms, dan detail profil dapat dilihat via drawer tanpa kehilangan konteks baris tabel.',
      keyDeliverables: [
        'Row Virtualization Engine (Constant 58px row height dengan dynamic overscan buffer).',
        'Instant multi-column sorting: Job Family, Regional Unit, AI Exposure %, Fit Score, dan Decision.',
        'Unified view: klik baris mana pun langsung membuka Side Inspector lengkap dengan Skill Radar & Audit Trail.',
      ],
      metricBadge: '6.000 Rows @ 60 FPS · <2ms Filter Response · Unified Directory',
      visualType: 'virtualized_grid',
    },
    talkingPoints: [
      'Navigasi next-prev untuk 6.000 karyawan adalah cacat desain fatal — pencarian satu nama bisa memakan waktu berjam-jam.',
      'Meridian menyatukan Employee Directory dan Profile View dalam satu Virtual Grid 60fps dengan pencarian instan, filter Job Family, dan preview drawer.',
    ],
  },
  {
    id: 'slide-gap-3',
    badge: 'Critical Gap #3 · Financial Economics',
    title: 'Biaya Reskilling Rp 8,5jt - Rp 10jt: Angka Gaib vs. Model Terinci',
    subtitle: 'Membongkar Angka Lump Sum Menjadi 5 Komponen Biaya Per-Kapita yang Lolos Audit Finansial BPK',
    category: 'Economics',
    targetTab: 'learning',
    bolong: {
      title: 'Angka Anggaran Rp 8,5jt - Rp 10jt Tanpa Rincian Komponen Biaya',
      description:
        'Dokumen requirements menyebutkan angka reskilling Rp 8,5 juta hingga Rp 10 juta per orang tanpa ada penjelasan bagaimana angka ini dihitung: apakah mencakup sertifikasi BNSP, sewa simulator gardu, akomodasi, atau sekadar biaya langganan e-learning video?',
      impactRisk: 'Penolakan oleh Komite Audit / BPK karena penggelembungan biaya tanpa dasar unit-rate yang jelas, atau kehabisan anggaran di tengah jalan karena biaya lab praktik belum dihitung.',
      symptoms: [
        'Tidak ada breakdown antara Fixed Cost (lisensi platform LMS) dan Variable Cost (honor instruktur sertifikasi, alat K3).',
        'Biaya dipukul rata sama untuk peran teknis tinggi (Teknisi PLTS 12 minggu) maupun peran transisi administratif (Customer Data 4 minggu).',
        'Tidak ada kalkulasi Return on Investment (ROI) maupun Payback Period yang dapat dipertanggungjawabkan ke CFO.',
      ],
      visualType: 'arbitrary_budget',
    },
    solution: {
      title: 'Auditable 5-Tier Per-Capita Cost Architecture (Rata-rata Rp 9,0 Juta / Kapita)',
      description:
        'Meridian merumuskan model biaya berbasis aktivitas (Activity-Based Costing) transparan yang membagi Rp 9,0 Juta ke dalam 5 pos pengeluaran riil dengan acuan harga pasar industri ketenagakerjaan dan asosiasi energi terbarukan.',
      meridianAdvantage: 'Setiap Rupiah dapat diverifikasi, disesuaikan berdasarkan durasi jalur (4 s/d 12 minggu), dan terbukti menghasilkan payback 11,4 bulan dibanding biaya pesangon.',
      keyDeliverables: [
        '1. Hardware Lab & Hands-on Simulator (Rp 3,2 Juta · 35,6%) - Sewa bench uji smart meter & inverter.',
        '2. Certified Lead Assessor Honorarium (Rp 2,8 Juta · 31,1%) - Uji kompetensi resmi BNSP / SKKNI.',
        '3. Enterprise LMS & Interactive Content (Rp 1,2 Juta · 13,3%) - Lisensi kurikulum digital adaptif.',
        '4. On-the-Job (OJT) Field Mentorship (Rp 1,3 Juta · 14,4%) - Alokasi jam kerja mentor senior UP3.',
        '5. Safety Gear & Incident Contingency (Rp 0,5 Juta · 5,6%) - APD kelistrikan & asuransi pelatihan.',
      ],
      metricBadge: 'Rp 9,0 Jt/Kapita Terinci · Payback 11,4 Bulan · Lolos Standar Audit',
      visualType: 'cost_itemization',
    },
    talkingPoints: [
      'Dokumen lama tidak punya jawaban atas asal-usul angka Rp 9 juta; Meridian memberi breakdown 5 pos biaya yang konkret dan terverifikasi vendor rate card.',
      'Investasi Rp 9 juta per orang ini menghemat biaya pesangon rata-rata Rp 48 juta per orang, dengan net economic value Rp 84,6 Miliar bagi korporasi.',
    ],
  },
  {
    id: 'slide-gap-4',
    badge: 'Critical Gap #4 · Decision Engine',
    title: 'What-If Decision Simulator: Jargon vs. Mathematical Engine',
    subtitle: 'Mengapa Simulator Diperlukan dan Bagaimana Variabel Sensitivitas Melindungi Perusahaan dari Gejolak Sosial',
    category: 'Algorithms',
    targetTab: 'decision',
    bolong: {
      title: 'Simulator "What-If" Hanya Disebut Sebagai Buzzword Tanpa Formulasi',
      description:
        'Dokumen requirements menyebutkan "What-If Decision Engine Simulator" namun tidak menjelaskan apa tujuannya, parameter apa yang bisa diubah, serta apa dampaknya terhadap alokasi karyawan lapangan. Stakeholder mengira ini hanya grafik kosmetik.',
      impactRisk: 'Manajemen tidak dapat memprediksi lonjakan biaya jika cutoff exposure dinaikkan dari 70% ke 80%, atau potensi pemogokan tenaga kerja jika ribuan karyawan dipaksa masuk kategori Voluntary Transition tanpa opsi reskilling.',
      symptoms: [
        'Tidak ada parameter threshold AI Exposure (apakah pekerjaan yang 75% terotomasi langsung dialihkan atau di-augmentasi?).',
        'Tidak ada batasan toleransi kesiapan geografis (apakah teknisi Cimahi bersedia dipindah ke Cirebon?).',
        'Keputusan perpindahan peran rentan digugat karena tidak memiliki penjelasan logika rule-by-rule yang obyektif.',
      ],
      visualType: 'blackbox_simulator',
    },
    solution: {
      title: 'Deterministic Multi-Variable Sensitivity Engine dengan 5 Jalur Transisi',
      description:
        'Meridian merancang What-If Simulator sebagai strategic sandbox: memungkinkan CHRO dan General Manager mengubah threshold cutoff AI exposure, bobot kecocokan kapabilitas, dan budget ceiling secara live untuk melihat pergeseran makro 6.000 karyawan secara instan.',
      meridianAdvantage: 'Simulasi real-time tanpa mengubah data produksi, dilengkapi explainable rule code (Rule #1 hingga #8) yang adil dan transparan.',
      keyDeliverables: [
        'Live Threshold Sliders: Exposure Cutoff (50-90%), Minimum Fit Threshold (40-80%), Reskill Pass Rate.',
        'Dynamic Macro Redistribution: Real-time update jumlah karyawan pada 5 kategori keputusan resmi.',
        'Explainable Decision Rules: Setiap rekomendasi memiliki Rule Code dan penjelasan obyektif yang dapat dibaca karyawan.',
      ],
      metricBadge: 'Real-Time Macro Sensitivity · Rule #1-#8 Explained · Fair AI',
      visualType: 'what_if_engine',
    },
    talkingPoints: [
      'Simulator What-If bukan sekadar gimmick — fungsinya memberi kontrol penuh atas skenario, misalnya dampak jika adopsi Smart Meter dipercepat 6 bulan.',
      'Meridian memungkinkan pengujian skenario optimis vs pesimis dalam hitungan detik, lengkap dengan proyeksi anggaran dan pergeseran kategori secara presisi.',
    ],
  },
  {
    id: 'slide-gap-5',
    badge: 'Critical Gap #5 · Competency Governance',
    title: 'Pencocokan Peran Naif vs. 4-Tier Hierarchy of Evidence',
    subtitle: 'Mencegah Salah Penempatan Akibat Menganggap Klaim Diri Karyawan Sama dengan Kualifikasi Teruji',
    category: 'Architecture',
    targetTab: 'capabilities',
    bolong: {
      title: 'Asumsi Berbahaya: Menganggap Self-Report Sama dengan Kemampuan Lapangan',
      description:
        'Dokumen legacy menyamakan semua data skill tanpa memperhatikan sumbernya: data self-survey tahun 2021 diperlakukan sama bobotnya dengan sertifikasi K3 yang baru diuji bulan lalu. Tidak ada filter skill decay (penurunan keahlian seiring waktu).',
      impactRisk: 'Karyawan ditempatkan pada peran berisiko tinggi (misal: Maintenance Gardu PLTS) berdasarkan data lama yang sudah tidak valid, memicu risiko kecelakaan kerja fatal dan pelanggaran standar keselamatan K3.',
      symptoms: [
        'Tidak ada pembedaan antara skill yang "Terukur" (Measured) vs skill yang "Diinferensikan" (Inferred).',
        'Data kosong (missing value) dianggap sebagai nilai nol atau justru dilewati begitu saja tanpa safety-net.',
        'Karyawan dengan nilai historis pre-2023 dipromosikan ke peran baru tanpa assessment ulang.',
      ],
      visualType: 'stale_skills',
    },
    solution: {
      title: '4-Tier Evidence Hierarchy (High, Medium, Low, Unknown) & Safety-Net Triage',
      description:
        'Meridian menerapkan tata kelola bukti kompetensi yang ketat: setiap skill diberi atribut Type dengan baseline confidence kebijakan (Measured 0.90 vs Inferred 0.65) yang lalu dikalibrasi per-skill berdasarkan recency & kualitas sumber — bukan angka statis, tapi titik awal yang bisa ditelusuri sampai ke skor aktual tiap karyawan. Jika data tidak lengkap, mesin secara etis merekomendasikan "Further Assessment" (Rule #1) demi keselamatan kerja.',
      meridianAdvantage: 'Prinsip Zero-Hallucination: tidak pernah menempatkan orang pada risiko fatal hanya berdasarkan asumsi data yang usang.',
      keyDeliverables: [
        'Evidence Level Matrix: High (Uji Praktik <12 Bln), Medium (LMS + OJT), Low (Self-Survey), Unknown (Data Kosong).',
        'Automated Decay Flag: Menandai skor sertifikasi pre-2023 yang wajib melalui verifikasi ulang.',
        'Ethical Safety-Net: Karyawan tanpa data langsung diproteksi di jalur assessment tanpa pemotongan status.',
      ],
      metricBadge: 'Zero Safety Violation · 4-Level Evidence Tier · Auditable Proof',
      visualType: 'evidence_hierarchy',
    },
    talkingPoints: [
      'Di sektor energi dan kelistrikan, salah menempatkan orang bukan sekadar inefisiensi — ini menyangkut keselamatan kerja (K3).',
      'Hierarki Bukti Meridian memastikan hanya bukti terukur yang membuka jalur penempatan langsung (Redeploy); data kadaluwarsa dialihkan ke asesmen ulang.',
    ],
  },
  {
    id: 'slide-gap-6',
    badge: 'Critical Gap #6 · Operational Execution',
    title: 'Ketiadaan Roadmap Implementasi vs. 90-Day Execution Playbook',
    subtitle: 'Rencana Kerja 12 Minggu Terstruktur Melibatkan Serikat Pekerja, Pilot UP3, dan Evaluasi Dewan Direksi',
    category: 'Execution',
    targetTab: 'roadmap',
    bolong: {
      title: 'Dokumen Berhenti di Teori Tanpa Petunjuk Operasional Lapangan',
      description:
        'Dokumen requirements tidak memiliki rencana peluncuran bertahap: tidak ada protokol mitigasi gejolak serikat pekerja (SP PLN), tidak ada jadwal pembersihan data NIK, dan tidak ada kriteria keberhasilan (success gate) untuk pilot.',
      impactRisk: 'Transformasi macet di level sosialisasi, penolakan masif dari serikat pekerja regional, dan kebingungan manajer unit UP3 tentang apa yang harus dilakukan pada hari Senin pertama.',
      symptoms: [
        'Tidak ada pembagian fase antara Persiapan Tata Kelola, Pilot Regional, dan Rollout Nasional.',
        'Tidak ada RACI matrix antara tim Human Capital Kantor Pusat dengan General Manager Unit Induk Distribusi (UID).',
        'Tidak ada target metrik kuantitatif per 30 hari untuk mengukur apakah adopsi berjalan sesuai rencana.',
      ],
      visualType: 'vague_timeline',
    },
    solution: {
      title: 'Phased 90-Day Implementation Playbook dengan Gate Review & Union Alignment',
      description:
        'Meridian menyediakan panduan operasional 12 minggu yang terbagi dalam 3 sprint utama: Sprint 1 (Data Cleanse & NIK Mesh), Sprint 2 (Pilot UP3 Bandung 350 Orang & Assessor Onboarding), dan Sprint 3 (Scaling 6.000 Karyawan & Board Review).',
      meridianAdvantage: 'Jadwal kerja realistis dengan pelibatan serikat pekerja sejak minggu pertama, menjamin zero industrial conflict selama masa transisi.',
      keyDeliverables: [
        'Bulan 1 (Hari 1-30): Single Identity Mesh integration, NIK cleaning, dan kesepakatan bersama Serikat Pekerja.',
        'Bulan 2 (Hari 31-60): Kick-off Pilot UP3 Bandung (350 teknisi), aktivasi simulator lab, dan baseline assessment.',
        'Bulan 3 (Hari 61-90): Evaluasi pilot, fine-tuning decision engine weights, dan persetujuan rollout 6.000 nasional.',
      ],
      metricBadge: '12-Week Playbook · 3 Phase Gates · SP PLN Alignment Charter',
      visualType: 'phased_playbook',
    },
    talkingPoints: [
      'Strategi secanggih apa pun berisiko gagal tanpa dukungan lapangan; roadmap 90 hari Meridian menjadikan dialog serikat pekerja dan pilot regional sebagai prasyarat wajib.',
      'Roadmap ini memberi kepastian langkah mingguan yang terukur hingga pelaporan ke Dewan Komisaris.',
    ],
  },
  {
    id: 'slide-gap-7',
    badge: 'Critical Gap #7 · Consulting Scalability',
    title: 'One-Off Deliverable vs. Reusable Transformation Method',
    subtitle: 'Bagaimana Meridian Menjadi Kerangka Kerja yang Dipakai Ulang untuk Klien Berikutnya, Bukan Proyek Sekali Pakai',
    category: 'Strategic',
    targetTab: 'decision',
    bolong: {
      title: 'Nilai Konsultasi yang Habis Begitu Satu Klien Selesai',
      description:
        'Menyelesaikan satu kasus transformasi dengan baik tidak otomatis berarti punya metode yang scalable. Jika threshold Decision Engine, model bukti kompetensi, dan playbook implementasi harus dibangun ulang dari nol untuk setiap klien baru, maka yang dijual bukan produk atau IP — hanya jam kerja konsultan per proyek, dan margin konsultasi tetap linear terhadap jumlah klien.',
      impactRisk: 'Biaya delivery tidak menurun seiring skala portofolio klien, waktu onboarding klien baru tetap ~12 minggu setiap kali, dan kualitas hasil bergantung pada individu konsultan yang menangani, bukan pada sistem yang terstandardisasi dan bisa diwariskan ke konsultan lain.',
      symptoms: [
        'Threshold Decision Engine (fit ≥ 75%, evidence Low/Unknown, dst.) di-hardcode khusus konteks satu klien, tanpa parameter yang bisa dikalibrasi ulang.',
        'Evidence hierarchy dan playbook 90-hari ditulis melekat pada konteks UU Ketenagakerjaan & Serikat Pekerja BUMN spesifik, belum dipisah dari struktur intinya yang generik.',
        'Tidak ada dokumentasi eksplisit "apa yang tetap dipakai" vs "apa yang harus di-discover ulang" untuk klien kedua, ketiga, dst.',
      ],
      visualType: 'vague_timeline',
    },
    solution: {
      title: 'Core Engine Reusable + Client Configuration Layer — Meridian sebagai Starting Kit',
      description:
        'Meridian dipisah menjadi dua layer sejak desain awal: (1) Core Engine yang reusable — 5-rule Decision Engine, 4-tier Evidence Hierarchy, dan struktur playbook 3-sprint — dan (2) Client Configuration Layer yang di-discover ulang tiap engagement: threshold spesifik, job architecture, formula kompensasi lokal, dan konteks regulasi/serikat pekerja setempat. Klien kedua tidak mulai dari nol; mereka mulai dari kalibrasi.',
      meridianAdvantage: 'Estimasi waktu onboarding klien baru turun dari ~12 minggu (build-from-scratch) menjadi ~4 minggu (configure core + discover client layer) — logic inti, model evidence, dan struktur playbook dipakai ulang; hanya parameter yang berganti per klien.',
      keyDeliverables: [
        'Core Engine Library: 5-rule Decision Engine dengan threshold yang dapat dikonfigurasi per industri/klien.',
        'Evidence Governance Framework: 4-tier hierarchy generik yang dapat dipetakan ke sumber data HRIS klien apa pun.',
        'Client Onboarding Checklist: daftar eksplisit apa yang sudah baked-in vs apa yang wajib di-discover ulang (job architecture, regulasi tenaga kerja lokal, struktur serikat pekerja/hubungan industrial).',
      ],
      metricBadge: '~4-Minggu Client Onboarding (vs 12-Minggu Build-from-Scratch) · Core Reusable + Layer Configurable',
      visualType: 'reusable_core',
    },
    talkingPoints: [
      'Ini bukan cuma soal menyelesaikan satu kasus dengan baik — ini soal apakah metodenya punya IP yang scalable ke portofolio klien, bukan proyek konsultasi yang nilainya linear terhadap jam kerja per klien.',
      'Meridian didesain dengan pemisahan core-vs-config dari hari pertama, supaya klien kedua, ketiga, dan kelima bisa onboarding dalam hitungan minggu, bukan bulan.',
    ],
  },
  {
    id: 'slide-business-case',
    badge: 'Business Case & Financial Summary',
    title: 'Perbandingan Finansial: Status Quo Pesangon vs. Meridian Redeployment',
    subtitle: 'Bagaimana Investasi Pelatihan Rp 54 Miliar Menghasilkan Penghematan Bersih Rp 84,6 Miliar bagi Perusahaan',
    category: 'Economics',
    targetTab: 'impact',
    bolong: {
      title: 'Status Quo: Biaya Pesangon Masif & Kehilangan Modal Insani',
      description:
        'Jika perusahaan melakukan pemutusan hubungan kerja terhadap 4.680 karyawan lapangan yang terdampak otomasi smart meter (tanpa reskilling), rata-rata pesangon dan kompensasi PHK mencapai Rp 48 Juta per orang.',
      impactRisk: 'Beban cash-out langsung sebesar Rp 224,6 Miliar, hilangnya loyalitas karyawan, rusaknya reputasi BUMN, serta risiko mogok kerja massal di seluruh gardu distribusi listrik.',
      symptoms: [
        'Total pengeluaran pesangon 4.680 orang: Rp 224,6 Miliar hangus tanpa aset tersisa.',
        'Perusahaan harus merekrut kembali tenaga baru dari luar untuk mengisi peran Renewable & Smart Grid dengan biaya rekrutmen mahal.',
        'Kerusakan hubungan industrial dengan serikat pekerja yang membutuhkan waktu bertahun-tahun untuk pulih.',
      ],
      visualType: 'arbitrary_budget',
    },
    solution: {
      title: 'Solusi Meridian: Reskill & Redeploy 78% Karyawan dengan Penghematan Rp 84,6 Miliar',
      description:
        'Dengan menginvestasikan Rp 9,0 Juta per kapita untuk melatih 6.000 karyawan ke dalam peran-peran masa depan (Teknisi Smart Meter, Operator Microgrid, Analis Data Pelanggan), perusahaan hanya mengeluarkan biaya reskilling Rp 54 Miliar, menghemat Rp 84,6 Miliar dibanding pesangon murni.',
      meridianAdvantage: 'Net Financial Benefit Rp 84,6 Miliar, 4.680 talenta dipertahankan, dan kepatuhan penuh terhadap mandat ESG & tata kelola ketenagakerjaan BUMN.',
      keyDeliverables: [
        'Investasi Reskilling Total: Rp 54,0 Miliar (6.000 karyawan @ Rp 9,0 Jt).',
        'Biaya Pesangon Dihindari (Severance Avoidance): Rp 138,6 Miliar.',
        'Penghematan Bersih (Net Economic ROI): Rp 84,6 Miliar (Payback 11,4 Bulan).',
        'Retensi Modal Insani: 78% karyawan beralih ke peran nilai tambah tinggi dalam 12 bulan.',
      ],
      metricBadge: '+Rp 84,6 Miliar Net Value · 78% Retensi Karyawan · ESG Compliant',
      visualType: 'cost_itemization',
    },
    talkingPoints: [
      'Secara finansial, Meridian adalah value generator, bukan cost center — menghemat kas perusahaan Rp 84,6 Miliar sekaligus menjaga keharmonisan sosial.',
      'Karyawan berpengalaman tidak dilepas, melainkan di-upgrade keahliannya untuk menyongsong era energi terbarukan.',
    ],
  },
  {
    id: 'slide-action-plan',
    badge: 'Executive Recommendation & Next Steps',
    title: 'Rekomendasi Keputusan Dewan Direksi & Langkah Konkret',
    subtitle: '3 Keputusan Utama yang Dibutuhkan Hari Ini untuk Mengamankan Keberhasilan Transformasi',
    category: 'Execution',
    targetTab: 'roadmap',
    bolong: {
      title: 'Kelemahan Rekomendasi Biasa: Tidak Ada Keputusan yang Dapat Ditandatangani',
      description:
        'Banyak presentasi konsultan berakhir dengan saran normatif yang tidak operasional: "perlu komunikasi yang baik" atau "perlu peningkatan budaya". Tidak ada mandate yang jelas bagi tim eksekutor.',
      impactRisk: 'Proyek terbengkalai selama berbulan-bulan menunggu koordinasi antar-divisi yang tak kunjung selesai.',
      symptoms: [
        'Tidak ada SK Direksi pembentukan tim lintas fungsi (HC, Operasi Distribusi, Keuangan).',
        'Tidak ada alokasi anggaran awal untuk pembersihan data NIK dan pilot project.',
        'Tidak ada tenggat waktu penandatanganan Piagam Transformasi dengan Serikat Pekerja.',
      ],
      visualType: 'vague_timeline',
    },
    solution: {
      title: '3 Mandat Keputusan Direksi Siap Tanda Tangan',
      description:
        'Kami mengusulkan 3 keputusan strategis untuk disahkan dalam Rapat Direksi hari ini guna memastikan eksekusi berjalan tanpa hambatan birokrasi.',
      meridianAdvantage: 'Rekomendasi konkret dengan template SK, anggaran pilot terukur, dan jadwal kerja yang siap dijalankan mulai Senin depan.',
      keyDeliverables: [
        '1. Pengesahan NIK 16-Digit Master Data Mesh: Menginstruksikan integrasi data SAP HCM, Moodle, dan Taleo dalam sprint 30 hari.',
        '2. Persetujuan Anggaran Pilot UP3 Bandung (Rp 3,15 Miliar): Pelatihan 350 teknisi lapangan gelombang pertama.',
        '3. Pembentukan Komite Bersama HC-Serikat Pekerja (SP PLN): Memastikan transparansi aturan keputusan (Rule #1-#8).',
      ],
      metricBadge: 'Ready for Board Approval · Pilot Budget Rp 3,15 M · Day-1 Ready',
      visualType: 'phased_playbook',
    },
    talkingPoints: [
      'Proposal ini siap ditindaklanjuti — persetujuan atas tiga keputusan ini memungkinkan tim mulai bekerja sejak Senin pagi.',
      'Meridian mendukung penuh seluruh rangkaian implementasi, menjadikan transformasi tenaga kerja ini best practice nasional di sektor BUMN.',
    ],
  },
];

export const ExecutiveDeckView: React.FC<ExecutiveDeckViewProps> = ({ onNavigate }) => {
  const { addToast } = useToast();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [viewMode, setViewMode] = useState<'side-by-side' | 'solution-only' | 'bolong-only'>('side-by-side');
  const [copiedNote, setCopiedNote] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Interactive Micro-simulator state inside slides
  const [interactiveNikInput, setInteractiveNikInput] = useState('3201142908870001');
  const [interactiveNikMatch, setInteractiveNikMatch] = useState({
    sapId: 'SAP-88391',
    moodleId: 'ahmad_sub',
    status: 'MATCHED 99.4%',
    name: 'Ahmad Subagyo',
    unit: 'UP3 Bandung',
  });
  const [interactiveThreshold, setInteractiveThreshold] = useState(70);
  const [interactiveCostBudget, setInteractiveCostBudget] = useState(9.0);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentSlide = SLIDES[currentSlideIndex];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.min(SLIDES.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().catch(() => {});
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  const handleCopyTalkingPoints = () => {
    const text = currentSlide.talkingPoints.join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedNote(true);
    addToast({ title: 'Kesimpulan Tersalin', message: 'Ringkasan slide disalin ke clipboard.', type: 'success' });
    setTimeout(() => setCopiedNote(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      ref={containerRef}
      className={`space-y-6 transition-all ${
        isFullscreen ? 'fixed inset-0 z-50 bg-slate-900 text-white overflow-y-auto p-6' : 'pb-16'
      }`}
    >
      {/* Top Deck Presentation Toolbar */}
      <div
        className={`flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl border transition-all ${
          isFullscreen
            ? 'bg-slate-800/90 border-slate-700 text-white shadow-xl'
            : 'bg-white border-slate-200/90 shadow-xs'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-xs">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold tracking-tight">
                Executive Presentation Deck & Gap Analysis
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                Boardroom Ready
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Analisis Komparatif: 6 Pain Point Dokumen Klien vs. Solusi Meridian
            </p>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-slate-100 rounded-lg p-1 border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('side-by-side')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'side-by-side'
                  ? 'bg-white text-blue-700 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setViewMode('bolong-only')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'bolong-only'
                  ? 'bg-red-50 text-red-700 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pain Point Klien
            </button>
            <button
              onClick={() => setViewMode('solution-only')}
              className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                viewMode === 'solution-only'
                  ? 'bg-emerald-50 text-emerald-700 shadow-2xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Solusi Meridian
            </button>
          </div>

          {/* Generate to Google Slides Button */}
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white shadow-xs border border-amber-600 active:scale-95 cursor-pointer"
            title="Generate & Ekspor ke Google Slides (dapat diedit di Google Slides)"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-100" />
            <span>Generate to Google Slides</span>
          </button>

          {/* Toggle Notes */}
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all flex items-center gap-1.5 ${
              showNotes
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
            title="Toggle Kesimpulan"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Kesimpulan</span>
          </button>

          {/* Print / Export */}
          <button
            onClick={handlePrint}
            className="p-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-xs flex items-center gap-1"
            title="Cetak atau Simpan sebagai PDF"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all text-xs flex items-center gap-1"
            title="Toggle Layar Penuh (Tekan 'F')"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Slide Carousel Navigator Header */}
      <div className="flex items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs flex items-center gap-1 text-xs font-medium"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Sebelumnya</span>
          </button>

          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 border border-blue-200">
            Slide {currentSlideIndex + 1} dari {SLIDES.length}
          </span>

          <button
            onClick={() => setCurrentSlideIndex((prev) => Math.min(SLIDES.length - 1, prev + 1))}
            disabled={currentSlideIndex === SLIDES.length - 1}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-2xs flex items-center gap-1 text-xs font-medium"
          >
            <span className="hidden sm:inline">Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Slide Selection Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 hidden md:inline">Pilih Topik:</span>
          <select
            value={currentSlideIndex}
            onChange={(e) => setCurrentSlideIndex(Number(e.target.value))}
            className="text-xs font-semibold bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 shadow-2xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden max-w-xs truncate"
          >
            {SLIDES.map((s, idx) => (
              <option key={s.id} value={idx}>
                {idx + 1}. {s.badge} - {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Progress Dots / Bar */}
      <div className="grid grid-cols-8 gap-1.5 px-1">
        {SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`h-2 rounded-full transition-all ${
              idx === currentSlideIndex
                ? 'bg-blue-600 ring-2 ring-blue-300'
                : idx < currentSlideIndex
                ? 'bg-blue-300'
                : 'bg-slate-200 hover:bg-slate-300'
            }`}
            title={`Slide ${idx + 1}: ${s.badge}`}
          />
        ))}
      </div>

      {/* MAIN SLIDE STAGE */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Slide Title Banner */}
        <div className="px-6 py-5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="space-y-1 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30">
                {currentSlide.badge}
              </span>
              <span className="text-xs text-slate-400">· Kategori: {currentSlide.category}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-snug">
              {currentSlide.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentSlide.subtitle}
            </p>
          </div>

          {currentSlide.targetTab && (
            <button
              onClick={() => onNavigate(currentSlide.targetTab!)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all shadow-sm shrink-0"
            >
              <span>Buka Modul Langsung di Meridian</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Visual Comparison Body */}
        <div className="p-6">
          <div
            className={`grid gap-6 ${
              viewMode === 'side-by-side'
                ? 'grid-cols-1 lg:grid-cols-2'
                : 'grid-cols-1'
            }`}
          >
            {/* COLUMN 1: THE BOLONG (Celah & Kelemahan Dokumen Klien / Legacy) */}
            {(viewMode === 'side-by-side' || viewMode === 'bolong-only') && (
              <div className="rounded-xl border-2 border-red-200 bg-red-50/30 p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-red-200/80">
                    <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
                      <div className="w-6 h-6 rounded-md bg-red-100 flex items-center justify-center text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                      </div>
                      <span>PAIN POINT DOKUMEN KLIEN</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-red-100 text-red-800 uppercase tracking-wide">
                      Legacy Risk Alert
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-red-950 leading-snug">
                    {currentSlide.bolong.title}
                  </h3>

                  <p className="text-xs text-red-900 leading-relaxed">
                    {currentSlide.bolong.description}
                  </p>

                  {/* Impact Risk Callout */}
                  <div className="p-3 rounded-lg bg-red-100/80 border border-red-300 text-xs text-red-900 flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Konsekuensi Risiko:</span> {currentSlide.bolong.impactRisk}
                    </div>
                  </div>

                  {/* Symptoms List */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-red-900 uppercase tracking-wider">
                      Fakta Masalah di Dokumen/SOP Klien:
                    </span>
                    <ul className="space-y-1 text-xs text-red-800">
                      {currentSlide.bolong.symptoms.map((sym, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-red-500 font-bold shrink-0">✕</span>
                          <span>{sym}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Visual Representation of the "Bolong" (Screenshot Mockup) */}
                <div className="pt-3 border-t border-red-200/80">
                  <div className="text-[10px] font-bold text-red-800 mb-2 uppercase tracking-wider flex items-center justify-between">
                    <span>Visualisasi Masalah (Legacy SOP / Old UI Mockup):</span>
                    <span className="text-red-600 font-mono">BROKEN / UNMANAGED</span>
                  </div>

                  {/* Render Visual based on slide */}
                  <LegacyVisualMockup visualType={currentSlide.bolong.visualType} />
                </div>
              </div>
            )}

            {/* COLUMN 2: THE MERIDIAN SOLUTION (Solusi & Bukti Visual Dashboard) */}
            {(viewMode === 'side-by-side' || viewMode === 'solution-only') && (
              <div className="rounded-xl border-2 border-blue-200 bg-blue-50/20 p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  {/* Header Badge */}
                  <div className="flex items-center justify-between gap-2 pb-3 border-b border-blue-200/80">
                    <div className="flex items-center gap-2 text-blue-900 font-bold text-sm">
                      <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center text-blue-700">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <span>SOLUSI NYATA MERIDIAN PROJECT</span>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                      {currentSlide.solution.metricBadge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {currentSlide.solution.title}
                  </h3>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    {currentSlide.solution.description}
                  </p>

                  {/* Meridian Advantage Callout */}
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold">Keunggulan Meridian:</span>{' '}
                      {currentSlide.solution.meridianAdvantage}
                    </div>
                  </div>

                  {/* Key Deliverables List */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                      Fitur Solusi yang Dibangun & Terbukti di Meridian:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {currentSlide.solution.keyDeliverables.map((del, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 font-bold shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Visual Representation of Meridian Dashboard Solution */}
                <div className="pt-3 border-t border-blue-200/80">
                  <div className="text-[10px] font-bold text-blue-900 mb-2 uppercase tracking-wider flex items-center justify-between">
                    <span>Visualisasi Solusi di Dashboard Meridian:</span>
                    <span className="text-blue-700 font-mono">LIVE / INTERACTIVE</span>
                  </div>

                  {/* Render Visual Solution */}
                  <MeridianVisualMockup
                    visualType={currentSlide.solution.visualType}
                    onNavigate={onNavigate}
                    targetTab={currentSlide.targetTab}
                    interactiveNikInput={interactiveNikInput}
                    setInteractiveNikInput={setInteractiveNikInput}
                    interactiveNikMatch={interactiveNikMatch}
                    interactiveThreshold={interactiveThreshold}
                    setInteractiveThreshold={setInteractiveThreshold}
                    interactiveCostBudget={interactiveCostBudget}
                    setInteractiveCostBudget={setInteractiveCostBudget}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* KESIMPULAN DRAWER */}
        {showNotes && (
          <div className="border-t border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-blue-700" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Kesimpulan
                </span>
              </div>
              <button
                onClick={handleCopyTalkingPoints}
                className="text-[11px] font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 transition-colors"
              >
                {copiedNote ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedNote ? 'Tersalin' : 'Salin Kesimpulan'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700 leading-relaxed bg-white p-3.5 rounded-lg border border-slate-200">
              {currentSlide.talkingPoints.map((pt, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p>{pt}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QUICK THUMBNAIL MATRIX (Bottom Deck Quick Access) */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-slate-600" />
            Daftar Slide Lengkap (Executive Gap Matrix)
          </span>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-slate-500">
              Klik slide untuk presentasi instan atau tinjauan mendalam
            </span>
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-lg border border-amber-200 transition-colors flex items-center gap-1.5"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Generate Google Slides</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`p-2.5 rounded-lg text-left border transition-all flex flex-col justify-between h-24 ${
                idx === currentSlideIndex
                  ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-400/50 shadow-2xs'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white'
              }`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-mono font-bold text-slate-500">#{idx + 1}</span>
                <span className="text-[9px] px-1 rounded bg-slate-100 text-slate-700 font-semibold truncate max-w-[60px]">
                  {slide.category}
                </span>
              </div>
              <div className="text-[11px] font-bold text-slate-800 line-clamp-2 leading-tight">
                {slide.title.replace('Project Meridian: ', '').replace('Critical Gap #', 'Gap #')}
              </div>
              <div className="text-[9px] text-blue-600 font-semibold truncate">
                {slide.badge}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Export to Google Slides Modal */}
      <ExportGoogleSlidesModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        slides={SLIDES}
      />
    </div>
  );
};

/* =========================================================================
 * SUB-COMPONENTS: VISUAL MOCKUPS FOR "THE BOLONG" & "THE MERIDIAN SOLUTION"
 * ========================================================================= */

interface LegacyVisualMockupProps {
  visualType: DeckSlide['bolong']['visualType'];
}

const LegacyVisualMockup: React.FC<LegacyVisualMockupProps> = ({ visualType }) => {
  if (visualType === 'legacy_excel') {
    return (
      <div className="bg-white rounded-lg border border-red-200 p-3 font-mono text-[11px] text-slate-700 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-red-100 text-red-600 font-bold">
          <div className="flex items-center gap-1.5">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Rekap_Karyawan_Lapangan_2023_rev4_FINAL(1).xlsx</span>
          </div>
          <span className="bg-red-100 text-red-800 px-1.5 py-0.5 rounded">Silo Error: 4 Keys Mismatch</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[10px]">
            <thead>
              <tr className="bg-red-50/70 text-red-900 border-b border-red-200">
                <th className="p-1">Nama (Excel)</th>
                <th className="p-1">SAP ID</th>
                <th className="p-1">LMS Moodle</th>
                <th className="p-1">Taleo ATS</th>
                <th className="p-1">NIK KTP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-100">
              <tr>
                <td className="p-1 font-bold text-red-700">Ahmad S. (Cimahi)</td>
                <td className="p-1 text-slate-600">88391</td>
                <td className="p-1 text-slate-600">ahmad_sub</td>
                <td className="p-1 text-amber-600 font-bold">MISSING!</td>
                <td className="p-1 text-red-500 font-bold">-- KOSONG --</td>
              </tr>
              <tr>
                <td className="p-1 font-bold text-red-700">Bambang Haryanto</td>
                <td className="p-1 text-slate-600">99120</td>
                <td className="p-1 text-amber-600 font-bold">bambang.h@g...</td>
                <td className="p-1 text-slate-600">TAL-4491</td>
                <td className="p-1 text-red-500 font-bold">3201-SALAH-FORMAT</td>
              </tr>
              <tr>
                <td className="p-1 font-bold text-red-700">Siti Nurhaliza (Sby)</td>
                <td className="p-1 text-red-600 font-bold">DUPLIKAT (2x)</td>
                <td className="p-1 text-slate-600">siti_sby_01</td>
                <td className="p-1 text-amber-600 font-bold">UNLINKED</td>
                <td className="p-1 text-red-500 font-bold">-- KOSONG --</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="p-1.5 rounded bg-red-100/80 text-[10px] text-red-900 flex items-center gap-1.5">
          <AlertTriangle className="w-3 h-3 text-red-700 shrink-0" />
          <span>Hasil: Data sertifikasi K3 & pelatihan hilang saat proses mutasi jabatan.</span>
        </div>
      </div>
    );
  }

  if (visualType === 'broken_pagination') {
    return (
      <div className="bg-white rounded-lg border border-red-200 p-3 text-[11px] text-slate-700 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-red-100 text-red-700 font-bold">
          <span>Old UI Assumption: Carousel Kiri-Kanan (1 Profil per Layar)</span>
          <span className="bg-red-100 px-1.5 py-0.5 rounded">6.000 Rows Crash</span>
        </div>
        <div className="p-3 bg-red-50 rounded-lg border border-red-200 flex flex-col items-center justify-center text-center space-y-2">
          <div className="text-red-700 text-xs font-bold">
            Karyawan 1 dari 6.000 (EMP-0001: Joko Widodo)
          </div>
          <div className="flex items-center gap-4 text-xs font-bold text-slate-600">
            <button className="px-3 py-1 rounded bg-slate-200 text-slate-400 cursor-not-allowed">
              ◀ Prev (Kiri)
            </button>
            <span className="text-[10px] text-red-600 font-mono font-bold">
              Klik 5.999x untuk melihat orang terakhir!
            </span>
            <button className="px-3 py-1 rounded bg-red-200 text-red-800">
              Next (Kanan) ▶
            </button>
          </div>
          <div className="text-[10px] text-red-600 bg-red-100 px-2 py-1 rounded">
            ⚠️ Browser Memory Leak: Me-render 6.000 DOM card tanpa virtualisasi membuat browser hang.
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'arbitrary_budget') {
    return (
      <div className="bg-white rounded-lg border border-red-200 p-3 text-[11px] text-slate-700 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-red-100 text-red-700 font-bold">
          <span>Dokumen PRD Klien: Anggaran Biaya Reskilling</span>
          <span className="bg-red-100 px-1.5 py-0.5 rounded">Tidak Lolos BPK</span>
        </div>
        <div className="p-2.5 bg-red-50 rounded border border-red-200 space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-red-950">Biaya per Orang:</span>
            <span className="font-mono font-extrabold text-red-700 text-sm">Rp 8.500.000 - Rp 10.000.000</span>
          </div>
          <p className="text-[10px] text-red-800 italic">
            "Keterangan: Biaya lumpsum perkiraan rata-rata untuk pelatihan teknisi."
          </p>
          <div className="text-[10px] text-red-900 border-t border-red-200 pt-1 space-y-0.5">
            <div>✕ Tidak ada vendor rate card resmi.</div>
            <div>✕ Tidak ada komponen sewa alat simulator smart grid.</div>
            <div>✕ Tidak ada honorarium sertifikasi BNSP resmi.</div>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'blackbox_simulator') {
    return (
      <div className="bg-white rounded-lg border border-red-200 p-3 text-[11px] text-slate-700 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-red-100 text-red-700 font-bold">
          <span>Konsep Legacy: "What-If Simulator"</span>
          <span className="bg-red-100 px-1.5 py-0.5 rounded">Black Box Jargon</span>
        </div>
        <div className="p-3 bg-red-50 rounded border border-red-200 flex flex-col items-center justify-center text-center space-y-2">
          <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center text-red-700">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="text-xs font-bold text-red-900">
            Simulator Tanpa Variabel & Tanpa Rumus
          </div>
          <p className="text-[10px] text-red-700 max-w-xs">
            Hanya berupa tombol statis "Simulasi Skenario" tanpa slider sensitivitas cutoff AI exposure, tanpa dampak budget, dan tanpa penjelasan rule audit.
          </p>
        </div>
      </div>
    );
  }

  if (visualType === 'stale_skills') {
    return (
      <div className="bg-white rounded-lg border border-red-200 p-3 text-[11px] text-slate-700 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-red-100 text-red-700 font-bold">
          <span>Data Kompetensi Legacy (Self-Survey 2021)</span>
          <span className="bg-red-100 px-1.5 py-0.5 rounded">Beresiko K3 Tinggi</span>
        </div>
        <div className="space-y-1.5 text-[10px]">
          <div className="p-1.5 rounded bg-red-50 border border-red-200 flex justify-between">
            <span>Sertifikat K3 Gardu Induk (Expired 2020)</span>
            <span className="font-bold text-red-700">Dianggap Tetap Mahir (Level 4)</span>
          </div>
          <div className="p-1.5 rounded bg-red-50 border border-red-200 flex justify-between">
            <span>Klaim Mandiri: "Bisa Instalasi PLTS"</span>
            <span className="font-bold text-red-700">Tanpa Uji Praktik Langsung</span>
          </div>
          <div className="p-1.5 rounded bg-red-100 text-red-900 text-[10px] flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-red-700 shrink-0" />
            <span>Risiko fatal: Karyawan ditugaskan di tegangan tinggi tanpa verifikasi fisik.</span>
          </div>
        </div>
      </div>
    );
  }

  // Default vague_timeline
  return (
    <div className="bg-white rounded-lg border border-red-200 p-3 text-[11px] text-slate-700 shadow-2xs space-y-2">
      <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-red-100 text-red-700 font-bold">
        <span>Timeline di PRD Klien: Tanpa Tahapan Nyata</span>
        <span className="bg-red-100 px-1.5 py-0.5 rounded">Rentan Penolakan Serikat</span>
      </div>
      <div className="p-2 bg-red-50 rounded border border-red-200 space-y-1 text-[10px] text-red-800">
        <div>Q1: "Sosialisasi Transformasi" (Tanpa tanggal pasti)</div>
        <div>Q2: "Pelatihan Karyawan" (Tanpa kuota mingguan)</div>
        <div>Q3: "Go-Live" (Tidak ada mitigasi jika serikat menolak)</div>
      </div>
    </div>
  );
};

/* =========================================================================
 * SUB-COMPONENT: MERIDIAN DASHBOARD SOLUTION VISUAL MOCKUPS
 * ========================================================================= */

interface MeridianVisualMockupProps {
  visualType: DeckSlide['solution']['visualType'];
  onNavigate: (tab: NavTab) => void;
  targetTab?: NavTab;
  interactiveNikInput: string;
  setInteractiveNikInput: (val: string) => void;
  interactiveNikMatch: any;
  interactiveThreshold: number;
  setInteractiveThreshold: (val: number) => void;
  interactiveCostBudget: number;
  setInteractiveCostBudget: (val: number) => void;
}

const MeridianVisualMockup: React.FC<MeridianVisualMockupProps> = ({
  visualType,
  onNavigate,
  targetTab,
  interactiveNikInput,
  setInteractiveNikInput,
  interactiveNikMatch,
  interactiveThreshold,
  setInteractiveThreshold,
  interactiveCostBudget,
  setInteractiveCostBudget,
}) => {
  if (visualType === 'single_identity_mesh') {
    return (
      <div className="bg-slate-900 rounded-lg p-3 text-white shadow-md space-y-2.5">
        <div className="flex items-center justify-between text-[10px] pb-2 border-b border-slate-800 text-blue-300 font-bold">
          <div className="flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span>Meridian Single Identity Mesh (SIM) · Live Resolver</span>
          </div>
          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded">
            99.4% Confidence
          </span>
        </div>

        {/* Live Interactive Resolver Tester */}
        <div className="space-y-1.5 bg-slate-800/80 p-2.5 rounded-md border border-slate-700">
          <label className="text-[10px] font-semibold text-slate-300 flex justify-between">
            <span>Uji Resolver NIK KTP (16-Digit):</span>
            <span className="text-emerald-400 font-mono text-[9px]">Verified Master Key</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={interactiveNikInput}
              onChange={(e) => setInteractiveNikInput(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs font-mono text-white flex-1 focus:ring-1 focus:ring-blue-500"
            />
            <span className="px-2 py-1 bg-blue-600 rounded text-[10px] font-bold text-white flex items-center">
              RESOLVED
            </span>
          </div>
        </div>

        {/* Unified Mapping Output */}
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
          <div className="p-1.5 bg-slate-800 rounded border border-slate-700/60">
            <span className="text-slate-400 block text-[9px]">Enterprise UID:</span>
            <span className="font-bold text-blue-400">UID-PLN-01001</span>
          </div>
          <div className="p-1.5 bg-slate-800 rounded border border-slate-700/60">
            <span className="text-slate-400 block text-[9px]">SAP HCM ID:</span>
            <span className="font-bold text-slate-200">SAP-88391 (Ahmad S.)</span>
          </div>
          <div className="p-1.5 bg-slate-800 rounded border border-slate-700/60">
            <span className="text-slate-400 block text-[9px]">LMS Moodle:</span>
            <span className="font-bold text-slate-200">ahmad_sub (K3 Pass)</span>
          </div>
          <div className="p-1.5 bg-slate-800 rounded border border-slate-700/60">
            <span className="text-slate-400 block text-[9px]">Unit Kerja:</span>
            <span className="font-bold text-emerald-400">UP3 Bandung (Jabar)</span>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'virtualized_grid') {
    return (
      <div className="bg-white rounded-lg border border-blue-200 p-3 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-blue-100 text-blue-900 font-bold">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-blue-600" />
            <span>Virtualized 60fps Grid · 6.000 Active Workforce Records</span>
          </div>
          <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-mono">
            Render Window: 18 Rows
          </span>
        </div>

        {/* Miniature Grid Display */}
        <div className="border border-slate-200 rounded overflow-hidden text-[10px]">
          <div className="grid grid-cols-5 gap-1 bg-slate-100 p-1.5 font-bold text-slate-700 border-b border-slate-200">
            <span>ID / NIK</span>
            <span>Nama & Role</span>
            <span>Job Family</span>
            <span>Exposure</span>
            <span>Keputusan</span>
          </div>
          <div className="divide-y divide-slate-100 font-mono text-[9px]">
            <div className="grid grid-cols-5 gap-1 p-1.5 bg-blue-50/40 items-center">
              <span className="font-bold text-blue-700">EMP-1001</span>
              <span className="font-sans text-slate-800 truncate">Ahmad Subagyo</span>
              <span className="text-slate-600 truncate">Field Metering</span>
              <span className="font-bold text-red-600">82% High</span>
              <span className="bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded text-[8px] font-bold text-center">
                Reskill
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1 p-1.5 items-center">
              <span className="font-bold text-blue-700">EMP-1002</span>
              <span className="font-sans text-slate-800 truncate">Bambang H.</span>
              <span className="text-slate-600 truncate">Manual Billing</span>
              <span className="font-bold text-red-600">88% High</span>
              <span className="bg-blue-100 text-blue-800 px-1 py-0.2 rounded text-[8px] font-bold text-center">
                Redeploy
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1 p-1.5 items-center">
              <span className="font-bold text-blue-700">... +5.998</span>
              <span className="font-sans text-slate-500 italic">Virtualized row</span>
              <span className="text-slate-400">12 Regional Units</span>
              <span className="text-slate-400">Instant sort</span>
              <span className="bg-amber-100 text-amber-800 px-1 py-0.2 rounded text-[8px] font-bold text-center">
                Assessment
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-slate-600 pt-1">
          <span>Sortir aktif: <strong>Job Family + Regional Unit</strong></span>
          <button
            onClick={() => onNavigate('people')}
            className="text-blue-700 hover:text-blue-800 font-bold flex items-center gap-1 text-[10px]"
          >
            <span>Buka Grid Lengkap</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  if (visualType === 'cost_itemization') {
    return (
      <div className="bg-white rounded-lg border border-emerald-200 p-3 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-emerald-100 text-emerald-900 font-bold">
          <div className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            <span>Auditable Activity-Based Cost Breakdown (Rata-rata Rp 9,0 Juta)</span>
          </div>
          <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">
            Payback 11,4 Bulan
          </span>
        </div>

        {/* 5-Bar Cost Breakdown */}
        <div className="space-y-1 text-[10px]">
          <div className="flex justify-between items-center">
            <span className="text-slate-700">1. Hardware Lab & Simulator Gardu</span>
            <span className="font-mono font-bold text-slate-900">Rp 3,2 Jt (35,6%)</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full w-[35.6%]" />
          </div>

          <div className="flex justify-between items-center pt-0.5">
            <span className="text-slate-700">2. Honorarium Lead Assessor BNSP</span>
            <span className="font-mono font-bold text-slate-900">Rp 2,8 Jt (31,1%)</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full w-[31.1%]" />
          </div>

          <div className="flex justify-between items-center pt-0.5">
            <span className="text-slate-700">3. OJT Mentorship Man-Hours (UP3)</span>
            <span className="font-mono font-bold text-slate-900">Rp 1,3 Jt (14,4%)</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-600 h-full w-[14.4%]" />
          </div>

          <div className="flex justify-between items-center pt-0.5">
            <span className="text-slate-700">4. Lisensi LMS Digital & Konten AI</span>
            <span className="font-mono font-bold text-slate-900">Rp 1,2 Jt (13,3%)</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full w-[13.3%]" />
          </div>

          <div className="flex justify-between items-center pt-0.5">
            <span className="text-slate-700">5. Safety Gear K3 & Kontinjensi</span>
            <span className="font-mono font-bold text-slate-900">Rp 0,5 Jt (5,6%)</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-slate-500 h-full w-[5.6%]" />
          </div>
        </div>

        <div className="p-1.5 rounded bg-emerald-50 text-[10px] text-emerald-900 flex justify-between items-center font-bold">
          <span>Total Unit Rate Terinci:</span>
          <span className="font-mono text-emerald-800 text-xs">Rp 9.000.000 / Kapita</span>
        </div>
      </div>
    );
  }

  if (visualType === 'what_if_engine') {
    return (
      <div className="bg-slate-900 rounded-lg p-3 text-white shadow-md space-y-2.5">
        <div className="flex items-center justify-between text-[10px] pb-2 border-b border-slate-800 text-sky-300 font-bold">
          <div className="flex items-center gap-1.5">
            <BrainCircuit className="w-3.5 h-3.5 text-sky-400" />
            <span>Interactive What-If Scenario Sandbox</span>
          </div>
          <span className="bg-sky-500/20 text-sky-400 border border-sky-500/30 px-1.5 py-0.5 rounded">
            Live Sensitivity
          </span>
        </div>

        {/* Live Threshold Slider */}
        <div className="bg-slate-800/80 p-2.5 rounded-md border border-slate-700 space-y-1.5">
          <div className="flex justify-between text-[10px]">
            <span className="text-slate-300 font-medium">Cutoff AI Exposure Threshold:</span>
            <span className="font-mono font-bold text-amber-400">{interactiveThreshold}%</span>
          </div>
          <input
            type="range"
            min="50"
            max="90"
            value={interactiveThreshold}
            onChange={(e) => setInteractiveThreshold(Number(e.target.value))}
            className="w-full accent-blue-500 h-1 bg-slate-700 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[9px] text-slate-400 font-mono">
            <span>50% (Agresif)</span>
            <span>70% (Standar Pilot)</span>
            <span>90% (Konservatif)</span>
          </div>
        </div>

        {/* Dynamic Macro Allocation Response */}
        <div className="grid grid-cols-3 gap-1.5 text-center text-[9px] font-mono">
          <div className="p-1.5 bg-slate-800 rounded border border-slate-700">
            <span className="text-slate-400 block">Redeploy</span>
            <span className="font-bold text-emerald-400 text-xs">
              {Math.round(1800 * (interactiveThreshold / 70))}
            </span>
          </div>
          <div className="p-1.5 bg-slate-800 rounded border border-slate-700">
            <span className="text-slate-400 block">Reskill</span>
            <span className="font-bold text-blue-400 text-xs">
              {Math.round(2880 * (85 / interactiveThreshold))}
            </span>
          </div>
          <div className="p-1.5 bg-slate-800 rounded border border-slate-700">
            <span className="text-slate-400 block">Assessment</span>
            <span className="font-bold text-amber-400 text-xs">960</span>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'evidence_hierarchy') {
    return (
      <div className="bg-white rounded-lg border border-blue-200 p-3 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-blue-100 text-blue-900 font-bold">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
            <span>4-Tier Hierarchy of Evidence (Standard Operasional K3)</span>
          </div>
          <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">
            Zero Guesswork
          </span>
        </div>

        <div className="space-y-1.5 text-[10px]">
          <div className="p-1.5 rounded bg-emerald-50 border border-emerald-200 flex justify-between items-center">
            <div>
              <span className="font-bold text-emerald-900">TIER 1: HIGH EVIDENCE</span>
              <span className="text-[9px] text-emerald-700 block">Uji Praktik Lapangan & Asesmen BNSP &lt; 12 Bulan</span>
            </div>
            <span className="px-1.5 py-0.5 bg-emerald-200 text-emerald-900 rounded font-bold text-[9px]">
              Direct Redeploy
            </span>
          </div>

          <div className="p-1.5 rounded bg-blue-50 border border-blue-200 flex justify-between items-center">
            <div>
              <span className="font-bold text-blue-900">TIER 2: MEDIUM EVIDENCE</span>
              <span className="text-[9px] text-blue-700 block">Kelulusan LMS Moodle + Log Mentorship Mentor UP3</span>
            </div>
            <span className="px-1.5 py-0.5 bg-blue-200 text-blue-900 rounded font-bold text-[9px]">
              Reskill Pathway
            </span>
          </div>

          <div className="p-1.5 rounded bg-amber-50 border border-amber-200 flex justify-between items-center">
            <div>
              <span className="font-bold text-amber-900">TIER 3: LOW / PRE-2023 DECAY</span>
              <span className="text-[9px] text-amber-700 block">Sertifikasi &gt; 24 Bulan yang Belum Diperbarui</span>
            </div>
            <span className="px-1.5 py-0.5 bg-amber-200 text-amber-900 rounded font-bold text-[9px]">
              Re-Verification
            </span>
          </div>

          <div className="p-1.5 rounded bg-slate-100 border border-slate-200 flex justify-between items-center">
            <div>
              <span className="font-bold text-slate-900">TIER 4: UNKNOWN (MISSING DATA)</span>
              <span className="text-[9px] text-slate-600 block">Karyawan Tanpa Riwayat Uji Kompetensi Terdata</span>
            </div>
            <span className="px-1.5 py-0.5 bg-slate-200 text-slate-800 rounded font-bold text-[9px]">
              Rule #1 Assessment
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (visualType === 'reusable_core') {
    return (
      <div className="bg-white rounded-lg border border-blue-200 p-3 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-blue-100 text-blue-900 font-bold">
          <div className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Core Engine (Reusable) vs. Client Configuration Layer</span>
          </div>
          <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-mono">
            ~4-Week Onboarding
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="p-2 rounded bg-emerald-50 border border-emerald-200 space-y-1">
            <span className="font-bold text-emerald-900 block text-[9px]">DIPAKAI ULANG (CORE)</span>
            <ul className="space-y-1 text-[9px] text-emerald-800 list-disc pl-3">
              <li>5-Rule Decision Engine (fit × feasibility × evidence)</li>
              <li>4-Tier Evidence Hierarchy & decay flag logic</li>
              <li>Struktur playbook 3-sprint (Data → Pilot → Scale)</li>
            </ul>
          </div>

          <div className="p-2 rounded bg-amber-50 border border-amber-200 space-y-1">
            <span className="font-bold text-amber-900 block text-[9px]">DI-DISCOVER ULANG (KONFIGURASI)</span>
            <ul className="space-y-1 text-[9px] text-amber-800 list-disc pl-3">
              <li>Threshold fit/feasibility spesifik industri klien</li>
              <li>Job architecture & formula kompensasi lokal</li>
              <li>Regulasi tenaga kerja & konteks serikat pekerja setempat</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 text-[9px] text-slate-600">
          <span className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded font-mono">Klien #1: 12 minggu</span>
          <ArrowRight className="w-3 h-3 text-slate-400" />
          <span className="px-1.5 py-0.5 bg-blue-100 border border-blue-200 rounded font-mono text-blue-800 font-bold">Klien #2+: ~4 minggu</span>
        </div>
      </div>
    );
  }

  // Default: phased_playbook
  return (
    <div className="bg-white rounded-lg border border-blue-200 p-3 shadow-xs space-y-2">
      <div className="flex items-center justify-between text-[10px] pb-1.5 border-b border-blue-100 text-blue-900 font-bold">
        <div className="flex items-center gap-1.5">
          <Workflow className="w-3.5 h-3.5 text-blue-600" />
          <span>90-Day Execution Sprints & Gate Milestones</span>
        </div>
        <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded font-mono">
          Week 1 - 12
        </span>
      </div>

      <div className="grid grid-cols-3 gap-2 text-[10px]">
        <div className="p-2 rounded bg-blue-50 border border-blue-200 space-y-1">
          <span className="font-bold text-blue-900 block text-[9px]">HARI 1 - 30</span>
          <span className="font-semibold text-slate-800 block">Sprint 1: SIM & Union Charter</span>
          <p className="text-[9px] text-slate-600">Integrasi 4 legacy system, NIK resolution, dan penandatanganan kesepakatan SP PLN.</p>
        </div>

        <div className="p-2 rounded bg-indigo-50 border border-indigo-200 space-y-1">
          <span className="font-bold text-indigo-900 block text-[9px]">HARI 31 - 60</span>
          <span className="font-semibold text-slate-800 block">Sprint 2: Pilot UP3 Bandung</span>
          <p className="text-[9px] text-slate-600">Aktivasi simulator lab bagi 350 teknisi gelombang pertama, validasi kurikulum BNSP.</p>
        </div>

        <div className="p-2 rounded bg-emerald-50 border border-emerald-200 space-y-1">
          <span className="font-bold text-emerald-900 block text-[9px]">HARI 61 - 90</span>
          <span className="font-semibold text-slate-800 block">Sprint 3: Enterprise Scale</span>
          <p className="text-[9px] text-slate-600">Evaluasi Dewan Direksi, fine-tuning decision engine, dan rollout 6.000 nasional.</p>
        </div>
      </div>
    </div>
  );
};
