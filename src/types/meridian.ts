export type NavTab =
  | 'overview'
  | 'workforce'
  | 'exposure'
  | 'jobs'
  | 'capabilities'
  | 'people'
  | 'future-roles'
  | 'redeployment'
  | 'learning'
  | 'decision'
  | 'impact'
  | 'roadmap';

export type DecisionCategory =
  | 'Redeploy'
  | 'Reskill -> Redeploy'
  | 'Reskill'
  | 'Further Assessment'
  | 'Voluntary Transition Review';

export type FitBucket = 'High' | 'Medium' | 'Low' | 'Insufficient Data';
export type FeasibilityLevel = 'High' | 'Medium' | 'Low' | '—';
export type EvidenceLevel = 'High' | 'Medium' | 'Low' | 'Unknown';

export interface SkillItem {
  name: string;
  type: 'measured' | 'inferred';
  level: number; // 1-5
  source?: string;
  confidence?: number;
}

export interface EmployeeRecord {
  id: string; // e.g. EMP-1001
  nik?: string; // 16-digit Indonesian NIK e.g. "3201142908870001"
  enterpriseId?: string; // Unified Enterprise ID e.g. "UID-PLN-01001"
  legacyIds?: {
    sapHcm?: string;
    moodleLms?: string;
    taleoAts?: string;
    regionalLog?: string;
  };
  name: string;
  role: string;
  department?: string; // e.g. "UP3 Bandung (Jawa Barat)"
  jobFamily?: string; // e.g. "Field Metering & Manual Operations"
  exposure: number; // percentage, e.g. 82
  fit: number | null; // percentage number or null if missing
  fitRaw: string; // display string e.g. "88%", "— (data kosong)", "65% (skor pre-2023)"
  fitBucket: FitBucket;
  feasibility: FeasibilityLevel;
  evidence: EvidenceLevel;
  futureRoleTarget: string | null;
  officialDecision: DecisionCategory;
  ruleCode: string; // e.g. "Rule #2"
  ruleDescription: string;
  ruleExplanation: string;
  evidenceExplanation: string;
  destinationCluster: string;
  regionalUnit: string;
  tenureYears: number;
  grade: string;
  skills: SkillItem[];
  reskillingDurationWeeks?: number;
  reskillingCostJt?: number;
}

export interface MacroSplit {
  category: DecisionCategory;
  count: number;
  percentage: number;
  sampleCount: number;
  samplePercentage: number;
  color: string;
  bgLight: string;
  borderLight: string;
  description: string;
}

export interface TestScenario {
  id: string; // e.g. UC-01
  title: string;
  purpose: string;
  steps: string;
  expectedResult: string;
  autoCheck: (state: any) => boolean;
  actionHint?: string;
  targetCategoryFilter?: DecisionCategory | 'all';
  targetEmployeeId?: string;
  targetTab?: NavTab;
}
