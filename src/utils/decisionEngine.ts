import { DecisionCategory, EvidenceLevel, FeasibilityLevel, FitBucket } from '../types/meridian';

// Governance baseline priors by skill Type (per Critical Gap #5 slide copy:
// "Measured 0.90 confidence vs Inferred 0.65 confidence"). These are the
// STARTING priors the engine assigns before per-skill calibration; the
// `confidence` value stored on an individual SkillItem is the CALIBRATED
// result after adjusting for recency (skill decay) and source quality —
// which is why a given Inferred skill can show e.g. 82% or 35% rather than
// exactly 65%. Both numbers are real and reconcile: baseline = policy
// weight the engine starts from, stored confidence = the audited outcome
// for that specific employee-skill pair.
export const EVIDENCE_TYPE_BASELINE_CONFIDENCE: Record<'measured' | 'inferred', number> = {
  measured: 90,
  inferred: 65,
};

export interface DecisionResult {
  decision: DecisionCategory;
  ruleCode: string;
  ruleTitle: string;
  ruleExplanation: string;
  evidenceNote: string;
}

export function evaluateDecision(
  fit: number | null,
  feasibility: FeasibilityLevel,
  evidence: EvidenceLevel
): DecisionResult {
  // Bucket calculation: >= 75% High, >= 45% Medium, di bawah itu Low.
  let fitBucket: FitBucket = 'Insufficient Data';
  if (fit !== null && fit !== undefined) {
    if (fit >= 75) fitBucket = 'High';
    else if (fit >= 45) fitBucket = 'Medium';
    else fitBucket = 'Low';
  }

  // Rule #1: Evidence Low atau Unknown
  // Catatan skala (jangan disamakan dengan macro split "15% populasi"):
  // 45% di sini mengukur KELENGKAPAN FIELD SKILL di dalam kohort yang sudah
  // di-flag Rule #1 ini (denominator = employee-skill records milik ~15%
  // populasi berevidence Low/Unknown), bukan persentase dari total populasi
  // 6.000 karyawan. Dua angka beda denominator: 15% = jumlah ORANG yang
  // masuk Further Assessment; 45% = tingkat KEKOSONGAN FIELD skill di dalam
  // kelompok orang itu. Preempts fit & feasibility.
  if (evidence === 'Low' || evidence === 'Unknown') {
    return {
      decision: 'Further Assessment',
      ruleCode: 'Rule #1',
      ruleTitle: 'Evidence Low atau Unknown',
      ruleExplanation:
        'Sinyal bukti kompetensi tidak mencukupi. Di dalam kohort ~15% populasi yang masuk Further Assessment, rata-rata 45% dari field skill mereka tercatat kosong atau berasal dari skor performa pre-2023 yang belum dikalibrasi ulang — dua metrik beda denominator (15% = jumlah orang, 45% = kelengkapan field skill di dalam kelompok itu). Wajib melalui fast-track assessment gate 14 hari sebelum rekomendasi definitif.',
      evidenceNote:
        evidence === 'Unknown'
          ? 'Data skill kosong di SAP/HRIS. Fit & kelayakan ditampilkan sebagai "data tidak cukup", tanpa skor buatan.'
          : 'Data performa tercatat sebelum 2023 tanpa verifikasi instrumen lapangan terbaru.',
    };
  }

  // Rule #2: fit >= 75% (High) DAN feasibility High
  if (fitBucket === 'High' && feasibility === 'High') {
    return {
      decision: 'Redeploy',
      ruleCode: 'Rule #2',
      ruleTitle: 'fit >= 75% (High) DAN feasibility High',
      ruleExplanation:
        'Kesesuaian kapabilitas tinggi (≥75%) didukung kelayakan fungsional tinggi. Direkomendasikan penempatan langsung ke target peran operasional baru dengan onboarding kilat 2-4 minggu.',
      evidenceNote:
        'Didukung bukti terukur (Measured Signals: riwayat log penugasan >12 bulan & sertifikasi teknis valid).',
    };
  }

  // Rule #3: fit Low (<45%) DAN feasibility Low (evidence bukan Low/Unknown)
  if (fitBucket === 'Low' && feasibility === 'Low') {
    return {
      decision: 'Voluntary Transition Review',
      ruleCode: 'Rule #3',
      ruleTitle: 'fit Low DAN feasibility Low',
      ruleExplanation:
        'Kesesuaian kapabilitas dan kelayakan fungsional berada di bucket rendah dengan evidence terverifikasi. Masuk ke program transisi sukarela bermartabat (VERS / Voluntary Early Retirement Scheme atau Facility Stewardship) tanpa PHK sepihak.',
      evidenceNote:
        'Evidence valid (bukan Low/Unknown), memastikan keputusan berbasis rekam jejak riil bukan ketiadaan data.',
    };
  }

  // Rule #4: (fit High + feasibility Medium) ATAU (fit Medium + feasibility High)
  if (
    (fitBucket === 'High' && feasibility === 'Medium') ||
    (fitBucket === 'Medium' && feasibility === 'High')
  ) {
    const specificDetail =
      fitBucket === 'High'
        ? 'High fit + Medium feasibility'
        : 'Medium fit + High feasibility';
    return {
      decision: 'Reskill -> Redeploy',
      ruleCode: 'Rule #4',
      ruleTitle: specificDetail,
      ruleExplanation: `Kombinasi ${specificDetail}. Karyawan memiliki fondasi kuat dan dapat dialokasikan ke peran target setelah mengikuti jalur reskilling akselerasi 8-12 minggu.`,
      evidenceNote:
        'Evidence teruji (Medium/High). Gap kapabilitas spesifik dapat dijembatani lewat modul praktikum terstandar.',
    };
  }

  // Rule #5: Default — kombinasi lain, evidence bukan Low/Unknown
  return {
    decision: 'Reskill',
    ruleCode: 'Rule #5',
    ruleTitle: 'Kombinasi Lain (Default)',
    ruleExplanation:
      'Kombinasi kapabilitas berada pada rentang menengah atau kelayakan bertahap. Direkomendasikan masuk program peningkatan kapabilitas komprehensif 12-24 minggu untuk membuka klaster fungsional baru.',
    evidenceNote:
      'Evidence terverifikasi cukup untuk memulai kurikulum pelatihan tanpa pre-assessment tambahan.',
  };
}
