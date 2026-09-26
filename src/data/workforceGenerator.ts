import { EmployeeRecord, FitBucket, FeasibilityLevel, EvidenceLevel, DecisionCategory } from '../types/meridian';
import { evaluateDecision } from '../utils/decisionEngine';
import { MERIDIAN_EMPLOYEES } from './meridianData';

// Indonesian First Names & Last Names for realistic workforce generation
const FIRST_NAMES = [
  'Ahmad', 'Budi', 'Siti', 'Hendra', 'Eko', 'Tri', 'Bambang', 'Agus', 'Rina', 'Dian',
  'Sari', 'Dewi', 'Adi', 'Arif', 'Bayu', 'Fajar', 'Ilham', 'Joko', 'Kurniawan', 'Lukman',
  'Mega', 'Nurul', 'Oki', 'Prasetyo', 'Rahmat', 'Surya', 'Taufik', 'Utami', 'Wahyu', 'Yudi',
  'Zulfikar', 'Anisa', 'Citra', 'Doni', 'Endang', 'Fitri', 'Gilang', 'Hadi', 'Indah', 'Jafar',
  'Kartika', 'Lestari', 'Mahendra', 'Nugroho', 'Putri', 'Rizky', 'Setiawan', 'Teguh', 'Wulan', 'Yanto'
];

const LAST_NAMES = [
  'Santoso', 'Pratama', 'Kusuma', 'Saputra', 'Wijaya', 'Hidayat', 'Nugraha', 'Setiadi',
  'Permana', 'Gunawan', 'Susanto', 'Wibowo', 'Firmansyah', 'Suryono', 'Utomo', 'Mulyadi',
  'Riyadi', 'Hartono', 'Purnomo', 'Syahputra', 'Anggoro', 'Wardhana', 'Kurnia', 'Subekti',
  'Widodo', 'Siregar', 'Nasution', 'Lubis', 'Simanjuntak', 'Hasibuan', 'Tanjung', 'Pohan'
];

export const DEPARTMENTS = [
  'UP3 Bandung (UID Jawa Barat)',
  'UP3 Menteng (UID Jakarta Raya)',
  'UP3 Surabaya Selatan (UID Jawa Timur)',
  'UP3 Semarang (UID Jawa Tengah & DIY)',
  'UP3 Medan Kota (UID Sumatera Utara)',
  'UP3 Makassar Selatan (UID Sulselrabar)',
  'UP3 Palembang (UID Sumatera Selatan)',
  'UP3 Denpasar (UID Bali)',
  'UP3 Balikpapan (UID Kaltimra)',
  'UP3 Pontianak (UID Kalimantan Barat)',
  'UP3 Manado (UID Suluttenggo)',
  'UP3 Padang (UID Sumatera Barat)'
];

export const JOB_FAMILIES = [
  'Field Metering & Manual Operations',
  'Smart Grid & Automation',
  'Distributed Renewable & Solar O&M',
  'Customer Energy Services',
  'Grid Protection & Substation Maintenance'
];

export const REGIONAL_UNITS = [
  'Regional Unit 3 (Jawa Barat)',
  'Regional Unit 4 (DKI Jakarta & Banten)',
  'Regional Unit 5 (Jawa Timur & Bali)',
  'Regional Unit 2 (Jawa Tengah & DIY)',
  'Regional Unit 1 (Sumatera Bagian Utara)',
  'Regional Unit 6 (Sulawesi, Maluku, Papua)'
];

const ROLES_POOL = [
  'Teknisi Pencatat Meter',
  'Petugas Baca Meter Keliling',
  'Inspektur Lapangan kWh',
  'Petugas Penertiban Pemakaian Listrik (P2TL)',
  'Operator Tera Segel Lapangan',
  'Petugas Sambungan & Pemutusan',
  'Teknisi Pemeliharaan Meter Analog',
  'Petugas Survei Distribusi Pelanggan'
];

const TARGET_ROLES_POOL = [
  'Smart Meter Operations Specialist',
  'IoT Field Analyst',
  'Solar PV Maintenance Specialist',
  'Inverter Diagnostic Technician',
  'Customer Energy Advisor',
  'Field Data Quality Analyst',
  'Digital Metering Technician',
  'Substation Facility Steward'
];

const CLUSTER_POOL = [
  'Smart Grid & IoT Field Maintenance',
  'Distributed Renewable & Solar O&M',
  'Regional Customer Energy Services & Verification',
  'Facility Stewardship & Voluntary Early Retirement (VERS)',
  'Pending Assessment Gate (Customer Energy / P2TL)'
];

// Seeded pseudo-random number generator (Mulberry32) for perfectly deterministic data
function createRng(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Generate NIK (16-digit valid format: Region + Date + Sequence)
function generateNik(index: number, deptIndex: number): string {
  const provinceCodes = ['32', '31', '35', '33', '12', '73', '16', '51', '64', '61', '71', '13'];
  const pCode = provinceCodes[deptIndex % provinceCodes.length];
  const regCode = String(10 + ((index * 3) % 80)).padStart(2, '0');
  const distCode = String(10 + ((index * 7) % 80)).padStart(2, '0');
  const day = String(10 + (index % 18)).padStart(2, '0');
  const month = String(1 + (index % 12)).padStart(2, '0');
  const year = String(75 + (index % 25)).padStart(2, '0');
  const seq = String(1 + (index % 9999)).padStart(4, '0');
  return `${pCode}${regCode}${distCode}${day}${month}${year}${seq}`;
}

// Generate all 6,000 workforce records
export function generateWorkforce6000(): EmployeeRecord[] {
  const rng = createRng(42006000);
  const totalTarget = 6000;
  const records: EmployeeRecord[] = [];

  // First 24 are curated pilot employees
  MERIDIAN_EMPLOYEES.forEach((curated, idx) => {
    const deptIdx = idx % DEPARTMENTS.length;
    const enriched: EmployeeRecord = {
      ...curated,
      nik: curated.nik || generateNik(idx + 1001, deptIdx),
      enterpriseId: curated.enterpriseId || `UID-PLN-${String(idx + 1001).padStart(5, '0')}`,
      department: curated.department || DEPARTMENTS[deptIdx],
      jobFamily: curated.jobFamily || 'Field Metering & Manual Operations',
      legacyIds: curated.legacyIds || {
        sapHcm: `SAP-88${String(1001 + idx).padStart(4, '0')}`,
        moodleLms: `MDL-${String(3000 + idx).padStart(4, '0')}`,
        taleoAts: `TAL-${String(5000 + idx).padStart(4, '0')}`,
        regionalLog: `REG-UNIT-${String(idx + 1).padStart(3, '0')}`,
      },
    };
    records.push(enriched);
  });

  // Target proportions matching macro split:
  // Redeploy: 20% (1,200)
  // Reskill -> Redeploy: 30% (1,800)
  // Reskill: 25% (1,500)
  // Further Assessment: 15% (900)
  // Voluntary Transition: 10% (600)
  
  for (let i = records.length; i < totalTarget; i++) {
    const empNum = 1001 + i;
    const empId = `EMP-${empNum}`;
    const enterpriseId = `UID-PLN-${String(empNum).padStart(5, '0')}`;
    const deptIndex = Math.floor(rng() * DEPARTMENTS.length);
    const department = DEPARTMENTS[deptIndex];
    const regionalUnit = REGIONAL_UNITS[deptIndex % REGIONAL_UNITS.length];
    const nik = generateNik(empNum, deptIndex);

    const fName = FIRST_NAMES[Math.floor(rng() * FIRST_NAMES.length)];
    const lName = LAST_NAMES[Math.floor(rng() * LAST_NAMES.length)];
    const name = `${fName} ${lName}`;

    // Job family distribution across all 5 JOB_FAMILIES (must stay in sync
    // with that constant — every family needs a non-zero share, or it shows
    // up in filters/charts with a count of 0, which is its own consistency bug):
    // 65% Field Metering & Manual Operations (core affected pilot)
    // 15% Smart Grid & Automation
    // 10% Distributed Renewable & Solar O&M
    //  5% Grid Protection & Substation Maintenance
    //  5% Customer Energy Services
    let jobFamily = 'Field Metering & Manual Operations';
    const jfRoll = rng();
    if (jfRoll > 0.95) {
      jobFamily = 'Customer Energy Services';
    } else if (jfRoll > 0.90) {
      jobFamily = 'Grid Protection & Substation Maintenance';
    } else if (jfRoll > 0.80) {
      jobFamily = 'Distributed Renewable & Solar O&M';
    } else if (jfRoll > 0.65) {
      jobFamily = 'Smart Grid & Automation';
    }

    const role = ROLES_POOL[Math.floor(rng() * ROLES_POOL.length)];
    const tenureYears = 2 + Math.floor(rng() * 26); // 2 - 28 years
    const grade =
      tenureYears > 20
        ? 'Band 3 (Spesialis Madya - Pra Pensiun)'
        : tenureYears > 10
        ? 'Band 2 (Teknisi Muda)'
        : 'Band 1 (Pelaksana Lapangan)';

    // Deterministic distribution to hit macro split proportions exactly:
    const bucketRoll = rng();
    let fit: number | null = null;
    let fitRaw = '';
    let feasibility: FeasibilityLevel = 'Medium';
    let evidence: EvidenceLevel = 'High';
    let futureRoleTarget: string | null = null;
    let destinationCluster = '';
    let reskillingDurationWeeks = 12;
    let reskillingCostJt = 9.5;

    // 15% Further Assessment (Rule #1: Evidence Low or Unknown)
    if (bucketRoll < 0.15) {
      evidence = rng() > 0.5 ? 'Low' : 'Unknown';
      if (evidence === 'Unknown') {
        fit = null;
        fitRaw = '— (data kosong)';
        feasibility = '—';
      } else {
        fit = 45 + Math.floor(rng() * 20);
        fitRaw = `${fit}% (skor pre-2023)`;
        feasibility = 'Medium';
      }
      destinationCluster = 'Pending Assessment Gate (Customer Energy / P2TL)';
      reskillingDurationWeeks = 0;
      reskillingCostJt = 2.0;
    }
    // 20% Redeploy (Rule #2: fit >= 75% High, feasibility High)
    else if (bucketRoll < 0.35) {
      fit = 75 + Math.floor(rng() * 22); // 75 - 96%
      fitRaw = `${fit}%`;
      feasibility = 'High';
      evidence = 'High';
      futureRoleTarget = TARGET_ROLES_POOL[Math.floor(rng() * 3)];
      destinationCluster = 'Smart Grid & IoT Field Maintenance';
      reskillingDurationWeeks = 2 + Math.floor(rng() * 3);
      reskillingCostJt = 4.0;
    }
    // 10% Voluntary Transition Review (Rule #3: fit < 45% Low, feasibility Low)
    else if (bucketRoll < 0.45) {
      fit = 25 + Math.floor(rng() * 19); // 25 - 43%
      fitRaw = `${fit}%`;
      feasibility = 'Low';
      evidence = rng() > 0.3 ? 'Medium' : 'High';
      futureRoleTarget = 'VERS Dignified Transition Scheme';
      destinationCluster = 'Facility Stewardship & Voluntary Early Retirement (VERS)';
      reskillingDurationWeeks = 4;
      reskillingCostJt = 3.0;
    }
    // 30% Reskill -> Redeploy (Rule #4: fit High + feas Med OR fit Med + feas High)
    else if (bucketRoll < 0.75) {
      if (rng() > 0.5) {
        fit = 75 + Math.floor(rng() * 15);
        feasibility = 'Medium';
      } else {
        fit = 55 + Math.floor(rng() * 18);
        feasibility = 'High';
      }
      fitRaw = `${fit}%`;
      evidence = rng() > 0.2 ? 'High' : 'Medium';
      futureRoleTarget = TARGET_ROLES_POOL[Math.floor(rng() * TARGET_ROLES_POOL.length)];
      destinationCluster = CLUSTER_POOL[Math.floor(rng() * 3)];
      reskillingDurationWeeks = 8 + Math.floor(rng() * 5); // 8 - 12 weeks
      reskillingCostJt = 8.5;
    }
    // 25% Reskill (Rule #5: other combinations)
    else {
      fit = 45 + Math.floor(rng() * 25); // 45 - 69%
      fitRaw = `${fit}%`;
      feasibility = rng() > 0.5 ? 'Medium' : 'Low';
      evidence = 'Medium';
      futureRoleTarget = TARGET_ROLES_POOL[Math.floor(rng() * TARGET_ROLES_POOL.length)];
      destinationCluster = CLUSTER_POOL[Math.floor(rng() * 3)];
      reskillingDurationWeeks = 12 + Math.floor(rng() * 9); // 12 - 20 weeks
      reskillingCostJt = 12.0;
    }

    // AI Exposure: calibrated per job family, not just "pilot vs everyone else".
    // Field Metering is highest (routine, manual, physically observable tasks —
    // the AMI/vision-meter disruption named in the brief). The rest scale down
    // roughly by how much of the role is routine/manual vs. judgment- or
    // safety-critical.
    // Ranges are deliberately wide enough to straddle the High/Medium/Low
    // bucket thresholds used downstream (>=70 / >=40) rather than sitting
    // entirely inside one bucket — a narrow range that never crosses a
    // threshold produces a fake-looking 100%/0%/0% split for that family.
    let exposure: number;
    if (jobFamily === 'Field Metering & Manual Operations') {
      exposure = 55 + Math.floor(rng() * 40); // 55-94% — mostly High, some Medium
    } else if (jobFamily === 'Customer Energy Services') {
      exposure = 25 + Math.floor(rng() * 50); // 25-74% — service tasks AI-augmentable, not fully automatable
    } else if (jobFamily === 'Distributed Renewable & Solar O&M') {
      exposure = 18 + Math.floor(rng() * 57); // 18-74% — physical field maintenance
    } else if (jobFamily === 'Smart Grid & Automation') {
      exposure = 12 + Math.floor(rng() * 63); // 12-74% — already tooling-adjacent, more augmentation than replacement
    } else {
      // Grid Protection & Substation Maintenance
      exposure = 8 + Math.floor(rng() * 47); // 8-54% — safety-critical, judgment-heavy
    }

    // Evaluate official decision with engine
    const engineResult = evaluateDecision(fit, feasibility, evidence);

    let fitBucket: FitBucket = 'Insufficient Data';
    if (fit !== null) {
      if (fit >= 75) fitBucket = 'High';
      else if (fit >= 45) fitBucket = 'Medium';
      else fitBucket = 'Low';
    }

    const legacySap = `SAP-88${String(empNum).slice(-4)}`;
    const legacyMoodle = `MDL-${String(3000 + (empNum % 5000)).padStart(4, '0')}`;
    const legacyTaleo = `TAL-${String(5000 + (empNum % 4000)).padStart(4, '0')}`;

    records.push({
      id: empId,
      nik,
      enterpriseId,
      legacyIds: {
        sapHcm: legacySap,
        moodleLms: legacyMoodle,
        taleoAts: legacyTaleo,
        regionalLog: `REG-${deptIndex + 1}-${empNum}`,
      },
      name,
      role,
      department,
      jobFamily,
      exposure,
      fit,
      fitRaw,
      fitBucket,
      feasibility,
      evidence,
      futureRoleTarget,
      officialDecision: engineResult.decision,
      ruleCode: engineResult.ruleCode,
      ruleDescription: engineResult.ruleTitle,
      ruleExplanation: engineResult.ruleExplanation,
      evidenceExplanation: engineResult.evidenceNote,
      destinationCluster,
      regionalUnit,
      tenureYears,
      grade,
      reskillingDurationWeeks,
      reskillingCostJt,
      skills: [
        {
          name: 'Operasional Lapangan & Inspeksi Fisik',
          type: 'measured',
          level: Math.min(5, Math.max(2, Math.floor(tenureYears / 5) + 1)),
          source: 'Log Operasi Unit',
        },
        {
          name: 'Protokol K3 Distribusi Tenaga Listrik',
          type: 'measured',
          level: 4,
          source: 'Sertifikasi BNSP',
        },
        {
          name: 'Adaptasi Telemetri Digital & Smart Metering',
          type: evidence === 'High' ? 'measured' : 'inferred',
          level: fit ? Math.round((fit / 100) * 5) : 2,
          confidence: evidence === 'High' ? 88 : 52,
          source: evidence === 'High' ? 'Evaluasi Diklat PLN' : 'Estimasi Proximity AI',
        },
      ],
    });
  }

  return records;
}

// Single memoized instance for blazing-fast in-memory operations across views
let cachedWorkforce: EmployeeRecord[] | null = null;
export function getWorkforce6000(): EmployeeRecord[] {
  if (!cachedWorkforce) {
    cachedWorkforce = generateWorkforce6000();
  }
  return cachedWorkforce;
}

export function getEmployeeById(id: string): EmployeeRecord | undefined {
  const dataset = getWorkforce6000();
  return dataset.find((e) => e.id === id || e.enterpriseId === id || e.nik === id);
}

